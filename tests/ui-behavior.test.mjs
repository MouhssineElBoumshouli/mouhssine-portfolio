import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { existsSync, readFileSync } from "node:fs"
import test from "node:test"

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), "utf8").replace(/\r\n/g, "\n")

// These baseline hashes intentionally protect the approved 0c35fd2 behaviours.
// Normalize only checkout line endings, not source code or whitespace.
const originals = {
  "components/common/magnetic-button.tsx": "6f36e1da4425355c90ea8e5dcb0cdbd00eadfbd413100f765209533de6c72f24",
  "components/common/text-cycle.tsx": "2b822fc35147123df771a22b4e5c6617b8fa02e809cd263de291f7c5758d953b",
  "components/common/user-cursor.tsx": "c7900ff57d62f52d9125eed23b141e7f480c37a5b7f45200b73acbfa387be6c7",
  "components/home/interactive-dots.tsx": "484f8d4d623143e4d12943d41ca35fd74625ac71bd39b5584afd6240e8f3bff1",
  "components/ui/animated-theme-toggler.tsx": "5d09afdb5968e9f7f3967943c27103d727f264fdd51fa14b10a4b3130a1970a8",
}

for (const [file, hash] of Object.entries(originals)) {
  test(`${file} retains original interaction behaviour`, () => {
    assert.equal(createHash("sha256").update(read(file)).digest("hex"), hash)
  })
}

test("native project text scrolling bypasses stopped Lenis without changing body lock", () => {
  const dialog = read("components/projects/project-dialog.tsx")
  assert.match(dialog, /<div data-lenis-prevent className="min-h-0 overflow-y-auto/)
  assert.doesNotMatch(dialog, /onWheel|stopPropagation|preventDefault\(\).*scroll/)
  assert.match(read("components/lenis-smooth-scroll.tsx"), /lenis\.stop\(\)/)
})

test("existing project previews retain their original interaction and page frame", () => {
  const card = read("components/projects/project-card.tsx")
  assert.match(card, /onMouseEnter=\{\(\) => void videoRef\.current\?\.play\(\)/)
  assert.doesNotMatch(card, /onFocusCapture|onBlurCapture|controls|group-focus/)
  assert.match(card, /copy\.summary/)
  assert.doesNotMatch(read("components/projects/project-list.tsx"), /messages\.projectsPage\.description/)
  assert.equal(existsSync(new URL("../components/projects/project-media.tsx", import.meta.url)), false)
})

test("Recall keeps its approved cover, hover-only waveform and static modal illustration", () => {
  const card = read("components/projects/project-card.tsx")
  assert.match(card, /animated=\{recallHovered && !reducedMotion\}/)
  assert.match(read("components/projects/recall-cover.tsx"), /type="image\/webp"/)
  assert.match(read("app/globals.css"), /prefers-reduced-motion: reduce/)
  const dialog = read("components/projects/project-dialog.tsx")
  assert.match(dialog, /role="img" aria-label=\{copy\.imageAlt\}/)
  assert.match(dialog, /<Image[\s\S]*?fill[\s\S]*?className="object-cover object-top"/)
  assert.doesNotMatch(dialog, /ProjectMedia|animated=/)
})
