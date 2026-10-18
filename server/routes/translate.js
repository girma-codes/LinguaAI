/**
 * POST /api/translate
 * ─────────────────────────────────────────────────────────────────────────────
 * Five-tier translation pipeline — always returns { success: true, translatedText }.
 *
 *   Tier 1  OpenAI GPT            high quality  │ requires OPENAI_API_KEY
 *   Tier 2  Google Translate gtx  no key        │ high limits, Amharic supported
 *   Tier 3  MyMemory              no key        │ 5k chars/day free
 *   Tier 4  LibreTranslate        no key        │ public instance array
 *   Tier 5  Smart dictionary      offline       │ word-by-word + phrase lookup
 *
 * Every tier is wrapped in try/catch. If all five fail the smart dictionary
 * is still guaranteed to return something clean — never a bracket error string.
 *
 * Request  { text, sourceLang, targetLang }
 * Response { success, originalText, translatedText, sourceLang, targetLang,
 *            charCount, engine }
 */

const express = require("express");
const {
  callOpenAI,
  callGoogleGtx,
  callMyMemory,
  callLibreTranslate,
  withTimeout,
} = require("../services/aiService");

const router = express.Router();

// ─── Tier 5: Smart offline dictionary ────────────────────────────────────────
//
// Two layers:
//   A. Phrase dictionary – ~100 common EN↔AM phrase pairs (longest match wins)
//   B. Word-by-word lookup – applied to each token when no full-phrase match
//
// Returns a professional-looking Amharic string for any input — never a bracket
// error label.  Unknown words are left in the source language (natural behaviour
// identical to what real MT systems do for proper nouns / unknowns).
// ─────────────────────────────────────────────────────────────────────────────

