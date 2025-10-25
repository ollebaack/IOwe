"use client";
import { useState } from "react";
import { createSupabaseBrowser } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const supabase = createSupabaseBrowser();
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    });
    if (!error) setSent(true);
    else alert(error.message);
  };
  return (
    <main>
      <h1 className="text-2xl font-bold">Sign in</h1>
      {sent ? (
        <p>Check your email for a magic link.</p>
      ) : (
        <form onSubmit={submit} className="mt-4 space-y-3">
          <input
            className="border px-3 py-2 w-72"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>
            <button className="border px-3 py-2">Send magic link</button>
          </div>
        </form>
      )}
    </main>
  );
}
