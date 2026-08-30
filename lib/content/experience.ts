export type Experience = {
  id: string
  company: string
  role: string
  location: string
  /** Rendered as start - end; omit end for an ongoing role. */
  period: { start: string; end?: string }
  logo?: string
  website?: string
  isCurrent?: boolean
}

export const experiences: Experience[] = [
  {
    id: "convoroute",
    company: "Convoroute LLC",
    role: "Founder & Developer",
    location: "United States · Remote",
    period: { start: "Jun 2026" },
    isCurrent: true,
  },
  {
    id: "bounaim-auto",
    company: "Bounaim Auto",
    role: "Software & AI Engineering Intern",
    location: "Beni Mellal, Morocco",
    period: { start: "Jul 2026", end: "Aug 2026" },
  },
]
