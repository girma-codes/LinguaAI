import { useState } from 'react'
import { useApp, PAGES } from '../context/AppContext'

// ── Icons ──────────────────────────────────────────────────────────────
const GoogleIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
)
const GithubIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)
const PasskeyIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
  </svg>
)
const EyeIcon = () => (
  <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
)
const EyeOffIcon = () => (
  <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
)

// ── Dots loading overlay (website dark theme, purple dots) ─────────────
function DotsLoader() {
  return (
    <div
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center"
      style={{ background: '#0a0a0f' }}
    >
      <div className="flex items-center gap-3">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            style={{
              width: 16,
              height: 16,
              borderRadius: '50%',
              background: `rgba(124,58,237,${1 - i * 0.18})`,
              display: 'inline-block',
              animation: `dotWave 1.3s ease-in-out ${i * 0.14}s infinite`,
            }}
          />
        ))}
      </div>
      <p
        style={{
          color: 'rgba(136,136,170,0.7)',
          fontSize: 13,
          marginTop: 20,
          letterSpacing: 1,
        }}
      >
        Signing in…
      </p>
      <style>{`
        @keyframes dotWave {
          0%, 60%, 100% { transform: translateY(0) scale(1); }
          30%            { transform: translateY(-10px) scale(1.2); }
        }
      `}</style>
    </div>
  )
}

// ── Main LoginPage ─────────────────────────────────────────────────────
export default function LoginPage() {
  const { navigate } = useApp()
  const [email, setEmail]               = useState('')
  const [password, setPassword]         = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [keepLoggedIn, setKeepLoggedIn] = useState(false)
  const [loading, setLoading]           = useState(false)
  const [error, setError]               = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) { setError('Please enter your email address.'); return }
    if (!password)     { setError('Please enter your password.');       return }
    setError('')
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate(PAGES.HOME)
    }, 1800)
  }

  // Show dots loader over dark background while signing in
  if (loading) return <DotsLoader />

  return (
    // ── Website dark theme background ──────────────────────────────────
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: 'radial-gradient(ellipse 90% 60% at 50% -10%, rgba(79,110,247,0.10), transparent 70%), #0a0a0f',
      }}
    >
      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-10">

        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-lingua-blue to-lingua-purple flex items-center justify-center shadow-lg shadow-lingua-blue/30">
            <span className="text-white font-black text-lg">L</span>
          </div>
          <span className="text-lingua-text font-bold text-2xl tracking-tight">LinguaAI</span>
        </div>

        {/* ── Card — dark themed ── */}
        <div className="w-full max-w-[440px] bg-lingua-card border border-lingua-border rounded-2xl shadow-2xl shadow-black/40 overflow-hidden">
          <div className="px-7 pt-7 pb-6">

            {/* Heading */}
            <h1 className="text-lingua-text font-bold text-xl text-center mb-6 tracking-tight">
              Log in to your account
            </h1>

            {/* Error */}
            {error && (
              <div className="mb-4 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            {/* Social buttons */}
            <div className="space-y-2.5 mb-5">
              {[
                { icon: <GoogleIcon />,  label: 'Log in with Google' },
                { icon: <GithubIcon />,  label: 'Log in with GitHub' },
                { icon: <PasskeyIcon />, label: 'Log in with a Passkey' },
              ].map(({ icon, label }) => (
                <button
                  key={label}
                  type="button"
                  className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl
                             border border-lingua-border bg-lingua-surface
                             hover:bg-lingua-surface/80 hover:border-lingua-border
                             text-lingua-subtext hover:text-lingua-text
                             font-medium text-sm transition-all"
                >
                  {icon}
                  {label}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-lingua-border/60" />
              <span className="text-lingua-muted text-xs">or</span>
              <div className="flex-1 h-px bg-lingua-border/60" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>

              {/* Email */}
              <div>
                <label className="block text-lingua-text font-semibold text-sm mb-1.5">
                  Email Address
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full bg-lingua-surface border border-lingua-border rounded-xl px-4 py-3
                             text-sm text-lingua-text placeholder:text-lingua-muted/50
                             outline-none focus:border-lingua-blue/50 focus:ring-2 focus:ring-lingua-blue/10
                             transition-all"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-lingua-text font-semibold text-sm">Password</label>
                  <button
                    type="button"
                    className="text-lingua-blue-light hover:text-lingua-blue text-sm font-medium transition-colors"
                  >
                    I forgot my password
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    className="w-full bg-lingua-surface/80 border border-lingua-border rounded-xl
                               px-4 py-3 pr-11 text-sm text-lingua-text
                               outline-none focus:border-lingua-blue/50 focus:ring-2 focus:ring-lingua-blue/10
                               transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-lingua-muted hover:text-lingua-subtext transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>

              {/* Keep me logged in */}
              <div className="flex items-center gap-3 pt-0.5">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={keepLoggedIn}
                  onClick={() => setKeepLoggedIn(!keepLoggedIn)}
                  className={`w-[18px] h-[18px] rounded border-2 flex items-center justify-center
                              flex-shrink-0 transition-all ${
                    keepLoggedIn
                      ? 'bg-lingua-blue border-lingua-blue'
                      : 'bg-transparent border-lingua-border hover:border-lingua-muted'
                  }`}
                >
                  {keepLoggedIn && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
                <span
                  className="text-lingua-muted text-sm cursor-pointer select-none hover:text-lingua-subtext transition-colors"
                  onClick={() => setKeepLoggedIn(!keepLoggedIn)}
                >
                  Keep me logged in
                </span>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full mt-1 py-3.5 rounded-xl bg-lingua-blue hover:bg-lingua-blue-dark
                           text-white font-semibold text-sm transition-all
                           shadow-lg shadow-lingua-blue/25 flex items-center justify-center"
              >
                Log in
              </button>
            </form>
          </div>

          {/* Card footer — sign up link */}
          <div className="px-7 py-4 bg-lingua-surface/40 border-t border-lingua-border/60 text-center">
            <p className="text-lingua-muted text-sm">
              Don't have an account?{' '}
              <button
                onClick={() => navigate(PAGES.SIGNUP)}
                className="text-lingua-blue-light hover:text-lingua-blue font-semibold transition-colors"
              >
                Create one for free
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* ── Page footer ── always visible at bottom ── */}
      <footer className="flex-shrink-0 pb-6 pt-2 flex flex-col items-center gap-2.5">
        <div className="flex items-center gap-4 flex-wrap justify-center">
          {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Help Center', 'Status'].map((l) => (
            <button
              key={l}
              className="text-lingua-muted/60 hover:text-lingua-muted text-xs transition-colors"
            >
              {l}
            </button>
          ))}
        </div>
        <p className="text-lingua-muted/40 text-xs">
          © 2026 LinguaAI Technologies. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
