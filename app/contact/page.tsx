import type { Metadata } from "next"

import { ContactPage } from "@/components/contact/contact-page"
import { profile } from "@/lib/content/profile"
import { siteUrl, socialPreviewImage } from "@/lib/content/site"

const description =
  "Get in touch with " +
  profile.name +
  " about AI engineering, full-stack software, research, or anything he has built."

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: `${siteUrl}/contact` },
  openGraph: {
    title: "Contact | " + profile.name,
    description,
    url: `${siteUrl}/contact`,
    type: "website",
    images: [{ ...socialPreviewImage, type: "image/png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | " + profile.name,
    description,
    images: [socialPreviewImage],
  },
}

export default function Page() {
  return <ContactPage />
}
