# Dependency security review — 8 October 2026

This is a review and proposed update plan, not a remediation commit. No package versions or lockfile entries were changed in this pass. Recheck the registry and audit when applying the updates.

## Audit results

- `npm audit`: 10 affected package entries — 9 high, 1 moderate.
- `npm audit --omit=dev`: 4 affected package entries — 3 high, 1 moderate.
- No critical findings in either report. Counts are package entries, not independent vulnerabilities; several development entries describe the same dependency chain.

## Packages included in the production dependency tree

| Package | Installed | Severity | Exposure in this portfolio | Proposed fix |
| --- | --- | --- | --- | --- |
| Next.js | 15.5.24 | Moderate | One advisory concerns self-hosted Pages Router SSG/ISR and explicitly excludes Vercel; the other requires a root-level catch-all together with SSG/ISR. This application uses App Router, has no application-level root catch-all route, and its portfolio pages are dynamic. These conditions suggest the reported paths are not exposed here; that is a source/configuration assessment, not a penetration-test result. | Update `next` and `eslint-config-next` together to 15.5.27, staying on the same release line. |
| Nodemailer | 9.0.6 | High | Used by `/api/contact`. The visitor supplies a single reply-to string capped at 254 characters, not recipient arrays, SMTP settings, attachments, file paths, or URLs. Sender and recipient remain server-controlled. These restrictions limit exposure but do not make the vulnerable library safe. This is the first runtime dependency to address. | Review a controlled upgrade to 10.0.16. The newest address-parser advisory is fixed from 10.0.6; the audit's suggested 9.1.1 does **not** resolve all current findings. |
| sharp | 0.35.4 | High | Next.js optional dependency. `images.unoptimized: true` disables normal Next image optimization; application code never imports sharp and accepts no uploaded images/SVGs. No identified application path processes untrusted image input with this package. | Target 0.35.5 in the lockfile. It fits the optional dependency range published by Next 15.5.27. |
| source-map-js | 1.2.1 | High | Installed through CSS tooling/PostCSS. The app does not accept source-map submissions or parse visitor-supplied maps. Being in the production dependency tree does not establish a reachable HTTP attack surface; exclusion from every runtime bundle was not proven. | Target 1.2.2 in the lockfile, within existing compatible ranges. |

Primary advisory sources: [Next self-hosted cache issue](https://github.com/advisories/GHSA-4jqv-mc3x-m676), [Next catch-all cache issue](https://github.com/advisories/GHSA-mcj8-r9mp-w47p), [Nodemailer address parser](https://github.com/advisories/GHSA-v53p-9fqp-m79j), [sharp/librsvg](https://github.com/advisories/GHSA-wq5f-xc86-pv6w), [source-map-js](https://github.com/advisories/GHSA-68fv-2mgg-jv7q).

Other Nodemailer findings involve legacy content resolution, address/domain handling, a shared DNS cache, and structured recipient arrays. They reinforce the update recommendation; no exploit payloads were run against the portfolio. Their advisory links remain available in `npm audit --json`.

## Development-only findings

The six additional high-severity package entries are `brace-expansion`, `braces`, `micromatch`, `fast-glob`, `@next/eslint-plugin-next`, and `eslint-config-next`.

`brace-expansion` has compatible fixes on both installed families: 1.1.18 → 1.1.21 and 5.0.9 → 5.0.12. Update each through its existing dependency range rather than forcing both to one major version.

The remaining five entries trace back to `braces` 3.0.3 through the Next lint plugin's globbing dependencies. The registry still lists 3.0.3 as the latest braces release, so there is no published patched drop-in version for this advisory at review time. These tools process repository patterns during development/lint, not public contact or project requests. Keep CI inputs trusted and track the upstream fix. Do not downgrade `eslint-config-next` to 14.2.35 just because `npm audit` proposes it, and do not run `npm audit fix --force`.

Sources: [brace-expansion recursion](https://github.com/advisories/GHSA-qhr7-859c-m2p7), [brace-expansion rewrite](https://github.com/advisories/GHSA-q2hr-2g5m-vwhr), [braces](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm).

## Validation before accepting a dependency update

1. Apply the compatible Next and transitive patch updates in a separate, reviewable commit. Keep React and the UI dependency versions unchanged unless a specific compatibility issue requires a change.
2. Review Nodemailer 10 release notes/types and test the existing `createTransport`/`sendMail` flow with a local capture transport. Assert server-owned recipient, visitor reply-to, plain text, escaped HTML, honeypot, validation, and error behavior. A real SMTP test needs separate approval.
3. Run a clean install, lint, typecheck, content tests, production build, and both audit commands. Compare the new audit against this baseline instead of promising zero findings beforehand.
4. Repeat the bilingual route, project-dialog, image, theme, keyboard, mobile, and reduced-motion browser checks. Any deployment remains a separate approval step.
