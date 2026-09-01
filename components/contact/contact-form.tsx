"use client"

import { useMemo, useState } from "react"
import { Loader2, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { profile } from "@/lib/content/profile"
import { useLocale } from "@/components/i18n/locale-provider"
import { getMessages } from "@/lib/i18n/messages"

type FormState = "idle" | "loading" | "success" | "error"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_MESSAGE = 10
const MAX_EMAIL_LENGTH = 254
const MAX_MESSAGE_LENGTH = 5000

/** Posts to /api/contact, which relays over SMTP. */
export function ContactForm() {
  const locale = useLocale()
  const messages = getMessages(locale)
  const [state, setState] = useState<FormState>("idle")
  const [feedback, setFeedback] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [body, setBody] = useState("")
  const [honeypot, setHoneypot] = useState("")
  const canSubmit = useMemo(
    () => EMAIL_RE.test(email.trim()) && body.trim().length >= MIN_MESSAGE,
    [email, body]
  )

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (state === "loading" || !canSubmit) return

    setState("loading")
    setFeedback(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          message: body.trim(),
          website: honeypot,
        }),
      })

      if (!response.ok) {
        await response.json().catch(() => ({}))
        setState("error")
        setFeedback(messages.contactForm.genericError)
        return
      }

      setState("success")
      setFeedback(messages.contactForm.sent)
      setEmail("")
      setBody("")
    } catch {
      setState("error")
      setFeedback(messages.contactForm.connectionError)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={honeypot}
        onChange={(event) => setHoneypot(event.target.value)}
        className="absolute -left-[9999px] h-px w-px opacity-0"
      />
      <div className="space-y-2">
        <Label htmlFor="contact-email">{messages.contactForm.emailLabel}</Label>
        <Input
          id="contact-email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder={messages.contactForm.emailPlaceholder}
          maxLength={MAX_EMAIL_LENGTH}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message">{messages.contactForm.messageLabel}</Label>
        <Textarea
          id="contact-message"
          name="message"
          rows={6}
          placeholder={messages.contactForm.messagePlaceholder}
          className="min-h-32 resize-none"
          maxLength={MAX_MESSAGE_LENGTH}
          value={body}
          onChange={(event) => setBody(event.target.value)}
          required
        />
        <p className="text-muted-foreground text-xs">
          {messages.contactForm.minimumMessage(MIN_MESSAGE)}
        </p>
      </div>

      {/* Full width and on its own line. Sharing a row with the "goes
          straight to" note made the two compete, and a half-width button
          under a full-width textarea reads as an afterthought. The note
          sits under it as a caption instead. */}
      <div className="space-y-2 pt-1">
        <Button
          type="submit"
          disabled={state === "loading" || !canSubmit}
          className="bg-foreground text-background h-11 w-full rounded-md text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-45"
        >
          {state === "loading" ? (
            <>
              <Loader2 className="animate-spin" aria-hidden />
              {messages.contactForm.sending}
            </>
          ) : (
            <>
              <Send aria-hidden />
              {messages.contactForm.sendMessage}
            </>
          )}
        </Button>
        {/* One row under the button: the result on the left where
            reading starts, the address held to the right. `ml-auto`
            rather than justify-between, so the address stays put whether
            or not there is a message beside it. */}
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-xs">
          {feedback ? (
            <p
              role="status"
              aria-live="polite"
              className={
                state === "success"
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-destructive"
              }
            >
              {feedback}
            </p>
          ) : null}

          <p className="text-muted-foreground ml-auto">
            {messages.contactForm.goesStraightTo}{" "}
            <span className="text-foreground font-medium">
              {profile.email}
            </span>
          </p>
        </div>
      </div>
    </form>
  )
}

export default ContactForm
