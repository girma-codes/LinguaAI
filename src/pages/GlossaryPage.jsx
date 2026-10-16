import { useState } from 'react'

const initialGlossary = [
  { id: 1, en: 'artificial intelligence', am: 'ሰው ሰራሽ አስተውሎት', domain: 'Technology', verified: true },
  { id: 2, en: 'machine learning', am: 'የማሽን ትምህርት', domain: 'Technology', verified: true },
  { id: 3, en: 'translation', am: 'ትርጉም', domain: 'Linguistics', verified: true },
  { id: 4, en: 'software development', am: 'ሶፍትዌር ልማት', domain: 'Technology', verified: false },
  { id: 5, en: 'cloud computing', am: 'ደመና ኮምፒውቲንግ', domain: 'Technology', verified: true },
  { id: 6, en: 'democracy', am: 'ዲሞክራሲ', domain: 'Politics', verified: true },
  { id: 7, en: 'sustainable development', am: 'ዘላቂ ልማት', domain: 'Environment', verified: false },
  { id: 8, en: 'public health', am: 'የህዝብ ጤና', domain: 'Medical', verified: true },
]

const domains = ['All', 'Technology', 'Linguistics', 'Medical', 'Politics', 'Environment', 'Business']

export default function GlossaryPage() {
  const [glossary, setGlossary] = useState(initialGlossary)
  const [search, setSearch] = useState('')
  const [domain, setDomain] = useState('All')
  const [showAdd, setShowAdd] = useState(false)
  const [newEn, setNewEn] = useState('')
  const [newAm, setNewAm] = useState('')
  const [newDomain, setNewDomain] = useState('Technology')

  const filtered = glossary.filter((g) => {
    const matchSearch = !search || g.en.toLowerCase().includes(search.toLowerCase()) || g.am.includes(search)
    const matchDomain = domain === 'All' || g.domain === domain
    return matchSearch && matchDomain
  })

  const addTerm = () => {
    if (!newEn.trim() || !newAm.trim()) return
    setGlossary((prev) => [...prev, { id: Date.now(), en: newEn, am: newAm, domain: newDomain, verified: false }])
    setNewEn(''); setNewAm(''); setShowAdd(false)
  }

  const removeTerm = (id) => setGlossary((prev) => prev.filter((g) => g.id !== id))

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 pt-6 pb-4 border-b border-lingua-border/40 flex-shrink-0">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/20 flex items-center justify-center text-green-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h8m-8 4h8" />
              </svg>
            </div>
            <div>
              <h1 className="text-lingua-text font-bold text-lg">Glossary</h1>
              <p className="text-lingua-muted text-xs">Your personal English ↔ Amharic term list</p>
            </div>
          </div>
          <button onClick={() => setShowAdd(!showAdd)} className="btn-primary flex items-center gap-2 text-xs py-2">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            Add term
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Add term form */}
          {showAdd && (
            <div className="glass-card p-5 tab-content">
              <h3 className="text-lingua-text font-semibold text-sm mb-4">Add new term</h3>
              <div className="grid sm:grid-cols-3 gap-3 mb-3">
                <input
                  value={newEn}
                  onChange={(e) => setNewEn(e.target.value)}
                  placeholder="English term"
                  className="bg-lingua-surface border border-lingua-border text-lingua-text text-sm rounded-xl px-3 py-2.5 outline-none focus:border-lingua-blue/50"
                />
                <input
                  value={newAm}
                  onChange={(e) => setNewAm(e.target.value)}
                  placeholder="አማርኛ ቃል"
                  className="bg-lingua-surface border border-lingua-border text-lingua-text text-sm rounded-xl px-3 py-2.5 outline-none focus:border-lingua-blue/50"
                />
                <select
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                  className="bg-lingua-surface border border-lingua-border text-lingua-text text-sm rounded-xl px-3 py-2.5 outline-none focus:border-lingua-blue/50 cursor-pointer"
                >
                  {domains.filter(d => d !== 'All').map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div className="flex gap-2">
                <button onClick={addTerm} className="btn-primary text-xs py-2">Save term</button>
                <button onClick={() => setShowAdd(false)} className="btn-secondary border border-lingua-border text-xs py-2 px-4 rounded-xl">Cancel</button>
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-lingua-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search terms..."
                className="w-full bg-lingua-surface border border-lingua-border text-lingua-text text-sm rounded-xl pl-9 pr-4 py-2.5 outline-none focus:border-lingua-blue/50"
              />
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {domains.map((d) => (
                <button
                  key={d}
                  onClick={() => setDomain(d)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    domain === d
                      ? 'bg-lingua-blue/20 text-lingua-blue-light border border-lingua-blue/40'
                      : 'bg-lingua-surface text-lingua-muted hover:text-lingua-subtext border border-lingua-border/50'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Stats row */}
          <div className="flex gap-4 text-xs text-lingua-muted">
            <span><span className="text-lingua-text font-semibold">{filtered.length}</span> terms shown</span>
            <span><span className="text-lingua-text font-semibold">{glossary.filter(g => g.verified).length}</span> verified</span>
          </div>

          {/* Table */}
          <div className="glass-card overflow-hidden">
            <div className="grid grid-cols-[1fr_1fr_auto_auto] text-xs text-lingua-muted font-semibold uppercase tracking-wide px-5 py-3 border-b border-lingua-border/40 bg-lingua-surface/30">
              <span>English</span>
              <span>አማርኛ</span>
              <span>Domain</span>
              <span></span>
            </div>
            {filtered.length === 0 ? (
              <div className="p-10 text-center text-lingua-muted text-sm">No terms found.</div>
            ) : (
              filtered.map((g, i) => (
                <div
                  key={g.id}
                  className={`grid grid-cols-[1fr_1fr_auto_auto] items-center px-5 py-3.5 gap-4 hover:bg-lingua-surface/30 transition-colors ${i !== filtered.length - 1 ? 'border-b border-lingua-border/30' : ''}`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-lingua-text text-sm truncate">{g.en}</span>
                    {g.verified && (
                      <svg className="w-3.5 h-3.5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className="text-lingua-subtext text-sm truncate">{g.am}</span>
                  <span className="px-2 py-0.5 rounded-md bg-lingua-surface border border-lingua-border/40 text-lingua-muted text-xs">{g.domain}</span>
                  <button
                    onClick={() => removeTerm(g.id)}
                    className="text-lingua-muted hover:text-red-400 transition-colors p-1 rounded"
                    title="Remove"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
