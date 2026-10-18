import { useState, useRef, useCallback, useEffect } from 'react'
import { endpoints } from '../config/api'

// Icons
const FileIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)

const TextIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h8" />
  </svg>
)

const MicIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 016 0v6a3 3 0 01-3 3z" />
  </svg>
)

const ApiIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
)

const UploadIcon = () => (
  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
  </svg>
)

const SwapIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
  </svg>
)

const CopyIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
)

const VolumeIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
)

const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
)

const tabs = [
  { id: 'files', label: 'Translate files', icon: FileIcon },
  { id: 'text', label: 'Translate text', icon: TextIcon },
  { id: 'speech', label: 'Translate speech', icon: MicIcon },
  { id: 'api', label: 'Use API', icon: ApiIcon },
]

const AMHARIC_PLACEHOLDER = 'ለመተርጎም ጽሑፍ ያስገቡ...'
const ENGLISH_PLACEHOLDER = 'Enter text to translate...'

// ── Download icon ──────────────────────────────────────────────────────────────
const DownloadIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
)

// ── X / close icon ─────────────────────────────────────────────────────────────
const XIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
)

// -------- Translate Files Tab --------
function TranslateFilesTab() {
  const [dragging, setDragging]         = useState(false)
  const [files, setFiles]               = useState([])
  const [sourceLang, setSourceLang]     = useState('English')
  const [targetLang, setTargetLang]     = useState('Amharic')
  const [isTranslating, setIsTranslating] = useState(false)
  const [result, setResult]             = useState(null)   // { translatedText, fileName, engine, charCount }
  const [error, setError]               = useState('')
  const [copied, setCopied]             = useState(false)
  const inputRef = useRef()

  const LANG_OPTIONS = [
    { value: 'English', flag: '🇬🇧' },
    { value: 'Amharic', flag: '🇪🇹' },
    { value: 'French',  flag: '🇫🇷' },
    { value: 'German',  flag: '🇩🇪' },
    { value: 'Arabic',  flag: '🇸🇦' },
  ]

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragging(false)
    const dropped = Array.from(e.dataTransfer.files)
    setFiles((prev) => [...prev, ...dropped])
    setResult(null)
    setError('')
  }, [])

  const handleDragOver  = (e) => { e.preventDefault(); setDragging(true) }
  const handleDragLeave = () => setDragging(false)

  const handleFileInput = (e) => {
    setFiles((prev) => [...prev, ...Array.from(e.target.files)])
    setResult(null)
    setError('')
  }

  const removeFile = (idx) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx))
    setResult(null)
    setError('')
  }

  const formatSize = (bytes) => {
    if (bytes < 1024)    return bytes + ' B'
    if (bytes < 1048576) return (bytes / 1024).toFixed(1)   + ' KB'
    return (bytes / 1048576).toFixed(1) + ' MB'
  }

  // ── Translate handler ────────────────────────────────────────────────────────
  const handleTranslate = async () => {
    if (files.length === 0) return
    setIsTranslating(true)
    setResult(null)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', files[0])
      formData.append('sourceLang', sourceLang)
      formData.append('targetLang', targetLang)

      let data
      try {
        const response = await fetch(endpoints.translateFile, {
          method: 'POST',
          body: formData,
          // Do NOT set Content-Type — browser sets multipart boundary automatically
        })
        data = await response.json()

        if (!response.ok) {
          setError(data.error ?? 'Translation failed. Please try again.')
          return
        }
      } catch (networkErr) {
        setError('Could not reach the translation server. Make sure the backend is running on port 5000.')
        return
      }

      if (data.success && data.translatedText) {
        setResult(data)  // data includes: translatedText, fileName, engine, charCount, chunksFailed, warning
      } else {
        setError(data.error ?? 'Unexpected response from server. Please try again.')
      }
    } catch (unexpectedErr) {
      // Catch-all so UI never breaks regardless of what goes wrong
      setError('Something went wrong. Please refresh and try again.')
      console.error('[translate-file]', unexpectedErr)
    } finally {
      setIsTranslating(false)
    }
  }

  // ── Download: trigger the backend download endpoint ──────────────────────────
  const handleDownload = () => {
    if (!result?.fileName) return
    const url = endpoints.translateFileDownload(result.fileName)
    const a = document.createElement('a')
    a.href = url
    a.download = result.fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  // ── Copy translated text to clipboard ────────────────────────────────────────
  const handleCopy = () => {
    if (!result?.translatedText) return
    navigator.clipboard.writeText(result.translatedText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const resetAll = () => {
    setFiles([])
    setResult(null)
    setError('')
  }

  return (
    <div className="tab-content">

      {/* ── If we have a translation result, show the preview panel ── */}
      {result ? (
        <div className="p-6 lg:p-8 space-y-5">
          {/* Header row */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-green-500/15 flex items-center justify-center text-green-400 flex-shrink-0">
                <CheckIcon />
              </span>
              <span className="text-lingua-text font-semibold text-sm">
                Translation complete
              </span>
              <span className="px-2 py-0.5 rounded-full bg-lingua-surface border border-lingua-border/50 text-lingua-muted text-xs">
                via {result.engine === 'openai' ? 'OpenAI' : 'MyMemory'}
              </span>
            </div>
            <button
              onClick={resetAll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-lingua-surface border border-lingua-border/50 text-lingua-muted hover:text-lingua-text text-xs font-medium transition-colors"
            >
              <XIcon /> Translate another file
            </button>
          </div>

          {/* Language + file meta */}
          <div className="flex items-center gap-3 text-xs text-lingua-muted flex-wrap">
            <span className="font-medium text-lingua-subtext">{sourceLang}</span>
            <span>→</span>
            <span className="font-medium text-lingua-subtext">{targetLang}</span>
            <span className="text-lingua-border">·</span>
            <span>{files[0]?.name}</span>
            <span className="text-lingua-border">·</span>
            <span>{result.charCount?.toLocaleString()} chars</span>
            {result.chunksTotal && (
              <>
                <span className="text-lingua-border">·</span>
                <span>{result.chunksTotal} chunks</span>
              </>
            )}
          </div>

          {/* Partial-failure warning — shown only when some chunks fell back */}
          {result.chunksFailed > 0 && (
            <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs leading-relaxed">
              <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
              <span>
                {result.chunksFailed} of {result.chunksTotal} section{result.chunksTotal > 1 ? 's' : ''} hit a rate limit and kept the original text.
                The rest translated successfully. You can still download the file.
              </span>
            </div>
          )}

          {/* Translation preview box */}
          <div className="rounded-2xl border border-lingua-border/60 bg-lingua-surface/40 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-lingua-border/50 bg-lingua-surface/60">
              <span className="text-lingua-muted text-xs font-medium">
                Translation preview — {targetLang}
              </span>
              <span className="text-lingua-muted/60 text-xs">
                {result.translatedText.length.toLocaleString()} chars
              </span>
            </div>
            <div
              className="p-4 max-h-64 overflow-y-auto text-lingua-text text-sm leading-relaxed whitespace-pre-wrap"
              dir={targetLang === 'Amharic' || targetLang === 'Arabic' ? 'rtl' : 'ltr'}
            >
              {result.translatedText}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={handleDownload}
              className="btn-primary flex items-center gap-2 py-2.5 px-5 shadow-lg shadow-lingua-blue/25 hover:scale-[1.02] transition-transform"
            >
              <DownloadIcon />
              Download translated file
            </button>
            <button
              onClick={handleCopy}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all
                ${copied
                  ? 'bg-green-500/15 text-green-400 border-green-500/30'
                  : 'bg-lingua-surface text-lingua-muted hover:text-lingua-text border-lingua-border/50'
                }`}
            >
              {copied ? <><CheckIcon /> Copied!</> : <><CopyIcon /> Copy text</>}
            </button>
          </div>
        </div>

      ) : (
        /* ── Default upload + options panel ── */
        <div className="grid lg:grid-cols-2 gap-0 min-h-[320px]">

          {/* Left — drop zone + file list */}
          <div className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-lingua-border/60 flex flex-col gap-4">

            {/* Drop zone */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => inputRef.current?.click()}
              className={`
                relative flex flex-col items-center justify-center min-h-[180px] rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300 group
                ${dragging
                  ? 'border-lingua-blue bg-lingua-blue/5 scale-[1.01]'
                  : 'border-lingua-border/60 hover:border-lingua-blue/50 hover:bg-lingua-blue/3'
                }
              `}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,.docx,.txt"
                className="hidden"
                onChange={handleFileInput}
              />
              <div className={`mb-3 transition-colors duration-300 ${dragging ? 'text-lingua-blue' : 'text-lingua-border group-hover:text-lingua-muted'}`}>
                <UploadIcon />
              </div>
              <p className="text-lingua-text font-semibold text-sm mb-1">
                {dragging ? 'Drop your file here' : 'Drag & drop a file here'}
              </p>
              <p className="text-lingua-muted text-xs text-center px-4">
                or <span className="text-lingua-blue-light underline underline-offset-2">browse</span> to upload
              </p>
              <p className="text-lingua-muted/60 text-xs mt-2">PDF · DOCX · TXT — max 10 MB</p>

              {dragging && (
                <div className="absolute inset-0 rounded-2xl border-2 border-lingua-blue bg-lingua-blue/5 flex items-center justify-center">
                  <p className="text-lingua-blue font-semibold">Release to upload</p>
                </div>
              )}
            </div>

            {/* File list */}
            {files.length > 0 && (
              <div className="space-y-2">
                {files.map((file, idx) => (
                  <div key={idx} className="flex items-center gap-3 px-3 py-2 bg-lingua-surface rounded-xl border border-lingua-border/40">
                    <div className="w-7 h-7 rounded-lg bg-lingua-blue/10 flex items-center justify-center flex-shrink-0 text-lingua-blue">
                      <FileIcon />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-lingua-text text-xs font-medium truncate">{file.name}</p>
                      <p className="text-lingua-muted text-xs">{formatSize(file.size)}</p>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); removeFile(idx) }}
                      className="text-lingua-muted hover:text-red-400 transition-colors p-1"
                      aria-label="Remove file"
                    >
                      <XIcon />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs leading-relaxed">
                {error}
              </div>
            )}
          </div>

          {/* Right — language options + translate button */}
          <div className="p-6 lg:p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-lingua-text font-bold text-xl mb-2 leading-snug">
                Document translation
              </h3>
              <p className="text-lingua-subtext text-sm leading-relaxed mb-5">
                Upload a PDF, Word, or plain-text document and get the full
                translated content back in seconds.
              </p>

              {/* Language selectors */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1">
                  <label className="text-lingua-muted text-xs mb-1.5 block">From</label>
                  <select
                    value={sourceLang}
                    onChange={(e) => setSourceLang(e.target.value)}
                    className="w-full bg-lingua-surface border border-lingua-border text-lingua-text text-sm rounded-xl px-3 py-2.5 outline-none focus:border-lingua-blue/50 transition-colors"
                  >
                    {LANG_OPTIONS.map((l) => (
                      <option key={l.value} value={l.value}>{l.flag} {l.value}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="text-lingua-muted text-xs mb-1.5 block">To</label>
                  <select
                    value={targetLang}
                    onChange={(e) => setTargetLang(e.target.value)}
                    className="w-full bg-lingua-surface border border-lingua-border text-lingua-text text-sm rounded-xl px-3 py-2.5 outline-none focus:border-lingua-blue/50 transition-colors"
                  >
                    {LANG_OPTIONS.map((l) => (
                      <option key={l.value} value={l.value}>{l.flag} {l.value}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Feature bullets */}
              <ul className="space-y-2">
                {[
                  'Amharic ↔ English & more languages',
                  'Powered by OpenAI + MyMemory fallback',
                  'Instant preview before downloading',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-lingua-subtext text-xs">
                    <span className="w-4 h-4 rounded-full bg-lingua-blue/15 flex items-center justify-center flex-shrink-0 text-lingua-blue">
                      <CheckIcon />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Translate button */}
            <button
              onClick={handleTranslate}
              disabled={files.length === 0 || isTranslating}
              className={`mt-6 btn-primary w-full py-3 flex items-center justify-center gap-2.5 transition-all duration-200
                ${files.length === 0 || isTranslating
                  ? 'opacity-50 cursor-not-allowed'
                  : 'shadow-lg shadow-lingua-blue/25 hover:scale-[1.02]'
                }`}
            >
              {isTranslating ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Translating document...
                </>
              ) : (
                files.length > 0
                  ? `Translate ${files.length} file${files.length > 1 ? 's' : ''}`
                  : 'Upload a file to translate'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// -------- Translate Text Tab --------
function TranslateTextTab() {
  const [sourceLang, setSourceLang] = useState('en')
  const [targetLang, setTargetLang] = useState('am')
  const [sourceText, setSourceText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [isTranslating, setIsTranslating] = useState(false)
  const [copied, setCopied] = useState(false)

  const langs = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'am', label: 'Amharic', flag: '🇪🇹' },
    { code: 'fr', label: 'French', flag: '🇫🇷' },
    { code: 'de', label: 'German', flag: '🇩🇪' },
    { code: 'ar', label: 'Arabic', flag: '🇸🇦' },
  ]

  const getLang = (code) => langs.find((l) => l.code === code)

  const handleSwap = () => {
    setSourceLang(targetLang)
    setTargetLang(sourceLang)
    setSourceText(translatedText)
    setTranslatedText(sourceText)
  }

  const handleTranslate = async () => {
    if (!sourceText.trim()) return
    setIsTranslating(true)
    setTranslatedText('')

    try {
      const response = await fetch(endpoints.translate, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: sourceText.trim(),
          // Send the full language name the backend expects (e.g. "English", "Amharic")
          sourceLang: getLang(sourceLang)?.label ?? sourceLang,
          targetLang: getLang(targetLang)?.label ?? targetLang,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Surface the backend error message in the output area
        setTranslatedText(`Error: ${data.error ?? 'Translation failed. Please try again.'}`)
        return
      }

      if (data.success && data.translatedText) {
        setTranslatedText(data.translatedText)
      } else {
        setTranslatedText('Translation failed. Please try again.')
      }
    } catch (err) {
      // Network error (server not running, CORS issue, etc.)
      setTranslatedText('Could not reach the translation server. Make sure the backend is running on port 5000.')
    } finally {
      setIsTranslating(false)
    }
  }

  const handleCopy = () => {
    if (!translatedText) return
    navigator.clipboard.writeText(translatedText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const charCount = sourceText.length
  const MAX_CHARS = 5000

  return (
    <div className="tab-content">
      {/* Language Selector Bar */}
      <div className="flex items-center gap-2 px-4 pt-4 pb-3 border-b border-lingua-border/60">
        {/* Source lang */}
        <div className="flex items-center gap-1 flex-1 overflow-x-auto pb-1 scrollbar-hide">
          {langs.map((l) => (
            <button
              key={l.code}
              onClick={() => setSourceLang(l.code)}
              className={`lang-btn text-xs flex-shrink-0 ${sourceLang === l.code ? 'bg-lingua-surface text-lingua-text border border-lingua-border' : 'text-lingua-muted hover:text-lingua-subtext'}`}
            >
              <span>{l.flag}</span> {l.label}
            </button>
          ))}
        </div>

        {/* Swap button */}
        <button
          onClick={handleSwap}
          className="flex-shrink-0 w-9 h-9 rounded-xl bg-lingua-surface border border-lingua-border text-lingua-muted hover:text-lingua-blue hover:border-lingua-blue/50 transition-all flex items-center justify-center"
          title="Swap languages"
        >
          <SwapIcon />
        </button>

        {/* Target lang */}
        <div className="flex items-center gap-1 flex-1 overflow-x-auto pb-1 scrollbar-hide justify-end">
          {langs.map((l) => (
            <button
              key={l.code}
              onClick={() => setTargetLang(l.code)}
              className={`lang-btn text-xs flex-shrink-0 ${targetLang === l.code ? 'bg-lingua-surface text-lingua-text border border-lingua-border' : 'text-lingua-muted hover:text-lingua-subtext'}`}
            >
              <span>{l.flag}</span> {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Text Areas */}
      <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-lingua-border/60">
        {/* Source */}
        <div className="relative p-5">
          <textarea
            className="translator-input min-h-[180px] max-h-[280px]"
            placeholder={sourceLang === 'am' ? AMHARIC_PLACEHOLDER : ENGLISH_PLACEHOLDER}
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value.slice(0, MAX_CHARS))}
            dir={sourceLang === 'am' || sourceLang === 'ar' ? 'rtl' : 'ltr'}
          />
          <div className="flex items-center justify-between mt-3">
            <span className={`text-xs ${charCount > MAX_CHARS * 0.9 ? 'text-amber-400' : 'text-lingua-muted/60'}`}>
              {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()}
            </span>
            <button
              onClick={handleTranslate}
              disabled={!sourceText.trim() || isTranslating}
              className={`btn-primary py-2 px-5 flex items-center gap-2 text-xs ${!sourceText.trim() ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              {isTranslating ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Translating...
                </>
              ) : 'Translate'}
            </button>
          </div>
        </div>

        {/* Target */}
        <div className="relative p-5 bg-lingua-surface/30">
          {isTranslating ? (
            <div className="min-h-[180px] flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-lingua-border border-t-lingua-blue rounded-full animate-spin" />
                <p className="text-lingua-muted text-sm">Translating with AI...</p>
              </div>
            </div>
          ) : (
            <div
              className={`min-h-[180px] text-base leading-relaxed ${translatedText ? 'text-lingua-text' : 'text-lingua-muted/40'}`}
              dir={targetLang === 'am' || targetLang === 'ar' ? 'rtl' : 'ltr'}
            >
              {translatedText || (getLang(targetLang)?.label === 'Amharic' ? 'ትርጉም እዚህ ይታያል...' : 'Translation will appear here...')}
            </div>
          )}

          {/* Actions */}
          {translatedText && !isTranslating && (
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={handleCopy}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${copied ? 'bg-green-500/15 text-green-400 border border-green-500/30' : 'bg-lingua-surface text-lingua-muted hover:text-lingua-text border border-lingua-border/50'}`}
              >
                {copied ? <><CheckIcon /> Copied!</> : <><CopyIcon /> Copy</>}
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-lingua-surface text-lingua-muted hover:text-lingua-text border border-lingua-border/50 text-xs font-medium transition-all">
                <VolumeIcon /> Listen
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// -------- Translate Speech Tab --------
function TranslateSpeechTab() {
  // ── State ──────────────────────────────────────────────────────────────────
  const [sourceLang, setSourceLang] = useState('en')
  const [targetLang, setTargetLang] = useState('am')
  const [status, setStatus]         = useState('idle')       // 'idle' | 'requesting' | 'recording' | 'translating' | 'done' | 'error'
  const [spokenText, setSpokenText] = useState('')           // live transcript
  const [interimText, setInterimText] = useState('')         // in-progress transcript
  const [translatedText, setTranslatedText] = useState('')
  const [toast, setToast]           = useState('')           // permission / error message
  const [copied, setCopied]         = useState(false)
  const [audioLevel, setAudioLevel] = useState(0)            // 0-100, drives waveform bars

  // ── Refs ───────────────────────────────────────────────────────────────────
  const recognitionRef  = useRef(null)
  const audioCtxRef     = useRef(null)
  const analyserRef     = useRef(null)
  const micStreamRef    = useRef(null)
  const animFrameRef    = useRef(null)
  const toastTimerRef   = useRef(null)

  // ── Language map ───────────────────────────────────────────────────────────
  const LANGS = [
    { code: 'en', label: 'English', srCode: 'en-US', flag: '🇬🇧' },
    { code: 'am', label: 'Amharic', srCode: 'am-ET', flag: '🇪🇹' },
    { code: 'fr', label: 'French',  srCode: 'fr-FR', flag: '🇫🇷' },
    { code: 'de', label: 'German',  srCode: 'de-DE', flag: '🇩🇪' },
    { code: 'ar', label: 'Arabic',  srCode: 'ar-SA', flag: '🇸🇦' },
  ]
  const getLang = (code) => LANGS.find((l) => l.code === code)

  // ── Toast helper ───────────────────────────────────────────────────────────
  const showToast = (msg) => {
    setToast(msg)
    clearTimeout(toastTimerRef.current)
    toastTimerRef.current = setTimeout(() => setToast(''), 4000)
  }

  // ── Audio analyser for animated waveform bars ──────────────────────────────
  const startAudioLevel = (stream) => {
    try {
      audioCtxRef.current  = new (window.AudioContext || window.webkitAudioContext)()
      analyserRef.current  = audioCtxRef.current.createAnalyser()
      analyserRef.current.fftSize = 64
      const source = audioCtxRef.current.createMediaStreamSource(stream)
      source.connect(analyserRef.current)

      const tick = () => {
        const buf = new Uint8Array(analyserRef.current.frequencyBinCount)
        analyserRef.current.getByteFrequencyData(buf)
        const avg = buf.reduce((s, v) => s + v, 0) / buf.length
        setAudioLevel(Math.min(100, (avg / 128) * 100))
        animFrameRef.current = requestAnimationFrame(tick)
      }
      animFrameRef.current = requestAnimationFrame(tick)
    } catch (_) {
      // AudioContext not critical — waveform just won't animate
    }
  }

  const stopAudioLevel = () => {
    cancelAnimationFrame(animFrameRef.current)
    setAudioLevel(0)
    try {
      audioCtxRef.current?.close()
    } catch (_) {}
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((t) => t.stop())
      micStreamRef.current = null
    }
  }

  // ── Translate recognized text via backend ──────────────────────────────────
  const translateText = async (text) => {
    if (!text.trim()) return
    setStatus('translating')
    try {
      const res  = await fetch(endpoints.translate, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          sourceLang: getLang(sourceLang)?.label ?? sourceLang,
          targetLang: getLang(targetLang)?.label ?? targetLang,
        }),
      })
      const data = await res.json()
      if (data.success && data.translatedText) {
        setTranslatedText(data.translatedText)
        setStatus('done')
      } else {
        throw new Error(data.error ?? 'Translation failed')
      }
    } catch (err) {
      showToast(`Translation error: ${err.message}`)
      setStatus('error')
    }
  }

  // ── Start recording ────────────────────────────────────────────────────────
  const startRecording = async () => {
    setStatus('requesting')
    setSpokenText('')
    setInterimText('')
    setTranslatedText('')

    // ── Check browser support ────────────────────────────────────────────────
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) {
      showToast('Speech recognition is not supported in this browser. Try Chrome or Edge.')
      setStatus('idle')
      return
    }

    // ── Request microphone permission (gives us the stream for the analyser) ─
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      micStreamRef.current = stream
      startAudioLevel(stream)
    } catch (err) {
      const msg =
        err.name === 'NotAllowedError'
          ? 'Microphone access was blocked. Please allow microphone access in your browser settings and try again.'
          : err.name === 'NotFoundError'
          ? 'No microphone found. Please connect a microphone and try again.'
          : `Microphone error: ${err.message}`
      showToast(msg)
      setStatus('idle')
      return
    }

    // ── Configure SpeechRecognition ──────────────────────────────────────────
    const recognition = new SR()
    recognitionRef.current = recognition

    recognition.lang        = getLang(sourceLang)?.srCode ?? 'en-US'
    recognition.continuous  = true   // keep listening until user stops
    recognition.interimResults = true

    recognition.onstart = () => setStatus('recording')

    recognition.onresult = (event) => {
      let finalText   = ''
      let interimBuf  = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalText += transcript + ' '
        } else {
          interimBuf += transcript
        }
      }

      if (finalText) {
        setSpokenText((prev) => (prev + ' ' + finalText).trim())
        setInterimText('')
      } else {
        setInterimText(interimBuf)
      }
    }

    recognition.onerror = (event) => {
      // 'no-speech' and 'aborted' are not real errors — ignore them silently
      if (event.error === 'no-speech' || event.error === 'aborted') return

      const messages = {
        'not-allowed':  'Microphone permission denied. Please allow access and try again.',
        'audio-capture':'No microphone detected. Please connect one and try again.',
        'network':      'Network error during speech recognition. Check your connection.',
        'language-not-supported': `Speech recognition does not support "${getLang(sourceLang)?.label}". Try English.`,
      }
      showToast(messages[event.error] ?? `Speech error: ${event.error}`)
      stopRecording()
    }

    recognition.onend = () => {
      // Called when the browser stops (e.g. after a pause or explicit stop)
      stopAudioLevel()
      setInterimText('')
      // Only auto-translate if there's captured text and we didn't manually stop
      setSpokenText((current) => {
        if (current.trim()) {
          translateText(current.trim())
        } else {
          setStatus('idle')
        }
        return current
      })
    }

    try {
      recognition.start()
    } catch (err) {
      showToast(`Could not start recording: ${err.message}`)
      stopAudioLevel()
      setStatus('idle')
    }
  }

  // ── Stop recording ────────────────────────────────────────────────────────
  const stopRecording = () => {
    recognitionRef.current?.stop()
    recognitionRef.current = null
    stopAudioLevel()
    // onend fires automatically and triggers translation
  }

  // ── Toggle button handler ─────────────────────────────────────────────────
  const handleToggle = () => {
    if (status === 'recording') {
      stopRecording()
    } else if (status === 'idle' || status === 'done' || status === 'error') {
      startRecording()
    }
  }

  // ── Reset everything ──────────────────────────────────────────────────────
  const handleClear = () => {
    stopRecording()
    setSpokenText('')
    setInterimText('')
    setTranslatedText('')
    setStatus('idle')
    setAudioLevel(0)
  }

  // ── Copy to clipboard ─────────────────────────────────────────────────────
  const handleCopy = () => {
    if (!translatedText) return
    navigator.clipboard.writeText(translatedText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  // ── Cleanup on unmount ────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      recognitionRef.current?.stop()
      stopAudioLevel()
      clearTimeout(toastTimerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Derived UI flags ──────────────────────────────────────────────────────
  const isRecording    = status === 'recording'
  const isTranslating  = status === 'translating'
  const isRequesting   = status === 'requesting'
  const isBusy         = isRecording || isTranslating || isRequesting
  const hasResult      = status === 'done' && translatedText

  // ── Waveform bars (7 bars driven by audioLevel) ────────────────────────────
  const WaveformBars = () => {
    const heights = [0.4, 0.7, 1.0, 0.8, 0.6, 0.9, 0.5]
    return (
      <div className="flex items-center justify-center gap-1 h-8">
        {heights.map((mult, i) => (
          <div
            key={i}
            className="w-1 rounded-full bg-red-400 transition-all duration-75"
            style={{
              height: isRecording
                ? `${Math.max(4, audioLevel * mult * 0.3)}px`
                : '4px',
              opacity: isRecording ? 0.8 + mult * 0.2 : 0.3,
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="tab-content relative">

      {/* ── Toast notification ─────────────────────────────────────────────── */}
      {toast && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-md">
          <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs leading-relaxed shadow-lg backdrop-blur-sm">
            <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
            <span>{toast}</span>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-0 min-h-[340px]">

        {/* ── Left: microphone controls ───────────────────────────────────── */}
        <div className="p-8 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-lingua-border/60 gap-5">

          <p className="text-lingua-subtext text-sm text-center px-4">
            {isRequesting   ? 'Requesting microphone access…'
             : isRecording  ? 'Listening — speak clearly'
             : isTranslating? 'Translating your speech…'
             : 'Click the microphone and speak in the selected language'}
          </p>

          {/* Mic button */}
          <div className="relative flex items-center justify-center">
            {/* Outer pulse rings when recording */}
            {isRecording && (
              <>
                <span className="absolute w-36 h-36 rounded-full border border-red-400/20 animate-ping" style={{ animationDuration: '1.5s' }} />
                <span className="absolute w-28 h-28 rounded-full border border-red-400/30 animate-ping" style={{ animationDuration: '1s' }} />
              </>
            )}

            <button
              onClick={handleToggle}
              disabled={isTranslating || isRequesting}
              aria-label={isRecording ? 'Stop recording' : 'Start recording'}
              className={`
                relative z-10 w-24 h-24 rounded-full flex items-center justify-center
                transition-all duration-300 shadow-2xl
                ${isRecording
                  ? 'bg-red-500/20 border-2 border-red-400 text-red-400 scale-110'
                  : isTranslating || isRequesting
                  ? 'bg-lingua-surface border-2 border-lingua-border text-lingua-muted cursor-not-allowed'
                  : 'bg-lingua-blue/10 border-2 border-lingua-blue/40 text-lingua-blue hover:bg-lingua-blue/20 hover:scale-105'
                }
              `}
            >
              {isTranslating || isRequesting ? (
                <span className="w-7 h-7 border-2 border-lingua-border border-t-lingua-blue rounded-full animate-spin" />
              ) : isRecording ? (
                /* Stop icon */
                <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="6" width="12" height="12" rx="2" />
                </svg>
              ) : (
                /* Mic icon */
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 016 0v6a3 3 0 01-3 3z" />
                </svg>
              )}
            </button>
          </div>

          {/* Waveform bars */}
          <WaveformBars />

          {/* Status label */}
          <p className={`text-sm font-medium transition-colors ${
            isRecording   ? 'text-red-400'
            : isTranslating ? 'text-lingua-blue-light'
            : 'text-lingua-muted'
          }`}>
            {isRequesting   ? 'Requesting permission…'
             : isRecording  ? '● Recording — click to stop'
             : isTranslating? '⟳ Translating…'
             : status === 'done' ? '✓ Done'
             : 'Tap to start recording'}
          </p>

          {/* Language selector row */}
          <div className="flex items-center gap-3 w-full justify-center">
            <select
              value={sourceLang}
              onChange={(e) => { setSourceLang(e.target.value); handleClear() }}
              disabled={isBusy}
              className="bg-lingua-surface border border-lingua-border text-lingua-text text-sm rounded-xl px-3 py-2 outline-none focus:border-lingua-blue/50 disabled:opacity-50"
            >
              {LANGS.map((l) => (
                <option key={l.code} value={l.code}>{l.flag} {l.label}</option>
              ))}
            </select>
            <span className="text-lingua-muted text-lg">→</span>
            <select
              value={targetLang}
              onChange={(e) => { setTargetLang(e.target.value); handleClear() }}
              disabled={isBusy}
              className="bg-lingua-surface border border-lingua-border text-lingua-text text-sm rounded-xl px-3 py-2 outline-none focus:border-lingua-blue/50 disabled:opacity-50"
            >
              {LANGS.map((l) => (
                <option key={l.code} value={l.code}>{l.flag} {l.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Right: live transcript + translation result ──────────────────── */}
        <div className="p-6 lg:p-8 flex flex-col justify-between gap-4">
          <div className="space-y-3">
            <h3 className="text-lingua-text font-bold text-lg">Voice translation</h3>

            {/* Live transcript area */}
            <div className="rounded-xl border border-lingua-border/50 bg-lingua-surface/40 overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2 border-b border-lingua-border/40 bg-lingua-surface/60">
                <span className="text-lingua-muted text-xs font-medium">
                  {getLang(sourceLang)?.flag} Recognized speech
                </span>
                {isRecording && (
                  <span className="flex items-center gap-1.5 text-red-400 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                    Live
                  </span>
                )}
              </div>
              <div className="p-3 min-h-[64px] text-sm leading-relaxed">
                {spokenText || interimText ? (
                  <p className="text-lingua-text">
                    {spokenText}
                    {interimText && (
                      <span className="text-lingua-muted/70 italic"> {interimText}</span>
                    )}
                  </p>
                ) : (
                  <p className="text-lingua-muted/40 text-xs italic">
                    {isRecording ? 'Waiting for speech…' : 'Your spoken words will appear here'}
                  </p>
                )}
              </div>
            </div>

            {/* Translation result area */}
            <div className="rounded-xl border border-lingua-border/50 bg-lingua-surface/40 overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2 border-b border-lingua-border/40 bg-lingua-surface/60">
                <span className="text-lingua-muted text-xs font-medium">
                  {getLang(targetLang)?.flag} Translation
                </span>
                {isTranslating && (
                  <span className="flex items-center gap-1.5 text-lingua-blue-light text-xs">
                    <span className="w-3 h-3 border border-lingua-blue-light border-t-transparent rounded-full animate-spin" />
                    Translating
                  </span>
                )}
              </div>
              <div
                className="p-3 min-h-[64px] text-sm leading-relaxed"
                dir={targetLang === 'am' || targetLang === 'ar' ? 'rtl' : 'ltr'}
              >
                {hasResult ? (
                  <p className="text-lingua-text font-medium">{translatedText}</p>
                ) : isTranslating ? (
                  <div className="flex items-center gap-2 text-lingua-muted/60">
                    <span className="w-3 h-3 border border-lingua-muted/40 border-t-lingua-blue rounded-full animate-spin" />
                    <span className="text-xs">Translating…</span>
                  </div>
                ) : (
                  <p className="text-lingua-muted/40 text-xs italic">Translation will appear here</p>
                )}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            {hasResult && (
              <>
                <button
                  onClick={handleCopy}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all
                    ${copied
                      ? 'bg-green-500/15 text-green-400 border-green-500/30'
                      : 'bg-lingua-surface text-lingua-muted hover:text-lingua-text border-lingua-border/50'
                    }`}
                >
                  {copied ? (
                    <><CheckIcon /> Copied!</>
                  ) : (
                    <><CopyIcon /> Copy</>
                  )}
                </button>
                <button
                  onClick={handleClear}
                  className="btn-secondary border border-lingua-border px-4 py-2.5 rounded-xl text-sm"
                >
                  Clear
                </button>
                <button
                  onClick={startRecording}
                  className="btn-primary flex-1 py-2.5 text-sm flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 016 0v6a3 3 0 01-3 3z" />
                  </svg>
                  Record again
                </button>
              </>
            )}
            {!hasResult && !isBusy && (
              <p className="text-lingua-muted/50 text-xs self-center">
                {status === 'error' ? 'Recording failed — check the error above and try again.' : 'Record speech above to see the translation here.'}
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

// -------- API Tab --------
function UseAPITab() {
  return (
    <div className="tab-content">
      <div className="grid lg:grid-cols-2 gap-0 min-h-[320px]">
        {/* Left - code sample */}
        <div className="p-6 border-b lg:border-b-0 lg:border-r border-lingua-border/60">
          <div className="bg-lingua-darker rounded-xl border border-lingua-border/50 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-lingua-border/50 bg-lingua-surface/40">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/60" />
                <span className="w-3 h-3 rounded-full bg-amber-500/60" />
                <span className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <span className="text-lingua-muted text-xs ml-2 font-mono">translate.js</span>
            </div>
            <pre className="p-4 text-xs font-mono leading-relaxed overflow-x-auto text-lingua-subtext">
              <span className="text-lingua-blue-light">const</span>{' '}
              <span className="text-lingua-text">linguaAI</span>{' '}
              <span className="text-lingua-muted">=</span>{' '}
              <span className="text-lingua-blue-light">require</span>
              <span className="text-lingua-muted">(</span>
              <span className="text-green-400">'linguaai-sdk'</span>
              <span className="text-lingua-muted">);</span>{'\n\n'}
              <span className="text-lingua-blue-light">const</span>{' '}
              <span className="text-lingua-text">result</span>{' '}
              <span className="text-lingua-muted">=</span>{' '}
              <span className="text-lingua-blue-light">await</span>{' '}
              <span className="text-lingua-text">linguaAI</span>
              <span className="text-lingua-muted">.</span>
              <span className="text-yellow-300">translate</span>
              <span className="text-lingua-muted">{'({'}</span>{'\n'}
              {'  '}<span className="text-lingua-text">text</span>
              <span className="text-lingua-muted">:</span>{' '}
              <span className="text-green-400">"Hello, world!"</span>
              <span className="text-lingua-muted">,</span>{'\n'}
              {'  '}<span className="text-lingua-text">from</span>
              <span className="text-lingua-muted">:</span>{' '}
              <span className="text-green-400">"EN"</span>
              <span className="text-lingua-muted">,</span>{'\n'}
              {'  '}<span className="text-lingua-text">to</span>
              <span className="text-lingua-muted">:</span>{' '}
              <span className="text-green-400">"AM"</span>{'\n'}
              <span className="text-lingua-muted">{'});'}</span>{'\n\n'}
              <span className="text-lingua-muted">{'// '}</span>
              <span className="text-lingua-muted/70">Result: "ሰላም ዓለም!"</span>
            </pre>
          </div>
        </div>

        {/* Right - API info */}
        <div className="p-6 lg:p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-lingua-text font-bold text-xl mb-2">Integrate LinguaAI into your apps</h3>
            <p className="text-lingua-subtext text-sm leading-relaxed mb-6">
              Powerful REST API and SDKs for Node.js, Python, Go, and more. 
              Build translation features directly into your products.
            </p>

            <ul className="space-y-2.5">
              {[
                'Simple REST API with JSON',
                '99.9% uptime SLA',
                'Rate limits up to 10M chars/month',
                'Webhooks & streaming support',
              ].map((f) => (
                <li key={f} className="flex items-center gap-2 text-lingua-subtext text-sm">
                  <span className="w-4 h-4 rounded-full bg-lingua-blue/15 flex items-center justify-center flex-shrink-0 text-lingua-blue">
                    <CheckIcon />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3 mt-6">
            <button className="btn-primary flex-1 py-2.5">Get API Key</button>
            <button className="btn-secondary border border-lingua-border px-4 py-2.5 rounded-xl">View Docs</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// -------- Main TranslatorTabs component --------
export default function TranslatorTabs({ defaultTab = 'files' }) {
  const [activeTab, setActiveTab] = useState(defaultTab)

  const renderTabContent = () => {
    switch (activeTab) {
      case 'files': return <TranslateFilesTab />
      case 'text': return <TranslateTextTab />
      case 'speech': return <TranslateSpeechTab />
      case 'api': return <UseAPITab />
      default: return null
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Tab Bar */}
      <div className="flex items-center gap-1 p-1.5 bg-lingua-darker/80 rounded-2xl border border-lingua-border/50 mb-4 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-btn flex-shrink-0 ${activeTab === tab.id ? 'tab-btn-active' : 'tab-btn-inactive'}`}
            >
              <Icon />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.split(' ')[1]}</span>
            </button>
          )
        })}
      </div>

      {/* Tab Content Card */}
      <div className="glass-card overflow-hidden shadow-2xl shadow-black/30">
        {renderTabContent()}
      </div>
    </div>
  )
}
