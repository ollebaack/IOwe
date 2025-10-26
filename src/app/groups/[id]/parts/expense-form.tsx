"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { cn } from "@/src/lib/utils"; // optional if you have it
import { useCreateExpense } from "@/src/hooks/use-expenses";

export default function ExpenseForm({
  groupId,
  memberIds,
  currentUserId,
  className,
  onCreated,
}: {
  groupId: string;
  memberIds: string[];
  currentUserId: string;
  className?: string;
  onCreated?: () => void; // parent can revalidate lists etc.
}) {
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const { createExpense, isCreating, error } = useCreateExpense();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      // You can swap alerts for a toast if you use shadcn/toast
      alert("Enter a valid amount");
      return;
    }

    try {
      await createExpense({
        groupId,
        payerId: currentUserId,
        amount: amt,
        description: desc || undefined,
        memberIds,
      });

      // Reset UI
      setAmount("");
      setDesc("");

      // Let parent refresh any list or totals via SWR mutate
      onCreated?.();
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={submit}
      className={cn("mt-2 flex w-full items-end gap-3", className)}
    >
      <div className="grid gap-1">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          inputMode="decimal"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-40"
        />
      </div>

      <div className="grid flex-1 gap-1">
        <Label htmlFor="desc">Description (optional)</Label>
        <Input
          id="desc"
          placeholder="Dinner, taxi, groceries…"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>

      <Button type="submit" disabled={isCreating} className="whitespace-nowrap">
        {isCreating ? "Saving…" : "Add"}
      </Button>

      {/* Simple inline error (optional) */}
      {error ? (
        <span className="text-sm text-red-600">{error.message}</span>
      ) : null}
    </form>
  );
}
