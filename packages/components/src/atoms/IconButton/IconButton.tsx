import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import { Icon, type IconName } from '../Icon';
import type { ButtonSize, ButtonVariant } from '../Button';
import '../Button/Button.css';
import './IconButton.css';

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'aria-label'> {
  icon: IconName;
  /** Accessible name; required because the button has no visible text */
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Renders the button as a toggle in the given state */
  pressed?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { icon, label, variant = 'ghost', size = 'md', pressed, className, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      aria-label={label}
      title={label}
      aria-pressed={pressed}
      className={cx(
        'ui-button',
        `ui-button--${variant}`,
        `ui-button--${size}`,
        'ui-icon-button',
        className,
      )}
      {...rest}
    >
      <Icon name={icon} />
    </button>
  );
});
