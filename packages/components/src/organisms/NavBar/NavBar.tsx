import type { ReactNode } from 'react';
import './NavBar.css';

export interface NavBarItem {
  key: string;
  label: string;
  href: string;
}

export interface NavBarProps {
  items: NavBarItem[];
  /**
   * Lets the host app render links with its own router (e.g. react-router NavLink)
   * so this component never depends on a routing library.
   */
  renderLink?: (item: NavBarItem, children: ReactNode) => ReactNode;
  /** Optional slot on the right side, e.g. user menu or logout button */
  actions?: ReactNode;
}

export function NavBar({ items, renderLink, actions }: NavBarProps) {
  return (
    <header className="ui-navbar">
      <nav className="ui-navbar__links">
        {items.map((item) =>
          renderLink ? (
            <span key={item.key}>{renderLink(item, item.label)}</span>
          ) : (
            <a key={item.key} href={item.href}>
              {item.label}
            </a>
          ),
        )}
      </nav>
      {actions && <div className="ui-navbar__actions">{actions}</div>}
    </header>
  );
}
