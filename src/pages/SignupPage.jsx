import { useState } from 'react'
import { useApp, PAGES } from '../context/AppContext'

export default function SignupPage() {
  const { navigate } = useApp()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setStep(2) }, 1200)
  }

  if (step === 2) {
    return (
      <div className="flex flex-col h-full items-center justify-center p-6 hero-bg">
        <div className="w-full max-w-sm text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/25 flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-lingua-text font-black text-2xl mb-2">Account created!</h2>
          <p className="text-lingua-muted text-sm mb-6">Welcome to LinguaAI, {form.name || 'there'}! Your free trial starts now.</p>
          <button onClick={() => navigate(PAGES.HOME)} className="btn-primary w-full py-3 shadow-lg shadow-lingua-blue/20">
            Start translating →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full items-center justify-center p-6 hero-bg">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-lingua-blue to-lingua-purple flex items-center justify-center shadow-xl shadow-lingua-blue/30 mb-3">
            <span className="text-white font-black text-xl">L</span>
          </div>
          <h1 className="text-lingua-text font-black text-2xl">Start for free</h1>
          <p className="text-lingua-muted text-sm mt-1">No credit card required · Cancel anytime</p>
        </div>

        {/* Perks */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mb-6">
          {['500K chars/mo free', 'Amharic support', '14-day Pro trial'].map((p) => (
            <span key={p} className="text-xs text-lingua-muted flex items-center gap-1">
              <svg className="w-3 h-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              {p}
            </span>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
          {[
            { key: 'name', label: 'Full name', type: 'text', placeholder: 'Abebe Girma' },
            { key: 'email', label: 'Email address', type: 'email', placeholder: 'you@example.com' },
            { key: 'password', label: 'Password', type: 'password', placeholder: '8+ characters' },
          ].map((f) => (
            <div key={f.key}>
              <label className="text-lingua-muted text-xs mb-1.5 block font-medium">{f.label}</label>
              <input
                type={f.type}
                value={form[f.key]}
                onChange={(e) => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                placeholder={f.placeholder}
                className="w-full bg-lingua-surface border border-lingua-border text-lingua-text text-sm rounded-xl px-4 py-3 outline-none focus:border-lingua-blue/60 transition-colors placeholder:text-lingua-muted/50"
              />
            </div>
          ))}

          <p className="text-lingua-muted/70 text-xs">
            By creating an account you agree to our{' '}
            <span className="text-lingua-blue-light cursor-pointer hover:underline">Terms</span> and{' '}
            <span className="text-lingua-blue-light cursor-pointer hover:underline">Privacy Policy</span>.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 flex items-center justify-center gap-2 shadow-lg shadow-lingua-blue/20"
          >
            {loading ? (
              <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating account...</>
            ) : 'Create free account'}
          </button>
        </form>

        <p className="text-center text-lingua-muted text-sm mt-5">
          Already have an account?{' '}
          <button onClick={() => navigate(PAGES.LOGIN)} className="text-lingua-blue-light hover:underline font-medium">Sign in</button>
        </p>
      </div>
    </div>
  )
}
