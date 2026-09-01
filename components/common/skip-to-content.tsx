"use client"

import { useLocale } from "@/components/i18n/locale-provider"
import { getMessages } from "@/lib/i18n/messages"

export function SkipToContent() {
  const messages = getMessages(useLocale())

  return (
    <a
      href="#main"
      className="focus:bg-background focus:ring-ring/50 sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:border focus:px-3 focus:py-2 focus:text-sm focus:ring-[3px]"
    >
      {messages.accessibility.skipToContent}
    </a>
  )
}

export default SkipToContent

