import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/src/lib/supabase/server";
export async function GET() {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from("groups")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const supabase = await createSupabaseServer();
  const { name } = await request.json();
  const { data, error } = await supabase
    .from("groups")
    .insert({ name })
    .select()
    .single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data, { status: 201 });
}
