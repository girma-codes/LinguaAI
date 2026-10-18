/**
 * aiService.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Multi-source translation service — four live engines, all free, no key needed
 * except for OpenAI (Tier 1).  The route layer calls each in priority order.
 *
 *   Tier 1 – OpenAI GPT             high quality  │ requires OPENAI_API_KEY
 *   Tier 2 – Google Translate gtx   no key        │ very high daily limits
 *   Tier 3 – MyMemory               no key        │ 5 000 chars/day free
 *   Tier 4 – LibreTranslate         no key        │ public instances array
 *
 * All functions throw on failure so the route layer can catch and move on.
 */

const axios = require("axios");

// ─── Shared helpers ───────────────────────────────────────────────────────────

/** Promisified delay. */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Race a promise against a hard timeout.
 * @param {Promise} promise
 * @param {number}  ms
 * @param {string}  label
 */
function withTimeout(promise, ms, label = "call") {
  const timer = new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms)
  );
  return Promise.race([promise, timer]);
}

/**
 * Language name → ISO 639-1 code.
 * Accepts either a full name ("English", "Amharic") or a code ("en", "am").
 */
const LANG_NAME_TO_CODE = {
  english: "en", amharic: "am", french: "fr",  german: "de",
  arabic:  "ar", spanish: "es", portuguese: "pt", italian: "it",
  russian: "ru", chinese: "zh", japanese: "ja", korean: "ko",
  hindi:   "hi", swahili: "sw", turkish: "tr",  dutch: "nl",
  somali:  "so", tigrinya: "ti",
};

function resolveIsoCode(lang) {
  const lower = lang.trim().toLowerCase();
  if (/^[a-z]{2,3}(-[a-z]{2})?$/.test(lower)) return lower;
  return LANG_NAME_TO_CODE[lower] ?? lower;
}

// ─── Tier 1: OpenAI ───────────────────────────────────────────────────────────

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const OPENAI_MODEL   = "gpt-3.5-turbo";

/**
 * Translate via OpenAI Chat Completions.
 * Throws when OPENAI_API_KEY is absent or the call fails.
 */
async function callOpenAI(systemPrompt, userMessage, temperature = 0.2) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY not configured.");

  const response = await axios.post(
    OPENAI_API_URL,
    { model: OPENAI_MODEL, temperature,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user",   content: userMessage  },
      ],
    },
    {
      headers: { "Content-Type": "application/json",
                 Authorization: `Bearer ${apiKey}` },
      timeout: 30_000,
    }
  );

  const choice = response.data?.choices?.[0];
  if (!choice) throw new Error("Empty response from OpenAI.");
  return choice.message.content.trim();
}

// ─── Tier 2: Google Translate (unofficial gtx endpoint) ───────────────────────
//
// Uses the same endpoint the Google Translate web app calls.
// No API key required. Generous rate limits (thousands of requests/day).
// Amharic is fully supported (ISO code "am").
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Translate text via Google's unofficial gtx endpoint.
 * Splits text into ≤ 1 800-char chunks (well under the URL length limit).
 *
 * @param {string} text
 * @param {string} sourceLang – language name or ISO code
 * @param {string} targetLang – language name or ISO code
 * @returns {Promise<string>}
 */
