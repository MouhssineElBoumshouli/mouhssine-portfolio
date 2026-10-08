import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { existsSync, readFileSync } from "node:fs"
import { createRequire } from "node:module"
import path from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"
import vm from "node:vm"

const nativeRequire = createRequire(import.meta.url)
const ts = nativeRequire("typescript")
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const cache = new Map()

/** Exercise the actual TypeScript content without adding a test-runner dependency. */
function load(relative) {
  const filename = path.resolve(root, relative)
  if (cache.has(filename)) return cache.get(filename).exports
  const loadedModule = { exports: {} }
  cache.set(filename, loadedModule)
  const source = readFileSync(filename, "utf8")
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  })
  const require = (specifier) => {
    if (!specifier.startsWith(".") && !specifier.startsWith("@/")) return nativeRequire(specifier)
    const target = specifier.startsWith("@/")
      ? path.join(root, specifier.slice(2))
      : path.resolve(path.dirname(filename), specifier)
    return load(path.relative(root, `${target}.ts`))
  }
  vm.runInNewContext(outputText, { module: loadedModule, exports: loadedModule.exports, require, process }, { filename })
  return loadedModule.exports
}

const { projects } = load("lib/content/projects.ts")
const localized = load("lib/i18n/content.ts")
const { messages } = load("lib/i18n/messages.ts")
const { milestones } = load("lib/content/milestones.ts")
const { stack } = load("lib/content/stack.ts")
const { profile } = load("lib/content/profile.ts")
const { getLocalizedMetadata } = load("lib/i18n/metadata.ts")
const { siteUrl, siteDescription, skillsVenn } = load("lib/content/site.ts")
const asPlain = (value) => JSON.parse(JSON.stringify(value))

test("DARE-Bench and SmartImport remain the two featured projects", () => {
  assert.deepEqual(asPlain(projects.slice(0, 2).map((project) => project.slug)), ["dare-agent-reliability", "smartimport"])
  assert.equal(projects.length, 5)
  assert.equal(new Set(projects.map((project) => project.slug)).size, projects.length)
})

test("every project has full French copy without inherited English sections", () => {
  for (const project of projects) {
    const fr = localized.getLocalizedProject(project, "fr")
    assert.notEqual(fr.description, project.description, project.slug)
    assert.notEqual(fr.summary, project.summary, project.slug)
    assert.notEqual(fr.imageAlt, project.imageAlt, project.slug)
    assert.deepEqual(Object.keys(fr.details).sort(), Object.keys(project.details).sort())
    assert.deepEqual(Object.keys(fr.details.headings).sort(), Object.keys(project.details.headings).sort())
    assert.deepEqual(asPlain(fr.links), asPlain(project.links))
  }
})

test("every project has a short summary, longer explanation, valid status and local image", () => {
  for (const locale of ["en", "fr"]) {
    for (const project of localized.getLocalizedProjects(locale)) {
      assert.ok(project.summary.length < 100, project.slug)
      assert.ok(project.description.length > project.summary.length)
      assert.ok(messages[locale].projectDialog.status[project.status])
      assert.ok(existsSync(path.join(root, "public", project.image)))
      assert.ok(project.links.github.startsWith("https://github.com/MouhssineElBoumshouli/"))
      if (project.links.website) assert.equal(new URL(project.links.website).protocol, "https:")
    }
  }
})

test("DARE findings retain success, mixed-result counts and limited scope in both languages", () => {
  const dare = projects[0]
  assert.match(dare.details.outcome, /34\.2%.*50%/)
  assert.match(dare.details.outcome, /7 to 10 out of 24/)
  assert.match(dare.details.outcome, /does not show.*always/)
  const fr = localized.getLocalizedProject(dare, "fr")
  assert.match(fr.details.outcome, /34,2 %.*50 %/)
  assert.match(fr.details.outcome, /7 à 10 sur 24/)
  assert.match(fr.details.outcome, /ne démontre pas.*toujours/)
})

test("Recall is a prototype with an abstract cover and qualified mixed-language testing", () => {
  const recall = projects.find((project) => project.slug === "recall")
  assert.equal(recall.status, "prototype")
  assert.equal(recall.preview, "waveform")
  assert.equal(recall.image, "/projects/recall/background.png")
  assert.equal(recall.imageWebp, "/projects/recall/background-lossless.webp")
  assert.equal(
    createHash("sha256").update(readFileSync(path.join(root, "public", recall.imageWebp))).digest("hex"),
    "971b61fd9ca37eacefd7e88f80a4ffe93e305490abacb206ee47460eab656a16"
  )
  assert.equal(
    createHash("sha256").update(readFileSync(path.join(root, "public", recall.image))).digest("hex"),
    "23835e0af3a5ae52da84127a71fa1da258048009d25f0d8e6a34c080475fce4e",
    "Recall must use the exact supplied blue background"
  )
  assert.equal(existsSync(path.join(root, "public/projects/recall/cover.svg")), false)
  assert.equal(recall.links.website, undefined)
  assert.match(recall.imageAlt, /not an app screenshot/)
  assert.match(recall.details.outcome, /Mixed-language transcription still needs further testing/)
  assert.doesNotMatch(JSON.stringify(recall), /Darija|confirmed weakness/i)
  const fr = localized.getLocalizedProject(recall, "fr")
  assert.match(fr.details.outcome, /plusieurs langues nécessite encore des tests/)
  assert.doesNotMatch(JSON.stringify(fr), /darija|faiblesse confirmée/i)
})

