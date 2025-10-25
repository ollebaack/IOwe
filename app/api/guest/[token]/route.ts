import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(
  _: Request,
  { params }: { params: { token: string } }
) {
  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const { data: link } = await admin
    .from("links")
    .select("group_id, expires_at")
    .eq("token", params.token)
    .single();
  if (!link || (link.expires_at && new Date(link.expires_at) < new Date()))
    return NextResponse.json({ error: "Invalid or expired" }, { status: 404 });

  const { data: group } = await admin
    .from("groups")
    .select("id, name")
    .eq("id", link.group_id)
    .single();
  const { data: expenses } = await admin
    .from("expenses")
    .select("*")
    .eq("group_id", link.group_id);
  const { data: splits } = await admin
    .from("expense_splits")
    .select("*")
    .in(
      "expense_id",
      (expenses || []).map((e) => e.id)
    );
  const { data: payments } = await admin
    .from("payments")
    .select("*")
    .eq("group_id", link.group_id);
  return NextResponse.json({ group, expenses, splits, payments });
}