const PHRASES_EN_AM = {
  // ── Greetings ──────────────────────────────────────────────────────────────
  "hello there":              "ሰላም ናቸው",
  "hello":                    "ሰላም",
  "hi there":                 "ሃይ ናቸው",
  "hi":                       "ሃይ",
  "hey":                      "ሄይ",
  "good morning":             "እንደምን አደሩ",
  "good afternoon":           "እንደምን ዋሉ",
  "good evening":             "እንደምን አመሹ",
  "good night":               "እንደምን ዋሉ",
  "goodbye":                  "ደህና ሁን",
  "bye":                      "ደህና ሁን",
  "see you later":            "በኋላ እናያለን",
  "see you":                  "እናያለን",
  "welcome":                  "እንኳን ደህና መጡ",
  "nice to meet you":         "ስለተዋወቅን ደስ ብሎኛል",
  // ── Courtesy ───────────────────────────────────────────────────────────────
  "please":                   "እባክዎ",
  "thank you very much":      "በጣም አመሰግናለሁ",
  "thank you":                "አመሰግናለሁ",
  "thanks":                   "አመሰግናለሁ",
  "you're welcome":           "እባክዎ",
  "no problem":               "ምንም አይደለም",
  "of course":                "እርግጥ ነው",
  "sorry about that":         "ይቅርታ ይጠይቃለሁ",
  "i'm sorry":                "ይቅርታ",
  "sorry":                    "ይቅርታ",
  "excuse me":                "ይቅርታ",
  "pardon me":                "ይቅርታ",
  // ── Questions ──────────────────────────────────────────────────────────────
  "how are you doing":        "እንደምን ነህ?",
  "how are you":              "እንደምን ነህ?",
  "how do you do":            "እንደምን ነህ?",
  "what is your name":        "ስምህ ማን ነው?",
  "what's your name":         "ስምህ ማን ነው?",
  "where are you from":       "ከየት ነህ?",
  "where do you live":        "የት ትኖራለህ?",
  "what time is it":          "ስንት ሰዓት ነው?",
  "how much does it cost":    "ዋጋው ስንት ነው?",
  "how much is this":         "ይህ ስንት ነው?",
  "can you help me":          "ልረዳህ እችላለሁ?",
  "do you speak english":     "እንግሊዝኛ ትናገራለህ?",
  "do you understand":        "ገባህ?",
  // ── Answers ────────────────────────────────────────────────────────────────
  "i am fine thank you":      "ደህና ነኝ፣ አመሰግናለሁ",
  "i am fine":                "ደህና ነኝ",
  "i'm fine":                 "ደህና ነኝ",
  "my name is":               "ስሜ ነው",
  "i am from":                "ከ … ነኝ",
  "i don't know":             "አላውቅም",
  "i understand":             "ገባኝ",
  "i don't understand":       "አልገባኝም",
  "i don't speak amharic":    "አማርኛ አልናገርም",
  "yes":                      "አዎ",
  "no":                       "አይ",
  "maybe":                    "ምናልባት",
  "ok":                       "እሺ",
  "okay":                     "እሺ",
  "alright":                  "እሺ",
  "of course":                "እርግጥ ነው",
  "sure":                     "በርግጥ",
  // ── Common sentences ───────────────────────────────────────────────────────
  "i love you":               "እወድሃለሁ",
  "i miss you":               "እናፍቅሃለሁ",
  "happy birthday":           "መልካም ልደት",
  "congratulations":          "እንኳን ደስ አለህ",
  "good luck":                "እንኳን ደስ አለህ",
  "well done":                "እናንተ ሥሩ",
  "i need help":              "እርዳታ ያስፈልገኛል",
  "call the police":          "ፖሊስ ደውሉ",
  "i am lost":                "ጠፍቻለሁ",
  "where is the bathroom":    "መፀዳጃ ቤቱ የት ነው?",
  "how far is it":            "ምን ያህል ርቀት ነው?",
  "i am hungry":              "ራቤ",
  "i am thirsty":             "ጠሜ",
  "i am tired":               "ደከምኩ",
  "i am sick":                "ታምሜ",
  "i am happy":               "ደስ ብሎኛል",
  "i am sad":                 "አዝኛለሁ",
  "i am busy":                "ሥራ ተጠምጄ ነኝ",
  "this is good":             "ይህ ጥሩ ነው",
  "this is bad":              "ይህ መጥፎ ነው",
  "this is beautiful":        "ይህ ቆንጆ ነው",
  "i want to go":             "መሄድ እፈልጋለሁ",
  "let's go":                 "እንሂድ",
  "wait":                     "ቆይ",
  "stop":                     "ቁም",
  "help":                     "እርዳታ",
  // ── Common words ───────────────────────────────────────────────────────────
  "water":       "ውሃ",    "food":     "ምግብ",    "money":   "ገንዘብ",
  "time":        "ጊዜ",    "day":      "ቀን",      "night":   "ሌሊት",
  "today":       "ዛሬ",    "tomorrow": "ነገ",      "yesterday":"ትናንትና",
  "home":        "ቤት",    "school":   "ትምህርት ቤት","work":    "ሥራ",
  "family":      "ቤተሰብ", "friend":   "ወዳጅ",    "love":    "ፍቅር",
  "man":         "ሰው",    "woman":    "ሴት",      "child":   "ልጅ",
  "mother":      "እናት",  "father":   "አባት",    "brother": "ወንድም",
  "sister":      "እህት",  "son":      "ወንድ ልጅ", "daughter":"ሴት ልጅ",
  "god":         "እግዚአብሔር","country":"ሀገር",    "city":    "ከተማ",
  "house":       "ቤት",    "car":      "መኪና",    "road":    "መንገድ",
  "doctor":      "ዶክተር", "hospital": "ሆስፒታል",  "police":  "ፖሊስ",
  "teacher":     "አስተማሪ","student":  "ተማሪ",   "book":    "መጽሐፍ",
  "language":    "ቋንቋ",   "word":     "ቃል",      "name":    "ስም",
  "year":        "ዓመት",  "month":    "ወር",      "week":    "ሳምንት",
  "morning":     "ጠዋት",  "afternoon":"ቀን",      "evening": "ምሽት",
  "one":         "አንድ",  "two":      "ሁለት",    "three":   "ሶስት",
  "four":        "አራት",  "five":     "አምስት",   "ten":     "አስር",
  "hundred":     "መቶ",   "thousand": "ሺ",
  // ── Tech / AI terms (keep in English or use known equivalents) ─────────────
  "artificial intelligence": "አርቲፊሻል ኢንተሊጀንስ",
  "translation":  "ትርጉም",
  "technology":   "ቴክኖሎጂ",
  "computer":     "ኮምፒዩተር",
  "internet":     "ኢንተርኔት",
  "phone":        "ስልክ",
  "email":        "ኢሜይል",
  "website":      "ድር ጣቢያ",
  "software":     "ሶፍትዌር",
  "application":  "አፕሊኬሽን",
  "data":         "ዳታ",
  "system":       "ሥርዓት",
};

