import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserTable } from './UserTable';

const users = [
  { id: '1', name: 'Ada Lovelace', email: 'ada@example.com', role: 'Engineer', status: 'active' as const },
  { id: '2', name: 'Alan Turing', email: 'alan@example.com' },
];

describe('UserTable', () => {
  it('renders a row per user plus the header row', () => {
    render(<UserTable users={users} />);
    expect(screen.getAllByRole('row')).toHaveLength(3);
    expect(screen.getByText('Engineer')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('reports clicks on a user name', async () => {
    const onUserClick = vi.fn();
    render(<UserTable users={users} onUserClick={onUserClick} />);
    await userEvent.click(screen.getByRole('button', { name: 'Ada Lovelace' }));
    expect(onUserClick).toHaveBeenCalledWith(users[0]);
  });
});
