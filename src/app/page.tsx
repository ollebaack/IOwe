import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/src/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-100">
      {/* Hero Text */}
      <div className="text-center mb-10 px-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Welcome to Your Dashboard
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Quickly access your groups, manage settings, and explore new tools.
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Card className="shadow-lg hover:shadow-xl transition-all text-center p-4">
          <CardHeader>
            <CardTitle>Groups</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              View and manage your groups.
            </p>
            <Button asChild>
              <Link href="/groups">Go to Groups</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-all text-center p-4">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Update your account info and preferences.
            </p>
            <Button asChild variant="outline">
              <Link href="/profile">View Profile</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-all text-center p-4">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Adjust your app configurations.
            </p>
            <Button asChild variant="outline">
              <Link href="/settings">Open Settings</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-all text-center p-4">
          <CardHeader>
            <CardTitle>Help</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Find guides or contact support.
            </p>
            <Button asChild variant="outline">
              <Link href="/help">Get Help</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
