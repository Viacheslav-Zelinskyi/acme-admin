import { Text } from '../../atoms/Text';
import { DropdownMenu, type DropdownMenuItem } from '../../molecules/DropdownMenu';
import { UserAvatar } from '../../molecules/UserAvatar';
import type { UserSummary } from '../../types/user';
import './UserMenu.css';

export interface UserMenuProps {
  user: Pick<UserSummary, 'id' | 'name' | 'avatarUrl' | 'status'>;
  /** Actions are defined by the host app (profile, logout, ...) */
  items: DropdownMenuItem[];
}

export function UserMenu({ user, items }: UserMenuProps) {
  return (
    <DropdownMenu
      align="end"
      triggerVariant="ghost"
      triggerLabel={`Account menu for ${user.name}`}
      items={items}
      trigger={
        <span className="ui-user-menu__trigger">
          <UserAvatar name={user.name} src={user.avatarUrl} size="sm" status={user.status} />
          <Text as="span" className="ui-user-menu__name">
            {user.name}
          </Text>
        </span>
      }
    />
  );
}
