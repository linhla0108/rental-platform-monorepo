import { MetadataRoute } from "next"

interface RobotsSettings {
  userAgent: string[]
  allow: string[]
  disallow: string[]
  sitemap: string
}

const MAP_KEY: Record<string, string> = {
  "User-Agent": "userAgent",
  "User-agent": "userAgent",
  Disallow: "disallow",
  Allow: "allow",
  Sitemap: "sitemap",
}

const ARRAY_KEYS = new Set(["userAgent", "allow", "disallow"])

export default async function robots(): Promise<MetadataRoute.Robots> {
  const lines = process.env.ROBOTS_TXT?.split(/\r?\n/) || []

  const robotsSettings: RobotsSettings = {
    userAgent: [],
    allow: ["/"],
    disallow: ["/api", "/admin", "/_next", "/_static", "/_vercel"],
    sitemap: "sitemap.xml",
  }

  lines.forEach((item: string) => {
    if (!item.includes(":")) return

    const [rawKey, ...rest] = item.split(":")
    const value = rest.join(":").trim()
    const key = MAP_KEY[rawKey.trim()]

    if (!key || !value) return

    if (ARRAY_KEYS.has(key)) {
      ;(robotsSettings[key as keyof RobotsSettings] as string[]).push(value)
    } else if (key === "sitemap") {
      robotsSettings.sitemap = value
    }
  })

  return {
    rules: [
      {
        userAgent: robotsSettings.userAgent,
        disallow: robotsSettings.disallow,
        allow: robotsSettings.allow,
      },
    ],
    sitemap: robotsSettings.sitemap,
  }
}
