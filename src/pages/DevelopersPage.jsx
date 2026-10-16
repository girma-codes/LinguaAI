import { useApp, PAGES } from '../context/AppContext'

const endpoints = [
  { method: 'POST', path: '/v1/translate', desc: 'Translate text between languages' },
  { method: 'POST', path: '/v1/translate/file', desc: 'Upload and translate a document' },
  { method: 'POST', path: '/v1/translate/speech', desc: 'Translate audio to text + target lang' },
  { method: 'GET',  path: '/v1/languages',        desc: 'List all supported languages' },
  { method: 'GET',  path: '/v1/usage',            desc: 'Get current API usage & limits' },
  { method: 'POST', path: '/v1/glossary',         desc: 'Create a custom glossary' },
]

const methodColor = { POST: 'text-green-400 bg-green-500/10', GET: 'text-lingua-blue-light bg-lingua-blue/10', DELETE: 'text-red-400 bg-red-500/10' }

const sdks = [
  { lang: 'Node.js', icon: '🟩', install: 'npm install linguaai-sdk' },
  { lang: 'Python',  icon: '🐍', install: 'pip install linguaai' },
  { lang: 'Go',      icon: '🐹', install: 'go get github.com/linguaai/go-sdk' },
  { lang: 'Java',    icon: '☕', install: 'implementation "io.linguaai:sdk:1.0"' },
]

export default function DevelopersPage() {
  const { navigate } = useApp()

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 pt-6 pb-4 border-b border-lingua-border/40 flex-shrink-0">
        <h1 className="text-lingua-text font-bold text-xl">Developers</h1>
        <p className="text-lingua-muted text-sm mt-0.5">Everything you need to integrate LinguaAI into your apps</p>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-5xl mx-auto space-y-7">
          {/* Quick start */}
          <div className="glass-card p-6 bg-gradient-to-br from-lingua-blue/10 to-transparent border-lingua-blue/30">
            <h2 className="text-lingua-text font-bold text-base mb-1">Quick start</h2>
            <p className="text-lingua-muted text-sm mb-4">Make your first API call in under 2 minutes</p>
            <div className="bg-lingua-darker rounded-xl border border-lingua-border/50 p-4 font-mono text-xs text-lingua-subtext overflow-x-auto">
              <p className="text-lingua-muted mb-2"># Get your API key at linguaai.io/developers</p>
              <p><span className="text-lingua-blue-light">curl</span> -X POST https://api.linguaai.io/v1/translate \</p>
              <p className="pl-4">-H <span className="text-green-400">"Authorization: Bearer YOUR_KEY"</span> \</p>
              <p className="pl-4">-H <span className="text-green-400">"Content-Type: application/json"</span> \</p>
              <p className="pl-4">-d <span className="text-green-400">'{`{"text":"Hello","source_lang":"EN","target_lang":"AM"}`}'</span></p>
              <p className="mt-3 text-lingua-muted"># Response: {`{"translated_text": "ሰላም", "detected_lang": "EN"}`}</p>
            </div>
            <button onClick={() => navigate(PAGES.API_PLANS)} className="btn-primary mt-4 text-xs py-2">Get API key →</button>
          </div>

          {/* Endpoints */}
          <div>
            <h2 className="text-lingua-text font-bold text-base mb-3">API Reference</h2>
            <div className="glass-card overflow-hidden">
              {endpoints.map((ep, i) => (
                <div key={ep.path} className={`flex items-center gap-4 px-5 py-3.5 ${i !== endpoints.length - 1 ? 'border-b border-lingua-border/30' : ''} hover:bg-lingua-surface/30 transition-colors`}>
                  <span className={`px-2 py-0.5 rounded-md text-xs font-mono font-bold flex-shrink-0 ${methodColor[ep.method]}`}>{ep.method}</span>
                  <span className="font-mono text-lingua-text text-sm flex-shrink-0">{ep.path}</span>
                  <span className="text-lingua-muted text-sm">{ep.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SDKs */}
          <div>
            <h2 className="text-lingua-text font-bold text-base mb-3">Official SDKs</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {sdks.map((sdk) => (
                <div key={sdk.lang} className="glass-card p-4 flex items-center gap-4">
                  <span className="text-2xl flex-shrink-0">{sdk.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-lingua-text font-semibold text-sm">{sdk.lang}</p>
                    <p className="font-mono text-lingua-muted text-xs mt-0.5 truncate">{sdk.install}</p>
                  </div>
                  <button className="btn-secondary border border-lingua-border text-xs py-1.5 px-3 rounded-lg flex-shrink-0">Install</button>
                </div>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: '📖', title: 'API Docs', desc: 'Full reference documentation with interactive explorer', cta: 'Read docs' },
              { icon: '🔑', title: 'API Keys', desc: 'Create and manage API keys for your projects', cta: 'Manage keys' },
              { icon: '💬', title: 'Developer Forum', desc: 'Community support, tips, and integration help', cta: 'Join forum' },
            ].map((r) => (
              <div key={r.title} className="glass-card p-5 text-center hover:border-lingua-border transition-colors">
                <span className="text-3xl">{r.icon}</span>
                <h3 className="text-lingua-text font-semibold text-sm mt-3 mb-1">{r.title}</h3>
                <p className="text-lingua-muted text-xs leading-relaxed mb-3">{r.desc}</p>
                <button className="text-lingua-blue-light text-xs font-medium hover:underline">{r.cta} →</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
