import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserCard } from './UserCard';

const user = { id: '1', name: 'Ada Lovelace', email: 'ada@example.com', status: 'active' as const };

describe('UserCard', () => {
  it('renders user data and the status badge', () => {
    render(<UserCard user={user} />);
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.getByText('ada@example.com')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('is not a button without an onClick handler', () => {
    render(<UserCard user={user} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('reports clicks through the callback', async () => {
    const onClick = vi.fn();
    render(<UserCard user={user} onClick={onClick} />);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledWith(user);
  });
});
