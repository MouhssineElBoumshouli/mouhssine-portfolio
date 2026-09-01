"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { LoaderIcon } from "lucide-react"

import { SectionHeading } from "@/components/layout/section-heading"
import {
  type Activity,
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from "@/components/ui/contribution-graph"
import { sectionIds } from "@/lib/content/site"
import { useLocale } from "@/components/i18n/locale-provider"
import { getMessages } from "@/lib/i18n/messages"

type ContributionDay = {
  date: string
  contributionCount: number
  contributionLevel: string
}

/** The GraphQL calendar reports quartile names; the graph wants 0–4. */
const levelByQuartile: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
}

type HoveredDay = { count: number; label: string; x: number; y: number }

/** "Aug 26, 2026" from the ISO date the cell carries. */
function dayLabel(iso: string, locale: "en" | "fr") {
  return new Date(`${iso}T00:00:00`).toLocaleDateString(
    locale === "fr" ? "fr-FR" : "en-US",
    {
    month: "short",
    day: "numeric",
    year: "numeric",
    }
  )
}

/** "2025-26" for a range that straddles new year, "2026" for one that doesn't. */
function rangeLabel(activities: Activity[]) {
  const first = activities[0]?.date.slice(0, 4)
  const last = activities.at(-1)?.date.slice(0, 4)
  if (!first || !last) return String(new Date().getFullYear())
  return first === last ? first : `${first}-${last.slice(2)}`
}

/**
 * Reads /api/github. The section removes itself entirely if the feed is
 * unavailable rather than showing an error a visitor cannot act on.
 */
export function GitHubActivity() {
  const locale = useLocale()
  const messages = getMessages(locale)
  const [activities, setActivities] = useState<Activity[] | null>(null)
  const [total, setTotal] = useState(0)
  const [failed, setFailed] = useState(false)
  const [hovered, setHovered] = useState<HoveredDay | null>(null)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const response = await fetch("/api/github")
        if (!response.ok) throw new Error("Request failed")
        const data = await response.json()
        if (cancelled) return
        setActivities(
          data.weeks.flatMap((week: { contributionDays: ContributionDay[] }) =>
            week.contributionDays.map((day) => ({
              date: day.date,
              count: day.contributionCount,
              level: levelByQuartile[day.contributionLevel] ?? 0,
            }))
          )
        )
        setTotal(data.totalContributions)
      } catch {
        if (!cancelled) setFailed(true)
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [])

  const handleCellHover = useCallback((event: React.MouseEvent) => {
    const cell = event.target as SVGRectElement
    const { date, count } = cell.dataset
    if (!date || count === undefined) {
      setHovered(null)
      return
    }

    // Positioned against the section box, not the scrolling calendar, so
    // the tooltip stays put when the graph is scrolled sideways.
    const container = event.currentTarget.closest("section")
    if (!container) return
    const cellBox = cell.getBoundingClientRect()
    const containerBox = container.getBoundingClientRect()

    setHovered({
      count: Number(count),
      label: dayLabel(date, locale),
      x: cellBox.left + cellBox.width / 2 - containerBox.left,
      y: cellBox.top - containerBox.top,
    })
  }, [locale])

  const labels = useMemo(
    () =>
      activities
        ? {
            totalCount: messages.home.totalContributions(rangeLabel(activities)),
            title: messages.accessibility.contributionGraph,
            legend: {
              less: locale === "fr" ? "Moins" : "Less",
              more: locale === "fr" ? "Plus" : "More",
            },
          }
        : undefined,
    [activities, locale, messages]
  )

  if (failed) return null

  return (
    <section aria-labelledby={sectionIds.activity}>
      <SectionHeading id={sectionIds.activity}>{messages.home.activity}</SectionHeading>

      <div className="relative px-4 py-5" onMouseLeave={() => setHovered(null)}>
        {hovered && (
          <div
            role="status"
            className="bg-foreground text-background pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full rounded-md px-2 py-1 text-xs font-medium whitespace-nowrap shadow-md"
            style={{ left: hovered.x, top: hovered.y - 6 }}
          >
            {messages.home.contribution(hovered.count)}{" "}
            {messages.home.contributionsOn(hovered.label)}
          </div>
        )}

        {activities ? (
          <ContributionGraph
            className="mx-auto font-mono"
            data={activities}
            totalCount={total}
            fontSize={11}
            blockSize={9}
            blockMargin={3}
            labels={labels}
          >
            {/* One delegated listener rather than 370 per-cell handlers;
                every rect already carries its date and count as data-*. */}
            <ContributionGraphCalendar
              className="no-scrollbar"
              onMouseOver={handleCellHover}
            >
              {({ activity, dayIndex, weekIndex }) => (
                <ContributionGraphBlock
                  activity={activity}
                  dayIndex={dayIndex}
                  weekIndex={weekIndex}
                />
              )}
            </ContributionGraphCalendar>

            <ContributionGraphFooter>
              <ContributionGraphTotalCount className="text-foreground" />
              <ContributionGraphLegend />
            </ContributionGraphFooter>
          </ContributionGraph>
        ) : (
          <div className="flex h-[162px] items-center justify-center">
            <LoaderIcon
              className="text-foreground animate-spin"
              aria-label={messages.home.loadingContributions}
            />
          </div>
        )}
      </div>
    </section>
  )
}

export default GitHubActivity
