import { redirect } from "next/navigation";

import { isAuthenticated } from "@/src/lib/supabase/auth";
import LoginForm from "./login-form";

export default async function LoginPage() {
  const authed = await isAuthenticated();
  if (authed) {
    redirect("/"); // or "/"
  }
  return <LoginForm />;
}
