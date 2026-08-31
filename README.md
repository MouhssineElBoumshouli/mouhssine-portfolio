# Mouhssine El Boumshouli - Portfolio

Personal portfolio of Mouhssine El Boumshouli, an AI engineering student and full-stack & AI software developer based in Fès, Morocco.

## Stack

- Next.js 15 App Router + React 19
- Tailwind CSS v4 with light and dark theme tokens
- Framer Motion, Lenis and reduced-motion support
- Nodemailer server route for the contact form
- Server-side GitHub GraphQL activity route with a graceful unavailable state

## Structure

    app/                  routes: /, /projects, /contact, /api/*
    components/layout/    container, rails, rules, nav, footer
    components/home/      one file per home-page section
    components/projects/  project card, grid and searchable list
    components/ui/        reusable interface primitives
    lib/content/          typed portfolio data and metadata
    public/               CVs, project screenshots and local media

All editable portfolio data lives in lib/content/. Updating a project, role,
skill or link there keeps the home page, projects page, command menu and
structured data aligned.

## Local development

    npm install
    npm run dev

Open http://localhost:3000.

## Checks

    npm run lint
    npm run typecheck
    npm run build

## Environment variables

Copy .env.example to .env.local. SMTP values are required for the contact
form to send messages. GITHUB_TOKEN is optional: when present it is used only
on the server for the full contribution calendar; without it, the activity
section stays unavailable and no token is exposed to the browser.

NEXT_PUBLIC_SITE_URL must be set to the deployed Vercel origin so canonical,
OpenGraph, sitemap and robots URLs point to production. The local fallback is
http://localhost:3000 and is not suitable for deployment.

## Deployment

The project keeps the full Next.js server implementation and is ready for
Vercel:

1. Import the GitHub repository into Vercel.
2. Keep the framework preset as Next.js and use the default build settings.
3. Add the variables from .env.example in the Vercel project settings.
4. Set NEXT_PUBLIC_SITE_URL to the final public URL.

GitHub Pages cannot run the Nodemailer contact route or server-side GitHub
activity route, so Vercel is the recommended host.

## Keyboard shortcuts

- Ctrl+K / Cmd+K: open the command menu
- D: toggle light and dark themes

Interface sound is off by default and can be enabled from the command menu.
All motion respects prefers-reduced-motion.
