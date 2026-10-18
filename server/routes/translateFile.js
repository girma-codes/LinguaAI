/**
 * POST /api/translate-file
 * ─────────────────────────────────────────────
 * Accepts an uploaded PDF, DOCX, or TXT file, extracts its text,
 * translates it safely in small batches, and returns a JSON response
 * for UI preview plus a download endpoint.
 *
 * Rate-limit strategy:
 *   • Text is split into ≤ 300-char paragraph/sentence chunks.
 *   • Each chunk is translated with retry + exponential back-off inside aiService.
 *   • A 200ms inter-chunk delay prevents bursting the free-tier quota.
 *   • If a chunk still fails after retries, the ORIGINAL text is kept for
 *     that chunk so the whole translation is never lost.
 *
 * Supported file types:  .pdf  .docx  .txt   (max 10 MB)
 *
 * Success response (200):
 *   {
 *     "success":        true,
 *     "translatedText": "...",
 *     "originalText":   "...",
 *     "fileName":       "translated_<name>.txt",
 *     "engine":         "openai" | "mymemory" | "mixed",
 *     "charCount":      1234,
 *     "chunksTotal":    12,
 *     "chunksFailed":   0
 *   }
 *
 * Download endpoint:
 *   GET /api/translate-file/download?file=<fileName>
 */

const express = require("express");
const multer  = require("multer");
const path    = require("path");
const fs      = require("fs");
const pdfParse  = require("pdf-parse");
const mammoth   = require("mammoth");
const { callOpenAI, callMyMemory } = require("../services/aiService");

const router = express.Router();

// ── Directories ───────────────────────────────────────────────────────────────
const UPLOAD_DIR = path.join(__dirname, "../uploads/incoming");
const OUTPUT_DIR = path.join(__dirname, "../uploads/translated");
[UPLOAD_DIR, OUTPUT_DIR].forEach((d) => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

// ── Multer setup ──────────────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename:    (_req, file,  cb) => {
    const safe = `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`;
    cb(null, safe);
  },
});

