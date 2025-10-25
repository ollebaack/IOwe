// // middleware.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { updateSession } from "./lib/supabase/updateSession";

// // Paths that are ALWAYS public
// const PUBLIC_PATHS = [
//   "/login",
//   "/auth", // e.g., /auth/callback/*
//   "/api/public", // if you have any public APIs
// ];

// function isPublic(pathname: string) {
//   // exact /login OR startsWith any public prefix
//   return (
//     pathname === "/login" ||
//     PUBLIC_PATHS.some((p) => p !== "/login" && pathname.startsWith(p))
//   );
// }

// export async function middleware(req: NextRequest) {
//   const { res, user } = await updateSession(req);
//   const { pathname, search } = req.nextUrl;
//   console.log("Middleware:", { pathname, user });
//   // everything except explicit public paths requires auth (this includes "/")
//   if (!isPublic(pathname) && !user) {
//     const url = new URL("/login", req.url);
//     url.searchParams.set("next", pathname + search);
//     return NextResponse.redirect(url);
//   }

//   // optional: signed-in users hitting /login → push them into the app
//   if (user && pathname === "/login") {
//     return NextResponse.redirect(new URL("/", req.url)); // or '/groups'
//   }

//   return res;
// }

// export const config = {
//   matcher: [
//     "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
//   ],
// };
