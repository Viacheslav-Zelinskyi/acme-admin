import { NavigationItem, type NavigationItemProps } from '../../molecules/NavigationItem';
import { cx } from '../../utils/cx';
import './NavigationMenu.css';

export interface NavigationMenuItem extends Pick<NavigationItemProps, 'label' | 'href' | 'active' | 'icon'> {
  key: string;
}

export interface NavigationMenuProps {
  items: NavigationMenuItem[];
  orientation?: 'horizontal' | 'vertical';
  renderLink?: NavigationItemProps['renderLink'];
  label?: string;
}

export function NavigationMenu({
  items,
  orientation = 'horizontal',
  renderLink,
  label = 'Main navigation',
}: NavigationMenuProps) {
  return (
    <nav aria-label={label} className="ui-navigation-menu">
      <ul className={cx('ui-navigation-menu__list', `ui-navigation-menu__list--${orientation}`)}>
        {items.map(({ key, ...item }) => (
          <li key={key}>
            <NavigationItem {...item} renderLink={renderLink} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
