import useSWR from "swr";
import { fetcher } from "@/src/lib/fetcher";
import useSWRMutation from "swr/mutation";

export type GroupMember = { user_id: string };

export function useGroupMembers(groupId?: string) {
  const key = groupId ? `/api/groups/${groupId}/members` : null;
  const { data, error, isLoading, mutate } = useSWR<GroupMember[]>(
    key,
    fetcher
  );
  return { data: data ?? [], error, isLoading, mutate };
}

async function postMembers(
  url: string,
  { arg }: { arg: { memberIds: string[] } }
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

export function useAddMembers(groupId?: string) {
  const url = groupId ? `/api/groups/${groupId}/members` : null;
  const { trigger, isMutating, error } = useSWRMutation(url, postMembers);
  return {
    addMembers: trigger,
    isAdding: isMutating,
    error,
  };
}
