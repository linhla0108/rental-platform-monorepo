import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = await createClient()
  const { data: wards } = await supabase.from("wards").select()
  return NextResponse.json(wards)
}
