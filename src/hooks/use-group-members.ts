import useSWR from "swr";
import { fetcher } from "@/src/lib/fetcher";

export type GroupMember = { user_id: string };

export function useGroupMembers(groupId?: string) {
  const key = groupId ? `/api/groups/${groupId}/members` : null;
  const { data, error, isLoading, mutate } = useSWR<GroupMember[]>(
    key,
    fetcher
  );
  return { data: data ?? [], error, isLoading, mutate };
}
