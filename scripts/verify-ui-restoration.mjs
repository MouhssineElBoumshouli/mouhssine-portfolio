// Local Firefox comparison. Uses an externally installed Playwright, not a new app dependency.
// PLAYWRIGHT_PATH may point to that installation. Start the two production builds first.
import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { createRequire } from "node:module"
import path from "node:path"

const { firefox } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_PATH || "playwright")
const fixed = process.env.FIXED_URL || "http://127.0.0.1:3009"
const original = process.env.ORIGINAL_URL || "http://127.0.0.1:3007"
const out = path.resolve("tmp/ui-restore/final")
mkdirSync(out, { recursive: true })
const report = { routes: 0, dialogs: [], animations: [], consoleErrors: [], expectedLocalErrors: [], cvs: {}, screenshots: [] }
// Optional resume after a completed desktop matrix, e.g. after a test-harness timing fix.
if (process.env.UI_MOBILE_ONLY === "1") {
  const prior = JSON.parse(readFileSync(path.join(out, "firefox-report.json"), "utf8"))
  report.dialogs = prior.dialogs.filter(entry => entry.width === 1440 && !entry.homepage)
  assert.equal(report.dialogs.length, 40, "resume requires all desktop dialog cases")
  report.routes = 24
  report.consoleErrors = prior.consoleErrors
  report.expectedLocalErrors = prior.expectedLocalErrors
  report.screenshots = prior.screenshots.filter(name => name.includes("1440"))
}
const browser = await firefox.launch({ headless: true })
const sleep = (page, ms = 250) => page.waitForTimeout(ms)
const triggersFor = page => page.getByRole("button", { name: /^(View details for|Voir les détails de)/ })

async function contextFor(width, theme, reduced) {
  const context = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 900 }, hasTouch: width === 390, colorScheme: theme, reducedMotion: reduced ? "reduce" : "no-preference" })
  await context.addInitScript(theme => { localStorage.setItem("app-theme", theme); localStorage.setItem("ui-sound", "off") }, theme)
  return context
}

function watch(page) {
  page.on("pageerror", error => report.consoleErrors.push(error.message))
  page.on("console", message => {
    if (message.type() !== "error") return
    const url = message.location().url
    if (url.includes("/_vercel/") || (url.includes("/api/github") && /503/.test(message.text()))) report.expectedLocalErrors.push({ url, text: message.text() })
    else report.consoleErrors.push({ url, text: message.text() })
  })
}

async function visit(page, url, locale, theme) {
  assert.equal((await page.goto(url, { waitUntil: "networkidle" })).status(), 200)
  assert.equal(await page.locator("html").getAttribute("lang"), locale)
  assert.equal(await page.locator("html").evaluate(e => e.classList.contains("dark")), theme === "dark")
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), url)
  assert.deepEqual(await page.locator("img").evaluateAll(async images => {
    const failures = []
    for (const image of images) { image.loading = "eager"; try { await image.decode() } catch { failures.push(image.src) } }
    return failures
  }), [], `broken images: ${url}`)
  report.routes++
}

async function shot(page, name) {
  const filename = `${name}.png`
  await page.screenshot({ path: path.join(out, filename) })
  report.screenshots.push(filename)
}

