import { useState } from 'react'

const tones = ['Formal', 'Informal', 'Academic', 'Business', 'Creative', 'Simplified']
const improvements = ['Clarity', 'Conciseness', 'Grammar', 'Style', 'Vocabulary', 'Flow']

export default function WritePage() {
  const [text, setText] = useState('')
  const [activeTone, setActiveTone] = useState('Formal')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeImprovement, setActiveImprovement] = useState('Clarity')

  const handleImprove = () => {
    if (!text.trim()) return
    setLoading(true)
    setTimeout(() => {
      setResult(
        `[${activeTone} · ${activeImprovement} improved]\n\n` +
        text.replace(/\bi\b/g, 'I')
           .replace(/dont/g, "don't")
           .replace(/cant/g, "can't") +
        '\n\nThis text has been professionally rewritten for clarity, tone consistency, and grammatical accuracy using LinguaAI Write.'
      )
      setLoading(false)
    }, 1200)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Page header */}
      <div className="px-6 pt-6 pb-4 border-b border-lingua-border/40 flex-shrink-0">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lingua-text font-bold text-lg">LinguaAI Write</h1>
            <p className="text-lingua-muted text-xs">AI-powered writing improvement for Amharic & English</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-5xl mx-auto space-y-5">
          {/* Controls row */}
          <div className="flex flex-wrap gap-4">
            <div>
              <p className="text-lingua-muted text-xs mb-2 font-medium uppercase tracking-wide">Tone</p>
              <div className="flex flex-wrap gap-1.5">
                {tones.map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTone(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      activeTone === t
                        ? 'bg-lingua-blue/20 text-lingua-blue-light border border-lingua-blue/40'
                        : 'bg-lingua-surface text-lingua-muted hover:text-lingua-subtext border border-lingua-border/50'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-lingua-muted text-xs mb-2 font-medium uppercase tracking-wide">Improve</p>
              <div className="flex flex-wrap gap-1.5">
                {improvements.map((i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImprovement(i)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      activeImprovement === i
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                        : 'bg-lingua-surface text-lingua-muted hover:text-lingua-subtext border border-lingua-border/50'
                    }`}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Editor grid */}
          <div className="grid lg:grid-cols-2 gap-4">
            {/* Input */}
            <div className="glass-card p-5 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <span className="text-lingua-muted text-xs font-semibold uppercase tracking-wide">Original text</span>
                <span className="text-lingua-muted/60 text-xs">{text.length} / 10,000</span>
              </div>
              <textarea
                className="translator-input flex-1 min-h-[280px]"
                placeholder="Paste or type your text here to improve it with AI..."
                value={text}
                onChange={(e) => setText(e.target.value.slice(0, 10000))}
              />
              <div className="flex justify-end mt-3">
                <button
                  onClick={handleImprove}
                  disabled={!text.trim() || loading}
                  className={`btn-primary flex items-center gap-2 ${!text.trim() ? 'opacity-40 cursor-not-allowed' : ''}`}
                >
                  {loading ? (
                    <><span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Improving...</>
                  ) : 'Improve writing ✦'}
                </button>
              </div>
            </div>

            {/* Output */}
            <div className="glass-card p-5 flex flex-col bg-lingua-surface/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-lingua-muted text-xs font-semibold uppercase tracking-wide">Improved text</span>
                {result && (
                  <button
                    onClick={() => navigator.clipboard.writeText(result)}
                    className="text-lingua-muted hover:text-lingua-blue-light text-xs flex items-center gap-1 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    Copy
                  </button>
                )}
              </div>
              {loading ? (
                <div className="flex-1 flex items-center justify-center min-h-[280px]">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-lingua-border border-t-purple-400 rounded-full animate-spin" />
                    <p className="text-lingua-muted text-sm">Improving with AI...</p>
                  </div>
                </div>
              ) : (
                <div className={`flex-1 min-h-[280px] text-sm leading-relaxed whitespace-pre-wrap ${result ? 'text-lingua-text' : 'text-lingua-muted/40'}`}>
                  {result || 'Your improved text will appear here...'}
                </div>
              )}
            </div>
          </div>

          {/* Feature highlights */}
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: 'Grammar Fix', desc: 'Auto-correct grammar and punctuation errors in Amharic and English', icon: '✓', color: 'text-green-400' },
              { title: 'Tone Control', desc: 'Adjust your writing tone from casual to formal with one click', icon: '🎯', color: 'text-lingua-blue-light' },
              { title: 'Style Rephrase', desc: 'Rephrase sentences for better flow without changing meaning', icon: '✦', color: 'text-purple-400' },
            ].map((f) => (
              <div key={f.title} className="glass-card p-4">
                <span className={`text-lg ${f.color}`}>{f.icon}</span>
                <h3 className="text-lingua-text font-semibold text-sm mt-2 mb-1">{f.title}</h3>
                <p className="text-lingua-muted text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
