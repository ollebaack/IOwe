import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/src/lib/supabase/server";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  const supabase = await createSupabaseServer();
  const { id } = await params;

  const { data, error } = await supabase
    .from("payments")
    .select("id, group_id, from_user, to_user, amount, created_at")
    .eq("group_id", id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}

export async function POST(req: Request, { params }: Params) {
  const supabase = await createSupabaseServer();
  const { id } = await params;

  let body: { from_user?: string; to_user?: string; amount?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { from_user, to_user, amount } = body;

  if (!from_user || !to_user || typeof amount !== "number") {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }
  if (amount <= 0) {
    return NextResponse.json(
      { error: "Amount must be greater than 0" },
      { status: 400 }
    );
  }
  if (from_user === to_user) {
    return NextResponse.json(
      { error: "From and To must differ" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("payments")
    .insert({ group_id: id, from_user, to_user, amount })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
