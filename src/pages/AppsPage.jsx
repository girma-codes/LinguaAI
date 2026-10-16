const apps = [
  {
    platform: 'iOS',
    icon: '🍎',
    name: 'LinguaAI for iPhone & iPad',
    desc: 'Full translation suite optimized for iOS. Offline mode, Siri Shortcuts, and live camera translation.',
    features: ['Offline mode', 'Camera translation', 'Siri Shortcuts', 'iCloud sync'],
    store: 'App Store',
    storeIcon: '🍎',
    badge: 'Free',
    rating: '4.9',
    color: 'from-gray-500/10',
  },
  {
    platform: 'Android',
    icon: '🤖',
    name: 'LinguaAI for Android',
    desc: 'Feature-rich Android app with live overlay translation, Wear OS support, and home screen widgets.',
    features: ['Overlay translation', 'Wear OS widget', 'Google Assistant', 'Offline packs'],
    store: 'Google Play',
    storeIcon: '▶️',
    badge: 'Free',
    rating: '4.8',
    color: 'from-green-500/10',
  },
  {
    platform: 'macOS',
    icon: '💻',
    name: 'LinguaAI Desktop for Mac',
    desc: 'Native macOS app with system-wide translation shortcut, menu bar access, and file batch processing.',
    features: ['Menu bar access', 'Global shortcut', 'Batch file translation', 'Native M1/M2'],
    store: 'Mac App Store',
    storeIcon: '🍎',
    badge: 'New',
    rating: '4.7',
    color: 'from-lingua-blue/10',
  },
  {
    platform: 'Windows',
    icon: '🪟',
    name: 'LinguaAI for Windows',
    desc: 'Windows 11 native app with taskbar integration, clipboard translation, and Office add-in support.',
    features: ['Taskbar integration', 'Clipboard translate', 'Office add-in', 'Windows Hello'],
    store: 'Microsoft Store',
    storeIcon: '🪟',
    badge: 'New',
    rating: '4.6',
    color: 'from-purple-500/10',
  },
  {
    platform: 'Chrome',
    icon: '🌐',
    name: 'Browser Extension',
    desc: 'Translate any webpage, selected text, or input field directly in your browser with one click.',
    features: ['Webpage translation', 'Right-click translate', 'Form field translation', 'PDF translate'],
    store: 'Chrome Web Store',
    storeIcon: '🌐',
    badge: null,
    rating: '4.8',
    color: 'from-amber-500/10',
  },
  {
    platform: 'API',
    icon: '⚙️',
    name: 'VS Code Extension',
    desc: 'Translate code comments, strings, and documentation directly inside Visual Studio Code.',
    features: ['Inline translation', 'Comment translation', 'Multi-lang support', 'Settings sync'],
    store: 'VS Code Marketplace',
    storeIcon: '⚙️',
    badge: 'Beta',
    rating: '4.5',
    color: 'from-cyan-500/10',
  },
]

export default function AppsPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="px-6 pt-6 pb-4 border-b border-lingua-border/40 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-lingua-text font-bold text-xl">Apps</h1>
            <p className="text-lingua-muted text-sm mt-0.5">LinguaAI on every device and platform</p>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-lingua-blue/20 text-lingua-blue-light text-xs font-semibold border border-lingua-blue/25 animate-pulse">New</span>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {apps.map((app) => (
              <div key={app.platform} className={`glass-card p-6 bg-gradient-to-br ${app.color} to-transparent hover:shadow-xl hover:shadow-black/20 hover:-translate-y-0.5 transition-all duration-200 flex flex-col`}>
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{app.icon}</span>
                  <div className="flex items-center gap-1.5">
                    {app.badge && (
                      <span className="px-1.5 py-0.5 rounded-md bg-lingua-blue/20 text-lingua-blue-light text-[10px] font-semibold border border-lingua-blue/25">
                        {app.badge}
                      </span>
                    )}
                    <span className="text-amber-400 text-xs">★ {app.rating}</span>
                  </div>
                </div>

                <h3 className="text-lingua-text font-bold text-sm mb-1">{app.name}</h3>
                <p className="text-lingua-subtext text-xs leading-relaxed mb-4 flex-1">{app.desc}</p>

                <ul className="space-y-1 mb-4">
                  {app.features.map((f) => (
                    <li key={f} className="flex items-center gap-1.5 text-lingua-muted text-xs">
                      <svg className="w-3 h-3 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <button className="btn-primary py-2 text-xs w-full">
                  {app.storeIcon} Download on {app.store}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
