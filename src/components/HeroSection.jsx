import TranslatorTabs from './TranslatorTabs'
import { useApp, PAGES } from '../context/AppContext'

const StarIcon = () => (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

const ShieldIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)

const BoltIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

const GlobeIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
  </svg>
)

const badges = [
  { icon: <StarIcon />, text: 'Trusted by 10M+ users', color: 'text-amber-400' },
  { icon: <ShieldIcon />, text: 'Enterprise-grade security', color: 'text-green-400' },
  { icon: <BoltIcon />, text: '< 500ms response', color: 'text-lingua-blue-light' },
  { icon: <GlobeIcon />, text: '100+ languages', color: 'text-purple-400' },
]

export default function HeroSection() {
  const { navigate } = useApp()
  return (
    <section className="hero-bg min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Announcement badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lingua-blue/10 border border-lingua-blue/25 text-lingua-blue-light text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-lingua-blue animate-pulse" />
            Now supporting Amharic — Ethiopia's official language
            <span className="px-1.5 py-0.5 rounded-md bg-lingua-blue/20 text-[10px] font-bold border border-lingua-blue/30">NEW</span>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center mb-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.05] text-lingua-text mb-5">
            AI solutions that{' '}
            <span className="relative">
              <span className="bg-gradient-to-r from-lingua-blue via-lingua-blue-light to-lingua-purple bg-clip-text text-transparent">
                help you
              </span>
            </span>
            <br />
            get work done
          </h1>
          <p className="text-lingua-subtext text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Trusted by millions, our end-to-end AI-first translation platform helps you accurately 
            translate text, files, media formats, and voice — easily, securely, with unbeatable quality.
          </p>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10">
          {badges.map((b) => (
            <div key={b.text} className="flex items-center gap-1.5 text-xs text-lingua-muted/80">
              <span className={b.color}>{b.icon}</span>
              {b.text}
            </div>
          ))}
        </div>

        {/* Translator Tabs (main CTA widget) */}
        <TranslatorTabs />

        {/* Social proof row */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          <div className="flex -space-x-2">
            {['🇪🇹', '🇬🇧', '🇩🇪', '🇫🇷', '🇯🇵'].map((flag, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-lingua-surface border-2 border-lingua-dark flex items-center justify-center text-sm shadow"
              >
                {flag}
              </div>
            ))}
          </div>
          <p className="text-lingua-muted text-sm text-center">
            <span className="text-lingua-text font-semibold">10,000,000+</span> professionals translate with LinguaAI daily
          </p>
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map((s) => (
              <svg key={s} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-lingua-muted text-sm ml-1">4.9/5</span>
          </div>
        </div>
      </div>
    </section>
  )
}
