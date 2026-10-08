import { profile } from "./profile"
import { getMessages } from "@/lib/i18n/messages"

/** NEXT_PUBLIC_SITE_URL is authoritative in deployment; localhost is safe during development. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "http://localhost:3000"

export const siteDescription =
  getMessages("en").metadata.description

export const socialPreviewTitle =
  getMessages("en").metadata.previewTitle

export const socialPreviewImage = {
  url: siteUrl + "/portfolio-web-preview.png",
  width: 1440,
  height: 900,
  alt: "Mouhssine El Boumshouli portfolio homepage",
}

/** In-page anchors, kept in one place so the nav and the sections agree. */
export const sectionIds = {
  about: "about",
  connect: "connect",
  experience: "experience",
  projects: "projects",
  stack: "stack",
  activity: "activity",
  milestones: "milestones",
  contact: "contact",
} as const

export const skillsVenn = {
  image: profile.avatar,
  skills: getMessages("en").home.venn,
}
