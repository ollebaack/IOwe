"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/src/lib/supabase/client";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/src/components/ui/card";
import Link from "next/link";
import { Field, FieldLabel, FieldDescription } from "@/src/components/ui/field";

export default function NewGroup() {
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const supabase = createSupabaseBrowser();
  const router = useRouter();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSubmitting(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setSubmitting(false);
        return alert("You must be logged in to create a group.");
      }

      const { data, error } = await supabase
        .from("groups")
        .insert({ name: name.trim(), owner_id: user.id })
        .select()
        .single();

      if (error) {
        setSubmitting(false);
        return alert(error.message);
      }

      await supabase
        .from("group_members")
        .insert({ group_id: data.id, user_id: user.id, nickname: "You" });

      router.push(`/groups/${data.id}`);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-96 shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">New group</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <Field>
              <FieldLabel htmlFor="group-name">Group name</FieldLabel>
              <Input
                id="group-name"
                placeholder="Trip to Gotland"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                minLength={2}
                disabled={submitting}
                aria-describedby="group-name-hint"
              />
              <FieldDescription id="group-name-hint">
                Pick something everyone will recognize.
              </FieldDescription>
              {/**
               * If you add validation, you can render <FieldError> here.
               * <FieldError>Name must be at least 2 characters.</FieldError>
               */}
            </Field>

            <div className="flex items-center gap-2">
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? "Creating..." : "Create"}
              </Button>
              <Button
                asChild
                variant="outline"
                type="button"
                disabled={submitting}
              ></Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="justify-center text-xs text-muted-foreground">
          You can add members after creating the group.
        </CardFooter>
      </Card>
    </div>
  );
}
