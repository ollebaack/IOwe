"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/src/components/ui/field";
import { cn } from "@/src/lib/utils";
import { useAddMembers } from "@/src/hooks/use-group-members";

export default function AddMembersForm({
  groupId,
  className,
  onAdded,
}: {
  groupId: string;
  className?: string;
  onAdded?: () => void;
}) {
  const [raw, setRaw] = useState("");
  const { addMembers, isAdding, error } = useAddMembers(groupId);

  const parseIds = (text: string) => {
    const parts = text
      .split(/[\s,;\n\r]+/g)
      .map((s) => s.trim())
      .filter(Boolean);
    return Array.from(new Set(parts));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const memberIds = parseIds(raw);
    if (memberIds.length === 0) {
      alert("Enter at least one user_id");
      return;
    }
    try {
      await addMembers({ memberIds });
      setRaw("");
      onAdded?.();
    } catch (err: any) {
      alert(err.message || "Failed to add members");
    }
  };

  const count = parseIds(raw).length;

  return (
    <form onSubmit={onSubmit} className={cn("w-full", className)}>
      <FieldSet>
        <FieldGroup className="flex w-full items-end gap-3">
          <Field className="flex-1">
            <FieldLabel htmlFor="memberIds">Add members</FieldLabel>
            <Input
              id="memberIds"
              placeholder="user_...@gmail.com"
              value={raw}
              onChange={(e) => setRaw(e.target.value)}
              aria-invalid={!!error}
            />
            {error ? (
              <FieldError>{error.message}</FieldError>
            ) : (
              <FieldDescription>
                Separate multiple IDs with space, comma, or newline.{" "}
                {count > 0 ? `${count} ready` : ""}
              </FieldDescription>
            )}
          </Field>

          <Button
            type="submit"
            disabled={isAdding}
            className="whitespace-nowrap"
          >
            {isAdding ? "Adding…" : "Add members"}
          </Button>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
