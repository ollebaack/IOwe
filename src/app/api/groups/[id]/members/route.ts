import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/src/lib/supabase/server";

type Params = { params: Promise<{ id: string }> };

// GET existing members
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

// POST add members (by user_id[])
export async function POST(req: Request, { params }: Params) {
  const supabase = await createSupabaseServer();
  const { id } = await params;

  let body: { memberIds?: string[] } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const memberIds = (body.memberIds ?? [])
    .map((s) => String(s).trim())
    .filter(Boolean);

  if (memberIds.length === 0) {
    return NextResponse.json(
      { error: "memberIds cannot be empty" },
      { status: 400 }
    );
  }

  const rows = memberIds.map((uid) => ({ group_id: id, user_id: uid }));

  // Idempotent add: ignore duplicates via upsert conflict on (group_id, user_id)
  const { data, error } = await supabase
    .from("group_members")
    .upsert(rows, { onConflict: "group_id,user_id", ignoreDuplicates: true })
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data ?? [], { status: 201 });
}
