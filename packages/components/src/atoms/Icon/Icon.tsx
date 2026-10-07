import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Home,
  Info,
  LayoutGrid,
  List,
  Menu,
  Search,
  Table,
  User,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { cx } from "../../utils/cx";
import "./Icon.css";

const icons = {
  search: Search,
  close: X,
  menu: Menu,
  grid: LayoutGrid,
  list: List,
  table: Table,
  chevronDown: ChevronDown,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  home: Home,
  users: Users,
  user: User,
  info: Info,
} as const satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

export interface IconProps {
  name: IconName;
  className?: string;
}

/** Decorative icon; sized in `em`, so it scales with the surrounding text */
export function Icon({ name, className }: IconProps) {
  const LucideIcon = icons[name];

  return (
    <LucideIcon
      className={cx("ui-icon", className)}
      size="1em"
      strokeWidth={2}
      aria-hidden="true"
      focusable="false"
    />
  );
}
