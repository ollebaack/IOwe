import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { fetcher } from "@/src/lib/fetcher";

export type Payment = {
  id: string;
  group_id: string;
  from_user: string;
  to_user: string;
  amount: number;
  created_at: string;
};

export function useGroupPayments(groupId?: string) {
  const key = groupId ? `/api/groups/${groupId}/payments` : null;
  const { data, error, isLoading, mutate } = useSWR<Payment[]>(key, fetcher);
  return { data: data ?? [], error, isLoading, mutate, key };
}

async function postPayment(
  url: string,
  { arg }: { arg: { from_user: string; to_user: string; amount: number } }
) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  });
  if (!res.ok) {
    const payload = await res.json().catch(() => ({}));
    throw new Error(payload?.error || `Request failed with ${res.status}`);
  }
  return res.json();
}

export function useCreatePayment(groupId?: string) {
  const url = groupId ? `/api/groups/${groupId}/payments` : null;
  const { trigger, isMutating, error } = useSWRMutation(url, postPayment);
  return { createPayment: trigger, isCreating: isMutating, error };
}
