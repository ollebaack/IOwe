import "./globals.css";
import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/src/components/ui/sidebar";
import { AppSidebar } from "@/src/components/app-sidebar";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import PageProvider from "./page-provider";
import { Breadcrumbs } from "../components/breadcrumbs";
import { createSupabaseServer } from "../lib/supabase/server";

export const metadata = {
  title: "IOwe",
  description: "Settle up without awkwardness",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <SidebarProvider>
          {/* Left rail */}
          <AppSidebar />

          {/* Main column */}
          <div className="flex-1 flex min-w-0 flex-col">
            {/* Top bar */}
            <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
              <div className="flex h-14 items-center gap-3 px-3 ">
                <SidebarTrigger className="-ml-1" />
                {/* <Link href="/" className="font-bold tracking-tight mr-1">
                  IOwe
                </Link> */}
                <div className="flex-1 min-w-0">
                  <Breadcrumbs />
                </div>
                {user ? (
                  <form action="/auth/signout" method="post">
                    <Button variant="outline" size="sm">
                      Sign out
                    </Button>
                  </form>
                ) : (
                  <Link href="/login">
                    <Button variant="outline" size="sm">
                      Sign in
                    </Button>
                  </Link>
                )}
              </div>
            </header>

            {/* Content area */}
            <PageProvider>{children}</PageProvider>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
