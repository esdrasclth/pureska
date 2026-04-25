import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const MAINTENANCE = process.env.MAINTENANCE_MODE === "true"

export function middleware(request: NextRequest) {
  if (!MAINTENANCE) return NextResponse.next()

  const { pathname } = request.nextUrl

  // Let the maintenance page and Next.js internals through
  if (
    pathname.startsWith("/maintenance") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.match(/\.(ico|jpg|jpeg|png|svg|webp|gif|css|js|woff2?)$/)
  ) {
    return NextResponse.next()
  }

  return NextResponse.rewrite(new URL("/maintenance", request.url))
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
