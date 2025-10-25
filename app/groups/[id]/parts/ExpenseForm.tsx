"use client";
import { createSupabaseBrowser } from "@/lib/supabase/client";
import { useState } from "react";

export default function ExpenseForm({
  groupId,
  memberIds,
  currentUserId,
}: {
  groupId: string;
  memberIds: string[];
  currentUserId: string;
}) {
  const supabase = createSupabaseBrowser();
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [saving, setSaving] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      alert("Enter a valid amount");
      setSaving(false);
      return;
    }
    console.log(groupId);
    const { data: expense, error } = await supabase
      .from("expenses")
      .insert({
        group_id: groupId,
        payer_id: currentUserId,
        amount: amt,
        description: desc,
      })
      .select()
      .single();
    if (error) {
      alert(error.message);
      setSaving(false);
      return;
    }

    const per = Math.round((amt / memberIds.length) * 100) / 100;
    const rows = memberIds.map((pid) => ({
      expense_id: expense.id,
      participant_id: pid,
      amount_owed: per,
    }));
    const { error: e2 } = await supabase.from("expense_splits").insert(rows);
    if (e2) {
      alert(e2.message);
    }

    location.reload();
  };

  return (
    <form onSubmit={submit} className="mt-2 flex gap-2">
      <input
        className="border px-3 py-2 w-40"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        className="border px-3 py-2 flex-1"
        placeholder="Description (optional)"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <button disabled={saving} className="border px-3 py-2">
        {saving ? "Saving…" : "Add"}
      </button>
    </form>
  );
}
