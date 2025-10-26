"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useCreateExpense } from "@/src/hooks/use-expenses";

// Normalize and validate amount: allow "1 234,56", "€12.50", etc.
const schema = z.object({
  amount: z
    .number()
    .min(1, "Enter an amount")
    .refine((v) => !Number.isNaN(v) && v > 0, "Amount must be greater than 0"),
  desc: z.string().optional(),
});

type FormValues = z.infer<typeof schema>; // amount => number

export default function ExpenseForm({
  groupId,
  memberIds,
  currentUserId,
  className,
  onCreated,
}: {
  groupId: string;
  memberIds: string[];
  currentUserId: string;
  className?: string;
  onCreated?: () => void;
}) {
  const { createExpense, isCreating, error } = useCreateExpense();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    // Don't provide a string default for a field that resolves to a number.
    // Leaving it out keeps the input empty without breaking types.
    defaultValues: { desc: "" },
    mode: "onChange",
  });

  const onSubmit = async (values: FormValues) => {
    await createExpense({
      groupId,
      payerId: currentUserId,
      amount: values.amount, // number (parsed by Zod)
      description: values.desc || undefined,
      memberIds,
    });
    reset({ desc: "" }); // keep description cleared; amount input returns to empty
    onCreated?.();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("mt-2 w-full", className)}
    >
      <FieldSet>
        <FieldGroup className="flex w-full items-end gap-3">
          {/* Amount */}
          <Field className="w-40">
            <FieldLabel htmlFor="amount">Amount</FieldLabel>
            <Input
              id="amount"
              inputMode="decimal"
              placeholder="0.00"
              {...register("amount")}
              aria-invalid={!!errors.amount}
            />
            {errors.amount ? (
              <FieldError>{errors.amount.message}</FieldError>
            ) : (
              <FieldDescription>Use . or , for decimals.</FieldDescription>
            )}
          </Field>

          {/* Description */}
          <Field className="flex-1">
            <FieldLabel htmlFor="desc">Description (optional)</FieldLabel>
            <Input
              id="desc"
              placeholder="Dinner, taxi, groceries…"
              {...register("desc")}
              aria-invalid={!!errors.desc}
            />
            {errors.desc && <FieldError>{errors.desc.message}</FieldError>}
          </Field>

          <Button
            type="submit"
            disabled={isCreating || !isValid}
            className="whitespace-nowrap"
          >
            {isCreating ? "Saving…" : "Add"}
          </Button>
        </FieldGroup>

        {/* API error */}
        {error && <FieldError className="mt-2">{error.message}</FieldError>}
      </FieldSet>
    </form>
  );
}
