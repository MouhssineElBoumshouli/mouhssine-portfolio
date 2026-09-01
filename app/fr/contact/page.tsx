import type { Metadata } from "next"

import { ContactPage } from "@/components/pages/contact-page"
import { getLocalizedMetadata } from "@/lib/i18n/metadata"

export const metadata: Metadata = getLocalizedMetadata("fr", "contact")

export default function FrenchContactPage() {
  return <ContactPage locale="fr" />
}

