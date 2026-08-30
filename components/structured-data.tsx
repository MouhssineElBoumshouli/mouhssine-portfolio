import { experiences } from "@/lib/content/experience"
import { profile } from "@/lib/content/profile"
import { siteDescription, siteUrl } from "@/lib/content/site"
import { stack } from "@/lib/content/stack"

/**
 * Rendered on the server so crawlers see the same identity and expertise
 * that the page renders.
 */
export default function StructuredData() {
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
    description: siteDescription,
    url: siteUrl,
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
        description: siteDescription,
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
