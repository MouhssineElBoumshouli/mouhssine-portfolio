import type { Metadata } from "next"

import { ProjectList } from "@/components/projects/project-list"
import { profile } from "@/lib/content/profile"
import { siteUrl, socialPreviewImage } from "@/lib/content/site"

const description =
  "Selected AI and full-stack projects built by " +
  profile.name +
  " - from reproducible research and computer vision to deployed web systems."

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: `${siteUrl}/projects` },
  openGraph: {
    title: "Projects | " + profile.name,
    description,
    url: `${siteUrl}/projects`,
    type: "website",
    images: [{ ...socialPreviewImage, type: "image/png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | " + profile.name,
    description,
    images: [socialPreviewImage],
  },
}

export default function ProjectsPage() {
  return <ProjectList />
}
