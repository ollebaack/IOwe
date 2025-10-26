import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/src/lib/supabase/server";

type Params = { params: Promise<{ id: string }> };

// Returns splits for all expenses in a group
export async function GET(_req: Request, { params }: Params) {
  const supabase = await createSupabaseServer();
  const { id } = await params;

  // Join expense_splits -> expenses to filter by group_id
  const { data, error } = await supabase
    .from("expense_splits")
    .select(
      "expense_id, participant_id, amount_owed, expenses!inner(id, group_id)"
    )
    .eq("expenses.group_id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Strip joined column
  const cleaned = (data ?? []).map(
    ({ expense_id, participant_id, amount_owed }) => ({
      expense_id,
      participant_id,
      amount_owed,
    })
  );

  return NextResponse.json(cleaned);
}
