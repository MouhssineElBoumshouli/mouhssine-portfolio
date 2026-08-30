"use client"

import * as React from "react"
import Image from "next/image"
import { ArrowUpRight, ExternalLink } from "lucide-react"

import { TechIcon, slugForTech } from "@/components/common/tech-icon"
import { GitHubIcon } from "@/components/icons/brand"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Project } from "@/lib/content/projects"
import { cn } from "@/lib/utils"

const statusLabels: Record<Project["status"], string> = {
  live: "Live",
  building: "In progress",
  research: "Research",
}

type ProjectDialogContextValue = {
  open: boolean
  openDialog: () => void
  rememberTrigger: (element: HTMLElement) => void
}

type ProjectDialogTriggerChildProps = React.HTMLAttributes<HTMLElement> & {
  "data-state"?: "open" | "closed"
}

const ProjectDialogContext = React.createContext<
  ProjectDialogContextValue | undefined
>(undefined)

function ProjectSection({
  label,
  text,
  items,
}: {
  label: string
  text?: string
  items?: string[]
}) {
  if (!text && !items?.length) return null

  return (
    <section className="space-y-2">
      <h3 className="text-muted-foreground font-mono text-[11px] font-medium tracking-[0.16em] uppercase">
        {label}
      </h3>
      {text && <p className="text-sm leading-relaxed">{text}</p>}
      {items?.length ? (
        <ul className="text-muted-foreground list-disc space-y-1.5 pl-4 text-sm leading-relaxed">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}

function ProjectDialogBody({ project }: { project: Project }) {
  const { details } = project

  return (
    <div className="flex max-h-[calc(100dvh-1rem)] min-h-0 flex-col overflow-hidden sm:max-h-[min(85dvh,52rem)]">
      <div className="border-border relative aspect-[16/9] shrink-0 overflow-hidden border-b bg-neutral-100 dark:bg-neutral-900">
        <Image
          src={project.image}
          alt={`${project.title} project preview`}
          fill
          sizes="(max-width: 640px) calc(100vw - 2rem), 672px"
          className="object-cover object-top"
          priority
        />
      </div>

      <div className="min-h-0 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
        <DialogHeader className="gap-3 pr-8 text-left">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className={cn(
                "font-mono text-[10px] tracking-wide uppercase",
                project.status === "live" &&
                  "border-live/40 text-live dark:border-live/50",
                project.status === "building" &&
                  "border-building/50 text-building dark:border-building/60",
                project.status === "research" &&
                  "text-muted-foreground border-border"
              )}
            >
              {statusLabels[project.status]}
            </Badge>
            {project.subheading && (
              <span className="text-muted-foreground text-xs">
                {project.subheading}
              </span>
            )}
          </div>
          <DialogTitle className="text-xl leading-tight sm:text-2xl">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-sm leading-relaxed">
            {project.description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-5">
          <ProjectSection label="Why I built it" text={details.motivation} />
          <ProjectSection label="What I built" items={details.built} />
          <ProjectSection label="Key capabilities" items={details.capabilities} />
          <ProjectSection
            label="Technical details"
            items={details.technicalDetails}
          />
          <ProjectSection label="My contribution" text={details.role} />
          <ProjectSection label="Outcome / current status" text={details.outcome} />

          <section className="space-y-2">
            <h3 className="text-muted-foreground font-mono text-[11px] font-medium tracking-[0.16em] uppercase">
              Technologies
            </h3>
            <ul className="flex flex-wrap gap-1.5">
              {project.technologies.map((technology) => (
                <li key={technology}>
                  <span className="bg-muted text-muted-foreground inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs">
                    <TechIcon
                      slug={slugForTech(technology)}
                      className="size-3 shrink-0"
                    />
                    {technology}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {(project.links.website || project.links.github) && (
          <DialogFooter className="border-border mt-6 flex-col gap-2 border-t pt-4 sm:flex-row sm:justify-start">
            {project.links.website && (
              <Button asChild size="sm">
                <a
                  href={project.links.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink aria-hidden />
                  Live Demo
                </a>
              </Button>
            )}
            {project.links.github && (
              <Button asChild size="sm" variant="outline">
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubIcon aria-hidden />
                  View Code
                  <ArrowUpRight aria-hidden />
                </a>
              </Button>
            )}
          </DialogFooter>
        )}
      </div>
    </div>
  )
}

export function ProjectDialog({
  project,
  children,
}: {
  project: Project
  children: React.ReactNode
}) {
  const lastTriggerRef = React.useRef<HTMLElement | null>(null)
  const [open, setOpen] = React.useState(false)

  const rememberTrigger = React.useCallback((element: HTMLElement) => {
    lastTriggerRef.current = element
  }, [])

  const openDialog = React.useCallback(() => setOpen(true), [])

  return (
    <ProjectDialogContext.Provider value={{ open, openDialog, rememberTrigger }}>
      <Dialog open={open} onOpenChange={setOpen}>
        {children}
        <DialogContent
          onCloseAutoFocus={(event) => {
            event.preventDefault()
            lastTriggerRef.current?.focus()
          }}
          className="max-h-[calc(100dvh-1rem)] max-w-[calc(100%-1rem)] overflow-hidden p-0 sm:max-w-2xl"
        >
          <ProjectDialogBody project={project} />
        </DialogContent>
      </Dialog>
    </ProjectDialogContext.Provider>
  )
}

export function ProjectDialogTrigger(
  props: {
    asChild?: boolean
    children: React.ReactElement<ProjectDialogTriggerChildProps>
  }
) {
  const context = React.useContext(ProjectDialogContext)
  const child = React.Children.only(
    props.children
  ) as React.ReactElement<ProjectDialogTriggerChildProps>

  if (!context) return child

  return React.cloneElement(child, {
    "aria-haspopup": "dialog",
    "aria-expanded": context.open,
    "data-state": context.open ? "open" : "closed",
    onClick: (event: React.MouseEvent<HTMLElement>) => {
      context.rememberTrigger(event.currentTarget)
      context.openDialog()
      child.props.onClick?.(event)
    },
  })
}

export default ProjectDialog
