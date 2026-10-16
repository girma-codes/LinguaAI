import { useApp, PAGES } from '../context/AppContext'

const TwitterIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)
const LinkedInIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)
const GithubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)

export default function Footer() {
  const { navigate } = useApp()

  const footerSections = [
    {
      title: 'Products',
      links: [
        { label: 'LinguaAI Translator', page: PAGES.HOME },
        { label: 'Translate Files',     page: PAGES.TRANSLATE_FILES },
        { label: 'LinguaAI Write',      page: PAGES.WRITE },
        { label: 'LinguaAI Voice',      page: PAGES.VOICE },
        { label: 'Dictionary',          page: PAGES.DICTIONARY },
        { label: 'Glossary',            page: PAGES.GLOSSARY },
      ],
    },
    {
      title: 'Solutions',
      links: [
        { label: 'For Enterprises', page: PAGES.SOLUTIONS },
        { label: 'For Developers',  page: PAGES.DEVELOPERS },
        { label: 'For Education',   page: PAGES.SOLUTIONS },
        { label: 'For Healthcare',  page: PAGES.SOLUTIONS },
        { label: 'For Legal',       page: PAGES.SOLUTIONS },
        { label: 'For E-commerce',  page: PAGES.SOLUTIONS },
      ],
    },
    {
      title: 'Developers',
      links: [
        { label: 'API Reference',   page: PAGES.DEVELOPERS },
        { label: 'API Plans',       page: PAGES.API_PLANS },
        { label: 'SDKs & Libraries', page: PAGES.DEVELOPERS },
        { label: 'Documentation',   page: PAGES.DEVELOPERS },
        { label: 'Changelog',       page: PAGES.DEVELOPERS },
        { label: 'Status Page',     page: PAGES.DEVELOPERS },
      ],
    },
    {
      title: 'Pricing & Apps',
      links: [
        { label: 'Pricing Plans',   page: PAGES.PRICING },
        { label: 'API Plans',       page: PAGES.API_PLANS },
        { label: 'iOS App',         page: PAGES.APPS },
        { label: 'Android App',     page: PAGES.APPS },
        { label: 'Desktop App',     page: PAGES.APPS },
        { label: 'Browser Extension', page: PAGES.APPS },
      ],
    },
    {
      title: 'Account',
      links: [
        { label: 'Log in',          page: PAGES.LOGIN },
        { label: 'Start free trial', page: PAGES.SIGNUP },
        { label: 'Account settings', page: PAGES.ACCOUNT },
        { label: 'Translation history', page: PAGES.HISTORY },
        { label: 'Saved translations', page: PAGES.HISTORY },
        { label: 'Upgrade plan',    page: PAGES.PLANS },
      ],
    },
  ]

  const socials = [
    { icon: <TwitterIcon />,  label: 'Twitter',  href: '#' },
    { icon: <LinkedInIcon />, label: 'LinkedIn', href: '#' },
    { icon: <GithubIcon />,   label: 'GitHub',   href: '#' },
  ]

  return (
    <footer className="bg-lingua-darker border-t border-lingua-border/40">
      <div className="px-4 sm:px-6 lg:px-8 py-14">

        {/* Top grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 xl:col-span-1">
            <button onClick={() => navigate(PAGES.HOME)} className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-lingua-blue to-lingua-purple flex items-center justify-center shadow-lg shadow-lingua-blue/30">
                <span className="text-white font-black text-sm">L</span>
              </div>
              <span className="text-lingua-text font-bold text-lg">LinguaAI</span>
            </button>
            <p className="text-lingua-muted text-sm leading-relaxed mb-5 max-w-xs">
              AI-powered translation for Amharic, English, and 100+ more languages. Accurate, fast, and secure.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-lingua-surface border border-lingua-border/50 text-xs text-lingua-muted mb-5">
              <span>🇪🇹</span> Made with ❤️ for Ethiopia & the world
            </div>
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg bg-lingua-surface border border-lingua-border/50 flex items-center justify-center text-lingua-muted hover:text-lingua-text hover:border-lingua-border transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-lingua-text font-semibold text-sm mb-4">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => navigate(link.page)}
                      className="text-lingua-muted hover:text-lingua-subtext text-sm transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter strip */}
        <div className="rounded-2xl bg-lingua-surface/40 border border-lingua-border/40 p-5 mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-lingua-text font-semibold text-sm">Stay up to date with LinguaAI</p>
            <p className="text-lingua-muted text-xs mt-0.5">Get product updates, tips, and Amharic language resources.</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 sm:w-52 bg-lingua-darker border border-lingua-border text-lingua-text text-sm rounded-xl px-3 py-2 outline-none focus:border-lingua-blue/50 placeholder:text-lingua-muted/50"
            />
            <button className="btn-primary py-2 px-4 text-xs flex-shrink-0">Subscribe</button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-lingua-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-lingua-muted text-sm text-center sm:text-left">
            © 2026 LinguaAI Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-5 flex-wrap justify-center">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Accessibility'].map((l) => (
              <button key={l} className="text-lingua-muted hover:text-lingua-subtext text-xs transition-colors">
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
