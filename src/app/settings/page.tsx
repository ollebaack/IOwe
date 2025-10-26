"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/src/components/ui/card";
import { Label } from "@/src/components/ui/label";
import { Switch } from "@/src/components/ui/switch";
import { Separator } from "@/src/components/ui/separator";

export default function SettingsPage() {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);
  const [weeklySummary, setWeeklySummary] = useState(true);

  function handleSave() {
    // TODO: wire to your API
    console.log({ emailNotifs, pushNotifs, weeklySummary });
  }

  return (
    <section className="space-y-6">
      <div className="text-center sm:text-left">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Configure notifications and preferences.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <Label htmlFor="email-notifs">Email notifications</Label>
              <p className="text-sm text-muted-foreground">
                Get updates about activity in your groups.
              </p>
            </div>
            <Switch
              id="email-notifs"
              checked={emailNotifs}
              onCheckedChange={setEmailNotifs}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-4">
            <div>
              <Label htmlFor="push-notifs">Push notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive push alerts on this device.
              </p>
            </div>
            <Switch
              id="push-notifs"
              checked={pushNotifs}
              onCheckedChange={setPushNotifs}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-4">
            <div>
              <Label htmlFor="weekly-summary">Weekly summary</Label>
              <p className="text-sm text-muted-foreground">
                A digest of balances and new activity every Monday.
              </p>
            </div>
            <Switch
              id="weekly-summary"
              checked={weeklySummary}
              onCheckedChange={setWeeklySummary}
            />
          </div>
          <div className="pt-2">
            <Button onClick={handleSave}>Save changes</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Danger zone</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Need to leave IOwe? You can request account deletion.
          </p>
          <Button variant="destructive" asChild>
            <Link href="/settings/delete">Delete account</Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
