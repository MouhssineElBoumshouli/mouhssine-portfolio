import { NextResponse } from "next/server"

import { profile } from "@/lib/content/profile"

const GITHUB_GRAPHQL_API = "https://api.github.com/graphql"
const GITHUB_REST_API = "https://api.github.com"
const CACHE_HEADERS = {
  "Cache-Control":
    "public, max-age=0, s-maxage=300, stale-while-revalidate=600",
}

type ContributionDay = {
  date: string
  contributionCount: number
  contributionLevel: string
}

function json(data: unknown, init?: ResponseInit) {
  return NextResponse.json(data, {
    headers: { ...CACHE_HEADERS, ...(init?.headers ?? {}) },
    ...init,
  })
}

async function getContributionCalendar(token: string) {
  const query = [
    "query($login: String!) {",
    "  user(login: $login) {",
    "    contributionsCollection {",
    "      contributionCalendar {",
    "        totalContributions",
    "        weeks {",
    "          contributionDays {",
    "            date",
    "            contributionCount",
    "            contributionLevel",
    "          }",
    "        }",
    "      }",
    "    }",
    "  }",
    "}",
  ].join("\n")

  const response = await fetch(GITHUB_GRAPHQL_API, {
    method: "POST",
    headers: {
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
      "User-Agent": "Mouhssine-portfolio",
    },
    body: JSON.stringify({ query, variables: { login: profile.handle } }),
    cache: "no-store",
  })

  if (!response.ok) return null
  const payload = await response.json()
  return payload?.data?.user?.contributionsCollection?.contributionCalendar ?? null
}

function isoDate(date: Date) {
  return date.toISOString().slice(0, 10)
}

function fallbackCalendar(
  events: Array<{ type?: string; created_at?: string; payload?: { commits?: unknown[] } }>
) {
  const today = new Date()
  const start = new Date(today)
  start.setUTCHours(0, 0, 0, 0)
  start.setUTCDate(start.getUTCDate() - 364)

  const counts = new Map<string, number>()
  for (const event of events) {
    if (!event.created_at) continue
    const date = isoDate(new Date(event.created_at))
    const weight =
      event.type === "PushEvent" && Array.isArray(event.payload?.commits)
        ? Math.max(1, event.payload.commits.length)
        : 1
    counts.set(date, (counts.get(date) ?? 0) + weight)
  }

  const rawDays: ContributionDay[] = []
  for (let index = 0; index < 365; index += 1) {
    const date = new Date(start)
    date.setUTCDate(start.getUTCDate() + index)
    const key = isoDate(date)
    rawDays.push({
      date: key,
      contributionCount: counts.get(key) ?? 0,
      contributionLevel: "NONE",
    })
  }

  const max = Math.max(...rawDays.map((day) => day.contributionCount), 0)
  const levels = max > 0 ? [0, max * 0.25, max * 0.5, max * 0.75] : [0, 1, 2, 3]
  const weeks = []
  for (let index = 0; index < rawDays.length; index += 7) {
    const days = rawDays.slice(index, index + 7).map((day) => {
      const count = day.contributionCount
      const level =
        count === 0
          ? "NONE"
          : count >= levels[3]
            ? "FOURTH_QUARTILE"
            : count >= levels[2]
              ? "THIRD_QUARTILE"
              : count >= levels[1]
                ? "SECOND_QUARTILE"
                : "FIRST_QUARTILE"
      return { ...day, contributionLevel: level }
    })
    weeks.push({ contributionDays: days })
  }

  return {
    totalContributions: rawDays.reduce(
      (total, day) => total + day.contributionCount,
      0
    ),
    weeks,
    source: "public-events" as const,
  }
}

async function getPublicEvents() {
  const response = await fetch(
    GITHUB_REST_API + "/users/" + profile.handle + "/events/public?per_page=100",
    {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "Mouhssine-portfolio",
      },
      cache: "no-store",
    }
  )
  if (!response.ok) return null
  const events = await response.json()
  return Array.isArray(events) ? fallbackCalendar(events) : null
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN

  if (token) {
    const calendar = await getContributionCalendar(token).catch(() => null)
    if (calendar) {
      return json({ ...calendar, source: "contributions" })
    }
  }

  const fallback = await getPublicEvents().catch(() => null)
  if (fallback) return json(fallback)

  return json(
    { error: "GitHub activity is temporarily unavailable." },
    { status: 502 }
  )
}
