import { UserCard } from '../../molecules/UserCard';
import type { UserSummary } from '../../types/user';
import { CollectionFeedback } from '../shared/CollectionFeedback';
import './UserList.css';

export interface UserListProps {
  users: UserSummary[];
  onUserClick?: (user: UserSummary) => void;
  loading?: boolean;
  emptyMessage?: string;
}

export function UserList({ users, onUserClick, loading, emptyMessage = 'No users found.' }: UserListProps) {
  if (loading) return <CollectionFeedback kind="loading" />;
  if (users.length === 0) return <CollectionFeedback kind="empty" message={emptyMessage} />;

  return (
    <ul className="ui-user-list">
      {users.map((user) => (
        <li key={user.id}>
          <UserCard user={user} onClick={onUserClick} />
        </li>
      ))}
    </ul>
  );
}
