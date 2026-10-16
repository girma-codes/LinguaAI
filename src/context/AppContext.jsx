import { createContext, useContext, useState } from 'react'

const AppContext = createContext(null)

export const PAGES = {
  HOME: 'home',
  TRANSLATE_TEXT: 'translate-text',
  TRANSLATE_FILES: 'translate-files',
  WRITE: 'write',
  VOICE: 'voice',
  DICTIONARY: 'dictionary',
  GLOSSARY: 'glossary',
  HISTORY: 'history',
  PRODUCTS: 'products',
  SOLUTIONS: 'solutions',
  DEVELOPERS: 'developers',
  PRICING: 'pricing',
  APPS: 'apps',
  LOGIN: 'login',
  SIGNUP: 'signup',
  ACCOUNT: 'account',
  PLANS: 'plans',
  API_PLANS: 'api-plans',
}

export function AppProvider({ children }) {
  const [currentPage, setCurrentPage] = useState(PAGES.HOME)
  const [sidebarOpen, setSidebarOpen] = useState(false) // hidden on first load

  const navigate = (page) => setCurrentPage(page)

  return (
    <AppContext.Provider value={{ currentPage, navigate, sidebarOpen, setSidebarOpen }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
