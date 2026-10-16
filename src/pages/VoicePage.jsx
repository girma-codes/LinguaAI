import { useState } from 'react'

const voiceLanguages = [
  { code: 'en-US', label: 'English (US)', flag: '🇺🇸' },
  { code: 'en-GB', label: 'English (UK)', flag: '🇬🇧' },
  { code: 'am-ET', label: 'Amharic', flag: '🇪🇹' },
  { code: 'fr-FR', label: 'French', flag: '🇫🇷' },
  { code: 'de-DE', label: 'German', flag: '🇩🇪' },
  { code: 'ar-SA', label: 'Arabic', flag: '🇸🇦' },
]

const recentVoice = [
  { from: 'English', to: 'Amharic', text: 'Good morning everyone', result: 'እንደምን አደራቹ', time: '2m ago' },
  { from: 'Amharic', to: 'English', text: 'አመሰግናለሁ', result: 'Thank you', time: '15m ago' },
  { from: 'English', to: 'Amharic', text: 'Please wait a moment', result: 'እባክዎ ትንሽ ይጠብቁ', time: '1h ago' },
]

export default function VoicePage() {
  const [recording, setRecording] = useState(false)
  const [hasResult, setHasResult] = useState(false)
  const [fromLang, setFromLang] = useState('en-US')
  const [toLang, setToLang] = useState('am-ET')
  const [mode, setMode] = useState('translate') // translate | transcribe

  const toggleRecord = () => {
    if (recording) {
      setRecording(false)
      setTimeout(() => setHasResult(true), 600)
    } else {
      setHasResult(false)
      setRecording(true)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 pt-6 pb-4 border-b border-lingua-border/40 flex-shrink-0">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 016 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lingua-text font-bold text-lg">LinguaAI Voice</h1>
            <p className="text-lingua-muted text-xs">Real-time speech translation & transcription</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto space-y-5">
          {/* Mode toggle */}
          <div className="flex gap-1 p-1 bg-lingua-surface rounded-xl border border-lingua-border/50 w-fit">
            {[{ id: 'translate', label: 'Translate Speech' }, { id: 'transcribe', label: 'Transcribe Only' }].map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  mode === m.id ? 'bg-lingua-card text-lingua-text shadow border border-lingua-border' : 'text-lingua-muted hover:text-lingua-subtext'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Language selectors */}
          <div className="flex items-center gap-3 flex-wrap">
            <select
              value={fromLang}
              onChange={(e) => setFromLang(e.target.value)}
              className="bg-lingua-surface border border-lingua-border text-lingua-text text-sm rounded-xl px-4 py-2.5 outline-none focus:border-lingua-blue/50 cursor-pointer"
            >
              {voiceLanguages.map((l) => (
                <option key={l.code} value={l.code}>{l.flag} {l.label}</option>
              ))}
            </select>
            <div className="flex items-center gap-1 text-lingua-muted">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            <select
              value={toLang}
              onChange={(e) => setToLang(e.target.value)}
              className="bg-lingua-surface border border-lingua-border text-lingua-text text-sm rounded-xl px-4 py-2.5 outline-none focus:border-lingua-blue/50 cursor-pointer"
            >
              {voiceLanguages.map((l) => (
                <option key={l.code} value={l.code}>{l.flag} {l.label}</option>
              ))}
            </select>
          </div>

          {/* Recorder card */}
          <div className="glass-card p-8">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              {/* Mic */}
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={toggleRecord}
                  className={`relative w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl
                    ${recording
                      ? 'bg-red-500/15 border-2 border-red-400 text-red-400 scale-110'
                      : 'bg-lingua-blue/10 border-2 border-lingua-blue/40 text-lingua-blue hover:bg-lingua-blue/20 hover:scale-105'
                    }`}
                >
                  {recording && <span className="absolute inset-0 rounded-full border-2 border-red-400/30 animate-ping" />}
                  {recording && <span className="absolute inset-[-8px] rounded-full border border-red-400/15 animate-ping" style={{ animationDelay: '0.3s' }} />}
                  <svg className="w-12 h-12" fill={recording ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 016 0v6a3 3 0 01-3 3z" />
                  </svg>
                </button>
                <p className={`text-sm font-medium transition-colors ${recording ? 'text-red-400' : 'text-lingua-muted'}`}>
                  {recording ? '● Recording...' : 'Tap to record'}
                </p>
                {recording && (
                  <div className="flex gap-1 items-end h-6">
                    {[3,5,7,4,6,8,3,5,7,4].map((h, i) => (
                      <div
                        key={i}
                        className="w-1 bg-red-400 rounded-full animate-pulse"
                        style={{ height: `${h * 2}px`, animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Result panel */}
              <div className="flex-1 space-y-4 w-full">
                {hasResult ? (
                  <>
                    <div className="p-4 rounded-xl bg-lingua-surface border border-lingua-border/40">
                      <p className="text-lingua-muted text-xs mb-1.5 font-medium">Detected speech ({voiceLanguages.find(l => l.code === fromLang)?.label})</p>
                      <p className="text-lingua-text">"Good morning, how can I help you today?"</p>
                    </div>
                    <div className="p-4 rounded-xl bg-lingua-blue/5 border border-lingua-blue/20">
                      <p className="text-lingua-blue-light text-xs mb-1.5 font-medium">Translation ({voiceLanguages.find(l => l.code === toLang)?.label})</p>
                      <p className="text-lingua-text font-medium">"እንደምን አደሩ፣ ዛሬ እንዴት ልርዳዎ?"</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="btn-primary flex items-center gap-2 text-xs py-2">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                        Play audio
                      </button>
                      <button className="btn-secondary border border-lingua-border text-xs py-2 px-4 rounded-xl">Save</button>
                      <button onClick={() => setHasResult(false)} className="btn-secondary border border-lingua-border text-xs py-2 px-4 rounded-xl">Clear</button>
                    </div>
                  </>
                ) : (
                  <div className="p-6 rounded-xl border border-dashed border-lingua-border/40 text-center">
                    <p className="text-lingua-muted text-sm">Press the microphone and start speaking</p>
                    <p className="text-lingua-muted/50 text-xs mt-1">Supports Amharic, English, and 30+ languages</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recent voice translations */}
          <div>
            <h3 className="text-lingua-text font-semibold text-sm mb-3">Recent voice translations</h3>
            <div className="space-y-2">
              {recentVoice.map((r, i) => (
                <div key={i} className="glass-card p-4 flex items-center gap-4 hover:border-lingua-border transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M12 6.253v13" /></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-lingua-text text-sm truncate">"{r.text}"</p>
                    <p className="text-lingua-muted text-xs mt-0.5">→ "{r.result}" · {r.from} to {r.to}</p>
                  </div>
                  <span className="text-lingua-muted/60 text-xs flex-shrink-0">{r.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
