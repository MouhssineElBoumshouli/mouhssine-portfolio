import type { Metadata } from "next"

import { ProjectsPage } from "@/components/pages/projects-page"
import { getLocalizedMetadata } from "@/lib/i18n/metadata"

export const metadata: Metadata = getLocalizedMetadata("fr", "projects")

export default function FrenchProjectsPage() {
  return <ProjectsPage locale="fr" />
}

