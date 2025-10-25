"use client";
import { useMemo, useState } from "react";
import { computeTransfers } from "@/lib/settlement";
import { createSupabaseBrowser } from "@/lib/supabase/client";

type Expense = {
  id: string;
  group_id: string;
  payer_id: string;
  amount: number;
};
type Split = {
  expense_id: string;
  participant_id: string;
  amount_owed: number;
};
type Payment = {
  id: string;
  group_id: string;
  from_user: string;
  to_user: string;
  amount: number;
};

export default function Settlement({
  groupId,
  expenses,
  splits,
  payments,
}: {
  groupId: string;
  expenses: Expense[];
  splits: Split[];
  payments: Payment[];
}) {
  const supabase = createSupabaseBrowser();
  // Compute per-user net = paid - owed - payments
  const balances = useMemo(() => {
    const bal = new Map<string, number>();
    for (const e of expenses) {
      bal.set(e.payer_id, (bal.get(e.payer_id) || 0) + Number(e.amount));
    }
    for (const s of splits) {
      bal.set(
        s.participant_id,
        (bal.get(s.participant_id) || 0) - Number(s.amount_owed)
      );
    }
    for (const p of payments) {
      bal.set(p.from_user, (bal.get(p.from_user) || 0) - Number(p.amount));
      bal.set(p.to_user, (bal.get(p.to_user) || 0) + Number(p.amount));
    }
    return Array.from(bal.entries()).map(([user_id, amount]) => ({
      user_id,
      amount,
    }));
  }, [expenses, splits, payments]);

  const transfers = useMemo(() => computeTransfers(balances), [balances]);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amt, setAmt] = useState("");

  const recordPayment = async () => {
    const amount = parseFloat(amt);
    if (!from || !to || isNaN(amount) || amount <= 0)
      return alert("Fill all fields");
    const { error } = await supabase
      .from("payments")
      .insert({ group_id: groupId, from_user: from, to_user: to, amount });
    if (error) return alert(error.message);
    location.reload();
  };

  return (
    <div className="border rounded p-3">
      <h3 className="font-semibold">Who pays whom</h3>
      {transfers.length === 0 ? (
        <p className="mt-2">All settled 🎉</p>
      ) : (
        <ul className="mt-2 space-y-1">
          {transfers.map((t, i) => (
            <li key={i}>
              {t.from.slice(0, 6)}… pays {t.to.slice(0, 6)}…{" "}
              <strong>{t.amount.toFixed(2)} kr</strong>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4">
        <h4 className="font-semibold">Mark a payment</h4>
        <div className="flex flex-wrap gap-2 mt-2">
          <input
            className="border px-2 py-1"
            placeholder="From (user_id)"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <input
            className="border px-2 py-1"
            placeholder="To (user_id)"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
          <input
            className="border px-2 py-1 w-24"
            placeholder="Amount"
            value={amt}
            onChange={(e) => setAmt(e.target.value)}
          />
          <button className="border px-3 py-1" onClick={recordPayment}>
            Save
          </button>
        </div>
        <p className="text-xs text-gray-600 mt-1">
          (MVP: enter user_ids manually or extend UI to select from members)
        </p>
      </div>
    </div>
  );
}
