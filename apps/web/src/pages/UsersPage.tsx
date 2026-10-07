import { useState } from "react";
import {
  DropdownMenu,
  type DropdownMenuItem,
  Pagination,
  SearchInput,
  Text,
  UserGrid,
  UserList,
  UserTable,
  ViewToggle,
  type ViewMode,
} from "@acme/components";
import { useDebouncedValue } from "../features/users/useDebouncedValue";
import { statuses, useUsers } from "../features/users/useUsers";
import type { SortDirection, UserSortField } from "../services/usersService";

const PAGE_SIZE = 10;

const SORT_FIELDS: { field: UserSortField; label: string }[] = [
  { field: "name", label: "Name" },
  { field: "email", label: "Email" },
  { field: "role", label: "Role" },
  { field: "status", label: "Status" },
];

const DIRECTION_ARROW: Record<SortDirection, string> = { asc: "↓", desc: "↑" };

export function UsersPage() {
  const [query, setQuery] = useState("");
  const [view, setView] = useState<ViewMode>("grid");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<UserSortField | "">("");
  const [sortOrder, setSortOrder] = useState<SortDirection>("asc");

  const debouncedQuery = useDebouncedValue(query, 300);
  const { users, total, status } = useUsers({
    query: debouncedQuery,
    page,
    pageSize: PAGE_SIZE,
    sortBy: sortBy || undefined,
    sortOrder,
  });
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const handleSearchChange = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  const applySort = (field: UserSortField | "", order: SortDirection) => {
    setSortBy(field);
    setSortOrder(order);
    setPage(1);
  };

  const buildSortItems = (): DropdownMenuItem[] => [
    {
      key: "default",
      label: "Default order",
      onSelect: () => applySort("", "asc"),
    },
    ...SORT_FIELDS.flatMap(({ field, label }) =>
      (["asc", "desc"] as SortDirection[]).map((order) => ({
        key: `${field}-${order}`,
        label: `${label} ${DIRECTION_ARROW[order]}`,
        onSelect: () => applySort(field, order),
      })),
    ),
  ];

  const currentSortLabel = sortBy
    ? `${SORT_FIELDS.find((f) => f.field === sortBy)?.label} ${DIRECTION_ARROW[sortOrder]}`
    : "Default order";

  const handleUserClick = (user: { id: string }) =>
    console.info("Selected user", user.id);
  const loading = status === statuses.loading;
  const collectionProps = {
    users,
    loading,
    onUserClick: handleUserClick,
    emptyMessage: "No users match your search.",
  };

  return (
    <section className="stack">
      <Text as="h1" variant="display">
        Users
      </Text>

      <div className="toolbar">
        <div className="toolbar__search">
          <SearchInput
            value={query}
            onChange={handleSearchChange}
            placeholder="Search by name or email"
          />
        </div>

        <DropdownMenu
          align="end"
          triggerVariant="ghost"
          triggerLabel="Sort users"
          items={buildSortItems()}
          trigger={<Text as="span">Sort: {currentSortLabel}</Text>}
        />

        <ViewToggle value={view} onChange={setView} />
      </div>

      {status === statuses.error ? (
        <Text tone="danger">Failed to load users.</Text>
      ) : (
        <>
          {view === "grid" && <UserGrid {...collectionProps} />}
          {view === "list" && <UserList {...collectionProps} />}
          {view === "table" && <UserTable {...collectionProps} />}
        </>
      )}

      {status === statuses.success && (
        <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
      )}
    </section>
  );
}
