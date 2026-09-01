"use client"

import { useEffect, useState } from "react"
import { useLocale } from "@/components/i18n/locale-provider"
import { getMessages } from "@/lib/i18n/messages"

/**
 * Local wall-clock for a fixed timezone. Renders nothing until mounted
 * so the server and client markup never disagree.
 */
export function TimeCounter({
  className,
  timeZone,
}: {
  className?: string
  timeZone?: string
}) {
  const [time, setTime] = useState<string | null>(null)
  const messages = getMessages(useLocale())

  useEffect(() => {
    const format = () =>
      new Date().toLocaleTimeString("en-GB", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone,
      })

    setTime(format())
    const timer = window.setInterval(() => setTime(format()), 1000)
    return () => window.clearInterval(timer)
  }, [timeZone])

  return (
    <span className={className} aria-label={messages.accessibility.localTime}>
      {/* Reserve the width so the line never reflows on mount. */}
      {time ?? "--:--:--"}
    </span>
  )
}

export default TimeCounter
