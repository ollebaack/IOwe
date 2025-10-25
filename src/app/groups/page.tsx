import { createSupabaseServer } from "@/src/lib/supabase/server";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";

export default async function GroupsPage() {
  // Replace this mock data with your Supabase query when ready:
  // const { data: groups } = await supabase
  //   .from("groups")
  //   .select("*")
  //   .order("created_at", { ascending: false });
  const groups = [
    { id: "1", name: "Group One" },
    { id: "2", name: "Group Two" },
  ];

  return (
    <div className="max-w-2xl mx-auto py-10 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Your Groups</h1>
        <Button asChild>
          <Link href="/groups/new">New Group</Link>
        </Button>
      </div>

      <Separator />

      {groups.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          You don’t have any groups yet.
        </p>
      ) : (
        <div className="grid gap-3">
          {groups.map((g) => (
            <Card key={g.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex justify-between items-center">
                <Link
                  href={`/groups/${g.id}`}
                  className="font-medium text-primary hover:underline"
                >
                  {g.name}
                </Link>
                <Button variant="outline" asChild>
                  <Link href={`/groups/${g.id}`}>View</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
