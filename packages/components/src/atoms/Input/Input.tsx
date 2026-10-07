import { forwardRef, type InputHTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import './Input.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { invalid, className, ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cx('ui-input', invalid && 'ui-input--invalid', className)}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  );
});
