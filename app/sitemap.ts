import type { MetadataRoute } from "next"

import { siteUrl } from "@/lib/content/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    { url: siteUrl, lastModified, changeFrequency: "monthly", priority: 1 },
    {
      url: `${siteUrl}/fr`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/fr/projects`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/fr/contact`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ]
}
