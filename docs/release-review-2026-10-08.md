# Combined portfolio release review — 8 October 2026

This is an integration review, not permission to publish. No pull request was merged into `main`, no deployment was requested, and neither downloadable CV was changed.

## Integration

`codex/portfolio-release-review` starts from `main` at `0c35fd238cccd61df1e227cb28bbc9b91fa8848f`. The changes were brought in with two local merge commits, in the requested order:

1. PR #3, security and CI, head `24cb3a46941288fa23598896909661b07ec3a3e3`; integration merge `6f5ef2423199f4210a029b74c73b92dac0d2d9b0`.
2. PR #2, content and Recall, head `143ed00f94be4c3e87567d871292d4ade112e0b6`; integration merge `76ac5552776ad190955fa06ae5b688b06ad4d179`.

Both merges were clean. Comparing the integrated tree against the source heads confirms that the approved components, content, translations and public assets match PR #2, while the contact route, dependency lockfile and quality workflow match PR #3. The integration-only changes extend the deployment hold and its two existing tests to this third review branch, update the README, and add this report.

## Local validation

Run with Node.js 22.22.2 on the combined branch:

| Check | Result |
| --- | --- |
| Fresh `npm ci` | Passed |
| `npm run lint` | Passed |
| `npm run typecheck` | Passed |
| `npm test` | 29 passed, 0 failed |
| `npm run build` | Passed, Next.js 15.5.27 |
| `npm audit --omit=dev` | 0 vulnerabilities |
| `npm audit` | 5 high-severity, development-only affected package entries |
| `git diff --check` | Passed |

The five audit entries are `braces` 3.0.3, `micromatch` 4.0.8, `fast-glob` 3.3.1, `@next/eslint-plugin-next` 15.5.27 and `eslint-config-next` 15.5.27. They share the braces stack-exhaustion advisory through the ESLint glob dependency chain. No critical, moderate or low entries were reported. npm's proposed forced downgrade to eslint-config-next 14.2.35 was not applied. ESLint 8's existing deprecation warning remains. See [the security review](./security-remediation-2026-10-08.md) for the targeted dependency changes and remaining limitations.

Next and eslint-config-next remain 15.5.27, Nodemailer 10.0.16, React/React DOM 19.1.1 and sharp 0.35.5. No dependency changes were needed to combine the two PRs.

## Built-site browser review

Playwright drove the actual production build locally, not mocked page content, at widths 1440, 1024, 768 and 390 pixels. Each width was checked in English and French, light and dark mode, with normal and reduced motion. All six page routes were covered: `/`, `/projects`, `/contact`, `/fr`, `/fr/projects` and `/fr/contact`.

- 96 route-state combinations passed, plus four dedicated animation visits.
- 56 project-dialog checks passed across the two featured homepage projects and all five projects on the projects page. Checks included title/content identity, viewport bounds, focus trapping/restoration, Escape and mobile close buttons, background scroll locking and safe external actions.
- Desktop and touch navigation, project search, language switching without losing the current route, the command menu, Ctrl/Cmd+K and D passed.
- Rotating text, dot reaction/ripple, the custom cursor, magnetic call button, theme transition, photo switch and Recall's mouse/keyboard waveform were exercised. Reduced motion produces static effects; changing that preference while the page is open also disables/restores the relevant effects. Touch sessions do not use the desktop cursor or Lenis.
- The profile photo is the default. No broken images or horizontal overflow were found. Gmail and the centralized Calendly URL remain correct.
- Screenshots were visually inspected in both themes and at desktop/mobile sizes. A 36-second recording shows the real combined website, including normal motion, reduced motion, French and the mobile dialog. Captures and test scripts are local ignored review artifacts, not application assets.

The first browser harness exposed a capture issue: this Chromium runtime's full-page screenshot operation changes touch emulation to a fine pointer. A focused diagnostic confirmed that the media-query change was caused by capture, not navigation or application code. Mobile screenshots were changed to viewport captures and the affected mobile checks passed with genuine touch emulation. No application change was made for that harness issue.

No unexpected console/page errors were found. Vercel analytics endpoints return expected 404s locally. GitHub activity returns its expected unavailable response with the deliberately empty local token; a live authenticated contribution calendar was not tested in this integration review. Nothing was deployed to test it.

## Contact: local capture only

The built Next.js server used a loopback-only SMTP capture fixture with no relay. Four real form submissions, English/French on desktop/mobile, passed through `/api/contact` and installed Nodemailer before the success UI appeared.

- All four captured emails used the fixed fixture recipient and the visitor's email as Reply-To.
- Multipart plain text and escaped HTML were both present; input fields reset after success.
- SMTP rejection returned a safe 500 response, the sixth attempt hit the 429 rate cap, and the honeypot returned success without sending mail.
- No email was sent to a real inbox, and no real SMTP credentials or GitHub token were used.

The 29-test suite also covers validation boundaries, bounded request bodies, transport configuration, safe errors and spam controls. The process-local rate cap remains best-effort rather than a distributed guarantee.

## Recall and CV assets

The supplied comparison PNG, committed PNG and preferred lossless WebP have byte-identical decoded RGBA pixels. Recall's original blue design is unchanged. The WebP is 2,073,264 bytes rather than the PNG's 2,710,175 bytes, a 23.50% saving without lossy compression or resizing. Browser checks selected WebP in both card and dialog, with no duplicate PNG request. The waveform runs on appropriate mouse/keyboard interaction and stays static with reduced motion and inside the dialog.

Both local CV download responses were 200 and byte-identical to the repository copies. The copies also have no diff against `main`:

| File | SHA-256 |
| --- | --- |
| `/cv/Mouhssine_El_Boumshouli_CV_EN.pdf` | `e43d43d0bafc477387b1e9c3b7d17377ed702ae038ea41fa3f8e58db892fd771` |
| `/cv/Mouhssine_El_Boumshouli_CV_FR.pdf` | `539c846d51bf1a4366ffcb6290a308588657d2d7fce7f3392c3c1c2041fbc4e7` |

## Publication hold

`vercel.json` explicitly sets `git.deploymentEnabled` to `false` for this branch as well as the two source PR branches. This guard is included before the branch's first push. The GitHub Actions workflow has read-only permissions, pinned action SHAs and no deployment steps. A manual owner-authorized deployment would still be possible; none is requested here.

The draft integration PR targets `main` and must be reviewed separately before any merge or publication. PR #2 and PR #3 remain unmerged. The protected references at the start of review were:

- `main`: `0c35fd238cccd61df1e227cb28bbc9b91fa8848f`
- `gh-pages`: `75e58c64f35e3512fcfc65dd98f7ce8469b9fac1`
- `pre-portfolio-redesign`: `3b777038ae34cc89b8db33d39d32c516270e333e`

No `.env` files, credentials, build output, browser captures or temporary test scripts are tracked. Existing production and Pages settings were not changed.
