# Original behaviour restoration review

Reference: `0c35fd238cccd61df1e227cb28bbc9b91fa8848f`.
Released/current main: `bbc0f9c40de83ddc242416ac9f982acd8c0f8b8f`.
Fix branch: `codex/portfolio-ui-restore`, created from current main.

This is a draft for review. Nothing is merged or deployed. The new branch
is excluded from automatic Vercel Git deployment before its first push.
The rollback serving production, main, gh-pages and pre-portfolio-redesign
are not changed. Neither CV is changed.

## What changed existing UI behaviour

The original-to-release diff contains 45 paths. Every component, layout and
stylesheet change in that diff was inspected. These are the behaviour/style
changes, and how this branch handles them:

| File | Release change | Fix |
| --- | --- | --- |
| `components/common/text-cycle.tsx` | Stopped rotating text under reduced motion | Restore the exact original file: rotation continues, with the original short fade under reduced motion |
| `components/home/interactive-dots.tsx` | Froze dots and disabled pointer listeners under reduced motion | Restore the exact original canvas, shimmer, push and click-ripple behaviour |
| `components/common/user-cursor.tsx` | Disabled the cursor under reduced motion | Restore the exact original coarse-pointer-only disabling rule and springs |
| `components/common/magnetic-button.tsx` | Added preference-change reset and extra return-home gating | Restore the exact original file, including its existing reduced-motion pointer check |
| `components/ui/animated-theme-toggler.tsx` | Added preference-based transition bypass and listeners | Restore the exact original native transition/fallback implementation |
| `components/projects/project-card.tsx` | Replaced original previews; added focus zoom and playback rules | Restore the four existing projects' original still/video handling and hover classes; keep approved summaries and a Recall-only cover branch |
| `components/projects/project-dialog.tsx` | Replaced static header image with generic media/playback controls; changed close-button colours | Restore original image frame and close-button classes; keep approved detail headings, status and accessible localized descriptions; add the proven native-scroll bypass |
| `components/projects/project-media.tsx` | New shared playback/interaction wrapper | Remove the now-unused wrapper |
| `components/projects/project-list.tsx` | Added a new introductory row above the grid | Restore original page structure; keep searching the approved short summaries |
| `components/error-boundary.tsx` | Restyled the error fallback | Restore original fallback classes; retain its approved translated copy and route-aware language wrapper |

The first five files are byte-identical to the reference Git blobs after
normalizing Windows checkout line endings. Five baseline hash tests protect
that deliberate restoration. No animation settings, new global CSS rules,
scroll timings, motion dependency changes, or redesigned controls are added.

### Retained UI changes that carry approved content/localization

- `components/common/skills-venn.tsx`: fixes French diagram labels and the
  localized profile image without changing the diagram's geometry.
- `components/home/avatar-switch.tsx`: translated image alternatives and
  hiding the inactive photo from assistive technology. The original switch
  itself and default real photograph remain unchanged.
- `components/home/milestones.tsx`: stable content IDs for keys.
- `components/common/command-menu.tsx`: the approved secondary French CV entry.
- `components/structured-data.tsx` and `app/layout.tsx`: approved metadata,
  profile wording and translated error-boundary wiring. Theme, sound,
  MotionProvider, Lenis, shell and cursor placement remain unchanged.
- `app/globals.css`, `components/projects/recall-cover.tsx` and
  `hooks/use-reduced-motion.ts`: the approved Recall-only waveform and its
  static reduced-motion fallback. Recall keeps the supplied blue design and
  lossless WebP selection. Existing project keyboard focus still opens the
  dialog, but does not start a newly introduced preview animation.

All files under `lib/content/` and `lib/i18n/` are unchanged from main. That
preserves the approved About text, summer 2027 positioning, English/French
descriptions, DARE turn explanation and correctly scoped 34.2% → 50% finding,
7 → 10 mixed-result tasks out of 24, SmartImport metrics, medskel limitations,
Recall prototype qualification, UEMF's three classmates, five milestones,
skills and metadata. Recall necessarily adds a fifth card; approved wording
can naturally wrap differently from the original wording.

The remaining original-to-release paths are retained content/translation
data, the social preview image, Recall assets, security dependencies/contact
route, ESLint configuration, CI/tests, deployment guard and documentation.
None requires an animation or scrolling redesign. Package/lockfile, contact
route, CI workflow and public application assets are unchanged from main.

## Scroll diagnosis, not a media-size guess

Both versions use the same Lenis 1.3.17, Framer Motion 12.43.0, Radix dialog
1.1.4, react-remove-scroll 2.7.1, react-remove-scroll-bar 2.3.8 and React
19.1.1. `components/lenis-smooth-scroll.tsx` is unchanged between the original
and release, and remains unchanged in this fix.

When Radix locks the background, that component calls `lenis.stop()`. In
Lenis's wheel handler, a stopped instance still calls `event.preventDefault()`
unless the event travels through an element marked `data-lenis-prevent`.
The command menu already had that marker; the project text scroller did not.
That prevented the dialog's native wheel scrolling when Lenis was active.

In real Firefox, an identical wheel event initially left scrollTop at 0 with
defaultPrevented=true. Adding only that marker to the text scroller made the
same event scroll to 349 with defaultPrevented=false. Lenis stayed stopped
and Radix's body lock stayed enabled. Altering the released media wrapper's
position did not fix scrolling; the header's measured height already
matched its 16:9 width. This rules out the suspected intrinsic-image sizing
explanation for this reproduction.

