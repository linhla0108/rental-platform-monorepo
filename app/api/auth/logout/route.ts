import { NextResponse } from "next/server"

export async function POST() {
  // TODO: Clear authentication cookies/tokens
  // - Clear JWT cookie
  // - Invalidate session

  return NextResponse.json(
    { message: "Logged out successfully" },
    { status: 200 },
  )
}
