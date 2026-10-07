import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DropdownMenu } from './DropdownMenu';

function setup(onSelect = vi.fn()) {
  render(
    <DropdownMenu
      trigger="Actions"
      items={[
        { key: 'edit', label: 'Edit', onSelect },
        { key: 'archive', label: 'Archive', disabled: true },
        { key: 'delete', label: 'Delete', tone: 'danger', separatorBefore: true },
      ]}
    />,
  );
  return onSelect;
}

describe('DropdownMenu', () => {
  it('opens and closes through the trigger', async () => {
    setup();
    const trigger = screen.getByRole('button', { name: /Actions/ });
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();

    await userEvent.click(trigger);
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    await userEvent.click(trigger);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('calls onSelect and closes when an item is chosen', async () => {
    const onSelect = setup();
    await userEvent.click(screen.getByRole('button', { name: /Actions/ }));
    await userEvent.click(screen.getByRole('menuitem', { name: 'Edit' }));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('does not select disabled items', async () => {
    setup();
    await userEvent.click(screen.getByRole('button', { name: /Actions/ }));
    expect(screen.getByRole('menuitem', { name: 'Archive' })).toBeDisabled();
  });

  it('closes on Escape and returns focus to the trigger', async () => {
    setup();
    const trigger = screen.getByRole('button', { name: /Actions/ });
    await userEvent.click(trigger);
    await userEvent.keyboard('{ArrowDown}{Escape}');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('closes on outside click', async () => {
    setup();
    await userEvent.click(screen.getByRole('button', { name: /Actions/ }));
    await userEvent.click(document.body);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('moves focus between enabled items with arrow keys', async () => {
    setup();
    const trigger = screen.getByRole('button', { name: /Actions/ });
    trigger.focus();
    await userEvent.keyboard('{ArrowDown}');
    expect(screen.getByRole('menuitem', { name: 'Edit' })).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    // "Archive" is disabled, so focus skips to "Delete"
    expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveFocus();
  });
});
