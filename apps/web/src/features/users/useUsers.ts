import { useEffect, useState } from "react";
import {
  fetchUsers,
  type FetchUsersParams,
  type User,
} from "../../services/usersService";

export const statuses = {
  loading: "loading",
  success: "success",
  error: "error",
} as const;

export type Status = keyof typeof statuses;

// Application-specific data hook: loads a page of users via the service layer
export function useUsers({
  query,
  page,
  pageSize,
  sort,
  sortBy,
  sortOrder,
}: FetchUsersParams) {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState<Status>(statuses.loading);

  useEffect(() => {
    let cancelled = false;
    setStatus(statuses.loading);

    fetchUsers({ query, page, pageSize, sort, sortBy, sortOrder })
      .then((result) => {
        if (cancelled) return;
        setUsers(result.items);
        setTotal(result.total);
        setStatus(statuses.success);
      })
      .catch(() => {
        if (!cancelled) setStatus(statuses.error);
      });

    // Ignore responses of outdated requests
    return () => {
      cancelled = true;
    };
  }, [query, page, pageSize, sort, sortBy, sortOrder]);

  return { users, total, status };
}
