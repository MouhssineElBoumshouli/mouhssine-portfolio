export const profile = {
  name: "Mouhssine El Boumshouli",
  handle: "MouhssineElBoumshouli",
  wordmark: "MOUHSSINE",
  title: "AI Engineering Student",
  /** Rotated by the hero typewriter. */
  roles: [
    "AI Engineering Student",
    "Full-Stack & AI Developer",
    "Applied AI & Computer Vision",
  ],
  meta: "Fès, MAR",
  location: "Fès, Morocco",
  timezone: "Africa/Casablanca",
  /** The hero defaults to the provided portrait and can switch to GitHub. */
  avatar: "/profile/mouhssine-profile.jpg",
  avatarPhoto: "/mouhssine-github-avatar.png",
  email: "mouhssine.elboumshouli@eidia.ueuromed.org",
  contactInbox: "elboumshouli.mouhssine@gmail.com",
  githubUrl: "https://github.com/MouhssineElBoumshouli",
  linkedinUrl: "https://www.linkedin.com/in/mouhssine-bms/",
  calendlyUrl: "https://calendly.com/elboumshouli-mouhssine/30min",
  resumeUrl: "/cv/Mouhssine_El_Boumshouli_CV_EN.pdf",
  frenchResumeUrl: "/cv/Mouhssine_El_Boumshouli_CV_FR.pdf",
} as const

/**
 * The About list. strong fragments are rendered as emphasised,
 * underlined spans - the same treatment the reference uses for key phrases.
 */
export const bio: { text: string; strong?: string[] }[] = [
  {
    text: "I’m Mouhssine, an AI engineering student at EIDIA - Université Euromed de Fès, working across full-stack software, LLM agents and computer vision.",
  },
  {
    text: "I build end-to-end systems with Python, FastAPI, React, TypeScript, PostgreSQL and Docker - from data and API design through to usable interfaces.",
    strong: [
      "Python, FastAPI, React, TypeScript, PostgreSQL and Docker",
    ],
  },
  {
    text: "Recent work includes a reproducible DARE-Bench agent reliability study, SmartImport procurement decision support, and medical-image skeletonisation research.",
    strong: [
      "DARE-Bench agent reliability study",
      "SmartImport procurement decision support",
      "medical-image skeletonisation research",
    ],
  },
]

export type SocialLink = {
  name: string
  href: string
  /** External links open in a new tab and get rel=noopener. */
  isExternal: boolean
  icon: "resume" | "mail" | "github" | "linkedin" | "send"
}

export const socialLinks: SocialLink[] = [
  { name: "Resume", href: profile.resumeUrl, isExternal: false, icon: "resume" },
  { name: "Contact", href: "/contact", isExternal: false, icon: "send" },
  {
    name: "GitHub",
    href: profile.githubUrl,
    isExternal: true,
    icon: "github",
  },
  {
    name: "LinkedIn",
    href: profile.linkedinUrl,
    isExternal: true,
    icon: "linkedin",
  },
  {
    name: "CV (FR)",
    href: profile.frenchResumeUrl,
    isExternal: false,
    icon: "resume",
  },
  {
    name: "Email",
    href: "mailto:" + profile.email,
    isExternal: true,
    icon: "mail",
  },
]
