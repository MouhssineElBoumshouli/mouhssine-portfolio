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
    slug: "autostock-ai",
    title: "AutoStock AI",
    subheading: "Stock and demand forecasting for auto-parts shops",
    summary: "Knowing what a small auto-parts shop has, what sells, and what to order.",
    description: "I built AutoStock AI for small auto-parts shops: it reads the shop's own Excel files, forecasts demand, and suggests what to order. It grew out of my summer internship at Bounaim Auto. The first version was an Odoo add-on; it was too heavy, so I rebuilt it lighter from scratch.",
    image: "/projects/autostock-ai/preview.jpg",
    imageAlt: "AutoStock AI home page showing stock alerts and the shop assistant",
    links: { github: "https://github.com/MouhssineElBoumshouli/autostock-ai" },
    technologies: ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "SQLAlchemy", "Pydantic", "scikit-learn"],
    status: "internship",
    details: {
      headings: { motivation: "The problem", built: "What I built", technicalDetails: "How it works", outcome: "Results and limits" },
      motivation: "Most small auto-parts shops run their stock on Excel. They run out of the parts that sell and keep money stuck in parts that never move.",
      built: [
        "Stock import from the shop's own Excel or CSV files, with every refused line explained.",
        "Demand forecasts for 7, 30 and 60 days, with an honest range.",
        "Order suggestions grouped by supplier, rounded to pack sizes, each with a one-line reason — a person approves every line.",
        "An AI assistant that answers questions in French or English from the shop's real numbers.",
        "Daily alerts for stock problems and unusual sales, at most 3 a day.",
      ],
      technicalDetails: [
        "FastAPI and PostgreSQL on the server, React and TypeScript on the website, packaged as a Windows app that works offline.",
        "Each part is classed by how it sells; several forecasting methods compete on 12 past windows, and a method is used only if it beats the 4-week average by at least 5%.",
        "The first version was an Odoo add-on. After 9 days we stopped — most of the work went into the platform — and rebuilt it without an ERP.",
      ],
      role: "I designed and built the application, the back end, the website and the design; Badr Lasri led the forecasting math and the statistical evaluation.",
      outcome: "On a simulated shop (2,014 parts, 3 branches, 2 years, 838,738 sales lines), forecasts had 37% less error at 60 days than a 4-week average, and lost sales fell to 5.5%, versus 8.1% for the classic reorder rule. Over 800 automated tests pass. These numbers come from a simulated shop; a trial in a real shop is the next step.",
    },
  },
  {
    slug: "medskel-ai",
    title: "MedSkel AI",
    subheading: "Retinal vessel segmentation with a U-Net",
    summary: "Finding, tracing and measuring blood vessels in eye photos.",
    description: "I built a deep learning app that finds, traces and measures blood vessels in eye photos. It is a research prototype, not a medical device. I trained a U-Net from scratch on 510 FIVES images using a 4 GB laptop GPU.",
    image: "/projects/medskel-ai/preview.png",
    imageAlt: "Training curves for the MedSkel AI vessel-segmentation model",
    links: { github: "https://github.com/MouhssineElBoumshouli/medskel-ai" },
    technologies: ["Python", "PyTorch", "OpenCV", "NumPy"],
    status: "research",
    details: {
      headings: { motivation: "Research question", built: "What I built", technicalDetails: "Training setup", outcome: "Results and limits" },
      motivation: "Two people tracing the same vessel can disagree. I wanted to see whether a U-Net trained from scratch could trace vessels and measure them about as consistently as human experts.",
      built: [
        "A U-Net implemented and trained from scratch on 510 FIVES retinal images.",
        "A measurement step using MedSkel center lines to count vessel branches and measure lengths.",
        "Evaluation on the 200-image FIVES official test set and on 28 CHASE_DB1 images the model never saw.",
      ],
      technicalDetails: [
        "Training ran on a 4 GB laptop GPU.",
        "The training loss combines binary cross-entropy and soft Dice loss; validation Dice was tracked on fixed crops.",
        "The test set and the CHASE_DB1 images were never used for training.",
      ],
      role: "I designed and trained the model, ran the evaluation, and documented the results.",
      outcome: "Dice reached 0.889 on the 200-image FIVES official test set and 0.766 on the unseen CHASE_DB1 images, close to the 0.777 agreement between two human experts. Measuring with MedSkel center lines halved the variation in vessel branch counts compared with standard thinning (26% vs 53%). These results concern retinal images from two datasets; the app is a research prototype, not a medical device.",
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
