import StructuredData from "@/components/structured-data"
import { ContactPage as ContactContent } from "@/components/contact/contact-page"
import type { Locale } from "@/lib/i18n/config"

export function ContactPage({ locale }: { locale: Locale }) {
  return (
    <>
      <StructuredData locale={locale} />
      <ContactContent locale={locale} />
    </>
  )
}

export default ContactPage

