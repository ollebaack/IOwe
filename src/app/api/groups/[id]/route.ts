import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/src/lib/supabase/server";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, { params }: Params) {
  const { id } = await params;
  console.log("Fetching group with id:", id);
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase
    .from("groups")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "Group not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}
