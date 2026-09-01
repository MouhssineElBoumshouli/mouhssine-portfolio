import Link from "next/link"
import { MoveRight } from "lucide-react"

import { SectionHeading } from "@/components/layout/section-heading"
import { RuledRow } from "@/components/layout/rules"
import { ProjectGrid } from "@/components/projects/project-grid"
import { Button } from "@/components/ui/button"
import { projects } from "@/lib/content/projects"
import { sectionIds } from "@/lib/content/site"
import type { Locale } from "@/lib/i18n/config"
import { getMessages } from "@/lib/i18n/messages"

export function ProjectsSection({ locale }: { locale: Locale }) {
  const messages = getMessages(locale)

  return (
    <section aria-labelledby={sectionIds.projects}>
      <SectionHeading id={sectionIds.projects}>{messages.home.projects}</SectionHeading>
      {/* Two here; the rest live behind "See all projects". */}
      <ProjectGrid projects={projects.slice(0, 2)} locale={locale} />
      <RuledRow className="mt-1">
        <Button size="sm" asChild>
          <Link href={locale === "fr" ? "/fr/projects" : "/projects"}>
            {messages.home.seeAllProjects}
            <MoveRight aria-hidden />
          </Link>
        </Button>
      </RuledRow>
    </section>
  )
}

export default ProjectsSection
