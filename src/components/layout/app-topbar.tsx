import { createSupabaseServer } from "@/src/lib/supabase/server";
import { Link } from "lucide-react";
import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";
import { Breadcrumbs } from "./breadcrumbs";
import { ThemeToggle } from "./theme-toggle";

export async function AppTopbar() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex h-14 items-center gap-2 px-3">
        <SidebarTrigger className="-ml-1" />

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
  );
}
