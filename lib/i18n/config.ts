export const locales = ["en", "fr"] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "en"

export function getLocaleFromPathname(pathname: string | null | undefined): Locale {
  return pathname === "/fr" || pathname?.startsWith("/fr/") ? "fr" : "en"
}

/**
 * Keeps the existing English URLs stable while giving French its own
 * crawlable route prefix. Query strings are intentionally left to callers.
 */
export function localizedPath(pathname: string, locale: Locale) {
  const path = pathname || "/"
  const unprefixed =
    path === "/fr" ? "/" : path.startsWith("/fr/") ? path.slice(3) : path

  if (locale === "en") return unprefixed || "/"
  return unprefixed === "/" ? "/fr" : `/fr${unprefixed}`
}

