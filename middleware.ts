import { updateSession } from "@/lib/supabase/middleware"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Cập nhật session Supabase (không redirect, cho phép truy cập web UI mà không cần đăng nhập)
  const supabaseResponse = await updateSession(request)

  // Bảo vệ admin routes (có thể thêm authentication logic ở đây)
  if (pathname.startsWith("/admin")) {
    // TODO: Thêm authentication check
    // const isAuthenticated = checkAuth(request);
    // if (!isAuthenticated) {
    //   return NextResponse.redirect(new URL("/login", request.url));
    // }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
