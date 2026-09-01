"use client"

import { useMemo, useState } from "react"
import { Search, X } from "lucide-react"

import { PageHeader } from "@/components/layout/page-header"
import { ProjectGrid } from "@/components/projects/project-grid"
import { projects } from "@/lib/content/projects"
import type { Locale } from "@/lib/i18n/config"
import { getLocalizedProject } from "@/lib/i18n/content"
import { getMessages } from "@/lib/i18n/messages"

export function ProjectList({ locale }: { locale: Locale }) {
  const messages = getMessages(locale)
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return projects

    return projects.filter((project) => {
      const copy = getLocalizedProject(project, locale)
      return [
        copy.title,
        copy.subheading ?? "",
        copy.description,
        ...copy.technologies,
      ]
        .join(" ")
        .toLowerCase()
        .includes(needle)
    })
  }, [locale, query])

  return (
    <main>
      <PageHeader
        eyebrow={messages.projectsPage.eyebrow}
        title={messages.projectsPage.title}
        homeLabel={messages.pageHeader.home}
        homeHref={locale === "fr" ? "/fr" : "/"}
        action={
          <div className="border-input focus-within:border-ring focus-within:ring-ring/50 relative flex h-9 w-44 items-center rounded-lg border transition-[border-color,box-shadow] focus-within:ring-[3px] sm:w-64">
            <Search
              className="text-muted-foreground ml-2.5 size-4 shrink-0"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={messages.projectsPage.searchPlaceholder}
              aria-label={messages.projectsPage.searchLabel}
              className="placeholder:text-muted-foreground h-9 w-full min-w-0 flex-1 bg-transparent px-2.5 text-sm outline-none [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label={messages.projectsPage.clearSearch}
                className="hover:bg-muted hover:text-foreground text-muted-foreground mr-1.5 flex size-6 shrink-0 items-center justify-center rounded-sm transition-colors active:scale-95"
              >
                <X className="size-4" aria-hidden />
              </button>
            )}
          </div>
        }
      />

      <ProjectGrid projects={filtered} locale={locale} />
    </main>
  )
}

export default ProjectList
