import { cx } from '../../utils/cx';
import './Spinner.css';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  /** Accessible description of what is loading */
  label?: string;
}

export function Spinner({ size = 'md', label = 'Loading' }: SpinnerProps) {
  return <span role="status" aria-label={label} className={cx('ui-spinner', `ui-spinner--${size}`)} />;
}