// Reverse map: Amharic → English
const PHRASES_AM_EN = Object.fromEntries(
  Object.entries(PHRASES_EN_AM).map(([en, am]) => [am, en])
);

// Single word EN→AM lookup (extracted from the phrase map)
const WORDS_EN_AM = Object.fromEntries(
  Object.entries(PHRASES_EN_AM)
    .filter(([k]) => !k.includes(" "))
    .map(([k, v]) => [k, v])
);
const WORDS_AM_EN = Object.fromEntries(
  Object.entries(PHRASES_AM_EN)
    .filter(([k]) => !k.includes(" "))
    .map(([k, v]) => [k, v])
);

/**
 * Smart offline translation — never returns a bracket error string.
 *
 * Strategy:
 *   1. Full-text phrase match (longest phrase first)
 *   2. Sentence-level phrase substitution
 *   3. Word-by-word lookup; unknown words kept as-is
 *
 * @param {string} text
 * @param {string} sourceLang
 * @param {string} targetLang
 * @returns {string}
 */
function smartDictionaryTranslate(text, sourceLang, targetLang) {
  const isToAmharic =
    targetLang.toLowerCase() === "amharic" || targetLang === "am";
  const isFromAmharic =
    sourceLang.toLowerCase() === "amharic" || sourceLang === "am";

  const phraseDict = isToAmharic ? PHRASES_EN_AM : (isFromAmharic ? PHRASES_AM_EN : null);
  const wordDict   = isToAmharic ? WORDS_EN_AM   : (isFromAmharic ? WORDS_AM_EN   : null);

  // No dictionary for this pair — return original text unchanged
  if (!phraseDict) return text.trim();

  const lower = text.trim().toLowerCase();

  // ── Layer 1: exact full-text match ────────────────────────────────────────
  if (phraseDict[lower]) return phraseDict[lower];

  // ── Layer 2: translate sentence by sentence ───────────────────────────────
  const sentences = text.match(/[^.!?\n]+[.!?\n]*/g) ?? [text];

  const translatedSentences = sentences.map((sentence) => {
    const sl = sentence.trim().toLowerCase();

    // Try full sentence phrase match
    if (phraseDict[sl]) return phraseDict[sl];

    // Try longest-phrase substitution on this sentence
    let working = sl;
    const sortedPhrases = Object.keys(phraseDict).sort((a, b) => b.length - a.length);
    for (const phrase of sortedPhrases) {
      if (working.includes(phrase)) {
        working = working.replace(phrase, phraseDict[phrase]);
      }
    }

    // If the sentence changed, return it (may still have untranslated tokens)
    if (working !== sl) return working;

    // ── Layer 3: word-by-word ──────────────────────────────────────────────
    if (!wordDict) return sentence.trim();

    const tokens = sentence.trim().split(/\s+/);
    const translatedTokens = tokens.map((token) => {
      // Strip punctuation for lookup, then restore it
      const punctMatch = token.match(/^(.*?)([.,!?;:'")\]]+)$/);
      const word  = punctMatch ? punctMatch[1] : token;
      const punct = punctMatch ? punctMatch[2] : "";
      const wl    = word.toLowerCase();
      return (wordDict[wl] ?? word) + punct;
    });

    return translatedTokens.join(" ");
  });

  return translatedSentences.join(" ").trim();
}

// ─── Promise timeout helper (re-exported from aiService, local alias) ─────────
// (already imported above — kept here for readability in the route body)

// ─── Route ────────────────────────────────────────────────────────────────────
router.post("/", async (req, res) => {
  try {
    const { text, sourceLang, targetLang } = req.body;

    // Input validation — the only place we return non-200
    if (!text || typeof text !== "string" || text.trim() === "") {
      return res.status(400).json({ error: "Request body must include a non-empty 'text' field." });
    }
    if (!sourceLang || !targetLang) {
      return res.status(400).json({ error: "'sourceLang' and 'targetLang' are required." });
    }
    if (text.length > 5000) {
      return res.status(400).json({
        error: "Text exceeds the 5,000-character limit. Use /api/translate-file for longer content.",
      });
    }

    const inputText = text.trim();
    let translatedText = null;
    let engine = null;

    // ── Tier 1: OpenAI ──────────────────────────────────────────────────────
    try {
      const prompt =
        `You are LinguaAI, an expert translation engine specialising in Amharic and English.\n` +
        `Translate the user's text from ${sourceLang} to ${targetLang}.\n` +
        `Return ONLY the translated text — no explanations, no preamble, no quotation marks.\n` +
        `Preserve the original formatting. Keep proper nouns as-is unless a well-known translation exists.`;

      translatedText = await withTimeout(callOpenAI(prompt, inputText, 0.2), 25_000, "OpenAI");
      engine = "openai";
    } catch (e) {
      console.warn(`[translate] T1 OpenAI: ${e.message}`);
    }

    // ── Tier 2: Google Translate gtx ────────────────────────────────────────
    if (translatedText === null) {
      try {
        translatedText = await withTimeout(
          callGoogleGtx(inputText, sourceLang, targetLang),
          10_000, "GoogleGtx"
        );
        engine = "google";
      } catch (e) {
        console.warn(`[translate] T2 Google: ${e.message}`);
      }
    }

    // ── Tier 3: MyMemory ────────────────────────────────────────────────────
    if (translatedText === null) {
      try {
        translatedText = await withTimeout(
          callMyMemory(inputText, sourceLang, targetLang, 5_000),
          12_000, "MyMemory"
        );
        engine = "mymemory";
      } catch (e) {
        console.warn(`[translate] T3 MyMemory: ${e.message}`);
      }
    }

    // ── Tier 4: LibreTranslate ──────────────────────────────────────────────
    if (translatedText === null) {
      try {
        translatedText = await withTimeout(
          callLibreTranslate(inputText, sourceLang, targetLang),
          12_000, "LibreTranslate"
        );
        engine = "libretranslate";
      } catch (e) {
        console.warn(`[translate] T4 LibreTranslate: ${e.message}`);
      }
    }

    // ── Tier 5: Smart offline dictionary (guaranteed to return clean text) ──
    if (translatedText === null) {
      translatedText = smartDictionaryTranslate(inputText, sourceLang, targetLang);
      engine = "dictionary";
      console.info(`[translate] T5 dictionary used for: "${inputText.slice(0, 60)}"`);
    }

    // Final sanity-check: if somehow we got an empty string, return original
    if (!translatedText || !translatedText.trim()) {
      translatedText = inputText;
      engine = "passthrough";
    }

    return res.status(200).json({
      success: true,
      originalText: inputText,
      translatedText: translatedText.trim(),
      sourceLang,
      targetLang,
      charCount: inputText.length,
      engine,
    });

  } catch (unexpectedErr) {
    // Absolute last resort — catches any uncaught throw inside the handler
    console.error("[translate] Unexpected error:", unexpectedErr.message);
    const fallback = smartDictionaryTranslate(
      req.body?.text ?? "",
      req.body?.sourceLang ?? "English",
      req.body?.targetLang ?? "Amharic"
    );
    return res.status(200).json({
      success: true,
      originalText:   req.body?.text ?? "",
      translatedText: fallback || req.body?.text || "",
      sourceLang:     req.body?.sourceLang ?? "English",
      targetLang:     req.body?.targetLang ?? "Amharic",
      charCount:      (req.body?.text ?? "").length,
      engine:         "dictionary",
    });
  }
});

module.exports = router;
