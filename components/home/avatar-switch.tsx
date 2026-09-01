"use client"

import { useState } from "react"
import Image from "next/image"

import { profile } from "@/lib/content/profile"
import { cn } from "@/lib/utils"
import { useLocale } from "@/components/i18n/locale-provider"
import { getMessages } from "@/lib/i18n/messages"

/**
 * The portrait plus a switch that flips between the provided photo and the
 * public GitHub avatar. Both images stay mounted and cross-fade, so the swap
 * costs no network round trip and never flashes an empty frame.
 */
export function AvatarSwitch() {
  const locale = useLocale()
  const messages = getMessages(locale)
  const [showGithubPhoto, setShowGithubPhoto] = useState(false)
  return (
    <div className="flex w-fit flex-col items-center gap-2">
      <div className="border-border w-fit rounded-[8px] border p-[2.7px] dark:border-neutral-700">
        <div className="border-border relative box-border size-14 overflow-hidden rounded-[7px] border bg-neutral-200 p-0.5 select-none sm:size-20 md:size-21 dark:bg-neutral-800">
          <Image
            src={profile.avatar}
            alt={`${profile.name} - ${profile.title}`}
            width={120}
            height={120}
            priority
            className={cn(
              "box-border size-full rounded-[5px] object-cover object-[50%_24%] transition-opacity duration-300",
              showGithubPhoto && "opacity-0"
            )}
          />
          <Image
            src={profile.avatarPhoto}
            alt={`${profile.name} - photo`}
            width={120}
            height={120}
            aria-hidden={!showGithubPhoto}
            className={cn(
              "absolute inset-1 box-border size-[calc(100%-0.5rem)] rounded-[5px] object-cover transition-opacity duration-300",
              showGithubPhoto ? "opacity-100" : "opacity-0"
            )}
          />
        </div>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={showGithubPhoto}
        aria-label={messages.accessibility.showGithubPhoto}
        onClick={() => setShowGithubPhoto((value) => !value)}
        className={cn(
          "focus-visible:ring-ring/50 relative h-[18px] w-8 shrink-0 cursor-pointer rounded-full border transition-colors outline-none focus-visible:ring-[3px]",
          showGithubPhoto
            ? "border-transparent bg-neutral-800 dark:bg-neutral-200"
            : "border-border bg-neutral-200 dark:bg-neutral-800"
        )}
      >
        <span
          aria-hidden
          className={cn(
            "absolute top-1/2 size-3 -translate-y-1/2 rounded-full bg-white shadow-sm transition-[left] duration-200 dark:bg-neutral-900",
            showGithubPhoto ? "left-[15px]" : "left-[2px]"
          )}
        />
      </button>
    </div>
  )
}

export default AvatarSwitch
