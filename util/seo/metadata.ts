import { BASE_URL } from "@/constant/config"
import { Metadata } from "next"

const SITE_NAME = "Homify"
const IS_PRODUCTION = process.env.NODE_ENV === "production"

export const DEFAULT_TITLE =
  "Homify - Dịch vụ thuê nhà nguyên căn - villa tại Đà lạt"
export const DEFAULT_DESCRIPTION =
  "Dịch vụ thuê nhà nguyên căn - villa đẹp, tiện nghi, giá rẻ tại Đà lạt"

const DEFAULT_METADATA: Metadata = {
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,

  robots: IS_PRODUCTION ? "index, follow" : "noindex, nofollow",

  keywords: [
    "thuê nhà",
    "đà lạt",
    "homify",
    "nhà nguyên căn",
    "thuê nhà",
    "thuê villa",
    "villa đẹp",
    "villa tiện nghi",
    "villa giá rẻ",
  ],

  icons: {
    icon: { url: "/favicon.ico", type: "image/x-icon" },
    shortcut: { url: "/favicon.ico", type: "image/x-icon" },
    apple: { url: "/favicon.ico", type: "image/x-icon" },
    other: { url: "/favicon.ico", type: "image/x-icon" },
  },

  //social media metadata
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: BASE_URL,
    locale: "vi_VN",
    type: "website",
    siteName: SITE_NAME,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: DEFAULT_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: "/og-image.jpg",
  },

  alternates: {
    canonical: BASE_URL,
    languages: {
      "vi-VN": "/vi-VN",
      //   "en-US": "/en-US",
    },
  },

  other: {
    agent: "Googlebot",
    // "google-site-verification": "google-site-verification=google-site-verification",
  },

  authors: [
    {
      name: "Homify Team",
      url: "https://homify.vn",
    },
  ],
  //   facebook: {
  //     appId: "1234567890",
  //   },
}

export interface MetadataOptions {
  title: string
  description: string
  path?: string
  keywords?: string | string[]
  image?: string
  robots?: string
  hreflang?: Record<string, string>
}

/**
 * Tạo metadata cho Next.js
 *
 * @example
 * createMetadata({
 *   title: "Trang chủ - Homify",
 *   description: "Dịch vụ thuê nhà tại Đà Lạt",
 *   path: "/",
 *   keywords: ["thuê nhà", "đà lạt"]
 * })
 */
export function createMetadata(options: MetadataOptions): Metadata {
  const { title, description, path, keywords, image, robots, hreflang } =
    options

  const url = path ? `${BASE_URL}${path}` : BASE_URL

  // Xử lý keywords: nếu có keywords mới thì dùng, không thì giữ default
  const keywordsValue = keywords
    ? Array.isArray(keywords)
      ? keywords.join(", ")
      : keywords
    : Array.isArray(DEFAULT_METADATA.keywords)
      ? DEFAULT_METADATA.keywords.join(", ")
      : DEFAULT_METADATA.keywords

  // Xử lý image: nếu có image mới thì dùng, không thì giữ default
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `${BASE_URL}${image.startsWith("/") ? image : `/${image}`}`
    : `${BASE_URL}/og-image.jpg`

  // Xử lý robots: nếu có robots mới thì dùng, không thì giữ default
  const robotsValue = robots || DEFAULT_METADATA.robots

  // Merge openGraph: giữ default, chỉ override những gì có trong options

  const openGraph: Metadata["openGraph"] = {
    ...DEFAULT_METADATA.openGraph,
    title: title || DEFAULT_METADATA.openGraph?.title,
    description: description || DEFAULT_METADATA.openGraph?.description,
    url: path ? url : DEFAULT_METADATA.openGraph?.url,
    ...(image && {
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title ?? DEFAULT_METADATA.openGraph?.title,
        },
      ],
    }),
  }

  // Merge twitter: giữ default, chỉ override những gì có trong options
  const twitter = {
    ...DEFAULT_METADATA.twitter,
    title: title || DEFAULT_METADATA.twitter?.title,
    description: description || DEFAULT_METADATA.twitter?.description,
    images: image ? [imageUrl] : DEFAULT_METADATA.twitter?.images,
  }

  // Merge alternates: giữ default languages, chỉ update canonical nếu có path
  const alternates = {
    ...DEFAULT_METADATA.alternates,
    ...(path && { canonical: url }),
    languages: {
      ...DEFAULT_METADATA.alternates?.languages,
      ...(hreflang && hreflang),
    },
  }

  // Build metadata: merge với default, chỉ override những gì cần
  // metadataBase BẮT BUỘC phải có để Next.js resolve relative URLs cho images
  const metadata: Metadata = {
    ...DEFAULT_METADATA,
    metadataBase: new URL(BASE_URL),
    title,
    description,
    keywords: keywordsValue,
    robots: robotsValue,
    openGraph,
    twitter,
    alternates,
  }

  return metadata
}
