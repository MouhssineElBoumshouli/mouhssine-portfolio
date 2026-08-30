export type Project = {
  slug: string
  title: string
  subheading?: string
  description: string
  image: string
  /** Optional clip played on hover, with image as the poster frame. */
  video?: string
  links: { website?: string; github?: string }
  technologies: string[]
  status: "live" | "building" | "research"
}

/**
 * Order matters: the home page shows the first two, and the projects
 * page lists all of them.
 */
export const projects: Project[] = [
  {
    slug: "dare-agent-reliability",
    title: "DARE-Bench Agent Reliability Study",
    subheading: "LLM agents, evaluation & repeatability",
    description:
      "A reproducible 240-run study comparing agent turn budgets on a fixed DARE-Bench subset, with official rescoring and failure-taxonomy analysis.",
    image: "/dare-bench-result.png",
    links: {
      github: "https://github.com/MouhssineElBoumshouli/dare-agent-reliability",
    },
    technologies: ["Python", "OpenAI API", "pandas", "scikit-learn", "Docker"],
    status: "research",
  },
  {
    slug: "smartimport",
    title: "SmartImport",
    subheading: "Procurement decision support",
    description:
      "A full-stack platform that compares international automotive supplier quotations, landed costs and purchase completeness with human-reviewed AI assistance.",
    image: "/projects/smartimport/dashboard.png",
    links: {
      github: "https://github.com/MouhssineElBoumshouli/smartimport-procurement",
    },
    technologies: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Docker"],
    status: "building",
  },
  {
    slug: "medskel",
    title: "medskel",
    subheading: "Medical-image skeletonisation",
    description:
      "A Python implementation and evaluation of bisector skeletonisation for 2D medical segmentations, compared with pixel thinning on 28 retinal images.",
    image: "/projects/medskel/interobserver.png",
    links: {
      github: "https://github.com/MouhssineElBoumshouli/medskel",
    },
    technologies: ["Python", "OpenCV", "Shapely", "NumPy"],
    status: "research",
  },
  {
    slug: "uemf-presence",
    title: "UEMF Presence",
    subheading: "GPS + rotating QR attendance",
    description:
      "A deployed university attendance system with recurring schedules, GPS check-in, rotating HMAC-SHA256 QR tokens, review workflows and anomaly reporting.",
    image: "/projects/attendance/preview.png",
    links: {
      website: "https://student-attendance-system-amber.vercel.app",
      github: "https://github.com/MouhssineElBoumshouli/Student-Attendance-System",
    },
    technologies: ["Next.js", "React", "PostgreSQL", "Prisma", "Vercel"],
    status: "live",
  },
]
