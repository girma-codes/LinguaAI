const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: 'from-lingua-blue/20 to-lingua-blue/5',
    iconColor: 'text-lingua-blue-light',
    title: 'AI-Powered Accuracy',
    desc: 'Our neural AI engine delivers context-aware translations that understand idioms, tone, and domain-specific language — not just word-for-word output.',
    stat: '98.5%',
    statLabel: 'accuracy rate',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ),
    color: 'from-purple-500/20 to-purple-500/5',
    iconColor: 'text-purple-400',
    title: 'Amharic First',
    desc: 'Built with deep support for Amharic script (Ge\'ez), tonal nuances, and cultural context. The first AI translation platform that truly understands አማርኛ.',
    stat: '50+',
    statLabel: 'Amharic dialects',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: 'from-amber-500/20 to-amber-500/5',
    iconColor: 'text-amber-400',
    title: 'Real-Time Speed',
    desc: 'Get translations in under 500ms. Whether you\'re translating a single sentence or processing thousands of documents, speed never compromises quality.',
    stat: '< 500ms',
    statLabel: 'avg. response time',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    color: 'from-green-500/20 to-green-500/5',
    iconColor: 'text-green-400',
    title: 'Enterprise Security',
    desc: 'Your data never trains our models. End-to-end encryption, SOC 2 Type II certified, GDPR compliant — built for organizations that take data privacy seriously.',
    stat: 'SOC 2',
    statLabel: 'Type II certified',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    color: 'from-cyan-500/20 to-cyan-500/5',
    iconColor: 'text-cyan-400',
    title: 'Document Translation',
    desc: 'Upload PDF, DOCX, PPTX, and more. We preserve your original formatting, fonts, and layout so your translated documents look exactly like the source.',
    stat: '20+',
    statLabel: 'file formats',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    color: 'from-pink-500/20 to-pink-500/5',
    iconColor: 'text-pink-400',
    title: 'Developer API',
    desc: 'RESTful API with SDKs for Node.js, Python, Go, Java, and more. Integrate professional-grade translation into your products with a few lines of code.',
    stat: '99.9%',
    statLabel: 'API uptime SLA',
  },
]

const stats = [
  { value: '10M+', label: 'Active users worldwide' },
  { value: '100+', label: 'Languages supported' },
  { value: '2B+', label: 'Words translated daily' },
  { value: '150+', label: 'Enterprise customers' },
]

import { useApp, PAGES } from '../context/AppContext'

export default function FeaturesSection() {
  const { navigate } = useApp()
  return (
    <>
      {/* Stats Bar */}
      <section className="py-12 px-4 border-y border-lingua-border/40 bg-lingua-surface/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.value} className="text-center">
                <p className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-lingua-text to-lingua-subtext bg-clip-text text-transparent mb-1">
                  {s.value}
                </p>
                <p className="text-lingua-muted text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 rounded-full bg-lingua-blue/10 border border-lingua-blue/25 text-lingua-blue-light text-xs font-semibold mb-4 tracking-wide uppercase">
              Why LinguaAI
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-lingua-text mb-4 leading-tight">
              Translation that works <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-lingua-blue to-lingua-purple bg-clip-text text-transparent">as hard as you do</span>
            </h2>
            <p className="text-lingua-subtext text-base max-w-xl mx-auto">
              Professional-grade tools trusted by individuals, teams, and Fortune 500 companies worldwide.
            </p>
          </div>

          {/* Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feat) => (
              <div
                key={feat.title}
                className="group glass-card p-6 hover:border-lingua-border hover:bg-lingua-card/80 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20"
              >
                {/* Icon */}
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feat.color} flex items-center justify-center mb-4 ${feat.iconColor} border border-white/5`}>
                  {feat.icon}
                </div>

                {/* Title */}
                <h3 className="text-lingua-text font-bold text-base mb-2">{feat.title}</h3>

                {/* Description */}
                <p className="text-lingua-muted text-sm leading-relaxed mb-4">{feat.desc}</p>

                {/* Stat badge */}
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-lingua-text">{feat.stat}</span>
                  <span className="text-lingua-muted text-xs">{feat.statLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-lingua-blue/15 via-lingua-surface to-lingua-purple/10 border border-lingua-border p-8 sm:p-12 text-center">
            {/* Decorative glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-lingua-blue/10 rounded-full blur-3xl -z-0 pointer-events-none" />
            
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-lingua-blue/15 border border-lingua-blue/30 text-lingua-blue-light text-xs font-semibold mb-5">
                🇪🇹 አማርኛ ትርጉም — Free to start
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-lingua-text mb-4">
                Start translating for free today
              </h2>
              <p className="text-lingua-subtext text-base mb-8 max-w-xl mx-auto">
                No credit card required. Get 500,000 characters free every month. 
                Upgrade anytime for unlimited access.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button className="btn-primary px-8 py-3.5 text-base shadow-xl shadow-lingua-blue/25 hover:scale-[1.02] transition-transform" onClick={() => navigate(PAGES.SIGNUP)}>
                  Start free trial
                </button>
                <button className="btn-secondary border border-lingua-border px-8 py-3.5 rounded-xl text-base hover:bg-lingua-surface transition-all" onClick={() => navigate(PAGES.PRICING)}>
                  View pricing
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
