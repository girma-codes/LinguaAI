import { useState } from 'react'

export default function AccountPage() {
  const [name, setName] = useState('Abebe Girma')
  const [email, setEmail] = useState('abebe@example.com')
  const [activeTab, setActiveTab] = useState('profile')
  const [saved, setSaved] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true, weekly: false, product: true, security: true,
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'security', label: 'Security' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'usage', label: 'Usage' },
  ]

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 pt-6 pb-4 border-b border-lingua-border/40 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/20 flex items-center justify-center text-green-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </div>
          <div>
            <h1 className="text-lingua-text font-bold text-lg">Account Settings</h1>
            <p className="text-lingua-muted text-xs">Manage your profile, security, and preferences</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-3xl mx-auto space-y-5">
          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-lingua-surface rounded-xl border border-lingua-border/50 w-fit">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === t.id ? 'bg-lingua-card text-lingua-text shadow border border-lingua-border' : 'text-lingua-muted hover:text-lingua-subtext'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Profile tab */}
          {activeTab === 'profile' && (
            <div className="space-y-4 tab-content">
              {/* Avatar */}
              <div className="glass-card p-5 flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-lingua-blue to-lingua-purple flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-lingua-blue/20">
                  {name.charAt(0)}
                </div>
                <div>
                  <p className="text-lingua-text font-semibold">{name}</p>
                  <p className="text-lingua-muted text-sm">{email}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-lingua-blue/15 text-lingua-blue-light text-xs border border-lingua-blue/25">Pro plan</span>
                </div>
                <button className="ml-auto btn-secondary border border-lingua-border text-xs px-4 py-2 rounded-xl">
                  Change photo
                </button>
              </div>

              {/* Form */}
              <div className="glass-card p-5 space-y-4">
                <h3 className="text-lingua-text font-semibold text-sm">Personal information</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-lingua-muted text-xs mb-1.5 block">Full name</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-lingua-surface border border-lingua-border text-lingua-text text-sm rounded-xl px-3 py-2.5 outline-none focus:border-lingua-blue/50"
                    />
                  </div>
                  <div>
                    <label className="text-lingua-muted text-xs mb-1.5 block">Email address</label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="w-full bg-lingua-surface border border-lingua-border text-lingua-text text-sm rounded-xl px-3 py-2.5 outline-none focus:border-lingua-blue/50"
                    />
                  </div>
                  <div>
                    <label className="text-lingua-muted text-xs mb-1.5 block">Default source language</label>
                    <select className="w-full bg-lingua-surface border border-lingua-border text-lingua-text text-sm rounded-xl px-3 py-2.5 outline-none focus:border-lingua-blue/50 cursor-pointer">
                      <option>🇬🇧 English</option>
                      <option>🇪🇹 Amharic</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-lingua-muted text-xs mb-1.5 block">Default target language</label>
                    <select className="w-full bg-lingua-surface border border-lingua-border text-lingua-text text-sm rounded-xl px-3 py-2.5 outline-none focus:border-lingua-blue/50 cursor-pointer">
                      <option>🇪🇹 Amharic</option>
                      <option>🇬🇧 English</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={handleSave} className={`btn-primary flex items-center gap-2 ${saved ? 'bg-green-500 hover:bg-green-500' : ''}`}>
                    {saved ? (
                      <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg> Saved!</>
                    ) : 'Save changes'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security tab */}
          {activeTab === 'security' && (
            <div className="space-y-4 tab-content">
              <div className="glass-card p-5 space-y-4">
                <h3 className="text-lingua-text font-semibold text-sm">Change password</h3>
                {['Current password', 'New password', 'Confirm new password'].map((label) => (
                  <div key={label}>
                    <label className="text-lingua-muted text-xs mb-1.5 block">{label}</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-lingua-surface border border-lingua-border text-lingua-text text-sm rounded-xl px-3 py-2.5 outline-none focus:border-lingua-blue/50" />
                  </div>
                ))}
                <button className="btn-primary">Update password</button>
              </div>
              <div className="glass-card p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lingua-text font-semibold text-sm">Two-factor authentication</h3>
                    <p className="text-lingua-muted text-xs mt-0.5">Add an extra layer of security to your account</p>
                  </div>
                  <button className="btn-primary text-xs py-2">Enable 2FA</button>
                </div>
              </div>
              <div className="glass-card p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lingua-text font-semibold text-sm">API keys</h3>
                    <p className="text-lingua-muted text-xs mt-0.5">Manage API keys for programmatic access</p>
                  </div>
                  <button className="btn-secondary border border-lingua-border text-xs py-2 px-4 rounded-xl">Manage keys</button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications tab */}
          {activeTab === 'notifications' && (
            <div className="glass-card p-5 space-y-4 tab-content">
              <h3 className="text-lingua-text font-semibold text-sm">Email notifications</h3>
              {Object.entries(notifications).map(([key, val]) => {
                const labels = { email: 'Translation completed emails', weekly: 'Weekly usage digest', product: 'Product updates & new features', security: 'Security alerts' }
                return (
                  <div key={key} className="flex items-center justify-between py-2 border-b border-lingua-border/30 last:border-0">
                    <span className="text-lingua-subtext text-sm">{labels[key]}</span>
                    <button
                      onClick={() => setNotifications(prev => ({ ...prev, [key]: !prev[key] }))}
                      className={`relative w-10 h-5 rounded-full transition-colors ${val ? 'bg-lingua-blue' : 'bg-lingua-surface border border-lingua-border'}`}
                    >
                      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${val ? 'left-5.5 left-[22px]' : 'left-0.5'}`} />
                    </button>
                  </div>
                )
              })}
            </div>
          )}

          {/* Usage tab */}
          {activeTab === 'usage' && (
            <div className="space-y-4 tab-content">
              <div className="glass-card p-5">
                <h3 className="text-lingua-text font-semibold text-sm mb-4">This month's usage</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Characters translated', used: 1240000, total: 5000000, color: 'bg-lingua-blue' },
                    { label: 'File translations', used: 12, total: null, color: 'bg-purple-500' },
                    { label: 'API calls', used: 48200, total: 500000, color: 'bg-amber-500' },
                  ].map((u) => (
                    <div key={u.label}>
                      <div className="flex justify-between text-xs text-lingua-muted mb-1.5">
                        <span>{u.label}</span>
                        <span>{u.total ? `${(u.used / 1000).toFixed(0)}K / ${(u.total / 1000).toFixed(0)}K` : u.used}</span>
                      </div>
                      {u.total && (
                        <div className="h-2 bg-lingua-surface rounded-full overflow-hidden">
                          <div
                            className={`h-full ${u.color} rounded-full transition-all`}
                            style={{ width: `${Math.min((u.used / u.total) * 100, 100)}%` }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass-card p-5 flex items-center justify-between">
                <div>
                  <p className="text-lingua-text font-semibold text-sm">Current plan: Pro</p>
                  <p className="text-lingua-muted text-xs mt-0.5">Renews on November 1, 2026</p>
                </div>
                <button className="btn-primary text-xs py-2">Upgrade plan</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
