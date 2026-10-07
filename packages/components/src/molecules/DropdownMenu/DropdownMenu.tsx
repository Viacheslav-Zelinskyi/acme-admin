import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { Button, type ButtonVariant } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';
import { cx } from '../../utils/cx';
import './DropdownMenu.css';

export interface DropdownMenuItem {
  key: string;
  label: string;
  onSelect?: () => void;
  disabled?: boolean;
  tone?: 'default' | 'danger';
  /** Draws a divider above the item to group related actions */
  separatorBefore?: boolean;
}

export interface DropdownMenuProps {
  /** Content of the trigger button (text, avatar, ...) */
  trigger: ReactNode;
  items: DropdownMenuItem[];
  align?: 'start' | 'end';
  triggerVariant?: ButtonVariant;
  /** Accessible name for the trigger when its content is not descriptive text */
  triggerLabel?: string;
  /** Controlled open state; leave undefined for uncontrolled usage */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function getEnabledItems(root: HTMLElement | null): HTMLButtonElement[] {
  return Array.from(root?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not(:disabled)') ?? []);
}

export function DropdownMenu({
  trigger,
  items,
  align = 'start',
  triggerVariant = 'secondary',
  triggerLabel,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
}: DropdownMenuProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pendingFocus = useRef<'first' | 'last' | null>(null);
  const menuId = useId();

  const [innerOpen, setInnerOpen] = useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : innerOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setInnerOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handleMouseDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [open, setOpen]);

  // Move focus into the menu after it was opened with the keyboard
  useEffect(() => {
    if (!open || !pendingFocus.current) return;
    const enabled = getEnabledItems(rootRef.current);
    (pendingFocus.current === 'first' ? enabled[0] : enabled[enabled.length - 1])?.focus();
    pendingFocus.current = null;
  }, [open]);

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    const target = event.key === 'ArrowDown' ? 'first' : 'last';
    if (open) {
      const enabled = getEnabledItems(rootRef.current);
      (target === 'first' ? enabled[0] : enabled[enabled.length - 1])?.focus();
    } else {
      pendingFocus.current = target;
      setOpen(true);
    }
  };

  const handleMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const enabled = getEnabledItems(rootRef.current);
    const index = enabled.indexOf(document.activeElement as HTMLButtonElement);

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        enabled[(index + 1) % enabled.length]?.focus();
        break;
      case 'ArrowUp':
        event.preventDefault();
        enabled[index <= 0 ? enabled.length - 1 : index - 1]?.focus();
        break;
      case 'Home':
        event.preventDefault();
        enabled[0]?.focus();
        break;
      case 'End':
        event.preventDefault();
        enabled[enabled.length - 1]?.focus();
        break;
      case 'Escape':
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        break;
      case 'Tab':
        setOpen(false);
        break;
    }
  };

  return (
    <div className="ui-dropdown" ref={rootRef}>
      <Button
        ref={triggerRef}
        variant={triggerVariant}
        className="ui-dropdown__trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={triggerLabel}
        onClick={() => setOpen(!open)}
        onKeyDown={handleTriggerKeyDown}
      >
        {trigger}
        <Icon name="chevronDown" />
      </Button>

      {open && (
        <div
          id={menuId}
          role="menu"
          className={cx('ui-dropdown__menu', `ui-dropdown__menu--${align}`)}
          onKeyDown={handleMenuKeyDown}
        >
          {items.map((item) => (
            <div key={item.key} role="none" className="ui-dropdown__entry">
              {item.separatorBefore && <div role="separator" className="ui-dropdown__separator" />}
              <button
                type="button"
                role="menuitem"
                disabled={item.disabled}
                className={cx('ui-dropdown__item', item.tone === 'danger' && 'ui-dropdown__item--danger')}
                onClick={() => {
                  item.onSelect?.();
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
              >
                {item.label}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
