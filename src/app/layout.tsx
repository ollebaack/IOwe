import "./globals.css";
import React from "react";
import Link from "next/link";
import { SidebarProvider, SidebarTrigger } from "@/src/components/ui/sidebar";
import { AppSidebar } from "@/src/components/app-sidebar";
import { Button } from "@/src/components/ui/button";
import PageProvider from "./page-provider";
import { Breadcrumbs } from "../components/breadcrumbs";
import { createSupabaseServer } from "../lib/supabase/server";
import { ThemeProvider } from "@/src/components/theme-provider";
import { ThemeToggle } from "@/src/components/theme-toggle";
import { Architects_Daughter, Fira_Code } from "next/font/google";

const architects = Architects_Daughter({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sans", // tie to Tailwind's font-sans
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono", // tie to Tailwind's font-mono
});

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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${architects.variable} ${firaCode.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider>
          <SidebarProvider>
            {/* Left rail */}
            <AppSidebar />

            {/* Main column */}
            <div className="flex min-w-0 flex-1 flex-col">
              {/* Top bar */}
              <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
                <div className="flex h-14 items-center gap-2 px-3">
                  <SidebarTrigger className="-ml-1" />

                  <Link
                    href="/"
                    className="mr-2 hidden text-sm font-semibold tracking-tight sm:inline"
                  >
                    IOwe
                  </Link>

                  <div className="min-w-0 flex-1">
                    <Breadcrumbs />
                  </div>

                  {/* Theme toggle */}
                  <ThemeToggle />

                  {/* Auth */}
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
        </ThemeProvider>
      </body>
    </html>
  );
}
