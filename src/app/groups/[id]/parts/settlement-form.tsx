"use client";

import { useMemo, useState } from "react";
import { computeTransfers } from "@/src/lib/settlement";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { useGroupExpenses } from "@/src/hooks/use-group-expenses";
import { useGroupSplits } from "@/src/hooks/use-group-splits";
import {
  useGroupPayments,
  useCreatePayment,
} from "@/src/hooks/use-group-payments";

type Balance = { user_id: string; amount: number };

export default function Settlement({ groupId }: { groupId: string }) {
  const { data: expenses } = useGroupExpenses(groupId);
  const { data: splits } = useGroupSplits(groupId);
  const { data: payments, mutate: mutatePayments } = useGroupPayments(groupId);
  const {
    createPayment,
    isCreating,
    error: paymentError,
  } = useCreatePayment(groupId);

  // Compute per-user net = paid - owed - payments
  const balances: Balance[] = useMemo(() => {
    const bal = new Map<string, number>();

    for (const e of expenses) {
      bal.set(
        e.payer_id as any,
        (bal.get(e.payer_id as any) || 0) + Number(e.amount)
      );
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
    if (!from || !to || isNaN(amount) || amount <= 0) {
      alert("Fill all fields with a valid amount");
      return;
    }
    try {
      await createPayment({ from_user: from, to_user: to, amount });
      setFrom("");
      setTo("");
      setAmt("");
      await mutatePayments(); // refresh list, which updates balances/transfers
    } catch (e: any) {
      alert(e.message || "Failed to save payment");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Settlement</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <h3 className="font-semibold">Who pays whom</h3>
          {transfers.length === 0 ? (
            <p className="mt-2">All settled 🎉</p>
          ) : (
            <ul className="mt-2 space-y-1">
              {transfers.map((t: any, i: number) => (
                <li key={i}>
                  {t.from.slice(0, 6)}… pays {t.to.slice(0, 6)}…{" "}
                  <strong>{Number(t.amount).toFixed(2)} kr</strong>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-6">
          <h4 className="font-semibold">Mark a payment</h4>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="grid gap-1">
              <Label htmlFor="from">From (user_id)</Label>
              <Input
                id="from"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="to">To (user_id)</Label>
              <Input
                id="to"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                inputMode="decimal"
                value={amt}
                onChange={(e) => setAmt(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button
                onClick={recordPayment}
                disabled={isCreating}
                className="w-full"
              >
                {isCreating ? "Saving…" : "Save"}
              </Button>
            </div>
          </div>

          {paymentError ? (
            <p className="text-sm text-red-600 mt-2">{paymentError.message}</p>
          ) : (
            <p className="text-xs text-muted-foreground mt-2">
              (MVP: enter user_ids manually or extend UI to select from members)
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
