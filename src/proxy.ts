import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthenticated } from "./lib/supabase/auth";

// See "Matching Paths" below to learn more
export const config = {
  // Match all routes except `/login`, `/auth/callback`, and static assets
  matcher: [
    "/((?!login|auth/callback|_next/|favicon.ico|robots.txt|sitemap.xml|public/).*)",
  ],
};

export async function proxy(request: NextRequest) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // allow the request to continue
  return NextResponse.next();
}
