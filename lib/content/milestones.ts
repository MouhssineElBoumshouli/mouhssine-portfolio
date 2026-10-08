export type Milestone = {
  id: string
  title: string
  date: string
  description: string
}

/** Dates stay year-only unless the source establishes a more precise period. */
export const milestones = [
  {
    id: "convoroute",
    title: "Founded Convoroute LLC",
    date: "Jun 2026",
    description: "Began developing AI customer-service chatbots that can be integrated into websites.",
  },
  {
    id: "smartimport",
    title: "Built SmartImport during my internship",
    date: "Jul–Aug 2026",
    description: "Developed quotation comparison, cost calculations, and human-reviewed document extraction at Bounaim Auto.",
  },
  {
    id: "dare-agent-reliability",
    title: "Completed the DARE-Bench study",
    date: "2026",
    description: "Ran 240 experiments and published the analysis and reproducibility materials.",
  },
  {
    id: "medskel",
    title: "Evaluated medskel",
    date: "2026",
    description: "Compared a published skeletonization method with thinning on synthetic shapes and retinal images.",
  },
  {
    id: "recall",
    title: "Added saved sessions and notes to Recall",
    date: "2026",
    description: "Implemented persistent recordings, transcripts, bookmarks, and structured notes.",
  },
] as const satisfies readonly Milestone[]

export type MilestoneId = (typeof milestones)[number]["id"]
