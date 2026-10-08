"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import type { Project } from "@/lib/content/projects"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { RecallCover } from "./recall-cover"

/** Preview playback is opt-in, pauses off-screen, and never runs under reduced motion. */
export function ProjectMedia({
  project,
  active = false,
  controls = false,
  priority = false,
  alt = "",
  className,
}: {
  project: Project
  active?: boolean
  controls?: boolean
  priority?: boolean
  alt?: string
  className?: string
}) {
  const host = useRef<HTMLSpanElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const [visible, setVisible] = useState(false)
  const reduced = useReducedMotion()
  const playing = active && visible && !reduced && !controls

  useEffect(() => {
    if (!host.current) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    observer.observe(host.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const element = video.current
    if (!element) return
    if (playing) {
      void element.play().then(() => {
        // A pending play request can resolve after focus/visibility changed.
        if (element.dataset.playing !== "true") element.pause()
      }).catch(() => {})
    } else {
      element.pause()
    }
  }, [playing])

  return (
    <span ref={host} className={className} role={project.preview && alt ? "img" : undefined} aria-label={project.preview && alt ? alt : undefined}>
      {project.preview === "waveform" ? (
        <RecallCover background={project.image} animated={playing} priority={priority} />
      ) : project.video ? (
        <video
          ref={video}
          src={playing || controls ? project.video : undefined}
          poster={project.image}
          muted
          loop={!controls}
          playsInline
          preload="none"
          controls={controls}
          aria-hidden={controls ? undefined : true}
          aria-label={controls ? alt : undefined}
          data-playing={playing}
          className="size-full object-cover object-top"
        />
      ) : (
        <Image src={project.image} alt={alt} width={1200} height={630} priority={priority} className="size-full object-cover object-top" />
      )}
    </span>
  )
}
