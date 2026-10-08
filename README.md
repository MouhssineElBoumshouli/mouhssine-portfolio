# Mouhssine El Boumshouli - Portfolio

Personal portfolio of Mouhssine El Boumshouli, an AI engineering student at EIDIA, Université Euromed de Fès, based in Morocco and seeking a summer 2027 internship in AI engineering, software engineering, or research.

## Stack

- Next.js 15 App Router + React 19
- Tailwind CSS v4 with light and dark theme tokens
- Framer Motion, Lenis and reduced-motion support
- Nodemailer server route for the contact form
- Server-side GitHub GraphQL activity route with a graceful unavailable state

## Structure

    app/                  English and French page routes, plus /api/*
    components/layout/    container, rails, rules, nav, footer
    components/home/      one file per home-page section
    components/projects/  project card, grid and searchable list
    components/ui/        reusable interface primitives
    lib/content/          typed project, experience, milestone and skill data
    lib/i18n/             English/French copy, localized content and metadata
    public/               CVs, project screenshots and local media

English pages live at /, /projects and /contact; French equivalents live at
/fr, /fr/projects and /fr/contact. Keep both languages aligned when editing
lib/content/ and lib/i18n/. Project summaries are deliberately short for the
cards; descriptions, project-specific headings and details belong to the
shared dialog. Milestone translations use stable IDs, not array positions.

DARE-Bench and SmartImport stay featured on the homepage. Recall is a
development prototype with a code-native waveform over the supplied blue
background, not a simulated app screenshot. The portfolio layout is adapted from a reference template;
it is not presented as an original design.

## Local development

    npm install
    npm run dev

Open http://localhost:3000.

## Checks

    npm run lint
    npm test
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

The review branches codex/portfolio-content-2027 and codex/portfolio-security-ci
have automatic Vercel deployments disabled in vercel.json. Other branches keep their default
deployment behaviour. Do not merge or deploy the review changes until the
owner approves publication. The gh-pages redirect and pre-portfolio-redesign
backup are separate branches and must not be modified by content updates.

The downloadable English and French CV files are intentionally unchanged
in this content update; their wording will be reviewed separately.

## Keyboard shortcuts

- Ctrl+K / Cmd+K: open the command menu
- D: toggle light and dark themes

Interface sound is on by default and can be disabled from the command menu.
With prefers-reduced-motion, the dot field is static and the native pointer
replaces the animated custom cursor.
The role text stays on its first phrase under reduced motion. The preference
also updates live without reloading. Recall's waveform animates only while its
preview is hovered with a mouse or focused with the keyboard. Any optional
project video follows the same rule and pauses off-screen; on touch, tapping a
card opens its details, where real clips have explicit playback controls.
