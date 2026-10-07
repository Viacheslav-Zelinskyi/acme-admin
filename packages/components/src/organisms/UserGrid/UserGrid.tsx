import { UserCard } from '../../molecules/UserCard';
import type { UserSummary } from '../../types/user';
import { CollectionFeedback } from '../shared/CollectionFeedback';
import './UserGrid.css';

export interface UserGridProps {
  users: UserSummary[];
  onUserClick?: (user: UserSummary) => void;
  loading?: boolean;
  emptyMessage?: string;
}

export function UserGrid({ users, onUserClick, loading, emptyMessage = 'No users found.' }: UserGridProps) {
  if (loading) return <CollectionFeedback kind="loading" />;
  if (users.length === 0) return <CollectionFeedback kind="empty" message={emptyMessage} />;

  return (
    <ul className="ui-user-grid">
      {users.map((user) => (
        <li key={user.id}>
          <UserCard user={user} variant="tile" onClick={onUserClick} />
        </li>
      ))}
    </ul>
  );
}
