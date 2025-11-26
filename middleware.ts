import { updateSession } from "@/lib/supabase/middleware-supabase"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const method = request.method

  // Cập nhật session Supabase và lấy thông tin authentication

  // Chặn các method PUT, DELETE, POST trong API (trừ auth endpoints)
  if (pathname.startsWith("/api") && !pathname.startsWith("/api/auth")) {
    if (["PUT", "DELETE", "POST"].includes(method)) {
      const { isAuthenticated } = await updateSession(request)

      if (!isAuthenticated) {
        return NextResponse.json(
          {
            success: false,
            error: "Authentication required",
            code: "UNAUTHORIZED",
          },
          { status: 401 },
        )
      }
    }
  }

  if (pathname.startsWith("/admin")) {
    const { response, isAuthenticated } = await updateSession(request)

    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
    return response
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
