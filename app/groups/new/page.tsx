"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase/client";

export default function NewGroup() {
  const [name, setName] = useState("");
  const supabase = createSupabaseBrowser();
  const router = useRouter();
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return alert("You must be logged in to create a group.");
    }

    const { data, error } = await supabase
      .from("groups")
      .insert({ name, owner_id: user!.id })
      .select()
      .single();
    if (error) return alert(error.message);
    await supabase
      .from("group_members")
      .insert({ group_id: data.id, user_id: user!.id, nickname: "You" });
    router.push(`/groups/${data.id}`);
  };
  return (
    <main>
      <h1 className="text-2xl font-bold">New group</h1>
      <form onSubmit={submit} className="mt-4 space-y-3">
        <input
          className="border px-3 py-2 w-80"
          placeholder="Trip to Gotland"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div>
          <button className="border px-3 py-2">Create</button>
        </div>
      </form>
    </main>
  );
}
