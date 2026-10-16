import { useState, useRef, useCallback } from 'react'

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

const SAMPLE_TRANSLATION = {
  'AI solutions that help you get work done': 'AI መፍትሄዎች ሥራዎን እንዲጠናቀቁ ይረዳዎታል',
  'Hello': 'ሰላም',
  'Good morning': 'እንደምን አደሩ',
  'Thank you': 'አመሰግናለሁ',
}

// -------- Translate Files Tab --------
function TranslateFilesTab() {
  const [dragging, setDragging] = useState(false)
  const [files, setFiles] = useState([])
  const inputRef = useRef()

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragging(false)
    const dropped = Array.from(e.dataTransfer.files)
    setFiles((prev) => [...prev, ...dropped])
  }, [])

  const handleDragOver = (e) => { e.preventDefault(); setDragging(true) }
  const handleDragLeave = () => setDragging(false)

  const handleFileInput = (e) => {
    const selected = Array.from(e.target.files)
    setFiles((prev) => [...prev, ...selected])
  }

  const removeFile = (idx) => setFiles((prev) => prev.filter((_, i) => i !== idx))

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / 1048576).toFixed(1) + ' MB'
  }

  return (
    <div className="tab-content">
      <div className="grid lg:grid-cols-2 gap-0 min-h-[320px]">
        {/* Left - Drop Zone */}
        <div className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-lingua-border/60">
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => inputRef.current?.click()}
            className={`
              relative flex flex-col items-center justify-center min-h-[220px] rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300 group
              ${dragging
                ? 'border-lingua-blue bg-lingua-blue/5 scale-[1.01]'
                : 'border-lingua-border/60 hover:border-lingua-blue/50 hover:bg-lingua-blue/3'
              }
            `}
          >
            <input
              ref={inputRef}
              type="file"
              multiple
              accept=".pdf,.docx,.doc,.txt,.pptx,.xlsx,.html"
              className="hidden"
              onChange={handleFileInput}
            />

            <div className={`mb-4 transition-colors duration-300 ${dragging ? 'text-lingua-blue' : 'text-lingua-border group-hover:text-lingua-muted'}`}>
              <UploadIcon />
            </div>
            <p className="text-lingua-text font-semibold text-base mb-1">
              {dragging ? 'Drop files here' : 'Drag & drop files here'}
            </p>
            <p className="text-lingua-muted text-sm text-center px-4">
              or <span className="text-lingua-blue-light underline underline-offset-2">browse</span> to upload
            </p>
            <p className="text-lingua-muted/70 text-xs mt-3">
              PDF, DOCX, TXT, PPTX, XLSX, HTML supported
            </p>

            {dragging && (
              <div className="absolute inset-0 rounded-2xl border-2 border-lingua-blue bg-lingua-blue/5 flex items-center justify-center">
                <p className="text-lingua-blue font-semibold text-lg">Release to upload</p>
              </div>
            )}
          </div>

          {/* File list */}
          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              {files.map((file, idx) => (
                <div key={idx} className="flex items-center gap-3 px-3 py-2 bg-lingua-surface rounded-xl border border-lingua-border/40">
                  <div className="w-7 h-7 rounded-lg bg-lingua-blue/10 flex items-center justify-center flex-shrink-0">
                    <FileIcon />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-lingua-text text-xs font-medium truncate">{file.name}</p>
                    <p className="text-lingua-muted text-xs">{formatSize(file.size)}</p>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); removeFile(idx) }} className="text-lingua-muted hover:text-red-400 transition-colors text-lg leading-none">×</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right - Info & CTA */}
        <div className="p-6 lg:p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-lingua-text font-bold text-xl mb-2 leading-snug">
              Drag-and-drop translation<br />for any file type
            </h3>
            <p className="text-lingua-subtext text-sm leading-relaxed mb-6">
              Quickly and securely translate documents in all major formats. 
              Preserves layout and visual context, built for bulk and enterprise workflows.
            </p>

            {/* Supported formats */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['PDF', 'DOCX', 'PPTX', 'XLSX', 'TXT', 'HTML'].map((fmt) => (
                <span key={fmt} className="px-2.5 py-1 rounded-lg bg-lingua-surface border border-lingua-border/50 text-lingua-muted text-xs font-medium">
                  {fmt}
                </span>
              ))}
            </div>

            {/* Features list */}
            <ul className="space-y-2.5">
              {[
                'Layout & formatting preserved',
                'Amharic ↔ English & 100+ languages',
                'Secure end-to-end processing',
                'Batch upload multiple files',
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

          <button
            disabled={files.length === 0}
            className={`mt-6 btn-primary w-full py-3 text-center transition-all duration-200 ${files.length === 0 ? 'opacity-40 cursor-not-allowed' : 'shadow-lg shadow-lingua-blue/25 hover:scale-[1.02]'}`}
          >
            {files.length > 0 ? `Translate ${files.length} file${files.length > 1 ? 's' : ''}` : 'Upload a file to translate'}
          </button>
        </div>
      </div>
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

  const handleTranslate = () => {
    if (!sourceText.trim()) return
    setIsTranslating(true)
    setTimeout(() => {
      const found = Object.entries(SAMPLE_TRANSLATION).find(([k]) =>
        sourceText.toLowerCase().includes(k.toLowerCase())
      )
      setTranslatedText(
        found
          ? found[1]
          : targetLang === 'am'
          ? 'ይህ ጽሑፍ AI በሚሠራው LinguaAI ተተርጉሟል። ከፍተኛ ትክክለኛነት ያለው ትርጉም ለሁሉም ቋንቋዎች ይገኛል።'
          : 'This text has been translated by LinguaAI, powered by AI. High-accuracy translation is available for all languages.'
      )
      setIsTranslating(false)
    }, 1000)
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
  const [recording, setRecording] = useState(false)
  const [hasRecording, setHasRecording] = useState(false)

  const toggleRecord = () => {
    if (recording) {
      setRecording(false)
      setHasRecording(true)
    } else {
      setRecording(true)
    }
  }

  return (
    <div className="tab-content">
      <div className="grid lg:grid-cols-2 gap-0 min-h-[320px]">
        {/* Left - recorder */}
        <div className="p-8 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-lingua-border/60">
          <p className="text-lingua-subtext text-sm mb-6 text-center">
            Click the microphone and start speaking in Amharic or English
          </p>

          {/* Mic button */}
          <button
            onClick={toggleRecord}
            className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl
              ${recording
                ? 'bg-red-500/20 border-2 border-red-400 text-red-400 scale-110'
                : 'bg-lingua-blue/10 border-2 border-lingua-blue/40 text-lingua-blue hover:bg-lingua-blue/20 hover:scale-105'
              }`}
          >
            {recording && (
              <span className="absolute inset-0 rounded-full border-2 border-red-400/40 animate-ping" />
            )}
            <svg className="w-10 h-10" fill={recording ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 016 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>

          <p className={`mt-4 text-sm font-medium transition-colors ${recording ? 'text-red-400' : 'text-lingua-muted'}`}>
            {recording ? '● Recording...' : 'Tap to start recording'}
          </p>

          {/* Language selector */}
          <div className="flex items-center gap-3 mt-6">
            <select className="bg-lingua-surface border border-lingua-border text-lingua-text text-sm rounded-xl px-3 py-2 outline-none focus:border-lingua-blue/50">
              <option value="en">🇬🇧 English</option>
              <option value="am">🇪🇹 Amharic</option>
            </select>
            <span className="text-lingua-muted">→</span>
            <select className="bg-lingua-surface border border-lingua-border text-lingua-text text-sm rounded-xl px-3 py-2 outline-none focus:border-lingua-blue/50">
              <option value="am">🇪🇹 Amharic</option>
              <option value="en">🇬🇧 English</option>
            </select>
          </div>
        </div>

        {/* Right - result */}
        <div className="p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-lingua-text font-bold text-xl mb-2">Real-time voice translation</h3>
            <p className="text-lingua-subtext text-sm leading-relaxed mb-6">
              Speak naturally and get accurate translations in real time. 
              Supports Amharic, English, and 30+ other languages.
            </p>

            {hasRecording ? (
              <div className="p-4 rounded-xl bg-lingua-surface border border-lingua-border/50 space-y-3">
                <div>
                  <p className="text-lingua-muted text-xs mb-1">Detected speech:</p>
                  <p className="text-lingua-text text-sm">"Good morning, how are you today?"</p>
                </div>
                <div className="border-t border-lingua-border/40 pt-3">
                  <p className="text-lingua-muted text-xs mb-1">Translation:</p>
                  <p className="text-lingua-text text-sm font-medium">"እንደምን አደሩ፣ ዛሬ ምን ይሰማዎታል?"</p>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-lingua-surface/50 border border-dashed border-lingua-border/40 min-h-[120px] flex items-center justify-center">
                <p className="text-lingua-muted/60 text-sm text-center">Your translation will appear here after recording</p>
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-6">
            <button className={`btn-primary flex-1 py-2.5 ${!hasRecording ? 'opacity-40 cursor-not-allowed' : ''}`} disabled={!hasRecording}>
              Save Translation
            </button>
            {hasRecording && (
              <button onClick={() => setHasRecording(false)} className="btn-secondary border border-lingua-border px-4 py-2.5 rounded-xl">
                Clear
              </button>
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
