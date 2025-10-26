import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/src/components/ui/card";
import {
  Users,
  Settings,
  HelpCircle,
  User,
  Wallet,
  PlusCircle,
  ChevronRight,
} from "lucide-react";

export default function Home() {
  // This page is wrapped by <PageProvider> so we keep layout responsive
  // and avoid full-viewport background overrides. Use a tall hero within the container.
  return (
    <section className="relative isolate overflow-hidden rounded-3xl border bg-linear-to-br from-primary/5 via-background to-muted/40 p-6 sm:p-10 min-h-[65vh] flex flex-col items-center justify-center text-center">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

      {/* Hero Copy */}
      <div className="mx-auto max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
          <span className="inline-block h-2 w-2 rounded-full bg-primary" />
          You\'re all set — jump back in
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Welcome to <span className="text-primary">IOwe</span>
        </h1>
        <p className="mt-3 text-base text-muted-foreground sm:text-lg">
          Settle up without awkwardness. Quickly access your groups, track
          balances, and manage your account.
        </p>

        {/* Primary CTAs */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/groups" className="inline-flex items-center gap-2">
              <Users className="h-4 w-4" />
              Go to Groups
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/groups/new" className="inline-flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Create Group
            </Link>
          </Button>
        </div>
      </div>

      {/* Quick Links Grid */}
      <div className="mt-10 grid w-full max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="group transition-shadow hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-lg">
              <Users className="h-5 w-5 text-primary" />
              Groups
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            View, join, and manage all your groups in one place.
            <div className="mt-4">
              <Button asChild variant="secondary" className="w-full">
                <Link
                  href="/groups"
                  className="inline-flex items-center justify-center gap-2"
                >
                  Open
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="group transition-shadow hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-lg">
              <Wallet className="h-5 w-5 text-primary" />
              Debts & Balances
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            See who owes what, settle up, and track history.
            <div className="mt-4">
              <Button asChild variant="secondary" className="w-full">
                <Link
                  href="/balances"
                  className="inline-flex items-center justify-center gap-2"
                >
                  View balances
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="group transition-shadow hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-lg">
              <User className="h-5 w-5 text-primary" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Update your info, payment methods, and preferences.
            <div className="mt-4">
              <Button asChild variant="secondary" className="w-full">
                <Link
                  href="/profile"
                  className="inline-flex items-center justify-center gap-2"
                >
                  Manage profile
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="group transition-shadow hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-lg">
              <Settings className="h-5 w-5 text-primary" />
              Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Configure notifications, themes, and app behavior.
            <div className="mt-4">
              <Button asChild variant="secondary" className="w-full">
                <Link
                  href="/settings"
                  className="inline-flex items-center justify-center gap-2"
                >
                  Open settings
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="group transition-shadow hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-lg">
              <PlusCircle className="h-5 w-5 text-primary" />
              Create a Group
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Start a new group for trips, roommates, or projects.
            <div className="mt-4">
              <Button asChild variant="secondary" className="w-full">
                <Link
                  href="/groups/new"
                  className="inline-flex items-center justify-center gap-2"
                >
                  New group
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="group transition-shadow hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-lg">
              <HelpCircle className="h-5 w-5 text-primary" />
              Help
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Browse guides or contact support if you\'re stuck.
            <div className="mt-4">
              <Button asChild variant="secondary" className="w-full">
                <Link
                  href="/help"
                  className="inline-flex items-center justify-center gap-2"
                >
                  Get help
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
