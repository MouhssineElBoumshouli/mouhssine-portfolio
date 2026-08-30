import { ArrowUpRight, Mail } from "lucide-react"

import { PageHeader } from "@/components/layout/page-header"
import { SectionHeading } from "@/components/layout/section-heading"
import { HatchRule } from "@/components/layout/rules"
import { ContactForm } from "@/components/contact/contact-form"
import { LinkedInIcon } from "@/components/icons/brand"
import { profile } from "@/lib/content/profile"
import { cn } from "@/lib/utils"

const directRoutes = [
  {
    name: "Email me directly",
    detail: profile.email,
    href: "mailto:" + profile.email,
    icon: Mail,
    primary: true,
    external: false,
  },
  {
    name: "Connect on LinkedIn",
    detail: "mouhssine-bms",
    href: profile.linkedinUrl,
    icon: LinkedInIcon,
    primary: false,
    external: true,
  },
]

export function ContactPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk about what you're building"
        action={
          <span className="border-border bg-muted/30 text-muted-foreground rounded-full border px-3 py-1 text-xs font-medium sm:text-sm">
            Based in Fès
          </span>
        }
      />

      <SectionHeading as="h2">Fastest routes</SectionHeading>

      <div className="grid grid-cols-1 gap-2 px-4 py-5 sm:grid-cols-2 sm:px-6">
        {directRoutes.map((route) => (
          <a
            key={route.name}
            href={route.href}
            {...(route.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className={cn(
              "group focus-visible:ring-ring/50 flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left outline-none transition-all focus-visible:ring-[3px]",
              route.primary
                ? "bg-foreground text-background hover:opacity-90"
                : "border-border bg-background border hover:border-neutral-400 dark:hover:border-neutral-600"
            )}
          >
            <span
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-md",
                route.primary
                  ? "bg-background/15"
                  : "bg-muted text-muted-foreground"
              )}
            >
              <route.icon className="size-4" aria-hidden />
            </span>

            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold">
                {route.name}
              </span>
              <span
                className={cn(
                  "block truncate text-xs",
                  route.primary ? "text-background/70" : "text-muted-foreground"
                )}
              >
                {route.detail}
              </span>
            </span>

            <ArrowUpRight
              className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </a>
        ))}
      </div>

      <HatchRule />

      <SectionHeading as="h2">Send a message</SectionHeading>
      <div className="px-4 py-5 sm:px-6">
        <p className="text-muted-foreground mb-5 max-w-prose text-sm leading-relaxed">
          Write here and it lands in my inbox. Roles, collaboration, research,
          or a question about something I&apos;ve built - all welcome.
        </p>
        <ContactForm />
      </div>
    </main>
  )
}

export default ContactPage
