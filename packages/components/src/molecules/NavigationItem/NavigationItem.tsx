import type { ReactNode } from 'react';
import { Icon, type IconName } from '../../atoms/Icon';
import { cx } from '../../utils/cx';
import './NavigationItem.css';

/** Props a host app must apply to the link element it renders */
export interface LinkRenderProps {
  href: string;
  className: string;
  'aria-current'?: 'page';
  children: ReactNode;
}

export interface NavigationItemProps {
  label: string;
  href: string;
  active?: boolean;
  icon?: IconName;
  /**
   * Lets the host app render the link with its own router (e.g. react-router `Link`),
   * so the library never depends on a routing package. Defaults to a plain `<a>`.
   */
  renderLink?: (props: LinkRenderProps) => ReactNode;
}

export function NavigationItem({ label, href, active, icon, renderLink }: NavigationItemProps) {
  const linkProps: LinkRenderProps = {
    href,
    className: cx('ui-navigation-item', active && 'ui-navigation-item--active'),
    'aria-current': active ? 'page' : undefined,
    children: (
      <>
        {icon && <Icon name={icon} />}
        {label}
      </>
    ),
  };

  if (renderLink) return <>{renderLink(linkProps)}</>;

  const { children, ...anchorProps } = linkProps;
  return <a {...anchorProps}>{children}</a>;
}
