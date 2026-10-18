/**
 * POST /api/dictionary
 * ─────────────────────────────────────────────
 * Looks up a word in Amharic or English and returns its definitions,
 * synonyms, antonyms, and usage examples.
 *
 * Request body:
 *   {
 *     "word":     "resilience",   // required
 *     "language": "English"       // required  "English" | "Amharic"
 *   }
 *
 * Success response (200):
 *   {
 *     "success":  true,
 *     "word":     "resilience",
 *     "language": "English",
 *     "results": {
 *       "definitions": ["The capacity to recover quickly from difficulties.", ...],
 *       "synonyms":    ["toughness", "adaptability", ...],
 *       "antonyms":    ["fragility", ...],
 *       "examples":    ["She showed great resilience in the face of adversity.", ...]
 *     }
 *   }
 */

const express = require("express");
const { callOpenAI } = require("../services/aiService");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { word, language } = req.body;

    // ── Input validation ───────────────────────────────────────────────────
    if (!word || typeof word !== "string" || word.trim() === "") {
      return res.status(400).json({ error: "'word' is required." });
    }
    if (!language) {
      return res.status(400).json({ error: "'language' is required (\"English\" or \"Amharic\")." });
    }
    if (word.trim().length > 100) {
      return res.status(400).json({ error: "Word exceeds 100 characters. Dictionary lookup is for single words or short phrases." });
    }

    // ── Build AI prompt ────────────────────────────────────────────────────
    const systemPrompt = `You are an expert ${language} lexicographer and linguist specialising in Amharic and English.
When given a word or short phrase, respond with a JSON object (and nothing else) with this exact structure:
{
  "definitions": ["<string>", ...],   // 1–3 clear definitions
  "synonyms":    ["<string>", ...],   // up to 5 synonyms
  "antonyms":    ["<string>", ...],   // up to 3 antonyms (empty array if none apply)
  "examples":    ["<string>", ...]    // 2–3 example sentences using the word in context
}
All fields are in ${language}. Do not include markdown fences or any text outside the JSON.`;

    const rawResponse = await callOpenAI(systemPrompt, word.trim(), 0.4);

    // ── Parse the JSON the model returned ─────────────────────────────────
    let results;
    try {
      // Strip accidental markdown code fences if the model added them
      const cleaned = rawResponse.replace(/```(?:json)?/gi, "").replace(/```/g, "").trim();
      results = JSON.parse(cleaned);
    } catch {
      // If parsing fails, return the raw text in a graceful degraded shape
      results = {
        definitions: [rawResponse],
        synonyms: [],
        antonyms: [],
        examples: [],
      };
    }

    return res.status(200).json({
      success: true,
      word: word.trim(),
      language,
      results,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
