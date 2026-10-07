import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './Badge.css';

export type BadgeTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

export interface BadgeProps {
  tone?: BadgeTone;
  children: ReactNode;
}

export function Badge({ tone = 'neutral', children }: BadgeProps) {
  return <span className={cx('ui-badge', `ui-badge--${tone}`)}>{children}</span>;
}
