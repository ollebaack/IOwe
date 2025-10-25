import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/src/components/ui/card";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex min-h-2/3 items-center justify-center">
      <Card className="w-[380px] shadow-md text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Welcome</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-6">
            Manage and explore your groups easily.
          </p>
          <Button asChild>
            <Link href="/groups">Go to Groups</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
