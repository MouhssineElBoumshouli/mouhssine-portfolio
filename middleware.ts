import { NextResponse, type NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  const pathname = request.nextUrl.pathname
  const locale = pathname === "/fr" || pathname.startsWith("/fr/") ? "fr" : "en"

  requestHeaders.set("x-portfolio-locale", locale)

  return NextResponse.next({
    request: { headers: requestHeaders },
  })
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
}

