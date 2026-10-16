import { useState } from 'react'

const SAMPLE_WORDS = {
  love: {
    word: 'love',
    phonetic: '/lʌv/',
    pos: 'noun / verb',
    amharic: 'ፍቅር (fiqr)',
    definitions: [
      'An intense feeling of deep affection for someone or something.',
      'To feel a deep romantic or sexual attachment to someone.',
      'To like or enjoy something very much.',
    ],
    examples: [
      { en: 'She has a great love of music.', am: 'ለሙዚቃ ትልቅ ፍቅር አላት።' },
      { en: 'I love spending time with my family.', am: 'ቤተሰቤ ጋር ጊዜ ማሳለፍ እወዳለሁ።' },
    ],
    synonyms: ['affection', 'adoration', 'devotion', 'fondness'],
    related: ['lovely', 'lovable', 'beloved', 'lover'],
  },
  water: {
    word: 'water',
    phonetic: '/ˈwɔːtər/',
    pos: 'noun / verb',
    amharic: 'ውሃ (wiha)',
    definitions: [
      'A colorless, transparent, odorless liquid that forms the seas, lakes, rivers.',
      'To pour water on a plant or garden.',
    ],
    examples: [
      { en: 'Please bring me a glass of water.', am: 'እባክዎ አንድ ብርጭቆ ውሃ ያምጡልኝ።' },
    ],
    synonyms: ['H₂O', 'aqua', 'liquid'],
    related: ['waterfall', 'waterproof', 'underwater'],
  },
}

export default function DictionaryPage() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)

  const search = () => {
    if (!query.trim()) return
    setLoading(true)
    setNotFound(false)
    setTimeout(() => {
      const found = SAMPLE_WORDS[query.toLowerCase().trim()]
      if (found) {
        setResult(found)
        setNotFound(false)
      } else {
        setResult(null)
        setNotFound(true)
      }
      setLoading(false)
    }, 700)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 pt-6 pb-4 border-b border-lingua-border/40 flex-shrink-0">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <h1 className="text-lingua-text font-bold text-lg">Dictionary</h1>
            <p className="text-lingua-muted text-xs">English ↔ Amharic bilingual dictionary with examples</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Search bar */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-lingua-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && search()}
                placeholder='Search a word (try "love" or "water")'
                className="w-full bg-lingua-surface border border-lingua-border text-lingua-text text-sm rounded-xl pl-10 pr-4 py-3 outline-none focus:border-lingua-blue/50 transition-colors placeholder:text-lingua-muted/50"
              />
            </div>
            <button onClick={search} className="btn-primary px-6">Search</button>
          </div>

          {/* Quick search chips */}
          <div className="flex flex-wrap gap-2">
            <span className="text-lingua-muted text-xs">Quick search:</span>
            {['love', 'water', 'peace', 'Ethiopia', 'language'].map((w) => (
              <button
                key={w}
                onClick={() => { setQuery(w); setTimeout(() => search(), 0) }}
                className="px-2.5 py-1 rounded-lg bg-lingua-surface border border-lingua-border/50 text-lingua-muted hover:text-lingua-text hover:border-lingua-blue/30 text-xs transition-all"
              >
                {w}
              </button>
            ))}
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 border-2 border-lingua-border border-t-amber-400 rounded-full animate-spin" />
            </div>
          )}

          {/* Not found */}
          {notFound && !loading && (
            <div className="glass-card p-8 text-center">
              <p className="text-3xl mb-3">🔍</p>
              <p className="text-lingua-text font-semibold mb-1">Word not found</p>
              <p className="text-lingua-muted text-sm">Try searching "love" or "water" to see a demo result.</p>
            </div>
          )}

          {/* Result */}
          {result && !loading && (
            <div className="space-y-4 tab-content">
              {/* Word header */}
              <div className="glass-card p-6">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h2 className="text-lingua-text text-3xl font-black mb-1">{result.word}</h2>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-lingua-muted text-sm font-mono">{result.phonetic}</span>
                      <span className="px-2 py-0.5 rounded-md bg-lingua-blue/15 text-lingua-blue-light text-xs border border-lingua-blue/25">{result.pos}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lingua-muted text-xs mb-0.5">Amharic equivalent</p>
                    <p className="text-amber-400 font-bold text-lg">{result.amharic}</p>
                  </div>
                </div>
              </div>

              {/* Definitions */}
              <div className="glass-card p-5">
                <h3 className="text-lingua-text font-semibold text-sm mb-3">Definitions</h3>
                <ol className="space-y-2">
                  {result.definitions.map((d, i) => (
                    <li key={i} className="flex gap-3 text-sm text-lingua-subtext">
                      <span className="text-lingua-blue-light font-bold flex-shrink-0">{i + 1}.</span>
                      {d}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Examples */}
              <div className="glass-card p-5">
                <h3 className="text-lingua-text font-semibold text-sm mb-3">Example sentences</h3>
                <div className="space-y-3">
                  {result.examples.map((ex, i) => (
                    <div key={i} className="p-3 rounded-xl bg-lingua-surface/60 border border-lingua-border/30 space-y-1">
                      <p className="text-lingua-text text-sm">🇬🇧 {ex.en}</p>
                      <p className="text-amber-400/90 text-sm">🇪🇹 {ex.am}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Synonyms & Related */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="glass-card p-5">
                  <h3 className="text-lingua-text font-semibold text-sm mb-3">Synonyms</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.synonyms.map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20 text-xs">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="glass-card p-5">
                  <h3 className="text-lingua-text font-semibold text-sm mb-3">Related words</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.related.map((r) => (
                      <button
                        key={r}
                        onClick={() => { setQuery(r); search() }}
                        className="px-2.5 py-1 rounded-lg bg-lingua-blue/10 text-lingua-blue-light border border-lingua-blue/20 text-xs hover:bg-lingua-blue/20 transition-colors"
                      >{r}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
