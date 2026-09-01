import StructuredData from "@/components/structured-data"
import { ProjectList } from "@/components/projects/project-list"
import type { Locale } from "@/lib/i18n/config"

export function ProjectsPage({ locale }: { locale: Locale }) {
  return (
    <>
      <StructuredData locale={locale} />
      <ProjectList locale={locale} />
    </>
  )
}

export default ProjectsPage

