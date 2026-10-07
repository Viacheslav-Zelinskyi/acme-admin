import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import usersData from "../data/users.json";
import { fetchUsers } from "../services/usersService";
import { UsersPage } from "./UsersPage";

vi.mock("../services/usersService", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("../services/usersService")>();
  return { ...actual, fetchUsers: vi.fn(actual.fetchUsers) };
});

vi.setConfig({ testTimeout: 10_000 });
const WAIT = { timeout: 3000 };

const PAGE_SIZE = 10;

const emailsOnPage = (page: number) =>
  usersData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map((u) => u.email);

describe("UsersPage", () => {
  beforeEach(() => {
    vi.mocked(fetchUsers).mockClear();
  });

  it("shows no users while loading", () => {
    vi.mocked(fetchUsers).mockReturnValueOnce(new Promise(() => {}));

    render(<UsersPage />);

    expect(screen.getByRole("heading", { name: "Users" })).toBeInTheDocument();
    expect(screen.queryByText(usersData[0].email)).not.toBeInTheDocument();
  });

  it("shows the first page of users after loading", async () => {
    render(<UsersPage />);

    const [first, ...rest] = emailsOnPage(1);
    expect(await screen.findByText(first, undefined, WAIT)).toBeInTheDocument();
    rest.forEach((email) =>
      expect(screen.getByText(email)).toBeInTheDocument(),
    );
    expect(screen.queryByText(emailsOnPage(2)[0])).not.toBeInTheDocument();
  });

  it("goes to the next page", async () => {
    const user = userEvent.setup();
    render(<UsersPage />);

    await user.click(
      await screen.findByRole("button", { name: /next/i }, WAIT),
    );

    expect(
      await screen.findByText(emailsOnPage(2)[0], undefined, WAIT),
    ).toBeInTheDocument();
    expect(screen.queryByText(emailsOnPage(1)[0])).not.toBeInTheDocument();
    expect(fetchUsers).toHaveBeenLastCalledWith(
      expect.objectContaining({ page: 2, pageSize: PAGE_SIZE }),
    );
  });

  it("switches from grid to table view", async () => {
    const user = userEvent.setup();
    render(<UsersPage />);

    await screen.findByText(emailsOnPage(1)[0], undefined, WAIT);
    expect(screen.queryByRole("table")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Table view" }));

    const table = screen.getByRole("table");
    expect(within(table).getAllByRole("row")).toHaveLength(PAGE_SIZE + 1);
    expect(
      within(table).getAllByText(emailsOnPage(1)[0]).length,
    ).toBeGreaterThan(0);
  });

  it("filters by search query and resets to the first page", async () => {
    const user = userEvent.setup();
    render(<UsersPage />);

    await user.click(
      await screen.findByRole("button", { name: /next/i }, WAIT),
    );
    await screen.findByText(emailsOnPage(2)[0], undefined, WAIT);

    await user.type(
      screen.getByPlaceholderText("Search by name or email"),
      "leo",
    );

    expect(
      await screen.findByText("leo.carter@example.com", undefined, WAIT),
    ).toBeInTheDocument();
    expect(screen.getByText("leo.perez@example.com")).toBeInTheDocument();
    expect(screen.queryByText(emailsOnPage(2)[0])).not.toBeInTheDocument();
    expect(fetchUsers).toHaveBeenLastCalledWith(
      expect.objectContaining({ query: "leo", page: 1 }),
    );
  });

  it("passes chosen sorting options to the users query", async () => {
    const user = userEvent.setup();
    render(<UsersPage />);

    await user.click(screen.getByRole("button", { name: "Sort users" }));
    await user.click(await screen.findByRole("menuitem", { name: "Email ↑" }));

    expect(fetchUsers).toHaveBeenLastCalledWith(
      expect.objectContaining({ sortBy: "email", sortOrder: "desc" }),
    );
    expect(screen.getByText("Sort: Email ↑")).toBeInTheDocument();
  });

  it("resets sorting and the page with the default order", async () => {
    const user = userEvent.setup();
    render(<UsersPage />);

    await user.click(screen.getByRole("button", { name: "Sort users" }));
    await user.click(await screen.findByRole("menuitem", { name: "Name ↓" }));
    expect(fetchUsers).toHaveBeenLastCalledWith(
      expect.objectContaining({ sortBy: "name", sortOrder: "asc", page: 1 }),
    );

    await user.click(screen.getByRole("button", { name: "Sort users" }));
    await user.click(
      await screen.findByRole("menuitem", { name: "Default order" }),
    );

    expect(fetchUsers).toHaveBeenLastCalledWith(
      expect.objectContaining({ sortBy: undefined, sortOrder: "asc", page: 1 }),
    );
    expect(screen.getByText("Sort: Default order")).toBeInTheDocument();
  });

  it("shows an error message when loading fails", async () => {
    vi.mocked(fetchUsers).mockRejectedValueOnce(new Error("Network error"));

    render(<UsersPage />);

    expect(
      await screen.findByText("Failed to load users.", undefined, WAIT),
    ).toBeInTheDocument();
  });
});
