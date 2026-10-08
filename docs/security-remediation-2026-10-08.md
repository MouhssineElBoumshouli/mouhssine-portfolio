# Dependency remediation and contact checks — 8 October 2026

This branch is based on `main`, independently of content PR #2. It is for review only: no merge, deployment, production setting change, or real SMTP credentials are included.

## Targeted updates

| Package | Before | After |
| --- | --- | --- |
| next | 15.5.24 | 15.5.27 |
| eslint-config-next | 15.5.24 | 15.5.27 |
| nodemailer | 9.0.6 | 10.0.16 |
| sharp | 0.35.4 | 0.35.5 |
| source-map-js | 1.2.1 | 1.2.2 |
| brace-expansion, legacy dependency family | 1.1.18 | 1.1.21 |
| brace-expansion, newer dependency family | 5.0.9 | 5.0.12 |

Next's matching SWC/environment/lint packages and sharp's platform binaries/libvips follow their parent updates. The lockfile was checked for unrelated version changes: React and React DOM remain 19.1.1; other UI dependencies are unchanged.

Next stays on its existing 15.5 release line. Nodemailer is the deliberate major upgrade: the suggested 9.1.1 does not address all reported findings. Its existing SMTP `createTransport`, verification, and multipart `sendMail` flow was tested with the installed 10.0.16 library. Node.js 22 is used locally and in CI; Nodemailer 10 requires Node.js 20 or later. No forced audit fixes or lint-config downgrade were used.

Primary sources: [Next 15.5.27 security release](https://github.com/vercel/next.js/releases/tag/v15.5.27), [Nodemailer 10.0.16](https://github.com/nodemailer/nodemailer/releases/tag/v10.0.16), [Nodemailer address-parser advisory](https://github.com/advisories/GHSA-v53p-9fqp-m79j), [sharp advisory](https://github.com/advisories/GHSA-wq5f-xc86-pv6w), [source-map-js advisory](https://github.com/advisories/GHSA-68fv-2mgg-jv7q).

## Audit after a clean install

- `npm audit --omit=dev`: **0 vulnerabilities**.
- `npm audit`: **5 high-severity affected package entries**, no critical, moderate, or low entries.
- Remaining packages: `braces` 3.0.3, `micromatch` 4.0.8, `fast-glob` 3.3.1, `@next/eslint-plugin-next` 15.5.27, and `eslint-config-next` 15.5.27.
- All five are the same development-only dependency chain rooted in [the braces advisory](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm), not five unrelated production flaws. No patched braces release is currently published. These tools process repository glob patterns during lint/build, not visitor contact data. Keep CI inputs trusted and recheck upstream before publication. A clean production audit is not a claim that the application is free of all security risks.
- npm suggests forcing eslint-config-next to 14.2.35. That would mismatch Next 15 and was not applied. ESLint 8's existing deprecation warning remains; a tooling-major migration is not bundled into these security fixes.

## Contact route

The interface and deployment variable names are unchanged. Recipient, sender, host, port, and credentials remain server-owned; visitor data cannot override them. Plain-text and escaped HTML alternatives, the honeypot, and the five-attempts-per-ten-minutes cap are preserved.

Additional defensive changes:

- Bound incoming JSON to 32 KiB while streaming, including requests without Content-Length.
- Reject arrays/non-object payloads, check email length before parsing, and accept one plain mailbox rather than address lists/display names.
- Use an explicit reply-to address object. The maximum email and message lengths remain 254 and 5,000 characters.
- Validate an integer SMTP port in the range 1–65535.
- Catch transport-construction failures as well as send failures, and omit raw SMTP errors from logs/responses.
- Set connection/greeting/socket timeouts and disable Nodemailer file/URL content resolution. TLS defaults are not weakened: 465 uses implicit TLS; other ports keep Nodemailer's normal STARTTLS negotiation and certificate verification.

The in-memory rate cap remains best-effort, per process, and is not a distributed spam service. It can reset across serverless instances/restarts; no stronger guarantee is claimed.

## Checks

- Fresh `npm ci`, lint, typecheck, 17 Node tests, production build, and `git diff --check` passed.
- Tests execute the actual route with isolated environment/rate state, the real profile fallback, and installed Nodemailer. A loopback-only SMTP server captures real multipart mail and never relays it externally. Both successful SMTP transmission and rejection are checked, along with reply-to, fixed recipient/sender, HTML escaping, text preservation, validation boundaries, body size, honeypot, rate limiting, missing configuration, and safe errors.
- Browser contact checks run against the built Next.js server and the same loopback capture fixture, not a mocked fetch response. Success must reach SMTP capture before the UI shows success. These local checks do not prove delivery to Gmail or a deployed provider; an approved deployment and real-inbox test remain separate steps.
- All six English/French page routes passed at 1440 pixels/light and 390 pixels/dark (12 route checks). Four submitted emails reached the local capture server with the correct recipient and visitor reply-to; SMTP rejection and the sixth-attempt rate limit produced safe UI errors and kept the draft text. Project dialogs, Escape, Ctrl+K, D, both CV downloads, image loading, and overflow checks passed. No unexpected browser console/page or server errors occurred. Local analytics 404 and token-absent GitHub 503 responses are expected; the contact 500/429 responses were deliberate fixture checks.
- Neither CV PDF is changed. No `.env` credentials, screenshots, recordings, build output, or temporary scripts are tracked.

## Pull-request automation

`.github/workflows/quality.yml` runs `npm ci`, lint, typecheck, tests, and a production build on pull requests, including fork PRs without secrets. It has read-only repository permission, disables persisted checkout credentials, pins actions to verified commit SHAs, and has no deployment steps. The identical workflow is also present on PR #2 so it can run before either PR is merged.

`vercel.json` disables automatic Git deployments for both review branches only. Production, `gh-pages`, and `pre-portfolio-redesign` are unchanged. CI success is a check, not permission to merge or publish. Making the quality job a required branch-protection check is an optional owner/admin setting, not changed here.
