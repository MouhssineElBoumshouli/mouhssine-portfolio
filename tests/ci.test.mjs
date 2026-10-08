import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

test("PR quality workflow is read-only, SHA-pinned and runs all four checks", () => {
  const workflow = readFileSync(new URL("../.github/workflows/quality.yml", import.meta.url), "utf8")
  assert.match(workflow, /pull_request:/)
  assert.doesNotMatch(workflow, /pull_request_target|secrets\.|vercel\s|npm audit fix/)
  assert.match(workflow, /contents: read/)
  assert.match(workflow, /persist-credentials: false/)
  assert.equal((workflow.match(/uses: actions\/[\w-]+@[a-f0-9]{40}/g) ?? []).length, 2)
  for (const command of ["npm ci", "npm run lint", "npm run typecheck", "npm test", "npm run build"]) {
    assert.ok(workflow.includes(`run: ${command}`), command)
  }
})

test("all four review branches disable automatic Vercel deployment", () => {
  const config = JSON.parse(readFileSync(new URL("../vercel.json", import.meta.url), "utf8"))
  assert.equal(config.git.deploymentEnabled["codex/portfolio-content-2027"], false)
  assert.equal(config.git.deploymentEnabled["codex/portfolio-security-ci"], false)
  assert.equal(config.git.deploymentEnabled["codex/portfolio-release-review"], false)
  assert.equal(config.git.deploymentEnabled["codex/portfolio-ui-restore"], false)
})
