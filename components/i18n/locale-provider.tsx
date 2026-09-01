"use client"

import { createContext, useContext, useEffect } from "react"
import { usePathname } from "next/navigation"

import { getLocaleFromPathname, type Locale } from "@/lib/i18n/config"

const LocaleContext = createContext<Locale>("en")

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  return useContext(LocaleContext)
}

