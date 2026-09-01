"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { HatchRule } from "@/components/layout/rules"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/components/i18n/locale-provider"
import { localizedPath } from "@/lib/i18n/config"
import { getMessages } from "@/lib/i18n/messages"

export default function NotFound() {
  const locale = useLocale()
  const messages = getMessages(locale)

  return (
    <main>
      <HatchRule />
      <div className="flex flex-col items-center justify-center gap-4 px-4 py-24 text-center">
        <p className="font-mono text-sm text-muted-foreground">404</p>
        <h1 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          {messages.notFound.title}
        </h1>
        <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
          {messages.notFound.description}
        </p>
        <Button asChild className="mt-2">
          <Link href={localizedPath("/", locale)}>
            <ArrowLeft aria-hidden />
            {messages.notFound.backHome}
          </Link>
        </Button>
      </div>
      <HatchRule />
    </main>
  )
}
