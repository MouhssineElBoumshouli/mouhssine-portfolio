export const profile = {
  name: "Mouhssine El Boumshouli",
  handle: "MouhssineElBoumshouli",
  wordmark: "MOUHSSINE",
  title: "AI Engineering Student",
  meta: "Fès, MAR",
  location: "Fès, Morocco",
  timezone: "Africa/Casablanca",
  /** The hero defaults to the provided portrait and can switch to GitHub. */
  avatar: "/profile/mouhssine-profile.jpg",
  avatarPhoto: "/mouhssine-github-avatar.png",
  email: "elboumshouli.mouhssine@gmail.com",
  githubUrl: "https://github.com/MouhssineElBoumshouli",
  linkedinUrl: "https://www.linkedin.com/in/mouhssine-bms/",
  calendlyUrl: "https://calendly.com/elboumshouli-mouhssine/30min",
  resumeUrl: "/cv/Mouhssine_El_Boumshouli_CV_EN.pdf",
  frenchResumeUrl: "/cv/Mouhssine_El_Boumshouli_CV_FR.pdf",
} as const

export type SocialLink = {
  name: string
  href: string
  /** External links open in a new tab and get rel=noopener. */
  isExternal: boolean
  icon: "resume" | "mail" | "github" | "linkedin" | "send"
}
