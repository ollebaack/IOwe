import { createSupabaseServer } from "@/src/lib/supabase/server";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
// import ExpenseForm from "./parts/ExpenseForm";
// import Settlement from "./parts/Settlement";

export default async function GroupDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-[360px] text-center p-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Not signed in
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Please{" "}
              <Link href="/login" className="text-primary underline">
                sign in
              </Link>{" "}
              to continue.
            </p>
          </CardContent>
        </Card>
      </div>
    );

  // --- Data fetching (uncomment when ready) ---
  // const { data: group } = await supabase
  //   .from("groups")
  //   .select("*")
  //   .eq("id", id)
  //   .single();
  //
  // const { data: members } = await supabase
  //   .from("group_members")
  //   .select("id, user_id, nickname")
  //   .eq("group_id", id);
  //
  // const { data: expenses } = await supabase
  //   .from("expenses")
  //   .select("*")
  //   .eq("group_id", id)
  //   .order("created_at", { ascending: false });
  //
  // const { data: splits } = await supabase
  //   .from("expense_splits")
  //   .select("*")
  //   .in("expense_id", (expenses || []).map((e) => e.id));
  //
  // const { data: payments } = await supabase
  //   .from("payments")
  //   .select("*")
  //   .eq("group_id", id)
  //   .order("created_at", { ascending: false });

  // Mock/fallbacks (remove when queries are enabled)
  const group = { id, name: "Grupp1" };
  const expenses: Array<{ id: string; description?: string; amount: number }> =
    [];

  return (
    <div className="mx-auto max-w-2xl py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {group?.name ?? "Group"}
          </h1>
        </div>
        <Button variant="outline" asChild>
          <Link href="/groups">Back to Groups</Link>
        </Button>
      </div>

      <Separator />

      {/* Add expense */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Add expense</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Pass member user_ids; MVP assumes all members participate */}
            {/* <ExpenseForm
              groupId={id}
              memberIds={(members || [])
                .map((m) => m.user_id)
                .filter(Boolean) as string[]}
              currentUserId={user.id}
            /> */}
            <p className="text-sm text-muted-foreground">
              Expense form goes here.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Expenses */}
      <section className="space-y-3">
        <h2 className="font-semibold">Expenses</h2>
        {expenses.length === 0 ? (
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

      {/* Settlement */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Settlement</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <Settlement
              groupId={id}
              expenses={expenses || []}
              splits={splits || []}
              payments={payments || []}
            /> */}
            <p className="text-sm text-muted-foreground">
              Settlement summary will appear here.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
