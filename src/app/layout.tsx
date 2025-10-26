import "./globals.css";
import React from "react";
import Link from "next/link";
import { SidebarProvider, SidebarTrigger } from "@/src/components/ui/sidebar";
import { AppSidebar } from "@/src/components/layout/app-sidebar";
import { Button } from "@/src/components/ui/button";
import PageProvider from "../components/layout/page-provider";
import { createSupabaseServer } from "../lib/supabase/server";
import { Architects_Daughter, Fira_Code } from "next/font/google";
import { ThemeProvider } from "../components/layout/theme-provider";
import { Breadcrumbs } from "../components/layout/breadcrumbs";
import { ThemeToggle } from "../components/layout/theme-toggle";
import { AppTopbar } from "../components/layout/app-topbar";

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
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${architects.variable} ${firaCode.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider>
          <SidebarProvider>
            <AppSidebar />
            <div className="flex min-w-0 flex-1 flex-col">
              <AppTopbar />
              <PageProvider>{children}</PageProvider>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
