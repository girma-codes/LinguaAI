import { AppProvider, useApp, PAGES } from './context/AppContext'
import Navbar from './components/Navbar'
import SideMenu from './components/SideMenu'
import Footer from './components/Footer'

// Pages
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import WritePage from './pages/WritePage'
import VoicePage from './pages/VoicePage'
import DictionaryPage from './pages/DictionaryPage'
import GlossaryPage from './pages/GlossaryPage'
import HistoryPage from './pages/HistoryPage'
import PlansPage from './pages/PlansPage'
import ApiPlansPage from './pages/ApiPlansPage'
import AccountPage from './pages/AccountPage'
import ProductsPage from './pages/ProductsPage'
import SolutionsPage from './pages/SolutionsPage'
import DevelopersPage from './pages/DevelopersPage'
import AppsPage from './pages/AppsPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import TranslatorTabs from './components/TranslatorTabs'

const AUTH_PAGES = new Set([PAGES.LOGIN, PAGES.SIGNUP])

function TranslateFilesPage() {
  return (
    <div className="flex flex-col h-full p-6">
      <div className="pb-4 border-b border-lingua-border/40 mb-6 flex-shrink-0">
        <h1 className="text-lingua-text font-bold text-xl">Translate Files</h1>
        <p className="text-lingua-muted text-sm mt-0.5">Drag and drop documents for instant AI translation</p>
      </div>
      <div className="flex-1 flex items-start justify-center overflow-auto">
        <div className="w-full max-w-5xl">
          <TranslatorTabs defaultTab="files" />
        </div>
      </div>
    </div>
  )
}

function PageRouter({ currentPage }) {
  switch (currentPage) {
    case PAGES.HOME:             return null
    case PAGES.TRANSLATE_FILES:  return <TranslateFilesPage />
    case PAGES.WRITE:            return <WritePage />
    case PAGES.VOICE:            return <VoicePage />
    case PAGES.DICTIONARY:       return <DictionaryPage />
    case PAGES.GLOSSARY:         return <GlossaryPage />
    case PAGES.HISTORY:          return <HistoryPage />
    case PAGES.PLANS:
    case PAGES.PRICING:          return <PlansPage />
    case PAGES.API_PLANS:        return <ApiPlansPage />
    case PAGES.ACCOUNT:          return <AccountPage />
    case PAGES.PRODUCTS:         return <ProductsPage />
    case PAGES.SOLUTIONS:        return <SolutionsPage />
    case PAGES.DEVELOPERS:       return <DevelopersPage />
    case PAGES.APPS:             return <AppsPage />
    default:                     return null
  }
}

function AppShell() {
  const { currentPage, sidebarOpen, setSidebarOpen } = useApp()
  const isAuthPage = AUTH_PAGES.has(currentPage)
  const isHomePage = currentPage === PAGES.HOME

  // Auth pages — full screen, no navbar/sidebar
  if (isAuthPage) {
    return (
      <div className="w-screen min-h-screen bg-lingua-dark text-lingua-text overflow-auto">
        {currentPage === PAGES.LOGIN  && <LoginPage />}
        {currentPage === PAGES.SIGNUP && <SignupPage />}
      </div>
    )
  }

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden bg-lingua-dark text-lingua-text">

      {/* ── Fixed top Navbar ── hamburger controls sidebar */}
      <Navbar
        sidebarOpen={sidebarOpen}
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* ── Below navbar: sidebar + content ── */}
      <div className="flex flex-1 overflow-hidden pt-14">

        {/* Sidebar — shown only when sidebarOpen=true */}
        {sidebarOpen && <SideMenu />}

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {isHomePage ? (
            <>
              <HeroSection />
              <FeaturesSection />
              <Footer />
            </>
          ) : (
            <div className="flex flex-col min-h-full">
              <div className="flex-1">
                <PageRouter currentPage={currentPage} />
              </div>
              <Footer />
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  )
}
