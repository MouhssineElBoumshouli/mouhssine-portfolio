import type { Metadata } from "next"

import { profile } from "@/lib/content/profile"
import { siteUrl, socialPreviewImage } from "@/lib/content/site"
import type { Locale } from "./config"
import { getMessages } from "./messages"

type PageKind = "home" | "projects" | "contact"

const paths: Record<PageKind, { en: string; fr: string }> = {
  home: { en: "/", fr: "/fr" },
  projects: { en: "/projects", fr: "/fr/projects" },
  contact: { en: "/contact", fr: "/fr/contact" },
}

export function getLocalizedMetadata(locale: Locale, kind: PageKind): Metadata {
  const messages = getMessages(locale)
  const path = paths[kind][locale]
  const canonical = `${siteUrl}${path === "/" ? "" : path}`
  const title =
    kind === "home"
      ? profile.name + " - " + messages.hero.roles[0] + " | Portfolio"
      : kind === "projects"
        ? messages.projectsPage.eyebrow
        : messages.contactPage.eyebrow
  const description =
    kind === "home"
      ? messages.metadata.description
      : kind === "projects"
        ? messages.metadata.projectsDescription
        : messages.metadata.contactDescription

  return {
    title: kind === "home" ? { absolute: title } : title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `${siteUrl}${paths[kind].en === "/" ? "" : paths[kind].en}`,
        fr: `${siteUrl}${paths[kind].fr}`,
      },
    },
    openGraph: {
      title: kind === "home" ? messages.metadata.previewTitle : `${title} | ${profile.name}`,
      description,
      url: canonical,
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      images: [{ ...socialPreviewImage, type: "image/png" }],
    },
    twitter: {
      card: "summary_large_image",
      title: kind === "home" ? messages.metadata.previewTitle : `${title} | ${profile.name}`,
      description,
      images: [socialPreviewImage],
    },
    other: {
      "twitter:image:alt":
        locale === "fr"
          ? "Page d’accueil du portfolio de Mouhssine El Boumshouli"
          : socialPreviewImage.alt,
      "whatsapp:image": socialPreviewImage.url,
      "whatsapp:title":
        kind === "home" ? messages.metadata.previewTitle : `${title} | ${profile.name}`,
      "whatsapp:description": description,
    },
  }
}
