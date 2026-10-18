/**
 * api.js — Central API configuration
 * ─────────────────────────────────────────────────────────────────────────────
 * All backend fetch URLs are derived from this single constant.
 *
 * How it works:
 *   - In development (Vite dev server) the Vite proxy rewrites any request
 *     that starts with /api to http://localhost:5000, so we use a relative
 *     base path of "" (empty string). This means fetch('/api/translate')
 *     goes through the proxy → Express on port 5000.
 *
 *   - The VITE_API_BASE_URL environment variable overrides this for any
 *     environment where the proxy is not in use (e.g. a deployed frontend
 *     talking to a separate backend host).
 *
 * Usage:
 *   import { API_BASE, endpoints } from '../config/api'
 *   fetch(`${API_BASE}/api/translate`, { ... })
 *   // or more conveniently:
 *   fetch(endpoints.translate, { ... })
 */

/**
 * Base URL for all backend API requests.
 *
 * Priority:
 *   1. VITE_API_BASE_URL env var (set in .env or deployment config)
 *   2. Empty string ""  → Vite dev proxy handles /api/* routing
 */
export const API_BASE =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ?? "";

/**
 * Fully-qualified endpoint paths.
 * Always import from here — never hardcode URLs in components.
 */
export const endpoints = {
  translate:          `${API_BASE}/api/translate`,
  translateFile:      `${API_BASE}/api/translate-file`,
  translateFileDownload: (fileName) =>
    `${API_BASE}/api/translate-file/download?file=${encodeURIComponent(fileName)}`,
  dictionary:         `${API_BASE}/api/dictionary`,
  writeAssist:        `${API_BASE}/api/write-assist`,
  health:             `${API_BASE}/api/health`,
};
