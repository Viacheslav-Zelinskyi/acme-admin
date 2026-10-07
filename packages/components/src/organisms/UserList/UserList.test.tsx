import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserList } from './UserList';

const users = [
  { id: '1', name: 'Ada Lovelace', email: 'ada@example.com' },
  { id: '2', name: 'Alan Turing', email: 'alan@example.com' },
];

describe('UserList', () => {
  it('renders every user and reports clicks', async () => {
    const onUserClick = vi.fn();
    render(<UserList users={users} onUserClick={onUserClick} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    await userEvent.click(screen.getByRole('button', { name: /Alan Turing/ }));
    expect(onUserClick).toHaveBeenCalledWith(users[1]);
  });

  it('shows the empty message', () => {
    render(<UserList users={[]} emptyMessage="Nobody here" />);
    expect(screen.getByText('Nobody here')).toBeInTheDocument();
  });

  it('shows a spinner while loading', () => {
    render(<UserList users={users} loading />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});
