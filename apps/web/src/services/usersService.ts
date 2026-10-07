import type { UserSummary } from "@acme/components";
import mockUsers from "../data/users.json";

export type User = UserSummary;

export const userStatuses = {
  active: "active",
  away: "away",
  inactive: "inactive",
} as const;

export type UserStatus = (typeof userStatuses)[keyof typeof userStatuses];

const DEFAULTS = {
  PAGE: 1,
  PAGE_SIZE: 10,
  SIMULATED_DELAY_MS: 350,
  ROLE: "Team member",
  EMAIL_DOMAIN: "example.com",
  STATUS: userStatuses.active,
} as const;

export type UserSortField = "id" | "name" | "email" | "role" | "status";
export type SortDirection = "asc" | "desc";

export interface UserSortOptions {
  readonly by?: UserSortField;
  readonly order?: SortDirection;
}

export interface FetchUsersParams {
  readonly query?: string;
  readonly page?: number;
  readonly pageSize?: number;
  readonly sortBy?: UserSortField;
  readonly sortOrder?: SortDirection;
  readonly sort?: UserSortOptions | UserSortField;
}

export interface UsersPageResult {
  readonly items: User[];
  readonly total: number;
}

type MockUserRecord = {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email?: string;
  readonly role?: string;
  readonly status?: string;
  readonly avatar?: string;
  readonly department?: string;
};

const ALL_USERS = mockUsers as readonly MockUserRecord[];
const VALID_STATUSES = new Set<string>(Object.values(userStatuses));

const normalizeStatus = (status?: string): UserStatus => {
  const lower = status?.toLowerCase();
  return lower && VALID_STATUSES.has(lower)
    ? (lower as UserStatus)
    : DEFAULTS.STATUS;
};

const getUserSortValue = (user: MockUserRecord, field: UserSortField): string => {
  switch (field) {
    case "id":
      return user.id;
    case "email":
      return user.email ?? `${user.firstName}.${user.lastName}@${DEFAULTS.EMAIL_DOMAIN}`.toLowerCase();
    case "role":
      return user.role ?? DEFAULTS.ROLE;
    case "status":
      return normalizeStatus(user.status);
    case "name":
    default:
      return `${user.firstName} ${user.lastName}`;
  }
};

const resolveSortOptions = (params: FetchUsersParams): UserSortOptions => {
  const requestedSort = params.sort;
  const byValue =
    (typeof requestedSort === "string"
      ? requestedSort
      : requestedSort?.by) ?? params.sortBy;
  const orderValue =
    (typeof requestedSort === "string"
      ? params.sortOrder
      : requestedSort?.order) ?? params.sortOrder ?? "asc";
  const normalizedBy =
    byValue && ["id", "name", "email", "role", "status"].includes(byValue)
      ? byValue
      : undefined;

  return {
    by: normalizedBy,
    order: orderValue === "desc" ? "desc" : "asc",
  };
};

const mapUserRecord = (user: MockUserRecord): User => {
  const firstName = user.firstName.trim();
  const lastName = user.lastName.trim();
  const fallbackEmail = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${DEFAULTS.EMAIL_DOMAIN}`;

  return {
    id: user.id,
    name: `${firstName} ${lastName}`,
    email: user.email ?? fallbackEmail,
    role: user.role ?? DEFAULTS.ROLE,
    status: normalizeStatus(user.status),
    avatarUrl: user.avatar,
  };
};

export async function fetchUsers({
  query = "",
  page = DEFAULTS.PAGE,
  pageSize = DEFAULTS.PAGE_SIZE,
  ...params
}: FetchUsersParams = {}): Promise<UsersPageResult> {
  await new Promise((resolve) =>
    setTimeout(resolve, DEFAULTS.SIMULATED_DELAY_MS),
  );

  const normalizedQuery = query.trim().toLowerCase();
  const sortOptions = resolveSortOptions(params);

  const filtered = normalizedQuery
    ? ALL_USERS.filter((user) => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        const email = user.email?.toLowerCase() ?? "";
        return (
          fullName.includes(normalizedQuery) || email.includes(normalizedQuery)
        );
      })
    : [...ALL_USERS];

  const sorted = sortOptions.by
    ? [...filtered].sort((left, right) => {
        const leftValue = getUserSortValue(left, sortOptions.by as UserSortField);
        const rightValue = getUserSortValue(
          right,
          sortOptions.by as UserSortField,
        );
        const comparison = leftValue.localeCompare(rightValue, undefined, {
          sensitivity: "base",
        });

        return sortOptions.order === "desc" ? comparison * -1 : comparison;
      })
    : filtered;

  const startIndex = (page - 1) * pageSize;
  const items = sorted
    .slice(startIndex, startIndex + pageSize)
    .map(mapUserRecord);

  return { items, total: filtered.length };
}

export async function getUsers(params: FetchUsersParams = {}): Promise<User[]> {
  const { items } = await fetchUsers(params);
  return items;
}
