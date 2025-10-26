"use client";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [bio, setBio] = useState("");

  function handleSave() {
    // TODO: Submit to your profile update API
    console.log({ name, email, currency, bio });
  }

  return (
    <section className="space-y-6">
      <div className="text-center sm:text-left">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          Manage your personal details and preferences.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your info</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="grid gap-4 sm:grid-cols-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ada Lovelace"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ada@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Default currency</Label>
              <select
                id="currency"
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="EUR">EUR — Euro</option>
                <option value="SEK">SEK — Swedish krona</option>
                <option value="USD">USD — US Dollar</option>
                <option value="GBP">GBP — British Pound</option>
              </select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="bio">Bio (optional)</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="A short note about you"
              />
            </div>
            <div className="sm:col-span-2">
              <Button onClick={handleSave}>Save profile</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Connected accounts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            Connect a payment provider to speed up settlements (coming soon).
          </p>
          <div className="flex gap-3">
            <Button variant="outline" disabled>
              Connect Stripe
            </Button>
            <Button variant="outline" disabled>
              Connect PayPal
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
