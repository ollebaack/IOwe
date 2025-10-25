import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function updateSession(req: NextRequest) {
  // Response we can mutate cookies on
  let res = NextResponse.next({ request: { headers: req.headers } });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return req.cookies.get(name)?.value;
        },
        set(name, value, options) {
          res.cookies.set({ name, value, ...options });
        },
        remove(name, options) {
          res.cookies.set({
            name,
            value: "",
            ...options,
            expires: new Date(0),
          });
        },
      },
    }
  );

  // Triggers refresh/rotation of auth cookies when needed
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { res, user };
}