async function callGoogleGtx(text, sourceLang, targetLang) {
  const sl = resolveIsoCode(sourceLang);
  const tl = resolveIsoCode(targetLang);

  const chunks   = splitText(text, 1800);
  const results  = [];

  for (const chunk of chunks) {
    const url =
      `https://translate.googleapis.com/translate_a/single` +
      `?client=gtx&sl=${sl}&tl=${tl}&dt=t` +
      `&q=${encodeURIComponent(chunk)}`;

    const response = await axios.get(url, {
      timeout: 8_000,
      validateStatus: () => true,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
          "AppleWebKit/537.36 (KHTML, like Gecko) " +
          "Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (response.status === 429) throw new Error("Google gtx rate limited (429).");
    if (response.status !== 200) throw new Error(`Google gtx HTTP ${response.status}`);

    // Response is a nested array: [[["translated","original",null,null,1],...],...]
    const data = response.data;
    if (!Array.isArray(data) || !Array.isArray(data[0])) {
      throw new Error("Google gtx returned unexpected response shape.");
    }

    const translated = data[0]
      .map((item) => (Array.isArray(item) ? item[0] : ""))
      .filter(Boolean)
      .join("");

    if (!translated) throw new Error("Google gtx returned empty translation.");
    results.push(translated);

    if (chunks.length > 1) await sleep(150);
  }

  return results.join(" ");
}

// ─── Tier 3: MyMemory ─────────────────────────────────────────────────────────
//
// Free tier: 5 000 chars/day anonymous, 50 000/day with MYMEMORY_EMAIL set.
// Amharic supported.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Translate via MyMemory with per-chunk retry + exponential back-off.
 *
 * @param {string} text
 * @param {string} sourceLang
 * @param {string} targetLang
 * @param {number} [timeoutMs=8000]  – Per-chunk HTTP timeout.
 */
async function callMyMemory(text, sourceLang, targetLang, timeoutMs = 8_000) {
  const langPair = `${resolveIsoCode(sourceLang)}|${resolveIsoCode(targetLang)}`;
  const chunks   = splitText(text, 300);
  const results  = [];

  for (const chunk of chunks) {
    const translated = await _myMemoryChunk(chunk, langPair, timeoutMs);
    results.push(translated);
    if (chunks.length > 1) await sleep(250);
  }

  return results.join(" ");
}

async function _myMemoryChunk(chunk, langPair, timeoutMs, attempt = 1) {
  const MAX = 3;
  try {
    const params = new URLSearchParams({ q: chunk, langpair: langPair });
    if (process.env.MYMEMORY_EMAIL) params.append("de", process.env.MYMEMORY_EMAIL);

    const res = await axios.get(
      `https://api.mymemory.translated.net/get?${params}`,
      { timeout: timeoutMs, validateStatus: () => true }
    );

    const { status, data } = res;
    const apiStatus = data?.responseStatus;
    const details   = (data?.responseDetails ?? "").toUpperCase();

    if (status === 429 || apiStatus === 429) {
      if (attempt >= MAX) throw new Error("MyMemory rate limit (429) — retries exhausted.");
      await sleep(600 * Math.pow(2, attempt - 1));
      return _myMemoryChunk(chunk, langPair, timeoutMs, attempt + 1);
    }
    if (details.includes("USED ALL AVAILABLE FREE TRANSLATIONS")) {
      throw new Error("MyMemory daily quota exhausted.");
    }
    if (apiStatus !== 200) {
      throw new Error(`MyMemory error ${apiStatus}: ${data?.responseDetails ?? "unknown"}`);
    }

    const translated = data.responseData?.translatedText;
    if (!translated) throw new Error("MyMemory empty translation.");
    return translated.trim();

  } catch (err) {
    const isRetryable =
      err.message.includes("429") ||
      err.code === "ECONNABORTED" ||
      err.code === "ETIMEDOUT";

    if (isRetryable && attempt < MAX) {
      await sleep(600 * Math.pow(2, attempt - 1));
      return _myMemoryChunk(chunk, langPair, timeoutMs, attempt + 1);
    }
    throw err;
  }
}

// ─── Tier 4: LibreTranslate public instances ──────────────────────────────────
//
// Key-free public mirrors. Tried in order; the first that responds wins.
// Amharic is not in every instance's language pack, so we verify the response
// isn't an error JSON before accepting it.
// ─────────────────────────────────────────────────────────────────────────────

const LIBRE_INSTANCES = [
  "https://translate.terraprint.co",
  "https://translate.argosopentech.com",
  "https://translate.cutie.dating",
  "https://translate.fedilab.app",
];

/**
 * Try each public LibreTranslate instance in order until one succeeds.
 *
 * @param {string} text
 * @param {string} sourceLang
 * @param {string} targetLang
 */
async function callLibreTranslate(text, sourceLang, targetLang) {
  const source = resolveIsoCode(sourceLang);
  const target = resolveIsoCode(targetLang);
  let lastErr;

  for (const base of LIBRE_INSTANCES) {
    try {
      const res = await axios.post(
        `${base}/translate`,
        { q: text, source, target, format: "text" },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 8_000,
          validateStatus: () => true,
        }
      );

      if (res.status === 429) {
        lastErr = new Error(`${base} rate limited.`);
        continue;
      }
      if (res.status !== 200) {
        lastErr = new Error(`${base} HTTP ${res.status}`);
        continue;
      }

      const translated = res.data?.translatedText;
      if (!translated) {
        lastErr = new Error(`${base} empty response.`);
        continue;
      }

      return translated.trim();
    } catch (err) {
      lastErr = err;
      // Try next instance
    }
  }

  throw lastErr ?? new Error("All LibreTranslate instances failed.");
}

// ─── Shared text splitter ─────────────────────────────────────────────────────

/**
 * Split text into chunks of at most maxLen chars, breaking on word boundaries.
 */
function splitText(text, maxLen) {
  if (text.length <= maxLen) return [text];
  const words   = text.split(" ");
  const chunks  = [];
  let   current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxLen && current) {
      chunks.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) chunks.push(current);
  return chunks;
}

module.exports = {
  callOpenAI,
  callGoogleGtx,
  callMyMemory,
  callLibreTranslate,
  resolveIsoCode,
  withTimeout,
  sleep,
};
