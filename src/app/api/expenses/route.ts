import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/src/lib/supabase/server";

type ExpensePayload = {
  groupId: string;
  payerId: string;
  amount: number;
  description?: string;
  memberIds: string[];
};

export async function POST(request: Request) {
  const supabase = await createSupabaseServer();
  let body: ExpensePayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { groupId, payerId, amount, description, memberIds } = body;

  if (
    !groupId ||
    !payerId ||
    !amount ||
    !Array.isArray(memberIds) ||
    memberIds.length === 0
  ) {
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

  // 1) Create expense
  const { data: expense, error: insertErr } = await supabase
    .from("expenses")
    .insert({
      group_id: groupId,
      payer_id: payerId,
      amount,
      description: description ?? null,
    })
    .select()
    .single();

  if (insertErr || !expense) {
    return NextResponse.json(
      { error: insertErr?.message ?? "Failed to create expense" },
      { status: 500 }
    );
  }

  // 2) Create splits (equal split)
  const per = Math.round((amount / memberIds.length) * 100) / 100;
  const rows = memberIds.map((pid) => ({
    expense_id: expense.id,
    participant_id: pid,
    amount_owed: per,
  }));

  const { error: splitErr } = await supabase
    .from("expense_splits")
    .insert(rows);

  if (splitErr) {
    // Best-effort cleanup if splits fail
    await supabase.from("expenses").delete().eq("id", expense.id);
    return NextResponse.json({ error: splitErr.message }, { status: 500 });
  }

  return NextResponse.json(expense, { status: 201 });
}
