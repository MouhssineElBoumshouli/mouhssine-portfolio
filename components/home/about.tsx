import { Fragment } from "react"

import { SectionHeading } from "@/components/layout/section-heading"
import { sectionIds } from "@/lib/content/site"
import { getLocalizedProfile } from "@/lib/i18n/content"
import type { Locale } from "@/lib/i18n/config"
import { getMessages } from "@/lib/i18n/messages"

/** Splits a line so the named fragments render as emphasised keywords. */
function withEmphasis(text: string, strong?: string[]) {
  if (!strong?.length) return text

  let parts: (string | { strong: string })[] = [text]
  for (const phrase of strong) {
    parts = parts.flatMap((part) => {
      if (typeof part !== "string") return [part]
      const index = part.indexOf(phrase)
      if (index === -1) return [part]
      return [
        part.slice(0, index),
        { strong: phrase },
        part.slice(index + phrase.length),
      ].filter((segment) => segment !== "")
    })
  }

  return parts.map((part, index) =>
    typeof part === "string" ? (
      <Fragment key={index}>{part}</Fragment>
    ) : (
      <b
        key={index}
        className="font-medium text-neutral-950 underline underline-offset-2 dark:text-neutral-100"
      >
        {part.strong}
      </b>
    )
  )
}

export function About({ locale }: { locale: Locale }) {
  const messages = getMessages(locale)
  const { bio } = getLocalizedProfile(locale)

  return (
    <section aria-labelledby={sectionIds.about}>
      <SectionHeading id={sectionIds.about}>{messages.home.about}</SectionHeading>
      <div className="px-5 py-5 sm:px-6 sm:py-6">
        <ul className="list-disc space-y-2.5 pl-4 text-base leading-relaxed font-normal text-neutral-800 dark:text-neutral-300">
          {bio.map((line) => (
            <li key={line.text}>{withEmphasis(line.text, line.strong)}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default About
