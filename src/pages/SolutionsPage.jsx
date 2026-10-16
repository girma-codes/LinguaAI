const solutions = [
  {
    icon: '🏢',
    title: 'For Enterprises',
    desc: 'Scalable translation infrastructure for large organizations with SSO, custom glossaries, and dedicated support.',
    features: ['Unlimited volume', 'SSO / SAML', 'Custom AI models', 'On-premise option'],
    color: 'from-lingua-blue/15',
  },
  {
    icon: '👨‍💻',
    title: 'For Developers',
    desc: 'Powerful REST API, webhooks, and SDKs. Integrate translation into any app with a few lines of code.',
    features: ['RESTful API', 'Node, Python, Go SDKs', 'Webhooks', 'Interactive API explorer'],
    color: 'from-purple-500/15',
  },
  {
    icon: '🎓',
    title: 'For Education',
    desc: 'Help students and educators communicate across Amharic and English in classrooms and institutions.',
    features: ['Discounted pricing', 'Bulk seat management', 'LMS integrations', 'Academic support'],
    color: 'from-green-500/15',
  },
  {
    icon: '🏥',
    title: 'For Healthcare',
    desc: 'Accurate medical translation with terminology control, HIPAA compliance, and patient-facing tools.',
    features: ['Medical glossaries', 'HIPAA ready', 'Patient communication', 'Clinical trial docs'],
    color: 'from-amber-500/15',
  },
  {
    icon: '⚖️',
    title: 'For Legal & Government',
    desc: 'Certified translation workflows for legal documents, contracts, and official government communications.',
    features: ['Legal terminology', 'Audit trails', 'Certified output', 'Policy compliance'],
    color: 'from-cyan-500/15',
  },
  {
    icon: '🛒',
    title: 'For E-commerce',
    desc: 'Localize product listings, customer support, and marketing content at scale for Amharic-speaking markets.',
    features: ['Product catalog translation', 'Review localization', 'CMS integrations', 'SEO-ready output'],
    color: 'from-pink-500/15',
  },
]

export default function SolutionsPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="px-6 pt-6 pb-4 border-b border-lingua-border/40 flex-shrink-0">
        <h1 className="text-lingua-text font-bold text-xl">Solutions</h1>
        <p className="text-lingua-muted text-sm mt-0.5">Industry-specific translation solutions built for your needs</p>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {solutions.map((s) => (
              <div key={s.title} className={`glass-card p-6 bg-gradient-to-br ${s.color} to-transparent hover:shadow-xl hover:shadow-black/20 hover:-translate-y-0.5 transition-all duration-200`}>
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="text-lingua-text font-bold text-base mb-2">{s.title}</h3>
                <p className="text-lingua-subtext text-sm leading-relaxed mb-4">{s.desc}</p>
                <ul className="space-y-1.5">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-lingua-muted text-xs">
                      <svg className="w-3.5 h-3.5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className="mt-4 text-lingua-blue-light text-xs font-medium flex items-center gap-1 hover:gap-2 transition-all">
                  Learn more <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
