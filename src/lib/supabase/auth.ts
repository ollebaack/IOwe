import { createSupabaseServer } from "./server";

export async function isAuthenticated() {
  const supabase = await createSupabaseServer();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return false;
  }

  return !!user;
}
