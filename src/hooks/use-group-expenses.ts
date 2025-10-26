import useSWR from "swr";
import { fetcher } from "@/src/lib/fetcher";

export type Expense = {
  id: string;
  group_id: string;
  payer_id: string;
  amount: number;
  description?: string | null;
  created_at: string;
};

export function useGroupExpenses(groupId?: string) {
  const key = groupId ? `/api/groups/${groupId}/expenses` : null;
  const { data, error, isLoading, mutate } = useSWR<Expense[]>(key, fetcher);
  return { data: data ?? [], error, isLoading, mutate };
}
