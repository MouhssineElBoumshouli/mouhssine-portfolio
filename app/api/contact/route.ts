import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

import { profile } from "@/lib/content/profile"

type ContactPayload = {
  email?: string
  message?: string
  website?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_EMAIL_LENGTH = 254
const MAX_MESSAGE_LENGTH = 5000
const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT = 5

type RateEntry = { count: number; resetAt: number }
const requestsByClient = new Map<string, RateEntry>()

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => HTML_ESCAPES[character])
}

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")
  return (
    request.headers.get("x-real-ip") || forwarded?.split(",")[0]?.trim() || "unknown"
  )
}

function isRateLimited(key: string) {
  const now = Date.now()
  for (const [entryKey, entry] of requestsByClient) {
    if (entry.resetAt <= now) requestsByClient.delete(entryKey)
  }

  const existing = requestsByClient.get(key)
  if (!existing || existing.resetAt <= now) {
    requestsByClient.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return false
  }

  existing.count += 1
  return existing.count > RATE_LIMIT
}

export async function POST(request: Request) {
  let data: ContactPayload
  try {
    data = await request.json()
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    )
  }

  if (!data || typeof data !== "object") {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    )
  }

  const honeypot = typeof data.website === "string" ? data.website.trim() : ""
  // Bots that fill the off-screen field get a successful no-op response.
  if (honeypot) return NextResponse.json({ ok: true })

  const email = typeof data.email === "string" ? data.email.trim() : ""
  const message = typeof data.message === "string" ? data.message.trim() : ""

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 })
  }

  if (email.length > MAX_EMAIL_LENGTH) {
    return NextResponse.json({ error: "Email address is too long." }, { status: 400 })
  }

  if (message.length < 10) {
    return NextResponse.json(
      { error: "Message is too short." },
      { status: 400 }
    )
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 })
  }

  if (isRateLimited(clientKey(request))) {
    return NextResponse.json(
      { error: "Too many messages. Please try again later." },
      { status: 429 }
    )
  }

  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 0)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const rawFrom = process.env.SMTP_FROM || user
  const to = process.env.CONTACT_TO || profile.email
  const isDev = process.env.NODE_ENV !== "production"
  const isPortValid = Number.isFinite(port) && port > 0

  const missing = [
    !host && "SMTP_HOST",
    !isPortValid && "SMTP_PORT",
    !user && "SMTP_USER",
    !pass && "SMTP_PASS",
    !rawFrom && "SMTP_FROM",
  ].filter(Boolean)

  if (missing.length > 0) {
    console.error("Contact email is not configured.", { missing })
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 }
    )
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })

  try {
    if (isDev) await transporter.verify()
    const from = rawFrom && /@/.test(rawFrom) ? rawFrom : user
    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: "New portfolio message",
      text: `From: ${email}\n\n${message}`,
      html: `<p><strong>From:</strong> ${escapeHtml(email)}</p><p>${escapeHtml(
        message
      ).replace(/\r?\n/g, "<br />")}</p>`,
    })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Contact email failed:", error)
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 }
    )
  }
}
