"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { getLocaleFromPathname, localizedPath, type Locale } from "@/lib/i18n/config"
import { getMessages } from "@/lib/i18n/messages"
import { cn } from "@/lib/utils"

const languageOptions: { locale: Locale; short: string }[] = [
  { locale: "en", short: "EN" },
  { locale: "fr", short: "FR" },
]

export function LanguageSwitch() {
  const pathname = usePathname() || "/"
  const locale = getLocaleFromPathname(pathname)
  const messages = getMessages(locale)

  return (
    <div
      role="group"
      aria-label={messages.language.label}
      className="border-border bg-background inline-flex h-7 items-center rounded-full border p-0.5 text-[10px] font-medium"
    >
      {languageOptions.map((option) => {
        const isCurrent = option.locale === locale
        const optionMessages = getMessages(option.locale)

        return (
          <Link
            key={option.locale}
            href={localizedPath(pathname, option.locale)}
            aria-current={isCurrent ? "page" : undefined}
            aria-label={
              isCurrent
                ? optionMessages.localeName
                : messages.language.switchTo(optionMessages.localeName)
            }
            className={cn(
              "inline-flex h-6 min-w-7 items-center justify-center rounded-full px-1.5 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/50",
              isCurrent
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {option.short}
          </Link>
        )
      })}
    </div>
  )
}

export default LanguageSwitch

