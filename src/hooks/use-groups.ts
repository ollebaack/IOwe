import useSWR from "swr";
import { fetcher } from "../lib/fetcher";

export type Group = {
  id: string;
  name: string;
  owner_id: string;
  created_at: string;
};

export function useGroups() {
  const { data, error, isLoading, mutate } = useSWR<Group[]>(
    "/api/groups",
    fetcher
  );
  return { data, error, isLoading, mutate };
}

export function useGroup(id?: string) {
  const key = id ? `/api/groups/${id}` : null;
  const { data, error, isLoading, mutate } = useSWR<Group>(key, fetcher);
  return { data, error, isLoading, mutate };
}
