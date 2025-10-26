import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/src/lib/supabase/server";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  const supabase = await createSupabaseServer();
  const { id } = await params;

  const { data, error } = await supabase
    .from("expenses")
    .select("id, description, amount, created_at")
    .eq("group_id", id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data ?? []);
}
