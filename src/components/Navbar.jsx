import { useState } from 'react'
import { useApp, PAGES } from '../context/AppContext'

const ChevronDown = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
)
const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
)
const HamburgerIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

const navItems = [
  { label: 'Products',   page: PAGES.PRODUCTS,   hasDropdown: true },
  { label: 'Solutions',  page: PAGES.SOLUTIONS,  hasDropdown: true },
  { label: 'Developers', page: PAGES.DEVELOPERS, hasDropdown: true },
  { label: 'Pricing',    page: PAGES.PRICING,    hasDropdown: false },
  { label: 'Apps',       page: PAGES.APPS,       hasDropdown: false, badge: 'New' },
]

const dropdowns = {
  Products: [
    { label: 'Translator',        icon: '🌐', page: PAGES.HOME },
    { label: 'Translate Files',   icon: '📄', page: PAGES.TRANSLATE_FILES },
    { label: 'LinguaAI Write',    icon: '✍️', page: PAGES.WRITE },
    { label: 'LinguaAI Voice',    icon: '🎙️', page: PAGES.VOICE },
    { label: 'Dictionary',        icon: '📚', page: PAGES.DICTIONARY },
  ],
  Solutions: [
    { label: 'For Enterprises',   icon: '🏢', page: PAGES.SOLUTIONS },
    { label: 'For Developers',    icon: '👨‍💻', page: PAGES.SOLUTIONS },
    { label: 'For Education',     icon: '🎓', page: PAGES.SOLUTIONS },
    { label: 'For Healthcare',    icon: '🏥', page: PAGES.SOLUTIONS },
  ],
  Developers: [
    { label: 'API Reference',     icon: '📖', page: PAGES.DEVELOPERS },
    { label: 'API Plans',         icon: '⚡', page: PAGES.API_PLANS },
    { label: 'SDKs',              icon: '🔧', page: PAGES.DEVELOPERS },
    { label: 'Documentation',     icon: '📝', page: PAGES.DEVELOPERS },
  ],
}

export default function Navbar({ onSidebarToggle, sidebarOpen }) {
  const { currentPage, navigate } = useApp()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)

  const isActive = (page) => currentPage === page

  const handleNavClick = (item) => {
    navigate(item.page)
    setMobileMenuOpen(false)
    setActiveDropdown(null)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-lingua-darker/95 backdrop-blur-xl border-b border-lingua-border/50">
      <div className="flex items-center h-14 px-3 gap-2">

        {/* ── ☰ Hamburger — toggles sidebar ── */}
        <button
          onClick={onSidebarToggle}
          title={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg text-lingua-muted hover:text-lingua-text hover:bg-lingua-surface transition-colors"
        >
          {sidebarOpen ? <CloseIcon /> : <HamburgerIcon />}
        </button>

        {/* ── Logo icon + text ── */}
        <button
          onClick={() => navigate(PAGES.HOME)}
          className="flex items-center gap-2 flex-shrink-0 mr-4"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-lingua-blue to-lingua-purple flex items-center justify-center shadow-lg shadow-lingua-blue/30">
            <span className="text-white font-black text-sm">L</span>
          </div>
          <span className="text-lingua-text font-bold text-base tracking-tight hidden sm:block">LinguaAI</span>
        </button>

        {/* ── Desktop nav links ── */}
        <div className="hidden lg:flex items-center gap-0.5 flex-1">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handleNavClick(item)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isActive(item.page)
                    ? 'text-lingua-text bg-lingua-surface'
                    : 'text-lingua-subtext hover:text-lingua-text hover:bg-lingua-surface/60'
                }`}
              >
                {item.label}
                {item.badge && (
                  <span className="ml-1 px-1.5 py-0.5 rounded-md bg-lingua-blue/20 text-lingua-blue-light text-[10px] font-semibold border border-lingua-blue/30 badge-new">
                    {item.badge}
                  </span>
                )}
                {item.hasDropdown && (
                  <span className={`transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`}>
                    <ChevronDown />
                  </span>
                )}
              </button>

              {/* Active underline */}
              {isActive(item.page) && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-lingua-blue rounded-full" />
              )}

              {/* Dropdown panel */}
              {item.hasDropdown && activeDropdown === item.label && dropdowns[item.label] && (
                <div className="absolute top-full left-0 mt-1.5 w-52 bg-lingua-darker border border-lingua-border/60 rounded-2xl shadow-2xl shadow-black/40 py-2 z-50 animate-fade-in">
                  {dropdowns[item.label].map((d) => (
                    <button
                      key={d.label}
                      onClick={() => { navigate(d.page); setActiveDropdown(null) }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                        isActive(d.page)
                          ? 'text-lingua-blue-light bg-lingua-blue/10'
                          : 'text-lingua-subtext hover:text-lingua-text hover:bg-lingua-surface'
                      }`}
                    >
                      <span>{d.icon}</span>
                      {d.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── Right side actions ── */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => navigate(PAGES.LOGIN)}
            className={`hidden lg:block btn-secondary text-sm ${
              isActive(PAGES.LOGIN) ? 'text-lingua-text bg-lingua-surface' : 'text-lingua-subtext hover:text-lingua-text'
            }`}
          >
            Log in
          </button>
          <button
            onClick={() => navigate(PAGES.SIGNUP)}
            className="hidden sm:block btn-primary shadow-lg shadow-lingua-blue/20 text-sm"
          >
            Start free trial
          </button>
          {/* Mobile nav toggle */}
          <button
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-lingua-muted hover:text-lingua-text hover:bg-lingua-surface transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle nav"
          >
            {mobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown menu ── */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-lingua-darker border-t border-lingua-border/50 animate-slide-up">
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive(item.page)
                    ? 'bg-lingua-surface text-lingua-text border border-lingua-border'
                    : 'text-lingua-subtext hover:text-lingua-text hover:bg-lingua-surface'
                }`}
              >
                <span className="flex items-center gap-2">
                  {item.label}
                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded-md bg-lingua-blue/20 text-lingua-blue-light text-[10px] font-semibold border border-lingua-blue/30">
                      {item.badge}
                    </span>
                  )}
                </span>
                {item.hasDropdown && <ChevronDown />}
              </button>
            ))}
            <div className="pt-3 border-t border-lingua-border/50 space-y-2">
              <button
                onClick={() => { navigate(PAGES.LOGIN); setMobileMenuOpen(false) }}
                className="w-full btn-secondary text-left text-lingua-subtext border border-lingua-border rounded-xl px-4 py-2.5"
              >
                Log in
              </button>
              <button
                onClick={() => { navigate(PAGES.SIGNUP); setMobileMenuOpen(false) }}
                className="w-full btn-primary text-center"
              >
                Start free trial
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