async function checkDialogs(page, options, homepage = false) {
  const triggers = triggersFor(page)
  assert.equal(await triggers.count(), homepage ? 2 : 5)
  for (let i = 0; i < await triggers.count(); i++) {
    const trigger = triggers.nth(i), name = await trigger.getAttribute("aria-label")
    if (options.width === 390) await trigger.tap(); else await trigger.click()
    const dialog = page.getByRole("dialog")
    await dialog.waitFor(); await sleep(page)
    const scroll = dialog.locator("[data-lenis-prevent].overflow-y-auto")
    const box = await scroll.boundingBox()
    assert.ok(box.height > 30, name)
    const initial = await scroll.evaluate(e => ({ top: e.scrollTop, max: e.scrollHeight - e.clientHeight }))
    assert.ok(initial.max > 0, name)
    const background = await page.evaluate(() => scrollY)
    assert.equal(await page.locator("body").evaluate(e => e.hasAttribute("data-scroll-locked")), true)
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
    await page.mouse.wheel(0, 300); await sleep(page)
    const wheelTop = await scroll.evaluate(e => e.scrollTop)
    assert.ok(wheelTop > initial.top, `wheel did not scroll ${name}`)
    await page.mouse.wheel(0, -10000); await sleep(page)
    assert.equal(await scroll.evaluate(e => e.scrollTop), 0)
    // Small wheel bursts approximate delta input, NOT physical trackpad verification.
    for (let n = 0; n < 12; n++) { await page.mouse.wheel(0, 14); await sleep(page, 15) }
    await sleep(page)
    const smallDeltaTop = await scroll.evaluate(e => e.scrollTop)
    assert.ok(smallDeltaTop > 0, `small deltas did not scroll ${name}`)
    // Firefox caps/smooths a single oversized wheel delta; use actual repeated input.
    for (let n = 0; n < 12; n++) {
      if (await scroll.evaluate(e => Math.abs(e.scrollHeight - e.clientHeight - e.scrollTop) < 2)) break
      await page.mouse.wheel(0, 600); await sleep(page, 180)
    }
    await sleep(page)
    assert.ok(await scroll.evaluate(e => Math.abs(e.scrollHeight - e.clientHeight - e.scrollTop) < 2), `cannot reach end ${name}`)
    assert.ok(await dialog.locator("a").last().isVisible())
    assert.equal(await page.evaluate(() => scrollY), background, "background unlocked")
    if (!options.reduced && options.width === 1440) assert.ok(await page.locator("html").evaluate(e => e.classList.contains("lenis-stopped")))
    // Native keyboard scrolling: focus a link in the scroller, then Home/PageDown/End.
    await dialog.locator("a").first().focus()
    await page.keyboard.press("Control+Home"); await sleep(page)
    const keyBefore = await scroll.evaluate(e => e.scrollTop)
    await page.keyboard.press("PageDown"); await sleep(page, 350)
    const keyAfter = await scroll.evaluate(e => e.scrollTop)
    assert.ok(keyAfter > keyBefore, `keyboard PageDown failed ${name}: ${keyBefore}->${keyAfter}`)
    await page.keyboard.press("Control+End"); await sleep(page)
    for (let n = 0; n < 8; n++) { await page.keyboard.press("Tab"); assert.equal(await dialog.evaluate(e => e.contains(document.activeElement)), true) }
    assert.ok(await dialog.getAttribute("aria-labelledby")); assert.ok(await dialog.getAttribute("aria-describedby"))
    for (const link of await dialog.locator("a").evaluateAll(es => es.map(e => ({ target: e.target, rel: e.rel })))) {
      assert.equal(link.target, "_blank"); assert.match(link.rel, /noopener noreferrer/)
    }
    if (name.endsWith("Recall")) {
      assert.equal(await dialog.locator(".recall-cover").getAttribute("data-animated"), "false")
      assert.match(await dialog.locator(".recall-cover img").evaluate(e => e.currentSrc), /background-lossless\.webp$/)
    }
    if (!homepage && !options.reduced && ((options.width === 1440 && options.locale === "en") || (options.width === 390 && options.locale === "fr"))) {
      await scroll.evaluate(e => { e.scrollTop = 0 }); await sleep(page)
      await shot(page, `fixed-${options.width}-${options.locale}-${options.theme}-dialog-${i}-top`)
      await scroll.evaluate(e => { e.scrollTop = e.scrollHeight }); await sleep(page)
      await shot(page, `fixed-${options.width}-${options.locale}-${options.theme}-dialog-${i}-end`)
    }
    if (i % 2) await dialog.locator('[data-slot="dialog-close"]').click(); else await page.keyboard.press("Escape")
    await dialog.waitFor({ state: "hidden" })
    assert.equal(await trigger.evaluate(e => e === document.activeElement), true)
    report.dialogs.push({ ...options, homepage, name, wheelTop, smallDeltaTop, keyboard: [keyBefore, keyAfter], max: initial.max })
  }
}

async function animationCheck(base, theme, reduced) {
  const context = await contextFor(1440, theme, reduced), page = await context.newPage()
  watch(page); await visit(page, base, "en", theme)
  const role = page.locator('header [aria-live="off"] .absolute').last()
  const first = await role.innerText(); await sleep(page, 3000)
  assert.notEqual(await role.innerText(), first, "original text cycle should continue in both modes")
  await page.mouse.move(500, 220, { steps: 15 })
  assert.ok(await page.locator("html").evaluate(e => e.classList.contains("custom-cursor")))
  const canvas = page.locator("canvas").first(), box = await canvas.boundingBox(), before = await canvas.evaluate(e => e.toDataURL())
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2); await sleep(page, 350)
  assert.notEqual(await canvas.evaluate(e => e.toDataURL()), before, "original dots should remain active")
  const magnet = page.locator('header a[href*="calendly"]'), mb = await magnet.boundingBox()
  await page.mouse.move(mb.x + mb.width - 3, mb.y + mb.height / 2); await sleep(page, 350)
  const transform = await magnet.locator("span.pointer-events-none").evaluate(e => getComputedStyle(e).transform)
  assert.equal(transform === "none" || transform === "matrix(1, 0, 0, 1, 0, 0)", reduced)
  assert.equal(await page.locator("html").evaluate(e => e.classList.contains("lenis")), !reduced)
  const viewTransitions = await page.evaluate(() => typeof document.startViewTransition === "function")
  await page.getByRole("button", { name: /Switch to .* theme/ }).click(); await sleep(page, 800)
  await page.keyboard.press("d"); await sleep(page, 800)
  assert.equal(await page.locator("html").evaluate(e => e.classList.contains("dark")), theme === "dark")
  for (const key of ["Control+k", "Meta+k"]) {
    await page.keyboard.press(key); const dialog = page.getByRole("dialog"); await dialog.waitFor()
    for (let n = 0; n < 8; n++) { await page.keyboard.press("Tab"); assert.ok(await dialog.evaluate(e => e.contains(document.activeElement))) }
    await page.keyboard.press("Escape"); await dialog.waitFor({ state: "hidden" })
  }
  report.animations.push({ base, theme, reduced, cycle: true, dots: true, cursor: true, magnetic: transform, viewTransitions })
  await shot(page, `${base === fixed ? "fixed" : "original"}-1440-en-${theme}-${reduced ? "reduced" : "motion"}-home`)
  await context.close()
}

