import { Avatar, type AvatarSize } from '../../atoms/Avatar';
import { cx } from '../../utils/cx';
import { userStatusLabels } from '../../utils/userStatus';
import type { UserStatus } from '../../types/user';
import './UserAvatar.css';

export interface UserAvatarProps {
  name: string;
  src?: string;
  size?: AvatarSize;
  /** Adds a small status indicator in the corner */
  status?: UserStatus;
}

export function UserAvatar({ name, src, size = 'md', status }: UserAvatarProps) {
  return (
    <span className="ui-user-avatar">
      <Avatar name={name} src={src} size={size} />
      {status && (
        <span
          role="img"
          aria-label={userStatusLabels[status]}
          className={cx('ui-user-avatar__status', `ui-user-avatar__status--${status}`)}
        />
      )}
    </span>
  );
}
