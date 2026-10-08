"use client"

import { useState } from "react"
import { GitHubIcon } from "@/components/icons/brand"

import { TechIcon, slugForTech } from "@/components/common/tech-icon"
import { chipClass } from "@/lib/button-styles"
import type { Project } from "@/lib/content/projects"
import type { Locale } from "@/lib/i18n/config"
import { getLocalizedProject } from "@/lib/i18n/content"
import { getMessages } from "@/lib/i18n/messages"
import { cn } from "@/lib/utils"
import { ProjectMedia } from "./project-media"
import {
  ProjectDialog,
  ProjectDialogTrigger,
} from "@/components/projects/project-dialog"

/** The skill badge, trimmed a little to sit on the title's line. */
const projectButtonClass = cn(chipClass, "gap-1 px-1.5 py-0.5")

/**
 * Deliberately not a card: no border, no shadow, no rounded panel. The
 * rest of the site is flat sections split by hairlines, and a raised box
 * sitting inside that read as a widget bolted on from somewhere else.
 * The only framed thing here is the screenshot.
 *
 * The image and title open the shared project detail dialog. The two
 * explicit links stay on the title's line and continue to open directly.
 */
export function ProjectCard({
  project,
  priority = false,
  locale,
}: {
  project: Project
  priority?: boolean
  locale?: Locale
}) {
  const resolvedLocale = locale ?? "en"
  const copy = getLocalizedProject(project, resolvedLocale)
  const messages = getMessages(resolvedLocale)
  const { website, github } = project.links
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)

  return (
    <div className="group/card relative flex flex-1 flex-col gap-2">
      <ProjectDialog project={project} locale={resolvedLocale}>
        <ProjectDialogTrigger asChild>
          <button
            type="button"
            aria-label={messages.projectDialog.viewDetails(copy.title)}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") setHovered(true)
            }}
            onPointerLeave={() => setHovered(false)}
            onFocus={(event) => setFocused(event.currentTarget.matches(":focus-visible"))}
            onBlur={() => setFocused(false)}
            onClick={() => setHovered(false)}
            // `group/media` and not the card's own group: the drift should
            // answer the pointer being on the picture, not anywhere on the
            // entry. `overflow-hidden` keeps the scale inside the frame.
            className="group/media border-border focus-visible:ring-ring/50 block w-full cursor-pointer overflow-hidden rounded-md border bg-transparent p-0 text-left outline-none focus-visible:ring-[3px]"
          >
            <ProjectMedia
              project={project}
              priority={priority}
              active={hovered || focused}
              className="block h-44 w-full transition-transform duration-500 ease-out group-hover/media:scale-[1.03] group-focus-visible/media:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none sm:h-48"
            />
          </button>
        </ProjectDialogTrigger>

        <div className="flex items-center justify-between gap-3">
          <h3 className="min-w-0 truncate text-[15px] leading-snug font-semibold">
            <ProjectDialogTrigger asChild>
              <button
                type="button"
                className="hover:text-primary focus-visible:ring-ring/50 max-w-full truncate rounded-sm bg-transparent p-0 text-left outline-none transition-colors focus-visible:ring-[3px]"
              >
                {copy.title}
              </button>
            </ProjectDialogTrigger>
          </h3>

          <div className="flex shrink-0 items-center gap-1.5">
            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className={projectButtonClass}
              >
                {messages.projectDialog.live}
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className={projectButtonClass}
              >
                <GitHubIcon className="size-3 shrink-0" aria-hidden />
                {messages.projectDialog.code}
              </a>
            )}
          </div>
        </div>
      </ProjectDialog>

      {/* One line only; the longer explanation lives in the shared dialog. */}
      <p className="text-muted-foreground truncate text-[13px] leading-snug">
        {copy.summary}
      </p>

      {/* The skill badge with its brand mark, held at the size these
          already were - only the styling is borrowed, not the scale. */}
      <ul className="flex flex-wrap gap-1.5">
        {project.technologies.slice(0, 4).map((tech) => (
          <li key={tech} className="flex">
            <span className={cn(chipClass, "gap-1 px-1.5 py-0.5 text-[11px]")}>
              <TechIcon slug={slugForTech(tech)} className="size-3 shrink-0" />
              {tech}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProjectCard
