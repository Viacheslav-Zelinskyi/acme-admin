import { cx } from '../../utils/cx';
import './Divider.css';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function Divider({ orientation = 'horizontal', className }: DividerProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cx('ui-divider', `ui-divider--${orientation}`, className)}
    />
  );
}