const fileFilter = (_req, file, cb) => {
  const allowed = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
  ];
  const isTxtByExt = file.originalname.toLowerCase().endsWith(".txt");
  if (allowed.includes(file.mimetype) || isTxtByExt) {
    cb(null, true);
  } else {
    cb(
      Object.assign(new Error("Only PDF, DOCX, and TXT files are supported."), {
        status: 415,
      }),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Small async delay to space out API requests. */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Split text into chunks of at most maxLen characters.
 * Priority order: paragraph breaks → sentence breaks → word breaks.
 * This guarantees no chunk exceeds maxLen regardless of input.
 *
 * @param {string} text
 * @param {number} maxLen  – Hard cap per chunk (default 300, safe for MyMemory free tier).
 * @returns {string[]}
 */
function buildChunks(text, maxLen = 300) {
  // Step 1: split on blank lines (paragraph breaks)
  const paragraphs = text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  const chunks = [];

  for (const para of paragraphs) {
    if (para.length <= maxLen) {
      chunks.push(para);
      continue;
    }

    // Step 2: paragraph too long — split on sentence endings
    const sentences = para.match(/[^.!?]+[.!?]+[\s]*/g) ?? [para];
    let current = "";

    for (const sentence of sentences) {
      if ((current + sentence).length > maxLen && current.length > 0) {
        chunks.push(current.trim());
        current = sentence;
      } else {
        current += sentence;
      }
    }
    if (current.trim()) chunks.push(current.trim());
  }

  // Step 3: if any chunk is STILL over maxLen (e.g. no punctuation),
  // slice it on word boundaries as a last resort.
  const final = [];
  for (const chunk of chunks) {
    if (chunk.length <= maxLen) {
      final.push(chunk);
      continue;
    }
    const words = chunk.split(" ");
    let cur = "";
    for (const word of words) {
      if ((cur + " " + word).trim().length > maxLen && cur.length > 0) {
        final.push(cur.trim());
        cur = word;
      } else {
        cur = cur ? cur + " " + word : word;
      }
    }
    if (cur.trim()) final.push(cur.trim());
  }

  return final;
}

/**
 * Translate a single text chunk.
 * Tries OpenAI first, then MyMemory (which has internal retry logic).
 * On total failure returns the original chunk text so no content is lost.
 *
 * @returns {{ text: string, engine: string, failed: boolean }}
 */
async function translateChunk(chunk, sourceLang, targetLang) {
  // --- Tier 1: OpenAI ---
  try {
    const systemPrompt = `You are LinguaAI, a translation engine.
Translate the following text from ${sourceLang} to ${targetLang}.
Return ONLY the translated text with no extra commentary.`;
    const result = await callOpenAI(systemPrompt, chunk, 0.2);
    return { text: result, engine: "openai", failed: false };
  } catch (openAiErr) {
    console.warn("[translate-file] OpenAI failed for chunk:", openAiErr.message);
  }

  // --- Tier 2: MyMemory (has retry + back-off inside callMyMemory) ---
  try {
    const result = await callMyMemory(chunk, sourceLang, targetLang);
    return { text: result, engine: "mymemory", failed: false };
  } catch (myMemoryErr) {
    // 429 exhausted all retries — keep original text, mark as failed
    console.warn(
      "[translate-file] MyMemory also failed for chunk (%s). Keeping original.",
      myMemoryErr.message
    );
    return { text: chunk, engine: "fallback", failed: true };
  }
}

// ── POST /api/translate-file ───────────────────────────────────────────────────
router.post("/", upload.single("file"), async (req, res, next) => {
  const uploadedPath = req.file?.path;

  try {
    // ── Validation ──────────────────────────────────────────────────────────
    if (!req.file) {
      return res.status(400).json({
        error: "No file uploaded. Send a PDF, DOCX, or TXT with field name 'file'.",
      });
    }

    const sourceLang = (req.body.sourceLang || "English").trim();
    const targetLang = (req.body.targetLang || "Amharic").trim();

    // ── Extract text ─────────────────────────────────────────────────────────
    let extractedText = "";
    const mime     = req.file.mimetype;
    const origName = req.file.originalname.toLowerCase();

    if (mime === "application/pdf") {
      const buf  = fs.readFileSync(uploadedPath);
      const data = await pdfParse(buf);
      extractedText = data.text;
    } else if (
      mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result  = await mammoth.extractRawText({ path: uploadedPath });
      extractedText = result.value;
    } else if (mime === "text/plain" || origName.endsWith(".txt")) {
      extractedText = fs.readFileSync(uploadedPath, "utf-8");
    } else {
      return res.status(415).json({ error: "Unsupported file type." });
    }

    const cleanedText = extractedText.trim();
    if (!cleanedText) {
      return res.status(422).json({
        error: "Could not extract any text from the uploaded document.",
      });
    }

    // ── Split into safe chunks ────────────────────────────────────────────────
    const chunks = buildChunks(cleanedText, 300);
    console.log(`[translate-file] ${chunks.length} chunk(s) from ${cleanedText.length} chars`);

    // ── Translate chunk-by-chunk with delay between requests ─────────────────
    const engineCounts = { openai: 0, mymemory: 0, fallback: 0 };
    let chunksFailed = 0;
    const translatedParts = [];

    for (let i = 0; i < chunks.length; i++) {
      const { text, engine, failed } = await translateChunk(
        chunks[i],
        sourceLang,
        targetLang
      );

      translatedParts.push(text);
      engineCounts[engine] = (engineCounts[engine] ?? 0) + 1;
      if (failed) chunksFailed++;

      // 200ms gap between chunks — keeps us well inside MyMemory's free-tier limits
      if (i < chunks.length - 1) await sleep(200);
    }

    const translatedText = translatedParts.join("\n\n");

    // Determine the dominant engine label for the response
    const engine =
      engineCounts.openai > 0 && engineCounts.mymemory === 0
        ? "openai"
        : engineCounts.openai === 0 && chunksFailed === 0
        ? "mymemory"
        : "mixed";

    // ── Save translated file for download ─────────────────────────────────────
    const baseName       = path.parse(req.file.originalname).name.replace(/\s+/g, "_");
    const outputFileName = `translated_${Date.now()}_${baseName}.txt`;
    const outputPath     = path.join(OUTPUT_DIR, outputFileName);
    fs.writeFileSync(outputPath, translatedText, "utf-8");

    // Auto-expire after 15 minutes
    setTimeout(() => {
      if (fs.existsSync(outputPath)) fs.unlink(outputPath, () => {});
    }, 15 * 60 * 1000);

    // ── Always return valid JSON ───────────────────────────────────────────────
    return res.status(200).json({
      success: true,
      translatedText,
      originalText: cleanedText,
      fileName:     outputFileName,
      engine,
      charCount:    cleanedText.length,
      chunksTotal:  chunks.length,
      chunksFailed,
      ...(chunksFailed > 0 && {
        warning: `${chunksFailed} of ${chunks.length} chunk(s) could not be translated and kept their original text.`,
      }),
    });
  } catch (err) {
    // Last-resort safety net — always return JSON, never a raw 500 HTML page
    console.error("[translate-file] Unhandled error:", err.message);
    return res.status(500).json({
      error: "An unexpected error occurred during translation. Please try again.",
      detail: err.message,
    });
  } finally {
    // Always clean up the incoming upload regardless of success or failure
    if (uploadedPath && fs.existsSync(uploadedPath)) {
      fs.unlink(uploadedPath, () => {});
    }
  }
});

// ── GET /api/translate-file/download?file=<fileName> ─────────────────────────
router.get("/download", (req, res) => {
  const { file } = req.query;

  // Block path traversal
  if (!file || /[./\\]/.test(file.replace(/^[a-zA-Z0-9_\-]+\.txt$/, ""))) {
    return res.status(400).json({ error: "Invalid file name." });
  }

  const filePath = path.join(OUTPUT_DIR, path.basename(file));
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      error: "Translated file not found or has expired. Please translate again.",
    });
  }

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Content-Disposition", `attachment; filename="${path.basename(file)}"`);
  res.sendFile(filePath);
});

module.exports = router;
