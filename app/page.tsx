import { createSupabaseServer } from "@/lib/supabase/server";
import Link from "next/link";

export default async function Home() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.log("No user logged in");
  } else {
    console.log("User logged in:", user.email);
  }
  return (
    <main>
      <h1 className="text-3xl font-bold">IOwe</h1>
      {!user ? (
        <div className="mt-6">
          <p className="mb-2">Track shared expenses with friends & family.</p>
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-x-4">
          <Link className="underline" href="/groups">
            Go to Groups
          </Link>
          <form action="/api/auth/signout" method="post" className="inline">
            <button className="underline">Sign out</button>
          </form>
        </div>
      )}
    </main>
  );
}
