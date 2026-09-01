"use client"

import { HatchRule } from "@/components/layout/rules"
import { DotField } from "@/components/layout/dot-field"
import { profile } from "@/lib/content/profile"
import { useLocale } from "@/components/i18n/locale-provider"
import { getMessages } from "@/lib/i18n/messages"

export function Footer() {
  const locale = useLocale()
  const messages = getMessages(locale)

  return (
    <footer>
      <HatchRule />
      <div className="flex flex-col items-center justify-center py-6">
        <p className="text-foreground/70 text-center text-sm">
          {messages.footer.text}{" "}
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/90 link-underline font-semibold"
          >
            {profile.name}
          </a>
          <br />© {new Date().getFullYear()}. {messages.footer.note}
        </p>
      </div>
      <HatchRule />
      <DotField className="h-28 min-h-20 sm:h-32" />
    </footer>
  )
}

export default Footer
