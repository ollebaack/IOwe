// If you plan to fetch on the server, you can do it here and pass as props.

import GroupDetail from "@/src/components/groups/group-detail";
import { getCurrentUser } from "@/src/lib/supabase/auth";

// This keeps hooks out of the server component.
export default async function GroupDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const currentUser = await getCurrentUser();
  const currentUserId = currentUser.id;
  // --- Server-side data fetching (optional; example scaffold) ---
  // const { data: group } = await supabase
  // .from("groups")
  // .select("*")
  // .eq("id", id)
  // .single();
  //
  // const { data: members } = await supabase
  // .from("group_members")
  // .select("id, user_id, nickname")
  // .eq("group_id", id);
  //
  // const { data: expenses } = await supabase
  // .from("expenses")
  // .select("*")
  // .eq("group_id", id)
  // .order("created_at", { ascending: false });
  //
  // const { data: splits } = await supabase
  // .from("expense_splits")
  // .select("*")
  // .in("expense_id", (expenses || []).map((e) => e.id));
  //
  // const { data: payments } = await supabase
  // .from("payments")
  // .select("*")
  // .eq("group_id", id)
  // .order("created_at", { ascending: false });

  // Render client component; you can pass server-fetched data as props later.
  return <GroupDetail id={id} currentUserId={currentUserId} />;
}
