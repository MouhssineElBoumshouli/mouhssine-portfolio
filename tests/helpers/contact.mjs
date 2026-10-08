import { createServer } from "node:net"
import { readFileSync } from "node:fs"
import { createRequire } from "node:module"
import vm from "node:vm"

const require = createRequire(import.meta.url)
const ts = require("typescript")
export const nodemailer = require("nodemailer")
export const nodemailerVersion = require("nodemailer/package.json").version

const profileModule = { exports: {} }
const compiledProfile = ts.transpileModule(readFileSync(new URL("../../lib/content/profile.ts", import.meta.url), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
})
vm.runInNewContext(compiledProfile.outputText, { module: profileModule, exports: profileModule.exports })

/** Loopback-only SMTP fixture: captures mail locally, never relays it. */
export async function captureSmtp() {
  const messages = []
  const sockets = new Set()
  let rejectMail = false
  const server = createServer((socket) => {
    sockets.add(socket)
    socket.on("close", () => sockets.delete(socket))
    socket.on("error", () => {})
    socket.setEncoding("utf8")
    socket.write("220 localhost test capture\r\n")
    let buffer = "", inData = false, lines = [], envelope = { from: "", to: [] }
    socket.on("data", (chunk) => {
      buffer += chunk
      let index
      while ((index = buffer.indexOf("\r\n")) >= 0) {
        const line = buffer.slice(0, index)
        buffer = buffer.slice(index + 2)
        if (inData) {
          if (line === ".") {
            messages.push({ ...envelope, raw: lines.join("\r\n") })
            inData = false; lines = []
            socket.write("250 captured locally\r\n")
          } else lines.push(line.replace(/^\.\./, "."))
        } else if (/^(EHLO|HELO) /i.test(line)) {
          socket.write("250-localhost\r\n250 AUTH PLAIN\r\n")
        } else if (/^AUTH PLAIN/i.test(line)) {
          socket.write("235 local fixture authentication accepted\r\n")
        } else if (/^MAIL FROM:/i.test(line)) {
          envelope = { from: line.slice(10), to: [] }
          socket.write(rejectMail ? "550 local test rejection\r\n" : "250 OK\r\n")
        } else if (/^RCPT TO:/i.test(line)) {
          envelope.to.push(line.slice(8)); socket.write("250 OK\r\n")
        } else if (line === "DATA") {
          inData = true; socket.write("354 end with dot\r\n")
        } else if (line === "QUIT") socket.end("221 bye\r\n")
        else socket.write("250 OK\r\n")
      }
    })
  })
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve))
  return {
    messages,
    port: server.address().port,
    reject(value) { rejectMail = value },
    async close() {
      for (const socket of sockets) socket.destroy()
      await new Promise((resolve) => server.close(resolve))
    },
  }
}

/** Transpile the actual route; isolate environment/rate state without extra dependencies. */
export function contactRoute({ transport = nodemailer, env = {} } = {}) {
  const logs = []
  const routeModule = { exports: {} }
  const filename = new URL("../../app/api/contact/route.ts", import.meta.url)
  const { outputText } = ts.transpileModule(readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
  })
  vm.runInNewContext(outputText, {
    module: routeModule, exports: routeModule.exports, TextDecoder,
    process: { env: { NODE_ENV: "production", ...env } },
    console: { error: (...args) => logs.push(args) },
    require: (name) => {
      if (name === "nodemailer") return transport
      if (name === "@/lib/content/profile") return profileModule.exports
      return require(name)
    },
  }, { filename: filename.pathname })
  return { POST: routeModule.exports.POST, logs }
}

export function testEnv(port = 587) {
  return {
    SMTP_HOST: "127.0.0.1", SMTP_PORT: String(port),
    SMTP_USER: "sender@example.invalid", SMTP_PASS: "local-capture-only",
    SMTP_FROM: "sender@example.invalid", CONTACT_TO: "owner@example.invalid",
  }
}

export function request(payload, { body, headers = {} } = {}) {
  return new Request("http://localhost/api/contact", {
    method: "POST", headers: { "content-type": "application/json", ...headers },
    body: body ?? JSON.stringify(payload),
  })
}