try {
  for (const width of process.env.UI_MOBILE_ONLY === "1" ? [390] : [1440, 390]) for (const locale of ["en", "fr"]) for (const theme of ["light", "dark"]) for (const reduced of [false, true]) {
    const context = await contextFor(width, theme, reduced), page = await context.newPage(), prefix = locale === "fr" ? "/fr" : ""
    watch(page)
    for (const route of [prefix || "/", `${prefix}/contact`, `${prefix}/projects`]) await visit(page, fixed + route, locale, theme)
    await checkDialogs(page, { width, locale, theme, reduced })
    if (!reduced) {
      await shot(page, `fixed-${width}-${locale}-${theme}-projects`)
      const recall = page.getByRole("button", { name: /^(View details for|Voir les détails de) Recall$/ })
      await recall.hover(); await sleep(page)
      const bar = recall.locator(".recall-wave-bar").nth(10)
      const transform = await bar.evaluate(e => getComputedStyle(e).transform); await sleep(page, 350)
      assert.notEqual(await bar.evaluate(e => getComputedStyle(e).transform), transform)
    } else {
      const recall = page.getByRole("button", { name: /^(View details for|Voir les détails de) Recall$/ }); await recall.hover()
      assert.equal(await recall.locator(".recall-wave-bar").first().evaluate(e => getComputedStyle(e).animationName), "none")
    }
    if (width === 390) {
      await page.getByRole("button", { name: locale === "fr" ? "Ouvrir le menu" : "Open menu", exact: true }).click()
      await page.getByRole("menuitem", { name: "Contact", exact: true }).click()
      await page.waitForURL(`${fixed}${prefix}/contact`)
      assert.equal(new URL(page.url()).pathname, `${prefix}/contact`)
    }
    console.log(`passed ${width}px ${locale} ${theme} reduced=${reduced}`)
    await context.close()
  }
  for (const base of [original, fixed]) for (const theme of ["light", "dark"]) for (const reduced of [false, true]) await animationCheck(base, theme, reduced)
  for (const width of [1024, 768]) for (const base of [original, fixed]) {
    const context = await contextFor(width, "light", false), page = await context.newPage()
    await visit(page, base + "/projects", "en", "light")
    await shot(page, `${base === fixed ? "fixed" : "original"}-${width}-projects`)
    await context.close()
  }
  for (const locale of ["en", "fr"]) {
    const context = await contextFor(1440, "light", false), page = await context.newPage()
    await visit(page, fixed + (locale === "fr" ? "/fr" : "/"), locale, "light")
    await checkDialogs(page, { width: 1440, locale, theme: "light", reduced: false }, true)
    await context.close()
  }
  for (const language of ["EN", "FR"]) {
    const file = `public/cv/Mouhssine_El_Boumshouli_CV_${language}.pdf`, response = await fetch(`${fixed}/${file.slice(7)}`)
    assert.equal(response.status, 200)
    const localHash = createHash("sha256").update(readFileSync(file)).digest("hex")
    assert.equal(createHash("sha256").update(Buffer.from(await response.arrayBuffer())).digest("hex"), localHash)
    report.cvs[language] = localHash
  }
  assert.deepEqual(report.consoleErrors, [])
  report.complete = true
} catch (error) { report.failure = error.stack; throw error }
finally { writeFileSync(path.join(out, "firefox-report.json"), JSON.stringify(report, null, 2)); await browser.close() }
console.log(JSON.stringify({ routes: report.routes, dialogs: report.dialogs.length, animations: report.animations.length, errors: report.consoleErrors, cvs: report.cvs }, null, 2))
