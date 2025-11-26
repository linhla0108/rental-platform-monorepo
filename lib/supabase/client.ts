import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "@/constant/config"
import { Database } from "@/types/database.types"
import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  return createBrowserClient<Database>(SUPABASE_URL!, SUPABASE_PUBLISHABLE_KEY!)
}
