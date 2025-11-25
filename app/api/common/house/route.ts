import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = await createClient()
  const { data: facilities } = await supabase.from("houses").select()
  return NextResponse.json(facilities)
}
