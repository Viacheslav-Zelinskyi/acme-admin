import { Avatar } from '../../atoms/Avatar';
import { Badge } from '../../atoms/Badge';
import { Text } from '../../atoms/Text';
import { cx } from '../../utils/cx';
import { userStatusLabels, userStatusTones } from '../../utils/userStatus';
import type { UserSummary } from '../../types/user';
import './UserCard.css';

export interface UserCardProps {
  user: UserSummary;
  /** `row` is a compact horizontal layout, `tile` is a stacked card for grids */
  variant?: 'row' | 'tile';
  /** When provided, the whole card becomes an interactive button */
  onClick?: (user: UserSummary) => void;
}

export function UserCard({ user, variant = 'row', onClick }: UserCardProps) {
  const className = cx('ui-user-card', `ui-user-card--${variant}`, onClick && 'ui-user-card--interactive');

  const content = (
    <>
      <Avatar name={user.name} src={user.avatarUrl} size={variant === 'tile' ? 'lg' : 'md'} />
      <span className="ui-user-card__body">
        <Text as="span" truncate className="ui-user-card__name">
          {user.name}
        </Text>
        <Text as="span" variant="caption" tone="muted" truncate>
          {user.email}
        </Text>
        {user.role && (
          <Text as="span" variant="caption" tone="muted" truncate>
            {user.role}
          </Text>
        )}
      </span>
      {user.status && <Badge tone={userStatusTones[user.status]}>{userStatusLabels[user.status]}</Badge>}
    </>
  );

  if (onClick) {
    return (
      <button type="button" className={className} onClick={() => onClick(user)}>
        {content}
      </button>
    );
  }
  return <div className={className}>{content}</div>;
}
