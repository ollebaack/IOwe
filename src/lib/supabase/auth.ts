import { createSupabaseServer } from "./server";

/**
 * Checks if a valid user session exists.
 */
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

/**
 * Returns the currently authenticated user, or null if none.
 */
export async function getCurrentUser() {
  const supabase = await createSupabaseServer();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("Not authenticated");
  }

  return user;
}
