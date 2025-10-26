"use client";

import Link from "next/link";
import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  PlusCircle,
  Users,
  Wallet,
  Receipt,
  Sparkles,
} from "lucide-react";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import { Skeleton } from "@/src/components/ui/skeleton";

import { useGroup } from "@/src/hooks/use-groups";
import { useGroupExpenses } from "@/src/hooks/use-group-expenses";
import { useGroupMembers } from "@/src/hooks/use-group-members";

import ExpenseForm from "@/src/app/groups/[id]/parts/expense-form";
import Settlement from "@/src/app/groups/[id]/parts/settlement-form";
import AddMembersForm from "./members-form";

// --- Utilities --------------------------------------------------------------
const formatCurrency = (value: number) => {
  try {
    return new Intl.NumberFormat("sv-SE", {
      style: "currency",
      currency: "SEK",
    }).format(value);
  } catch {
    return `${value.toFixed(2)} kr`;
  }
};

// --- Subcomponents ----------------------------------------------------------
function PageHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild className="rounded-full">
          <Link href="/groups" aria-label="Back to groups">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
          <Sparkles className="h-6 w-6" /> {title}
        </h1>
      </div>
      <Button variant="outline" asChild className="hidden sm:inline-flex">
        <Link href="/groups">Back to Groups</Link>
      </Button>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-4 flex items-center gap-3">
        <div className="rounded-2xl p-2 border">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="text-xs text-muted-foreground">{label}</div>
          <div className="font-semibold leading-tight">{value}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function AddExpenseCard({
  groupId,
  currentUserId,
  memberIds,
  onCreated,
}: {
  groupId: string;
  currentUserId: string;
  memberIds: string[];
  onCreated: () => void;
}) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <PlusCircle className="h-4 w-4" /> Add expense
        </CardTitle>
        <CardDescription>
          Split equally among all group members.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <ExpenseForm
          groupId={groupId}
          currentUserId={currentUserId}
          memberIds={memberIds}
          onCreated={onCreated}
        />
      </CardContent>
    </Card>
  );
}

function ExpensesList({
  expenses,
  isLoading,
}: {
  expenses: Array<{ id: string; amount: number; description?: string | null }>;
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="shadow-sm">
            <CardContent className="p-4">
              <Skeleton className="h-4 w-2/5" />
              <Skeleton className="h-4 w-1/5 mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!expenses || expenses.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="p-6 text-center text-sm text-muted-foreground">
          No expenses yet. Add your first expense on the right.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-2">
      {expenses.map((e) => (
        <motion.div
          key={e.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="hover:shadow-sm transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium truncate pr-4">
                  {e.description || "Expense"}
                </span>
                <span className="tabular-nums font-semibold">
                  {formatCurrency(Number(e.amount))}
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

// --- Main component ---------------------------------------------------------
export default function GroupDetail({
  id,
  currentUserId,
}: {
  id: string;
  currentUserId: string;
}) {
  const { data: group, isLoading: loadingGroup } = useGroup(id);
  const {
    data: expensesRaw,
    isLoading: loadingExpenses,
    mutate: mutateExpenses,
  } = useGroupExpenses(id);
  const {
    data: members,
    isLoading: loadingMembers,
    mutate: mutateMembers,
  } = useGroupMembers(id);

  const memberIds = useMemo(
    () => (members || []).map((m) => m.user_id).filter(Boolean) as string[],
    [members]
  );

  const expenses = useMemo(() => expensesRaw || [], [expensesRaw]);

  const total = useMemo(
    () => expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0),
    [expenses]
  );

  return (
    <div className="mx-auto max-w-6xl py-8 space-y-6">
      <PageHeader title={loadingGroup ? "Loading…" : group?.name ?? "Group"} />

      <Separator />

      {/* Overview stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Stat
          icon={Users}
          label="Members"
          value={loadingMembers ? "—" : String(members?.length ?? 0)}
        />
        <Stat
          icon={Receipt}
          label="Expenses"
          value={loadingExpenses ? "—" : String(expenses.length)}
        />
        <Stat
          icon={Wallet}
          label="Total"
          value={loadingExpenses ? "—" : formatCurrency(total)}
        />
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left: Expenses */}
        <section className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Expenses</h2>
          </div>
          <ExpensesList expenses={expenses} isLoading={loadingExpenses} />
        </section>

        {/* Right: Actions */}
        <section className="space-y-4">
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Members</CardTitle>
              <CardDescription>Invite and manage participants.</CardDescription>
            </CardHeader>
            <CardContent>
              <AddMembersForm groupId={id} onAdded={() => mutateMembers()} />
            </CardContent>
          </Card>

          <AddExpenseCard
            groupId={id}
            currentUserId={currentUserId}
            memberIds={memberIds}
            onCreated={() => mutateExpenses()}
          />

          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Settle up</CardTitle>
              <CardDescription>Calculate who owes what.</CardDescription>
            </CardHeader>
            <CardContent>
              <Settlement groupId={id} />
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
