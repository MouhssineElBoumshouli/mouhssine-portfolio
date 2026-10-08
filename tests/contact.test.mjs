import assert from "node:assert/strict"
import test from "node:test"
import { captureSmtp, contactRoute, nodemailerVersion, request, testEnv } from "./helpers/contact.mjs"

const valid = { email: "visitor+portfolio@example.com", message: "A legitimate portfolio test message." }

function captureRoute(env = testEnv()) {
  const sent = [], options = []
  const route = contactRoute({ env, transport: { createTransport(config) {
    options.push(config)
    return { async verify() {}, async sendMail(mail) { sent.push(mail) } }
  } } })
  return { ...route, sent, options }
}

test("Nodemailer sends multipart mail through real loopback SMTP with visitor reply-to", async (t) => {
  const smtp = await captureSmtp(); t.after(() => smtp.close())
  const { POST } = contactRoute({ env: testEnv(smtp.port) })
  const response = await POST(request({ ...valid, message: "Hello <strong>portfolio</strong> & friends.\nSecond line." }))
  assert.equal(response.status, 200)
  assert.deepEqual(await response.json(), { ok: true })
  assert.equal(smtp.messages.length, 1)
  const mail = smtp.messages[0]
  assert.equal(mail.from, "<sender@example.invalid>")
  assert.deepEqual(mail.to, ["<owner@example.invalid>"])
  assert.match(mail.raw, /^Reply-To: visitor\+portfolio@example\.com$/m)
  assert.match(mail.raw, /multipart\/alternative/)
  assert.match(mail.raw, /Content-Type: text\/plain/)
  assert.match(mail.raw, /Content-Type: text\/html/)
  const decoded = mail.raw.replace(/=\r\n/g, "").replace(/=([0-9A-F]{2})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
  assert.match(decoded, /Hello <strong>portfolio<\/strong> & friends\./)
  assert.match(decoded, /&lt;strong&gt;portfolio&lt;\/strong&gt; &amp; friends\.<br \/>Second line\./)
})

test("sender input cannot change SMTP, recipient or from; HTML is escaped and text preserved", async () => {
  const { POST, sent, options } = captureRoute()
  const message = `Thanks for reading. <>&"'\nPlease reply.`
  assert.equal((await POST(request({ ...valid, message, to: "other@example.invalid", from: "other@example.invalid", host: "elsewhere.invalid" }))).status, 200)
  assert.equal(sent[0].to, "owner@example.invalid")
  assert.equal(sent[0].from, "sender@example.invalid")
  assert.equal(sent[0].replyTo.address, valid.email)
  assert.equal(sent[0].text, `From: ${valid.email}\n\n${message}`)
  assert.match(sent[0].html, /&lt;&gt;&amp;&quot;&#39;<br \/>/)
  assert.equal(options[0].host, "127.0.0.1")
  assert.equal(options[0].disableFileAccess, true)
  assert.equal(options[0].disableUrlAccess, true)
  assert.equal(options[0].secure, false)
  assert.equal(options[0].connectionTimeout, 10000)
})

test("port 465 retains implicit TLS", async () => {
  const { POST, options } = captureRoute(testEnv(465))
  assert.equal((await POST(request(valid))).status, 200)
  assert.equal(options[0].secure, true)
})

test("honeypot is a successful no-op with no SMTP configuration", async () => {
  const { POST, sent, options } = captureRoute({})
  assert.equal((await POST(request({ website: "filled by bot" }))).status, 200)
  assert.equal(sent.length, 0); assert.equal(options.length, 0)
})

test("invalid JSON and non-object payloads are rejected before SMTP", async () => {
  const { POST, options } = captureRoute()
  for (const body of ["{", "null", "[]", '"string"']) {
    assert.equal((await POST(request(null, { body }))).status, 400)
  }
  assert.equal(options.length, 0)
})

test("body limit works with or without a Content-Length header", async () => {
  const { POST, options } = captureRoute()
  assert.equal((await POST(request(valid, { headers: { "content-length": "40000" } }))).status, 413)
  assert.equal((await POST(request(null, { body: " ".repeat(32769) }))).status, 413)
  assert.equal(options.length, 0)
})

test("email validation accepts one mailbox and rejects invalid or oversized values", async () => {
  const { POST, options } = captureRoute()
  for (const email of ["not-an-email", "a".repeat(255) + "@example.com", "visitor@example.com,second@example.com", "Name <visitor@example.com>", "visitor@example.com\nother", 123]) {
    assert.equal((await POST(request({ ...valid, email }))).status, 400)
  }
  assert.equal(options.length, 0)
})

test("message length boundaries are enforced", async () => {
  const { POST, sent } = captureRoute()
  for (const message of ["short", "x".repeat(5001), 123]) assert.equal((await POST(request({ ...valid, message }))).status, 400)
  for (const message of ["x".repeat(10), "x".repeat(5000)]) assert.equal((await POST(request({ ...valid, message }))).status, 200)
  assert.equal(sent.length, 2)
})

test("sixth message in a rate window is rejected without sending mail", async () => {
  const { POST, sent } = captureRoute()
  for (let i = 0; i < 5; i++) assert.equal((await POST(request(valid))).status, 200)
  assert.equal((await POST(request(valid))).status, 429)
  assert.equal(sent.length, 5)
})

test("owner profile remains the recipient fallback", async () => {
  const env = testEnv(); delete env.CONTACT_TO
  const { POST, sent } = captureRoute(env)
  assert.equal((await POST(request(valid))).status, 200)
  assert.equal(sent[0].to, "elboumshouli.mouhssine@gmail.com")
})

test("missing configuration and invalid ports return safe errors", async () => {
  for (const env of [{}, testEnv(65536), testEnv(1.5)]) {
    const { POST, options } = captureRoute(env)
    const response = await POST(request(valid))
    assert.equal(response.status, 500)
    assert.deepEqual(await response.json(), { error: "Email service is not configured." })
    assert.equal(options.length, 0)
  }
})

test("transport creation failure is caught without exposing details", async () => {
  const { POST, logs } = contactRoute({ env: testEnv(), transport: { createTransport() { throw Error("sensitive internal details") } } })
  const response = await POST(request(valid))
  assert.equal(response.status, 500)
  assert.deepEqual(await response.json(), { error: "Failed to send message." })
  assert.equal(JSON.stringify(logs).includes("sensitive"), false)
})

test("real SMTP rejection is caught and not exposed to the visitor", async (t) => {
  const smtp = await captureSmtp(); t.after(() => smtp.close()); smtp.reject(true)
  const { POST, logs } = contactRoute({ env: testEnv(smtp.port) })
  const response = await POST(request(valid))
  assert.equal(response.status, 500)
  assert.deepEqual(await response.json(), { error: "Failed to send message." })
  assert.equal(smtp.messages.length, 0)
  assert.equal(JSON.stringify(logs).includes("550"), false)
})

test("development SMTP verification failures are handled safely", async () => {
  let sent = false
  const { POST } = contactRoute({ env: { ...testEnv(), NODE_ENV: "development" }, transport: { createTransport() { return {
    async verify() { throw Error("test verification failure") }, async sendMail() { sent = true },
  } } } })
  assert.equal((await POST(request(valid))).status, 500)
  assert.equal(sent, false)
})

test("the actual installed Nodemailer version is the reviewed upgrade", () => {
  assert.equal(nodemailerVersion, "10.0.16")
})
