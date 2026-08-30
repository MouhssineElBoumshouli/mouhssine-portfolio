import { profile } from "./profile"

/** Use the verified current public site as the fallback; set this in Vercel when a custom domain is available. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://mouhssineelboumshouli.github.io/mouhssine-portfolio"

export const siteDescription =
  "Portfolio of Mouhssine El Boumshouli, an AI engineering student building full-stack software, LLM agent evaluations, procurement systems and computer-vision research tools."

export const socialPreviewTitle =
  "Mouhssine El Boumshouli - AI engineering, full-stack systems, and applied AI."

export const socialPreviewImage = {
  url: siteUrl + "/portfolio-web-preview.png",
  width: 1440,
  height: 900,
  alt: "Mouhssine El Boumshouli portfolio homepage",
}

export const navLinks = [
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
]

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
  image: profile.avatarPhoto,
  skills: {
    top: "AI Engineering",
    left: "Systems Thinking",
    right: "Applied Research",
    bottom: "Product Delivery\\n& User Empathy",
  },
}

export const footer = {
  text: "Designed and developed by",
  developer: profile.name,
  note: "Built in the open.",
}
