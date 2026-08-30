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
  details: {
    motivation?: string
    built?: string[]
    capabilities?: string[]
    technicalDetails?: string[]
    role?: string
    outcome?: string
  }
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
    details: {
      motivation:
        "To examine whether average agent scores hide run-to-run variation when the same instruction-following task is repeated.",
      built: [
        "A frozen 24-task Classification-IF and Regression-IF subset with five repeats under both three- and five-turn agent budgets.",
        "Run capture, official exact-match rescoring, integrity checks, failure labels, derived tables and publication figures.",
      ],
      capabilities: [
        "Reproducible experiment configuration and provenance capture",
        "Task-level reliability and pairwise disagreement analysis",
        "Publication-ready figures and documented limitations",
      ],
      technicalDetails: [
        "The study records 240 immutable task-condition identities.",
        "Execution uses a pinned DARE-Bench evaluator and Docker sandbox; committed result tables and hashes form the public audit layer.",
      ],
      role: "Independent study implementation, experiment execution and analysis.",
      outcome:
        "On this fixed subset, five turns raised mean exact-match success from 34.2% to 50.0%, while mean pairwise disagreement rose from 15.0% to 21.7%. These are descriptive study results, not a general performance claim.",
    },
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
    details: {
      motivation:
        "Supplier totals are difficult to compare fairly when quotations contain different products, quantities, currencies and additional costs.",
      built: [
        "Requirement management and completeness-aware supplier comparison.",
        "PDF/XLSX quotation ingestion through a staged preview before records are created.",
        "Multi-currency normalization, landed-cost calculation, cash-out estimates and saved analysis snapshots.",
        "Human-reviewed AI extraction and requirement matching, with PDF/XLSX analysis exports.",
      ],
      capabilities: [
        "Keeps incomplete offers visible while limiting factual findings to calculation-ready offers",
        "Separates quoted goods, additional costs and exchange-rate assumptions",
        "Keeps deterministic backend calculations authoritative when AI assistance is enabled",
      ],
      technicalDetails: [
        "The React/TypeScript frontend communicates with a FastAPI service through Nginx.",
        "PostgreSQL, SQLAlchemy and Alembic support persistence, while an optional AI provider is isolated behind a backend interface.",
      ],
      outcome:
        "The public repository includes synthetic evaluation artifacts and documents their limits; the project remains marked as building.",
    },
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
    technologies: [
      "Python",
      "OpenCV",
      "NumPy",
      "SciPy",
      "scikit-image",
      "NetworkX",
    ],
    status: "research",
    details: {
      motivation:
        "To test a polygon-first bisector skeletonization method for 2D medical segmentations against the standard pixel-thinning baseline.",
      built: [
        "Polygon simplification, Voronoi/bisector skeletonization and measurement utilities for 2D masks.",
        "An independent wavefront construction to cross-check the Voronoi implementation.",
        "Controlled phantom, noise, transfer and two-observer retinal experiments, alongside a test suite with hand-derived checks.",
      ],
      capabilities: [
        "Compares aggregate vessel measurements and centerline placement between methods",
        "Evaluates behavior on synthetic phantoms and 28 retinal images traced by two observers",
        "Documents the method's trade-offs and the limits of each experiment",
      ],
      technicalDetails: [
        "The epsilon, theta_deg and prune parameters control boundary simplification, separation-angle filtering and scale-adaptive branch pruning.",
        "The repository uses OpenCV, NumPy, SciPy, scikit-image and NetworkX in its experiments and implementation.",
      ],
      role: "Implementation, experiment design and evaluation.",
      outcome:
        "The repository reports a trade-off: more reproducible aggregate vessel measurements, but less stable centerline position than pixel thinning, with higher runtime.",
    },
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
    details: {
      motivation:
        "To support recurring university attendance workflows with verifiable, location-aware check-in and reviewable anomaly handling.",
      built: [
        "Recurring timetable and semester-session management for administrators.",
        "Student and professor attendance through GPS/device verification or rotating QR check-in.",
        "Professor review workflows, attendance history, CSV reporting and an administrative anomaly dashboard.",
      ],
      capabilities: [
        "Automatic session state derived from the schedule",
        "Anti-fraud checks that flag suspicious attendance for review",
        "Separate administrator, professor and student dashboard flows",
      ],
      technicalDetails: [
        "QR tokens are protected with HMAC-SHA256 and rotate every 10 seconds.",
        "The documented attendance model combines temporal, geographic, cryptographic and unique-device checks.",
      ],
      outcome:
        "Built as an Operations Research module project at EIDIA during the 2025–2026 academic year and deployed as a live demo using demonstration data.",
    },
  },
]
