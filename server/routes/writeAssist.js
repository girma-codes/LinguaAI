/**
 * POST /api/write-assist
 * ─────────────────────────────────────────────
 * AI writing assistant for grammar checking, tone adjustment,
 * and text rephrasing in Amharic or English.
 *
 * Request body:
 *   {
 *     "text":     "I are going to the store yesterday.",  // required
 *     "mode":     "grammar",                              // required (see MODES below)
 *     "language": "English",                              // required
 *     "tone":     "formal"                                // optional, used with "tone" mode
 *   }
 *
 * Supported modes:
 *   "grammar"   – Correct grammatical errors while preserving meaning.
 *   "rephrase"  – Rewrite the text for improved clarity and flow.
 *   "tone"      – Adjust the tone (formal | informal | professional | friendly | academic).
 *   "summarize" – Condense the text to its key points.
 *   "expand"    – Expand/elaborate on the provided text.
 *
 * Success response (200):
 *   {
 *     "success":      true,
 *     "mode":         "grammar",
 *     "language":     "English",
 *     "originalText": "I are going to the store yesterday.",
 *     "result":       "I went to the store yesterday.",
 *     "changes":      ["Fixed subject-verb agreement: 'I are' → 'I was'", ...]
 *   }
 */

const express = require("express");
const { callOpenAI } = require("../services/aiService");

const router = express.Router();

// Supported modes and their human-readable labels
const SUPPORTED_MODES = ["grammar", "rephrase", "tone", "summarize", "expand"];

// Valid tone options when mode === "tone"
const VALID_TONES = ["formal", "informal", "professional", "friendly", "academic"];

/**
 * Build a system prompt tailored to the selected writing-assist mode.
 */
function buildSystemPrompt(mode, language, tone) {
  const base = `You are LinguaAI Write Assist, an expert ${language} writing coach specialising in Amharic and English.
Respond with a JSON object (and nothing else) using this structure:
{
  "result":   "<improved text>",
  "changes":  ["<explanation of change 1>", ...]  // empty array if no changes were needed
}
Do not include markdown fences or any text outside the JSON.`;

  const instructions = {
    grammar: `Correct all grammar, punctuation, and spelling errors in the ${language} text.
Preserve the original meaning, style, and formatting. List each correction made.`,

    rephrase: `Rephrase the ${language} text to improve clarity, readability, and flow.
Keep the core meaning intact. Note the key improvements.`,

    tone: `Rewrite the ${language} text in a ${tone || "formal"} tone.
Preserve the meaning while adjusting vocabulary, sentence structure, and style accordingly.
Note the main tone adjustments made.`,

    summarize: `Summarise the ${language} text into clear, concise key points.
Retain all important information. Use bullet points in the summary where appropriate.`,

    expand: `Expand and elaborate on the ${language} text with more detail, examples, and context.
Keep the elaboration coherent and on-topic. Note what was added.`,
  };

  return `${base}\n\nTask instructions:\n${instructions[mode]}`;
}

// ── Route handler ─────────────────────────────────────────────────────────────
router.post("/", async (req, res, next) => {
  try {
    const { text, mode, language, tone } = req.body;

    // ── Input validation ───────────────────────────────────────────────────
    if (!text || typeof text !== "string" || text.trim() === "") {
      return res.status(400).json({ error: "'text' is required and must be a non-empty string." });
    }
    if (!mode || !SUPPORTED_MODES.includes(mode)) {
      return res.status(400).json({
        error: `'mode' must be one of: ${SUPPORTED_MODES.join(", ")}.`,
      });
    }
    if (!language) {
      return res.status(400).json({ error: "'language' is required (e.g. \"English\" or \"Amharic\")." });
    }
    if (mode === "tone" && tone && !VALID_TONES.includes(tone.toLowerCase())) {
      return res.status(400).json({
        error: `For mode "tone", 'tone' must be one of: ${VALID_TONES.join(", ")}.`,
      });
    }
    if (text.length > 5000) {
      return res.status(400).json({ error: "Text exceeds the 5,000-character limit." });
    }

    // ── Build prompt and call AI ───────────────────────────────────────────
    const systemPrompt = buildSystemPrompt(mode, language, tone?.toLowerCase());
    const rawResponse = await callOpenAI(systemPrompt, text.trim(), 0.5);

    // ── Parse structured JSON response from the model ──────────────────────
    let parsed;
    try {
      const cleaned = rawResponse.replace(/```(?:json)?/gi, "").replace(/```/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch {
      // Graceful fallback: treat the raw text as the result
      parsed = { result: rawResponse, changes: [] };
    }

    return res.status(200).json({
      success: true,
      mode,
      language,
      tone: mode === "tone" ? (tone || "formal") : undefined,
      originalText: text.trim(),
      result: parsed.result || rawResponse,
      changes: Array.isArray(parsed.changes) ? parsed.changes : [],
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
