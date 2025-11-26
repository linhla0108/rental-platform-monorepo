import { NextResponse } from "next/server"

export interface ApiSuccessResponse<T = unknown> {
  success: true
  data: T
  message?: string
}

export interface ApiErrorResponse {
  success: false
  error: string
  code?: string
  stack?: string
}

export function handleApiSuccess<T>(
  data: T,
  options?: { status?: number; message?: string },
): NextResponse<ApiSuccessResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      ...(options?.message && { message: options?.message }),
    },
    { status: options?.status || 200 },
  )
}

export function handleApiError(
  error: unknown,
  status: number = 500,
  code?: string,
): NextResponse<ApiErrorResponse> {
  const message =
    error instanceof Error ? error.message : "Internal server error"
  const stack = error instanceof Error ? error.stack : undefined

  return NextResponse.json(
    {
      success: false,
      data: null,
      error: message,
      ...(code && { code }),
      ...(process.env.NODE_ENV === "development" && stack && { stack }),
    },
    { status },
  )
}