test("SmartImport matching metrics and medskel authorship remain correctly scoped", () => {
  for (const locale of ["en", "fr"]) {
    const list = localized.getLocalizedProjects(locale)
    const smart = list.find((project) => project.slug === "smartimport")
    assert.equal(smart.status, "internship")
    assert.match(smart.details.role, /Bounaim Auto/)
    assert.match(smart.details.outcome, locale === "en" ? /synthetic.*12 of 13/ : /synthétiques.*12 des 13/)
    const medskel = list.find((project) => project.slug === "medskel")
    assert.match(medskel.details.built.join(" "), /Saidou, Zineddine/)
    assert.match(medskel.details.outcome, locale === "en" ? /does not establish.*clinical/ : /ne démontre.*clinique/)
  }
})

test("five milestones use stable IDs and complete translated dates", () => {
  assert.equal(milestones.length, 5)
  assert.equal(new Set(milestones.map((milestone) => milestone.id)).size, 5)
  for (const milestone of milestones) {
    const fr = localized.getLocalizedMilestones("fr").find((entry) => entry.id === milestone.id)
    assert.ok(fr)
    assert.notEqual(fr.title, milestone.title)
    assert.doesNotMatch(fr.date, /Jun|Jul|Aug|Present/)
  }
  for (const experience of localized.getLocalizedExperiences("fr")) {
    assert.doesNotMatch(JSON.stringify(experience.period), /Jun|Jul|Aug|Present/)
  }
})

test("diagram copy is localized and uses real line breaks", () => {
  assert.equal(skillsVenn.image, profile.avatar)
  for (const locale of ["en", "fr"]) {
    const diagram = localized.getLocalizedSkillsVenn(locale)
    assert.equal(diagram.image, profile.avatar)
    assert.equal(diagram.skills.bottom.includes("\\n"), false)
    assert.equal(diagram.skills.bottom.includes("\n"), true)
  }
  assert.equal(localized.getLocalizedSkillsVenn("fr").skills.right, "Évaluation")
})

test("core skills reflect the selected work without losing useful project-level tools", () => {
  const names = stack.flatMap((category) => category.skills.map((skill) => skill.title))
  for (const skill of ["Python", "JavaScript", "React Native", "Expo", "SQLite", "Gemini API"]) assert.ok(names.includes(skill))
  for (const skill of ["R", "MATLAB"]) assert.equal(names.includes(skill), false)
  for (const skill of ["SQLAlchemy", "Pydantic", "Prisma", "Nginx", "Ruff", "mypy", "ESLint", "Vercel"]) {
    assert.ok(projects.some((project) => project.technologies.includes(skill)), skill)
  }
})

test("internship positioning, Gmail, Calendly and both stable CV paths remain aligned", () => {
  assert.equal(profile.email, "elboumshouli.mouhssine@gmail.com")
  assert.equal(profile.calendlyUrl, "https://calendly.com/elboumshouli-mouhssine/30min")
  assert.equal(profile.resumeUrl, "/cv/Mouhssine_El_Boumshouli_CV_EN.pdf")
  assert.equal(profile.frenchResumeUrl, "/cv/Mouhssine_El_Boumshouli_CV_FR.pdf")
  for (const locale of ["en", "fr"]) {
    assert.match(messages[locale].home.bio.map((line) => line.text).join(" "), /2027/)
    assert.match(messages[locale].contactPage.intro, /2027/)
    assert.match(messages[locale].connect.links.resume, /EN/)
    assert.match(messages[locale].command.frenchResume, /FR/)
    for (const file of [profile.resumeUrl, profile.frenchResumeUrl]) {
      assert.equal(readFileSync(path.join(root, "public", file)).subarray(0, 5).toString(), "%PDF-")
    }
  }
})

test("metadata keeps existing route URLs and localized descriptions", () => {
  assert.equal(siteDescription, messages.en.metadata.description)
  for (const locale of ["en", "fr"]) {
    for (const kind of ["home", "projects", "contact"]) {
      const metadata = getLocalizedMetadata(locale, kind)
      const suffix = `${locale === "fr" ? "/fr" : ""}${kind === "home" ? "" : `/${kind}`}`
      assert.equal(metadata.alternates.canonical, `${siteUrl}${suffix}`)
      assert.equal(metadata.openGraph.url, metadata.alternates.canonical)
      assert.equal(metadata.openGraph.images[0].url, `${siteUrl}/portfolio-web-preview.png`)
      assert.ok(metadata.alternates.languages.en)
      assert.ok(metadata.alternates.languages.fr)
    }
  }
})

test("only the two review branches are excluded from automatic Vercel deployment", () => {
  const config = JSON.parse(readFileSync(path.join(root, "vercel.json"), "utf8"))
  assert.deepEqual(config.git.deploymentEnabled, {
    "codex/portfolio-content-2027": false,
    "codex/portfolio-security-ci": false,
  })
})
