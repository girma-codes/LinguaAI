import { useApp, PAGES } from '../context/AppContext'

const products = [
  {
    page: PAGES.HOME,
    icon: '🌐',
    name: 'LinguaAI Translator',
    tagline: 'The core translation experience',
    desc: 'Translate text between Amharic, English, and 100+ languages with unbeatable AI accuracy. Fast, private, and context-aware.',
    color: 'from-lingua-blue/20 to-lingua-blue/5',
    border: 'border-lingua-blue/30',
    iconBg: 'bg-lingua-blue/15 text-lingua-blue-light',
    badge: 'Core product',
  },
  {
    page: PAGES.TRANSLATE_FILES,
    icon: '📄',
    name: 'File Translation',
    tagline: 'Translate any document format',
    desc: 'Drag and drop PDF, DOCX, PPTX, and more. Formatting and layout preserved exactly as the original.',
    color: 'from-amber-500/15 to-amber-500/5',
    border: 'border-amber-500/20',
    iconBg: 'bg-amber-500/15 text-amber-400',
    badge: null,
  },
  {
    page: PAGES.WRITE,
    icon: '✍️',
    name: 'LinguaAI Write',
    tagline: 'AI writing improvement',
    desc: 'Rephrase, improve tone, fix grammar, and polish your Amharic or English writing with AI assistance.',
    color: 'from-purple-500/15 to-purple-500/5',
    border: 'border-purple-500/20',
    iconBg: 'bg-purple-500/15 text-purple-400',
    badge: null,
  },
  {
    page: PAGES.VOICE,
    icon: '🎙️',
    name: 'LinguaAI Voice',
    tagline: 'Real-time speech translation',
    desc: 'Speak in one language, hear in another. Real-time voice translation with 30+ supported languages.',
    color: 'from-cyan-500/15 to-cyan-500/5',
    border: 'border-cyan-500/20',
    iconBg: 'bg-cyan-500/15 text-cyan-400',
    badge: 'Beta',
  },
  {
    page: PAGES.DICTIONARY,
    icon: '📚',
    name: 'Dictionary',
    tagline: 'Bilingual English–Amharic',
    desc: 'Deep word definitions, phonetics, example sentences, and cultural context for Amharic and English.',
    color: 'from-green-500/15 to-green-500/5',
    border: 'border-green-500/20',
    iconBg: 'bg-green-500/15 text-green-400',
    badge: null,
  },
  {
    page: PAGES.GLOSSARY,
    icon: '📋',
    name: 'Glossary Manager',
    tagline: 'Custom terminology lists',
    desc: 'Build and manage your own bilingual glossaries for consistent translations across documents and teams.',
    color: 'from-pink-500/15 to-pink-500/5',
    border: 'border-pink-500/20',
    iconBg: 'bg-pink-500/15 text-pink-400',
    badge: null,
  },
]

export default function ProductsPage() {
  const { navigate } = useApp()

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 pt-6 pb-4 border-b border-lingua-border/40 flex-shrink-0">
        <h1 className="text-lingua-text font-bold text-xl">Products</h1>
        <p className="text-lingua-muted text-sm mt-0.5">The complete LinguaAI product suite for Amharic & English</p>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((p) => (
              <button
                key={p.name}
                onClick={() => navigate(p.page)}
                className={`text-left glass-card p-6 border hover:shadow-xl hover:shadow-black/20 hover:-translate-y-0.5 transition-all duration-200 bg-gradient-to-br ${p.color} ${p.border} group`}
              >
                <div className={`w-12 h-12 rounded-2xl ${p.iconBg} flex items-center justify-center text-2xl mb-4 shadow-sm`}>
                  {p.icon}
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lingua-text font-bold text-base group-hover:text-white transition-colors">{p.name}</h3>
                  {p.badge && (
                    <span className="px-1.5 py-0.5 rounded-md bg-lingua-blue/20 text-lingua-blue-light text-[10px] font-semibold border border-lingua-blue/25">
                      {p.badge}
                    </span>
                  )}
                </div>
                <p className="text-lingua-muted text-xs mb-2">{p.tagline}</p>
                <p className="text-lingua-subtext text-sm leading-relaxed">{p.desc}</p>
                <div className="flex items-center gap-1 mt-4 text-lingua-blue-light text-xs font-medium">
                  Open <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
