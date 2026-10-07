import { type ReactNode } from "react";
import "./Header.css";

export interface HeaderProps {
  leading?: ReactNode;
  brand: ReactNode;
  actions?: ReactNode;
  menuLabel?: string;
}

export function Header({ leading, brand, actions }: HeaderProps) {
  return (
    <header className="ui-header">
      <div className="ui-header__inner">
        <div className="ui-header__brand">
          {leading}
          {brand}
        </div>

        <div className="ui-header__actions">{actions}</div>
      </div>
    </header>
  );
}
