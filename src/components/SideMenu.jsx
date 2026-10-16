import { useState } from 'react'
import { useApp, PAGES } from '../context/AppContext'

// ── Icons ──────────────────────────────────────────────────────────────
const TranslateIcon = () => (
  <svg className="w-[18px] h-[18px] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
  </svg>
)
const FileIcon = () => (
  <svg className="w-[18px] h-[18px] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)
const WriteIcon = () => (
  <svg className="w-[18px] h-[18px] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
)
const VoiceIcon = () => (
  <svg className="w-[18px] h-[18px] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 016 0v6a3 3 0 01-3 3z" />
  </svg>
)
const BookmarkIcon = () => (
  <svg className="w-[18px] h-[18px] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
  </svg>
)
const BookIcon = () => (
  <svg className="w-[18px] h-[18px] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
)
const ListIcon = () => (
  <svg className="w-[18px] h-[18px] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h8m-8 4h8" />
  </svg>
)
const HistoryIcon = () => (
  <svg className="w-[18px] h-[18px] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)
const PlansIcon = () => (
  <svg className="w-[18px] h-[18px] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
  </svg>
)
const ApiIcon = () => (
  <svg className="w-[18px] h-[18px] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
)
const AccountIcon = () => (
  <svg className="w-[18px] h-[18px] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)
const ChevronDown = ({ open }) => (
  <svg
    className={`w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
)

// ── Flat menu item ─────────────────────────────────────────────────────
function MenuItem({ icon, label, active, onClick, indent = false }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 rounded-xl text-sm font-medium
        transition-all duration-150 group
        ${indent ? 'pl-9 pr-3 py-2' : 'px-3 py-2.5'}
        ${active
          ? 'bg-lingua-blue/15 text-lingua-blue-light border border-lingua-blue/30'
          : 'text-lingua-subtext hover:bg-lingua-surface hover:text-lingua-text border border-transparent'
        }
      `}
    >
      <span className={`flex-shrink-0 ${active ? 'text-lingua-blue-light' : 'text-lingua-muted group-hover:text-lingua-subtext'}`}>
        {icon}
      </span>
      <span className="truncate text-left">{label}</span>
    </button>
  )
}

// ── Accordion group ────────────────────────────────────────────────────
function AccordionSection({ icon, label, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold
          text-lingua-muted hover:text-lingua-text hover:bg-lingua-surface/60
          transition-all duration-150 border border-transparent"
      >
        <span className="text-lingua-muted flex-shrink-0">{icon}</span>
        <span className="flex-1 text-left truncate">{label}</span>
        <ChevronDown open={open} />
      </button>

      {/* Animated expand */}
      <div
        style={{ maxHeight: open ? '400px' : '0px', opacity: open ? 1 : 0 }}
        className="overflow-hidden transition-all duration-250 ease-in-out"
      >
        <div className="pt-0.5 pb-1 space-y-0.5">
          {children}
        </div>
      </div>
    </div>
  )
}

// ── Section label ──────────────────────────────────────────────────────
function SectionLabel({ label }) {
  return (
    <p className="text-lingua-muted/50 text-[10px] font-bold uppercase tracking-widest px-3 pt-4 pb-1.5 select-none">
      {label}
    </p>
  )
}

// ── Main SideMenu ──────────────────────────────────────────────────────
export default function SideMenu() {
  const { currentPage, navigate } = useApp()
  const go = (page) => navigate(page)

  return (
    <aside className="flex flex-col h-full w-[240px] bg-lingua-darker border-r border-lingua-border/50 flex-shrink-0">

      {/* ── Scrollable nav ── */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-3 space-y-0.5 scrollbar-thin">

        {/* Standalone: Translator */}
        <MenuItem
          icon={<TranslateIcon />}
          label="LinguaAI Translator"
          active={currentPage === PAGES.HOME}
          onClick={() => go(PAGES.HOME)}
        />

        {/* Accordion: Translate tools */}
        <AccordionSection
          icon={<FileIcon />}
          label="Translate"
          defaultOpen={[PAGES.TRANSLATE_FILES, PAGES.WRITE, PAGES.VOICE].includes(currentPage)}
        >
          <MenuItem icon={<FileIcon />}  label="Translate Files"  active={currentPage === PAGES.TRANSLATE_FILES} onClick={() => go(PAGES.TRANSLATE_FILES)} indent />
          <MenuItem icon={<WriteIcon />} label="LinguaAI Write"   active={currentPage === PAGES.WRITE}           onClick={() => go(PAGES.WRITE)} indent />
          <MenuItem icon={<VoiceIcon />} label="LinguaAI Voice"   active={currentPage === PAGES.VOICE}           onClick={() => go(PAGES.VOICE)} indent />
        </AccordionSection>

        {/* Section label */}
        <SectionLabel label="My workspace" />

        {/* Standalone: History */}
        <MenuItem
          icon={<HistoryIcon />}
          label="Translation history"
          active={currentPage === PAGES.HISTORY}
          onClick={() => go(PAGES.HISTORY)}
        />

        {/* Accordion: Language tools */}
        <AccordionSection
          icon={<BookIcon />}
          label="Language tools"
          defaultOpen={[PAGES.GLOSSARY, PAGES.DICTIONARY].includes(currentPage)}
        >
          <MenuItem icon={<BookIcon />}     label="Dictionary"          active={currentPage === PAGES.DICTIONARY} onClick={() => go(PAGES.DICTIONARY)} indent />
          <MenuItem icon={<ListIcon />}     label="Glossary"            active={currentPage === PAGES.GLOSSARY}   onClick={() => go(PAGES.GLOSSARY)}   indent />
          <MenuItem icon={<BookmarkIcon />} label="Saved translations"  active={false}                            onClick={() => go(PAGES.HISTORY)}    indent />
        </AccordionSection>

        {/* Accordion: Explore */}
        <AccordionSection
          icon={<PlansIcon />}
          label="Explore"
          defaultOpen={[PAGES.PRODUCTS, PAGES.SOLUTIONS, PAGES.DEVELOPERS, PAGES.APPS].includes(currentPage)}
        >
          <MenuItem icon={<TranslateIcon />} label="Products"   active={currentPage === PAGES.PRODUCTS}   onClick={() => go(PAGES.PRODUCTS)}   indent />
          <MenuItem icon={<WriteIcon />}     label="Solutions"  active={currentPage === PAGES.SOLUTIONS}  onClick={() => go(PAGES.SOLUTIONS)}  indent />
          <MenuItem icon={<ApiIcon />}       label="Developers" active={currentPage === PAGES.DEVELOPERS} onClick={() => go(PAGES.DEVELOPERS)} indent />
          <MenuItem icon={<FileIcon />}      label="Apps"       active={currentPage === PAGES.APPS}       onClick={() => go(PAGES.APPS)}       indent />
        </AccordionSection>
      </div>

      {/* ── Bottom: Plans / API / Account ── */}
      <div className="flex-shrink-0 px-2 pb-3 pt-2 border-t border-lingua-border/40 space-y-0.5">
        <MenuItem icon={<PlansIcon />}   label="Plans"     active={currentPage === PAGES.PLANS}     onClick={() => go(PAGES.PLANS)} />
        <MenuItem icon={<ApiIcon />}     label="API plans" active={currentPage === PAGES.API_PLANS} onClick={() => go(PAGES.API_PLANS)} />
        <MenuItem icon={<AccountIcon />} label="Account"   active={currentPage === PAGES.ACCOUNT}   onClick={() => go(PAGES.ACCOUNT)} />
      </div>
    </aside>
  )
}
