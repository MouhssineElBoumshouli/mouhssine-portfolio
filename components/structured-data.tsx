import { experiences } from "@/lib/content/experience"
import { profile } from "@/lib/content/profile"
import { siteUrl } from "@/lib/content/site"
import { stack } from "@/lib/content/stack"
import type { Locale } from "@/lib/i18n/config"
import { getMessages } from "@/lib/i18n/messages"

/**
 * Rendered on the server so crawlers see the same identity and expertise
 * that the page renders.
 */
export default function StructuredData({ locale }: { locale: Locale }) {
  const messages = getMessages(locale)
  const description = messages.metadata.description

  const currentEmployers = experiences
    .filter((experience) => experience.isCurrent)
    .map((experience) => ({
      "@type": "Organization",
      name: experience.company,
    }))

  const person = {
    "@type": "Person",
    "@id": siteUrl + "/#person",
    name: profile.name,
    alternateName: profile.handle,
    jobTitle: profile.title,
    description,
    url: siteUrl,
    inLanguage: messages.htmlLang,
    image: siteUrl + profile.avatarPhoto,
    email: "mailto:" + profile.email,
    address: {
      "@type": "PostalAddress",
      addressCountry: "Morocco",
      addressRegion: "Fès-Meknès",
      addressLocality: "Fès",
    },
    sameAs: [profile.linkedinUrl, profile.githubUrl],
    knowsAbout: stack.flatMap((category) =>
      category.skills.map((skill) => skill.title)
    ),
    ...(currentEmployers.length ? { worksFor: currentEmployers } : {}),
  }

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "WebSite",
        "@id": siteUrl + "/#website",
        url: siteUrl,
        name: profile.name + " Portfolio",
        description,
        inLanguage: messages.htmlLang,
        publisher: { "@id": siteUrl + "/#person" },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  )
}
