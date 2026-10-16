export default function ApiPlansPage() {
  const tiers = [
    { name: 'Free', price: 0, calls: '10,000 calls/mo', chars: '500K chars/mo', latency: 'Standard', support: 'Community', color: 'border-lingua-border' },
    { name: 'Growth', price: 49, calls: '500K calls/mo', chars: '5M chars/mo', latency: 'Priority', support: 'Email', color: 'border-lingua-blue/50', popular: true },
    { name: 'Scale', price: 199, calls: '5M calls/mo', chars: '50M chars/mo', latency: 'Ultra-low', support: '24/7 chat', color: 'border-purple-500/40' },
    { name: 'Enterprise', price: null, calls: 'Unlimited', chars: 'Unlimited', latency: 'Dedicated', support: 'Dedicated TAM', color: 'border-amber-500/30' },
  ]

  const codeSample = `// Node.js example
const axios = require('axios');

const response = await axios.post(
  'https://api.linguaai.io/v1/translate',
  {
    text: "Hello, world!",
    source_lang: "EN",
    target_lang: "AM"
  },
  {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    }
  }
);

console.log(response.data.translated_text);
// Output: "ሰላም ዓለም!"`

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 pt-6 pb-4 border-b border-lingua-border/40 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500/20 to-pink-500/5 border border-pink-500/20 flex items-center justify-center text-pink-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
          </div>
          <div>
            <h1 className="text-lingua-text font-bold text-lg">API Plans</h1>
            <p className="text-lingua-muted text-xs">Integrate LinguaAI translation directly into your products</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* API tiers */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tiers.map((t) => (
              <div key={t.name} className={`relative glass-card p-5 flex flex-col gap-3 border ${t.color} hover:shadow-lg transition-all`}>
                {t.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-semibold bg-lingua-blue/20 text-lingua-blue-light border border-lingua-blue/30">
                    Popular
                  </span>
                )}
                <div>
                  <p className="text-lingua-text font-bold">{t.name}</p>
                  {t.price !== null ? (
                    <p className="text-2xl font-black text-lingua-text mt-1">${t.price}<span className="text-lingua-muted text-sm font-normal">/mo</span></p>
                  ) : (
                    <p className="text-2xl font-black text-lingua-text mt-1">Custom</p>
                  )}
                </div>
                <div className="space-y-1.5 text-xs text-lingua-muted">
                  <p>📡 {t.calls}</p>
                  <p>📝 {t.chars}</p>
                  <p>⚡ {t.latency} latency</p>
                  <p>🛟 {t.support}</p>
                </div>
                <button className={`mt-auto py-2 rounded-xl text-xs font-semibold transition-all ${t.popular ? 'btn-primary' : 'btn-secondary border border-lingua-border'}`}>
                  {t.price === null ? 'Contact sales' : 'Get API key'}
                </button>
              </div>
            ))}
          </div>

          {/* Code sample */}
          <div className="glass-card overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-lingua-border/40 bg-lingua-surface/40">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/60" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/60" />
                  <span className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <span className="text-lingua-muted text-xs font-mono">translate.js</span>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(codeSample)}
                className="text-lingua-muted hover:text-lingua-blue-light text-xs flex items-center gap-1.5 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                Copy code
              </button>
            </div>
            <pre className="p-5 text-xs font-mono leading-relaxed text-lingua-subtext overflow-x-auto whitespace-pre">
              {codeSample}
            </pre>
          </div>

          {/* Features grid */}
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: '🔑', title: 'Simple auth', desc: 'Bearer token authentication. Get your key instantly from the dashboard.' },
              { icon: '📖', title: 'Full docs', desc: 'Interactive API explorer, SDK references, and integration guides.' },
              { icon: '🔄', title: 'Webhooks', desc: 'Receive real-time callbacks for async translation jobs and batch processing.' },
              { icon: '🌍', title: '100+ languages', desc: 'All endpoints support Amharic, English, and 100+ other languages.' },
              { icon: '📊', title: 'Usage analytics', desc: 'Track your API usage, latency, error rates, and costs in real time.' },
              { icon: '🛡️', title: 'Enterprise SLA', desc: '99.9% uptime guarantee with dedicated infrastructure for Enterprise.' },
            ].map((f) => (
              <div key={f.title} className="glass-card p-4">
                <span className="text-xl">{f.icon}</span>
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
