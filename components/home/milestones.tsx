import { SectionHeading } from "@/components/layout/section-heading"
import { sectionIds } from "@/lib/content/site"
import type { Locale } from "@/lib/i18n/config"
import { getLocalizedMilestones } from "@/lib/i18n/content"
import { getMessages } from "@/lib/i18n/messages"

function Row({
  title,
  meta,
  description,
}: {
  title: string
  meta: string
  description: string
}) {
  return (
    <li className="screen-line-bottom relative last:after:hidden">
      <div className="flex gap-3 p-3 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/40">
        <span
          aria-hidden
          className="mt-2 size-1.5 shrink-0 rounded-full bg-neutral-700 dark:bg-neutral-300"
        />

        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="min-w-0 text-base leading-snug font-medium text-balance">
              {title}
            </h3>
            <span className="text-muted-foreground shrink-0 font-mono text-xs tabular-nums">
              {meta}
            </span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </li>
  )
}

export function Achievements({ locale }: { locale: Locale }) {
  const messages = getMessages(locale)
  const milestones = getLocalizedMilestones(locale)

  return (
    <section aria-labelledby={sectionIds.milestones}>
      <SectionHeading id={sectionIds.milestones}>{messages.home.milestones}</SectionHeading>
      <ul className="pt-px">
        {milestones.map((item) => (
          <Row
            key={item.title}
            title={item.title}
            meta={item.date}
            description={item.description}
          />
        ))}
      </ul>
    </section>
  )
}
