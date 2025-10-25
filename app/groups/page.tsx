import { createSupabaseServer } from "@/lib/supabase/server";
import Link from "next/link";

export default async function GroupsPage() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return (
      <div>
        Please{" "}
        <a className="underline" href="/login">
          sign in
        </a>
        .
      </div>
    );
  const { data: groups } = await supabase
    .from("groups")
    .select("*")
    .order("created_at", { ascending: false });
  return (
    <main>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your groups</h1>
        <a className="border px-3 py-2" href="/groups/new">
          New group
        </a>
      </div>
      <ul className="mt-4 space-y-2">
        {groups?.map((g) => (
          <li key={g.id}>
            <Link className="underline" href={`/groups/${g.id}`}>
              {g.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
