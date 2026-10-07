import { Badge } from '../../atoms/Badge';
import { Text } from '../../atoms/Text';
import { UserAvatar } from '../../molecules/UserAvatar';
import type { UserSummary } from '../../types/user';
import { userStatusLabels, userStatusTones } from '../../utils/userStatus';
import { CollectionFeedback } from '../shared/CollectionFeedback';
import './UserTable.css';

export interface UserTableProps {
  users: UserSummary[];
  onUserClick?: (user: UserSummary) => void;
  loading?: boolean;
  emptyMessage?: string;
}

export function UserTable({ users, onUserClick, loading, emptyMessage = 'No users found.' }: UserTableProps) {
  if (loading) return <CollectionFeedback kind="loading" />;
  if (users.length === 0) return <CollectionFeedback kind="empty" message={emptyMessage} />;

  return (
    <div className="ui-user-table__scroller">
      <table className="ui-user-table">
        <thead>
          <tr>
            <th scope="col">User</th>
            <th scope="col" className="ui-user-table__secondary">Email</th>
            <th scope="col" className="ui-user-table__secondary">Role</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className="ui-user-table__user">
                  <UserAvatar name={user.name} src={user.avatarUrl} size="sm" />
                  <div className="ui-user-table__identity">
                    {onUserClick ? (
                      <button type="button" className="ui-user-table__name-button" onClick={() => onUserClick(user)}>
                        {user.name}
                      </button>
                    ) : (
                      <Text as="span" className="ui-user-table__name">{user.name}</Text>
                    )}
                    {/* On narrow screens the email column is hidden, so it moves under the name */}
                    <Text as="span" variant="caption" tone="muted" className="ui-user-table__email-inline" truncate>
                      {user.email}
                    </Text>
                  </div>
                </div>
              </td>
              <td className="ui-user-table__secondary">{user.email}</td>
              <td className="ui-user-table__secondary">{user.role ?? '\u2014'}</td>
              <td>
                {user.status ? (
                  <Badge tone={userStatusTones[user.status]}>{userStatusLabels[user.status]}</Badge>
                ) : (
                  '\u2014'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
