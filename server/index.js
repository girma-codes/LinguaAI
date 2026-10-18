/**
 * LinguaAI Backend Server
 * ─────────────────────────────────────────────
 * Amharic ↔ English AI translation API built with Express.
 *
 * Endpoints:
 *   POST /api/translate        – Text translation
 *   POST /api/translate-file   – Document (PDF / Word) translation
 *   POST /api/dictionary       – Word lookup (definitions, synonyms, examples)
 *   POST /api/write-assist     – AI writing assistant (grammar, tone, rephrase)
 */

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const translateRouter = require("./routes/translate");
const translateFileRouter = require("./routes/translateFile");
const dictionaryRouter = require("./routes/dictionary");
const writeAssistRouter = require("./routes/writeAssist");

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ────────────────────────────────────────────────────────────────

// CORS: allow the Vite dev server (and any configured production origin)
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded bodies (form data fallback)
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ──────────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "LinguaAI API", timestamp: new Date().toISOString() });
});

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/translate-file", translateFileRouter); // must come before /api/translate
app.use("/api/translate", translateRouter);
app.use("/api/dictionary", dictionaryRouter);
app.use("/api/write-assist", writeAssistRouter);

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error("[LinguaAI Error]", err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || "Internal server error",
  });
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅  LinguaAI API running at http://localhost:${PORT}`);
  console.log(`   Health check → http://localhost:${PORT}/api/health`);
});
