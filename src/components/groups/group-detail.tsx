"use client";

import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import { useGroup } from "@/src/hooks/use-groups";
import { useGroupExpenses } from "@/src/hooks/use-group-expenses";
import ExpenseForm from "@/src/app/groups/[id]/parts/expense-form";
import Settlement from "@/src/app/groups/[id]/parts/settlement-form";
import AddMembersForm from "./members-form";
import { useGroupMembers } from "@/src/hooks/use-group-members";

export default function GroupDetail({
  id,
  currentUserId,
}: {
  id: string;
  currentUserId: string;
}) {
  const { data: group, isLoading: loadingGroup } = useGroup(id);
  const {
    data: expenses,
    isLoading: loadingExpenses,
    mutate: mutateExpenses,
  } = useGroupExpenses(id);
  const {
    data: members,
    isLoading: loadingMembers,
    mutate: mutateMembers,
  } = useGroupMembers(id);
  const memberIds = (members || [])
    .map((m) => m.user_id)
    .filter(Boolean) as string[];

  return (
    <div className="mx-auto max-w-2xl py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {loadingGroup ? "Loading…" : group?.name ?? "Group"}
          </h1>
        </div>
        <Button variant="outline" asChild>
          <Link href="/groups">Back to Groups</Link>
        </Button>
      </div>

      <Separator />

      <section>
        <AddMembersForm groupId={id} onAdded={() => mutateMembers()} />
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Add expense</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ExpenseForm
              groupId={id}
              currentUserId={currentUserId}
              memberIds={memberIds}
              onCreated={() => mutateExpenses()} // revalidate list without full reload
            />
            <p className="text-sm text-muted-foreground">
              Split equally among all group members.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Expenses */}
      <section className="space-y-3">
        <h2 className="font-semibold">Expenses</h2>

        {loadingExpenses ? (
          <p className="text-sm text-muted-foreground">Loading expenses…</p>
        ) : expenses.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No expenses yet. Add your first expense above.
          </p>
        ) : (
          <div className="grid gap-2">
            {expenses.map((e) => (
              <Card key={e.id} className="hover:shadow-sm transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">
                      {e.description || "Expense"}
                    </span>
                    <span className="tabular-nums">
                      {Number(e.amount).toFixed(2)} kr
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section>
        <Settlement groupId={id} />
      </section>
    </div>
  );
}
