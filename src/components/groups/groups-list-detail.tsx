"use client";

import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import { useGroups } from "@/src/hooks/use-groups";

export default function GroupsList() {
  const { data, error, isLoading } = useGroups();

  if (isLoading) return <div className="p-6">Loading…</div>;
  if (error)
    return <div className="p-6 text-red-600">Failed to load groups.</div>;

  const groups = data ?? [];

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
          You dont have any groups yet.
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
