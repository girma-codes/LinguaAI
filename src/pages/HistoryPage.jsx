import { useState } from 'react'

const historyData = [
  { id: 1, type: 'text', from: 'EN', to: 'AM', source: 'Good morning, how are you?', result: 'እንደምን አደሩ?', date: 'Today, 9:42 AM', chars: 28, saved: true },
  { id: 2, type: 'file', from: 'EN', to: 'AM', source: 'annual_report_2026.pdf', result: 'annual_report_2026_AM.pdf', date: 'Today, 8:15 AM', chars: 12400, saved: false },
  { id: 3, type: 'text', from: 'AM', to: 'EN', source: 'አዲስ አበባ የኢትዮጵያ ዋና ከተማ ናት።', result: 'Addis Ababa is the capital city of Ethiopia.', date: 'Yesterday, 4:30 PM', chars: 45, saved: true },
  { id: 4, type: 'voice', from: 'EN', to: 'AM', source: 'Thank you very much', result: 'በጣም አመሰግናለሁ', date: 'Yesterday, 2:10 PM', chars: 19, saved: false },
  { id: 5, type: 'text', from: 'EN', to: 'AM', source: 'Please submit your report by Friday.', result: 'እባክዎ ዘገባዎን እስከ ዓርብ ያስረክቡ።', date: 'Oct 1, 2026', chars: 37, saved: false },
  { id: 6, type: 'file', from: 'AM', to: 'EN', source: 'contract_draft.docx', result: 'contract_draft_EN.docx', date: 'Sep 30, 2026', chars: 8900, saved: true },
  { id: 7, type: 'text', from: 'EN', to: 'AM', source: 'Welcome to LinguaAI', result: 'ወደ LinguaAI እንኳን ደህና መጡ', date: 'Sep 29, 2026', chars: 20, saved: true },
]

const typeConfig = {
  text: { label: 'Text', color: 'text-lingua-blue-light', bg: 'bg-lingua-blue/10', icon: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h8" /></svg>
  )},
  file: { label: 'File', color: 'text-amber-400', bg: 'bg-amber-500/10', icon: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
  )},
  voice: { label: 'Voice', color: 'text-cyan-400', bg: 'bg-cyan-500/10', icon: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 016 0v6a3 3 0 01-3 3z" /></svg>
  )},
}

export default function HistoryPage() {
  const [filter, setFilter] = useState('all')
  const [savedOnly, setSavedOnly] = useState(false)
  const [history, setHistory] = useState(historyData)

  const filtered = history.filter((h) => {
    const matchType = filter === 'all' || h.type === filter
    const matchSaved = !savedOnly || h.saved
    return matchType && matchSaved
  })

  const toggleSave = (id) => setHistory(prev => prev.map(h => h.id === id ? { ...h, saved: !h.saved } : h))
  const remove = (id) => setHistory(prev => prev.filter(h => h.id !== id))

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 pt-6 pb-4 border-b border-lingua-border/40 flex-shrink-0">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-lingua-blue/20 to-lingua-blue/5 border border-lingua-blue/20 flex items-center justify-center text-lingua-blue-light">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <h1 className="text-lingua-text font-bold text-lg">Translation History</h1>
              <p className="text-lingua-muted text-xs">Your recent translations across all types</p>
            </div>
          </div>
          <button
            onClick={() => setHistory([])}
            className="text-lingua-muted hover:text-red-400 text-xs flex items-center gap-1.5 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-500/5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            Clear all
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex gap-1 p-1 bg-lingua-surface rounded-xl border border-lingua-border/50">
              {['all', 'text', 'file', 'voice'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                    filter === f ? 'bg-lingua-card text-lingua-text shadow border border-lingua-border' : 'text-lingua-muted hover:text-lingua-subtext'
                  }`}
                >
                  {f === 'all' ? 'All' : typeConfig[f]?.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setSavedOnly(!savedOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                savedOnly ? 'bg-amber-500/15 text-amber-400 border-amber-500/30' : 'bg-lingua-surface text-lingua-muted border-lingua-border/50 hover:text-lingua-subtext'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill={savedOnly ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
              Saved only
            </button>
          </div>

          <p className="text-lingua-muted text-xs">{filtered.length} translation{filtered.length !== 1 ? 's' : ''}</p>

          {filtered.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <p className="text-3xl mb-3">📋</p>
              <p className="text-lingua-text font-semibold mb-1">No history yet</p>
              <p className="text-lingua-muted text-sm">Your translations will appear here.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((h) => {
                const cfg = typeConfig[h.type]
                return (
                  <div key={h.id} className="glass-card p-4 hover:border-lingua-border transition-all group">
                    <div className="flex items-start gap-4">
                      {/* Type icon */}
                      <div className={`w-8 h-8 rounded-lg ${cfg.bg} flex items-center justify-center ${cfg.color} flex-shrink-0 mt-0.5`}>
                        {cfg.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`text-xs font-semibold ${cfg.color}`}>{cfg.label}</span>
                          <span className="text-lingua-muted text-xs">{h.from} → {h.to}</span>
                          <span className="text-lingua-muted/50 text-xs">·</span>
                          <span className="text-lingua-muted/60 text-xs">{h.date}</span>
                          <span className="text-lingua-muted/50 text-xs">·</span>
                          <span className="text-lingua-muted/60 text-xs">{h.chars.toLocaleString()} chars</span>
                        </div>
                        <p className="text-lingua-text text-sm truncate">{h.source}</p>
                        <p className="text-lingua-muted text-xs truncate mt-0.5">→ {h.result}</p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                        <button
                          onClick={() => toggleSave(h.id)}
                          title={h.saved ? 'Unsave' : 'Save'}
                          className={`p-1.5 rounded-lg transition-colors ${h.saved ? 'text-amber-400 hover:text-amber-300' : 'text-lingua-muted hover:text-amber-400'}`}
                        >
                          <svg className="w-4 h-4" fill={h.saved ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                        </button>
                        <button
                          onClick={() => remove(h.id)}
                          title="Delete"
                          className="p-1.5 rounded-lg text-lingua-muted hover:text-red-400 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
