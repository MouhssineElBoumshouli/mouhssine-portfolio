import { NextResponse } from "next/server"

import { profile } from "@/lib/content/profile"

const GITHUB_GRAPHQL_API = "https://api.github.com/graphql"
const CACHE_HEADERS = {
  "Cache-Control":
    "public, max-age=0, s-maxage=300, stale-while-revalidate=600",
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

export async function GET() {
  const token = process.env.GITHUB_TOKEN

  if (token) {
    const calendar = await getContributionCalendar(token).catch(() => null)
    if (calendar) {
      return json({ ...calendar, source: "contributions" })
    }
  }

  return json(
    { error: "GitHub activity is unavailable without a server-side token." },
    { status: 503 }
  )
}
