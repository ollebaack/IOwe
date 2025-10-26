import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/src/lib/supabase/server";

type Params = { params: Promise<{ id: string }> };

// Assumes a "group_members" table with columns: group_id, user_id
export async function GET(_req: Request, { params }: Params) {
  const supabase = await createSupabaseServer();
  const { id } = await params;

  const { data, error } = await supabase
    .from("group_members")
    .select("user_id")
    .eq("group_id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data ?? []);
}