Importantly, this normal-motion edge case also reproduces in local `0c35fd2`.
It is not honestly attributable to a release-only Lenis change. The original
Firefox matrix records 64 modal cases: 16 desktop normal-motion cases are
blocked while Lenis is stopped; the other 48 reduced-motion/mobile cases
scroll. Windows animation settings can affect the media preference, but the
owner's physical hardware/OS comparison is still needed before making a
claim about their restored production session.

The fix is one `data-lenis-prevent` attribute on the existing text scroller.
There is no custom wheel handler, removal of the background lock, or new
scrolling interaction. Native wheel and keyboard scrolling work again.

## Validation

- Clean `npm ci`, lint, typecheck, 37 Node tests and production build passed.
  This includes the original 29 tests plus eight restoration regressions.
- Full audit: five high-severity development-only affected entries:
  `braces` 3.0.3, `micromatch` 4.0.8, `fast-glob` 3.3.1,
  `@next/eslint-plugin-next` 15.5.27 and `eslint-config-next` 15.5.27.
  Production-only audit: zero vulnerabilities. No force fix, downgrade or
  new application dependency was used. ESLint 8 deprecation remains.
- Built contact form tested in Firefox at desktop/light and 390px/dark:
  four English/French submissions captured only by a loopback SMTP server,
  correct recipient and visitor reply-to, success UI, safe rejection and
  rate-limit UI, preserved failed draft, both CV downloads, no broken images
  and no unexpected browser errors. No external email was sent.
- Sixteen exact original/fixed first-card frame comparisons passed at 1440,
  1024, 768 and 390 pixels, English/French, light/dark: position, dimensions,
  font, border and radius match. Reduced-motion hover remains unscaled.
- Firefox 153 on Windows: 62 route checks, 84 corrected dialog checks and
  eight original/corrected animation checks passed. The project matrix covers
  all five projects × English/French × desktop/390px × light/dark × normal/
  reduced motion, plus four featured-homepage dialogs. Each dialog was tested
  with wheel movement, small delta bursts, reaching the end, reverse scrolling,
  keyboard PageDown, focus trap, Escape/visible close and trigger focus return.
  Background scroll remained locked. Mobile navigation, Ctrl/Cmd+K, D, cycling
  text, dot/cursor activity, magnetic behaviour, Recall hover/static states,
  image decoding and hashed CV downloads passed. No unexpected console errors.
  Token-absent GitHub 503 and unavailable local Vercel analytics are expected,
  not evidence about production activity or analytics.
- Recall PNG/WebP decoded pixels remain identical; preferred WebP is
  2,073,264 bytes versus 2,710,175-byte PNG (23.50% smaller).

The reproducible local Firefox harness is
`scripts/verify-ui-restoration.mjs`. Install Playwright/Firefox separately
or set `PLAYWRIGHT_PATH` to an existing installation; it does not add a
production dependency. Start reference and corrected production builds
on ports 3007 and 3009, or supply `ORIGINAL_URL` and `FIXED_URL`, then run
`node scripts/verify-ui-restoration.mjs`. It writes evidence under ignored
`tmp/ui-restore/final/`. CI runs the Node regressions alongside the preserved
lint/typecheck/test/build workflow; the Firefox matrix is a local check.

### Manual checks still required

The owner agreed to test the original at `http://127.0.0.1:3007/projects`
and corrected version at `http://127.0.0.1:3009/projects`, including
`/fr/projects`, in Firefox with Windows Animation effects OFF and ON,
using a physical mouse and trackpad. Those results are pending. Browser
media emulation and small wheel-delta bursts do not prove OS/hardware
behaviour. The local servers remain available for that review.

Both CV hashes are unchanged:

- English: `e43d43d0bafc477387b1e9c3b7d17377ed702ae038ea41fa3f8e58db892fd771`
- French: `539c846d51bf1a4366ffcb6290a308588657d2d7fce7f3392c3c1c2041fbc4e7`

This report supersedes the earlier release review's animation expectations.
That earlier browser check verified background locking, not actual scrolling
through the project text. This review explicitly checks scrollTop changes,
reaching the last content/actions, PageDown, focus trapping and Escape.

## Review evidence

Selected captures are kept under `docs/ui-restoration-evidence/`, outside
public website assets. The full local capture set remains in ignored tmp.
The WebM is an actual 26.64-second Firefox screen recording, with review
captions added only by the recording harness, not by application code.

- [Original projects frame](ui-restoration-evidence/original-projects.png)
- [Corrected projects frame](ui-restoration-evidence/corrected-projects.png)
- [Original homepage](ui-restoration-evidence/original-home.png)
- [Corrected homepage](ui-restoration-evidence/corrected-home.png)
- [Recall desktop dark](ui-restoration-evidence/recall-desktop-dark.png)
- [Recall mobile French light](ui-restoration-evidence/recall-mobile-fr-light.png)
- [Recall mobile French dark](ui-restoration-evidence/recall-mobile-fr-dark.png)
- [Firefox recording](ui-restoration-evidence/firefox-review.webm)
- [Firefox matrix report](ui-restoration-evidence/firefox-report.json)
- [Original matrix report](ui-restoration-evidence/original-firefox-matrix.json)
- [Layout comparisons](ui-restoration-evidence/layout-parity.json)
- [Wheel-event diagnosis](ui-restoration-evidence/wheel-cause.json)
