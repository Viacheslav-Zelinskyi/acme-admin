import { fetchUsers } from './usersService';

describe('usersService', () => {
  it('paginates results', async () => {
    const first = await fetchUsers({ page: 1, pageSize: 5 });
    const second = await fetchUsers({ page: 2, pageSize: 5 });
    expect(first.items).toHaveLength(5);
    expect(second.items[0].id).not.toBe(first.items[0].id);
    expect(first.total).toBeGreaterThan(5);
  });

  it('filters by name or email', async () => {
    const result = await fetchUsers({ query: 'turing' });
    expect(result.total).toBe(1);
    expect(result.items[0].name).toBe('Alan Turing');
  });

  it('sorts by email when sort options are provided', async () => {
    const asc = await fetchUsers({ sortBy: 'email', sortOrder: 'asc', pageSize: 10 });
    const desc = await fetchUsers({ sort: { by: 'email', order: 'desc' }, pageSize: 10 });

    expect(asc.items.map((user) => user.email)).toEqual(
      [...asc.items].map((user) => user.email).sort(),
    );
    expect(desc.items.map((user) => user.email)).toEqual(
      [...desc.items].map((user) => user.email).sort().reverse(),
    );
  });
});
