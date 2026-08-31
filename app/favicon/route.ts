import { readFile } from "fs/promises"
import { join } from "path"

let cached: Buffer | null = null

async function render() {
  if (cached) return cached

  cached = await readFile(
    join(process.cwd(), "public", "mouhssine-github-avatar.png")
  )
  return cached
}

export async function GET() {
  try {
    const png = await render()
    return new Response(new Uint8Array(png), {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400, immutable",
      },
    })
  } catch {
    return new Response(null, { status: 404 })
  }
}
