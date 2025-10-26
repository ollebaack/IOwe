import useSWR from "swr";
import { fetcher } from "@/src/lib/fetcher";

export type Split = {
  expense_id: string;
  participant_id: string;
  amount_owed: number;
};

export function useGroupSplits(groupId?: string) {
  const key = groupId ? `/api/groups/${groupId}/splits` : null;
  const { data, error, isLoading, mutate } = useSWR<Split[]>(key, fetcher);
  return { data: data ?? [], error, isLoading, mutate };
}
