import { Mail, Video } from "lucide-react"

import { AvatarSwitch } from "@/components/home/avatar-switch"
import { MagneticButton } from "@/components/common/magnetic-button"
import { RoleCycle } from "@/components/home/role-cycle"
import { profile } from "@/lib/content/profile"
import type { Locale } from "@/lib/i18n/config"
import { getMessages } from "@/lib/i18n/messages"

/**
 * The first viewport: portrait, name, what I do, and the two ways to
 * get in touch.
 */
export function Hero({ locale }: { locale: Locale }) {
  const messages = getMessages(locale)

  return (
    <header className="flex w-full items-start">
      <div className="p-3 sm:p-4">
        <AvatarSwitch />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-0 pt-3 sm:pt-4">
        <h1 className="text-xl font-medium text-neutral-700 md:text-2xl dark:text-neutral-50">
          {profile.name}
        </h1>

        <p className="flex min-h-6 items-center text-sm font-medium text-neutral-500/80 md:text-base dark:text-neutral-400">
          <RoleCycle roles={messages.hero.roles} />
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <MagneticButton
            href={profile.calendlyUrl}
            label={messages.hero.bookCall}
            icon={
              <Video
                className="size-3.5 shrink-0 text-yellow-400 dark:text-yellow-600"
                aria-hidden
              />
            }
          />
          <MagneticButton
            href={"mailto:" + profile.email}
            label={messages.hero.sendEmail}
            external={false}
            icon={<Mail className="size-3.5 shrink-0" aria-hidden />}
          />
        </div>
      </div>
    </header>
  )
}

export default Hero
