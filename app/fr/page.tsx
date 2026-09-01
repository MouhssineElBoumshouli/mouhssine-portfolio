import type { Metadata } from "next"

import { HomePage } from "@/components/pages/home-page"
import { getLocalizedMetadata } from "@/lib/i18n/metadata"

export const metadata: Metadata = getLocalizedMetadata("fr", "home")

export default function FrenchHomePage() {
  return <HomePage locale="fr" />
}

