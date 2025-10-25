"use server";

import { createSupabaseServer } from "@/lib/supabase/server";
import ExpenseForm from "./parts/ExpenseForm";
import Settlement from "./parts/Settlement";
// import { useParams } from "next/navigation";

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
  if (!user) return <div>Please sign in.</div>;

  const { data: group } = await supabase
    .from("groups")
    .select("*")
    .eq("id", id)
    .single();
  const { data: members } = await supabase
    .from("group_members")
    .select("id, user_id, nickname")
    .eq("group_id", id);
  const { data: expenses } = await supabase
    .from("expenses")
    .select("*")
    .eq("group_id", id)
    .order("created_at", { ascending: false });
  const { data: splits } = await supabase
    .from("expense_splits")
    .select("*")
    .in("expense_id", expenses?.map((e) => e.id) || []);
  const { data: payments } = await supabase
    .from("payments")
    .select("*")
    .eq("group_id", id)
    .order("created_at", { ascending: false });

  return (
    <main>
      <h1 className="text-2xl font-bold">{group?.name}</h1>
      <section className="mt-6">
        <h2 className="font-semibold">Add expense</h2>
        {/* Pass member user_ids; MVP assumes all members participate */}
        <ExpenseForm
          groupId={id}
          memberIds={
            (members || []).map((m) => m.user_id).filter(Boolean) as string[]
          }
          currentUserId={user.id}
        />
      </section>

      <section className="mt-6">
        <h2 className="font-semibold">Expenses</h2>
        <ul className="mt-2 space-y-2">
          {expenses?.map((e) => (
            <li key={e.id} className="border p-3 rounded">
              <div className="flex justify-between">
                <span>{e.description || "Expense"}</span>
                <span>{Number(e.amount).toFixed(2)} kr</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <Settlement
          groupId={id}
          expenses={expenses || []}
          splits={splits || []}
          payments={payments || []}
        />
      </section>
    </main>
  );
}
