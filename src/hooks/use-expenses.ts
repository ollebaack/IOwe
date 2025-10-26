import useSWRMutation from "swr/mutation";

export type CreateExpenseArgs = {
  groupId: string;
  payerId: string;
  amount: number;
  description?: string;
  memberIds: string[];
};

async function postExpense(url: string, { arg }: { arg: CreateExpenseArgs }) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  });

  if (!res.ok) {
    console.log(url);
    const payload = await res.json().catch(() => ({}));
    console.log(payload);
    throw new Error(payload?.error || `Request failed with ${res.status}`);
  }
  return (await res.json()) as { id: string };
}

export function useCreateExpense() {
  const { trigger, isMutating, error } = useSWRMutation(
    "/api/expenses",
    postExpense
  );
  return {
    createExpense: trigger,
    isCreating: isMutating,
    error,
  };
}
