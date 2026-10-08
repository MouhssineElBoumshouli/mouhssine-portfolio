export type ProjectSection = "motivation" | "built" | "capabilities" | "technicalDetails" | "role" | "outcome"

export type Project = {
  slug: string
  title: string
  subheading?: string
  /** Short card copy; the dialog uses the longer description. */
  summary: string
  description: string
  image: string
  imageAlt: string
  /** Optional clip played on hover, with image as the poster frame. */
  video?: string
  /** Code-native project illustration layered over the supplied image. */
  preview?: "waveform"
  /** Lossless WebP source for illustrations; image remains the original fallback. */
  imageWebp?: string
  links: { website?: string; github?: string }
  technologies: string[]
  status: "live" | "building" | "research" | "internship" | "prototype"
  details: {
    headings?: Partial<Record<ProjectSection, string>>
    motivation?: string
    built?: string[]
    capabilities?: string[]
    technicalDetails?: string[]
    role?: string
    outcome?: string
  }
}

/** The first two projects remain featured on the homepage. */
export const projects: Project[] = [
  {
    slug: "dare-agent-reliability",
    title: "DARE-Bench reliability study",
    subheading: "Repeated tests of a data-science agent",
    summary: "Testing whether an AI agent completes the same task consistently.",
    description: "An average score can hide inconsistent results. I studied whether giving a data-science agent more turns improves both its success rate and its consistency. A turn is one cycle of writing code, running it, and reading the result.",
    image: "/projects/dare-bench/preview.webp",
    imageAlt: "Results from the DARE-Bench reliability study",
    links: { github: "https://github.com/MouhssineElBoumshouli/dare-agent-reliability" },
    technologies: ["Python", "OpenAI API", "pandas", "scikit-learn", "Docker"],
    status: "research",
    details: {
      headings: { motivation: "Research question", built: "Study design", technicalDetails: "Evaluation setup", outcome: "Findings and limits" },
      motivation: "Can an agent that succeeds on a task do so again? I compared repeated attempts, rather than relying on one result per task.",
      built: [
        "A fixed set of 24 data-science tasks, each repeated five times with three-turn and five-turn limits: 240 runs in total.",
        "Scoring with DARE-Bench’s official evaluator, followed by analysis of passing, failing, and mixed-result tasks.",
        "Scripts for checking result files and reproducing the tables and figures.",
      ],
      technicalDetails: [
        "The study uses DARE-Bench’s unchanged agent with a fixed GPT-4.1 mini version and a Docker sandbox.",
        "The model and task subset stay the same across both turn limits.",
      ],
      role: "I designed and ran this independent study, analysed the results, and documented the experiment.",
      outcome: "Success increased from 34.2% with three turns to 50% with five. Tasks with mixed results—some repeats passed and others failed—also increased from 7 to 10 out of 24. More turns improved average success without making every task consistent; some previously unsuccessful tasks began passing occasionally. This does not show that more turns always make agents less reliable. The findings concern one model and a fixed task subset.",
    },
  },
  {
    slug: "smartimport",
    title: "SmartImport",
    subheading: "Comparing supplier quotations",
    summary: "Comparing quotations, missing items, and the full cost of a purchase.",
    description: "The cheapest quotation may leave out products or additional costs. During my internship at Bounaim Auto, I built SmartImport to make those differences visible before a purchasing decision.",
    image: "/projects/smartimport/preview.webp",
    imageAlt: "SmartImport quotation comparison interface",
    links: { github: "https://github.com/MouhssineElBoumshouli/smartimport-procurement" },
    technologies: ["React", "TypeScript", "FastAPI", "PostgreSQL", "SQLAlchemy", "Pydantic", "Docker", "Nginx", "pytest", "Vitest", "Ruff", "mypy", "ESLint"],
    status: "internship",
    details: {
      headings: { motivation: "The problem", built: "What I built", technicalDetails: "How it works", outcome: "Evaluation and scope" },
      motivation: "Supplier totals are difficult to compare fairly when the offers include different items, quantities, currencies, and fees.",
      built: [
        "Purchasing requirements and quotation comparison, including missing items.",
        "Currency conversion, additional-cost calculations, and saved analyses.",
        "PDF and spreadsheet imports with human review of AI-extracted information, plus analysis exports.",
      ],
      technicalDetails: [
        "Financial calculations run in the FastAPI backend. AI suggests extracted information and product matches; people review those suggestions before saving them.",
        "A React interface connects to PostgreSQL-backed records through the API. Tests cover backend rules and frontend behaviour.",
      ],
      role: "I developed the application during my software and AI engineering internship at Bounaim Auto.",
      outcome: "On synthetic evaluation data, the matching system found the correct purchasing requirement in 12 of 13 scored cases (92.31%). This measures item matching—not supplier quality, selection of the best supplier, or production-wide accuracy. The public repository contains the implementation and evaluation materials; there is no public live demo.",
    },
  },
  {
    slug: "recall",
    title: "Recall",
    subheading: "Recording, transcription, and notes",
    summary: "A mobile prototype for recording conversations and creating notes.",
    description: "I’m building Recall to make recorded conversations easier to revisit. It combines local recordings, transcription, bookmarks, and notes generated from the transcript.",
    image: "/projects/recall/background.png",
    imageWebp: "/projects/recall/background-lossless.webp",
    preview: "waveform",
    imageAlt: "Recall project cover with an abstract audio waveform, not an app screenshot",
    links: { github: "https://github.com/MouhssineElBoumshouli/recall" },
    technologies: ["React Native", "Expo", "TypeScript", "SQLite", "Node.js", "Gemini API", "Vitest"],
    status: "prototype",
    details: {
      headings: { motivation: "What I’m exploring", built: "Implemented so far", technicalDetails: "How sessions are stored", outcome: "Current status" },
      motivation: "A recording should remain useful even when an AI service is unavailable. I’m separating reliable local capture from transcription and note generation.",
      built: [
        "Recording and live transcription, with saved sessions, playback, and bookmarks.",
        "Summaries, key points, action items, and topic chapters generated from the transcript.",
        "Retryable processing that preserves saved audio and transcripts when a request fails.",
      ],
      technicalDetails: [
        "Original and AI-repaired transcripts remain separate. The selected transcript is a processing input, not guaranteed ground truth.",
        "Sessions and generated notes use SQLite. Long-lived API credentials stay on the server.",
        "Notes are marked as outdated when their source transcript changes.",
      ],
      role: "I’m developing the mobile app, server, storage, and processing workflows.",
      outcome: "This is a development prototype, not a released app. Saved recordings and generated notes can be opened offline; transcription and note generation require a connection. Mixed-language transcription still needs further testing, along with additional device checks.",
    },
  },
  {
    slug: "medskel",
    title: "medskel",
    subheading: "Measuring blood vessels from images",
    summary: "Testing a published method for measuring blood-vessel centerlines.",
    description: "Two people can trace the same blood vessel differently. I investigated how those differences affect measurements after reducing the traced vessels to centerlines.",
    image: "/projects/medskel/preview.webp",
    imageAlt: "medskel skeletonization experiments and vessel measurements",
    links: { github: "https://github.com/MouhssineElBoumshouli/medskel" },
    technologies: ["Python", "OpenCV", "NumPy", "SciPy", "scikit-image", "NetworkX"],
    status: "research",
    details: {
      headings: { motivation: "Research question", built: "Implementation and experiments", technicalDetails: "Measurement approach", outcome: "Findings and limits" },
      motivation: "Does simplifying a vessel boundary make measurements less sensitive to differences between two people’s tracings?",
      built: [
        "A Python implementation of the skeletonization method published by Saidou, Zineddine, and Rhazzaf in 2024.",
        "Measurement tools and checks against shapes with known geometry.",
        "Experiments comparing the method with pixel thinning, including 28 retinal images traced by two observers.",
      ],
      technicalDetails: [
        "The pipeline simplifies the boundary, constructs a Voronoi-based skeleton, and measures the resulting vessel branches.",
        "An independent wavefront construction cross-checks simple convex shapes; it does not handle every concave shape.",
      ],
      role: "I implemented the published method, designed the experiments, and evaluated the results.",
      outcome: "For the evaluated configuration, median relative disagreement in total vessel length was 3.2%, compared with 9.3% for thinning. However, centerline positions agreed less closely and processing was slower. Better agreement between observers does not establish greater accuracy or clinical validity.",
    },
  },
  {
    slug: "uemf-presence",
    title: "UEMF Presence",
    subheading: "University attendance tracking",
    summary: "A university project with GPS and rotating QR attendance check-in.",
    description: "Built with three classmates for an Operations Research module at EIDIA, this system combines recurring schedules, GPS and rotating QR check-in, attendance history, and professor review.",
    image: "/projects/attendance/preview.webp",
    imageAlt: "UEMF Presence attendance dashboard with demonstration data",
    links: {
      website: "https://student-attendance-system-amber.vercel.app",
      github: "https://github.com/MouhssineElBoumshouli/Student-Attendance-System",
    },
    technologies: ["Next.js", "React", "TypeScript", "PostgreSQL", "Prisma", "Vercel", "HTML", "CSS"],
    status: "live",
    details: {
      headings: { built: "Attendance workflows", technicalDetails: "Check-in and review", outcome: "Demo scope" },
      built: [
        "Separate dashboards for students, professors, and administrators.",
        "Recurring schedules, check-in, attendance history, and CSV reports.",
      ],
      technicalDetails: [
        "QR tokens use HMAC-SHA256 and rotate every 10 seconds.",
        "Suspicious check-ins are flagged for review rather than treated as proof of fraud.",
      ],
      outcome: "The public deployment is a demonstration using sample data, not an operational university service.",
    },
  },
]
