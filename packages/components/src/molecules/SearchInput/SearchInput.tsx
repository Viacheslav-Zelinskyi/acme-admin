import { useRef } from 'react';
import { cx } from '../../utils/cx';
import { Icon } from '../../atoms/Icon';
import { IconButton } from '../../atoms/IconButton';
import { Input } from '../../atoms/Input';
import './SearchInput.css';

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Accessible name of the field */
  label?: string;
  clearLabel?: string;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  label = 'Search',
  clearLabel = 'Clear search',
  className,
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div role="search" className={cx('ui-search-input', className)}>
      <Icon name="search" className="ui-search-input__icon" />
      <Input
        ref={inputRef}
        type="search"
        className="ui-search-input__field"
        value={value}
        placeholder={placeholder}
        aria-label={label}
        onChange={(event) => onChange(event.target.value)}
      />
      {value && (
        <IconButton
          icon="close"
          label={clearLabel}
          size="sm"
          className="ui-search-input__clear"
          onClick={() => {
            onChange('');
            inputRef.current?.focus();
          }}
        />
      )}
    </div>
  );
}
