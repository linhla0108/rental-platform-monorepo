# Cấu trúc API Routes - Hướng dẫn

## 📁 Cấu trúc thư mục đề xuất

```
app/api/
├── auth/                    # Authentication & Authorization
│   ├── login/
│   │   └── route.ts        # POST /api/auth/login
│   ├── logout/
│   │   └── route.ts        # POST /api/auth/logout
│   └── register/
│       └── route.ts        # POST /api/auth/register
│
├── v1/                      # API Versioning (tùy chọn, khuyến nghị cho production)
│   ├── properties/         # Properties/Real Estate
│   │   ├── route.ts        # GET, POST /api/v1/properties
│   │   └── [id]/
│   │       ├── route.ts    # GET, PUT, DELETE /api/v1/properties/:id
│   │       └── images/
│   │           └── route.ts # POST /api/v1/properties/:id/images
│   │
│   ├── houses/             # Houses (nếu khác với properties)
│   │   ├── route.ts
│   │   └── [id]/
│   │       └── route.ts
│   │
│   ├── categories/         # Categories
│   │   ├── route.ts        # GET, POST /api/v1/categories
│   │   └── [id]/
│   │       └── route.ts    # GET, PUT, DELETE /api/v1/categories/:id
│   │
│   ├── facilities/         # Facilities
│   │   ├── route.ts
│   │   └── [id]/
│   │       └── route.ts
│   │
│   ├── supplies/           # Supplies
│   │   ├── route.ts
│   │   └── [id]/
│   │       └── route.ts
│   │
│   └── tags/               # Tags
│       ├── route.ts
│       └── [id]/
│           └── route.ts
│
└── _lib/                   # Shared utilities (underscore để Next.js bỏ qua)
    ├── errors.ts           # Error handling utilities
    ├── validation.ts       # Validation schemas
    ├── auth.ts             # Auth helpers
    └── response.ts          # Response helpers
```

## 🎯 Nguyên tắc tổ chức

### 1. **RESTful Resource-based Structure**

- Mỗi resource có thư mục riêng
- Route handlers trong file `route.ts`
- Dynamic routes sử dụng `[id]` hoặc `[slug]`

### 2. **Nhóm theo Domain/Feature**

- `auth/` - Tất cả authentication endpoints
- `v1/properties/` - Tất cả property-related endpoints
- `v1/categories/` - Category management

### 3. **Versioning (Khuyến nghị)**

- Sử dụng `/v1/`, `/v2/` cho API versioning
- Giúp maintain backward compatibility

### 4. **Nested Resources**

```
/api/v1/properties/[id]/images/route.ts
/api/v1/properties/[id]/reviews/route.ts
```

## 📝 Cấu trúc file route.ts mẫu

### Basic CRUD Route

```typescript
import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { handleApiError, handleApiSuccess } from "@/app/api/_lib/response"
import { validateRequest } from "@/app/api/_lib/validation"

// GET /api/v1/categories
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)

    // Query params
    const limit = parseInt(searchParams.get("limit") || "100")
    const offset = parseInt(searchParams.get("offset") || "0")

    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .range(offset, offset + limit - 1)

    if (error) throw error

    return handleApiSuccess(data)
  } catch (error) {
    return handleApiError(error)
  }
}

// POST /api/v1/categories
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    // Validate request
    const validated = await validateRequest(body, categorySchema)

    // Check authentication (nếu cần)
    // const user = await getAuthenticatedUser(request)

    const { data, error } = await supabase
      .from("categories")
      .insert(validated)
      .select()
      .single()

    if (error) throw error

    return handleApiSuccess(data, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}
```

### Dynamic Route với [id]

```typescript
// app/api/v1/categories/[id]/route.ts

import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { handleApiError, handleApiSuccess } from "@/app/api/_lib/response"

// GET /api/v1/categories/:id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("id", params.id)
      .single()

    if (error) throw error
    if (!data) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    return handleApiSuccess(data)
  } catch (error) {
    return handleApiError(error)
  }
}

// PUT /api/v1/categories/:id
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    const { data, error } = await supabase
      .from("categories")
      .update(body)
      .eq("id", params.id)
      .select()
      .single()

    if (error) throw error

    return handleApiSuccess(data)
  } catch (error) {
    return handleApiError(error)
  }
}

// DELETE /api/v1/categories/:id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const supabase = await createClient()

    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", params.id)

    if (error) throw error

    return handleApiSuccess(null, { status: 204 })
  } catch (error) {
    return handleApiError(error)
  }
}
```

## 🛠️ Utility Files

### `app/api/_lib/response.ts`

```typescript
import { NextResponse } from "next/server"

export function handleApiSuccess(
  data: any,
  options?: { status?: number; message?: string },
) {
  return NextResponse.json(
    {
      success: true,
      data,
      message: options?.message,
    },
    { status: options?.status || 200 },
  )
}

export function handleApiError(error: any, status: number = 500) {
  const message = error?.message || "Internal server error"
  return NextResponse.json(
    {
      success: false,
      error: message,
      ...(process.env.NODE_ENV === "development" && { stack: error?.stack }),
    },
    { status },
  )
}
```

### `app/api/_lib/errors.ts`

```typescript
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

export class NotFoundError extends ApiError {
  constructor(resource: string) {
    super(`${resource} not found`, 404, "NOT_FOUND")
  }
}

export class ValidationError extends ApiError {
  constructor(
    message: string,
    public errors?: any,
  ) {
    super(message, 400, "VALIDATION_ERROR")
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = "Unauthorized") {
    super(message, 401, "UNAUTHORIZED")
  }
}
```

## ✅ Best Practices

1. **Consistent Response Format**
   - Luôn trả về format nhất quán: `{ success, data, error }`
   - Sử dụng helper functions

2. **Error Handling**
   - Try-catch trong mọi route handler
   - Custom error classes cho các trường hợp cụ thể
   - Logging errors (trong production)

3. **Validation**
   - Validate input trước khi xử lý
   - Sử dụng schema validation (Zod, Yup, etc.)

4. **Authentication & Authorization**
   - Middleware hoặc helper function để check auth
   - Role-based access control khi cần

5. **Type Safety**
   - Sử dụng TypeScript types từ database
   - Type-safe request/response

6. **Pagination**
   - Hỗ trợ pagination cho list endpoints
   - Query params: `?limit=10&offset=0`

7. **Filtering & Sorting**
   - Query params cho filtering: `?status=active&sort=created_at`

## 🔄 Migration từ cấu trúc hiện tại

### Trước

```
app/api/
├── common/
│   ├── category/route.ts
│   ├── facility/route.ts
│   └── ...
└── properties/route.ts
```

### Sau (Đề xuất)

```
app/api/
├── v1/
│   ├── categories/route.ts
│   ├── facilities/route.ts
│   ├── properties/route.ts
│   └── ...
└── auth/
    └── ...
```

## 📚 Tài liệu tham khảo

- [Next.js Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [RESTful API Design](https://restfulapi.net/)
- [Supabase Client](https://supabase.com/docs/reference/javascript/introduction)
