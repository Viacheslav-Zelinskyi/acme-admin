import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ViewToggle } from './ViewToggle';

describe('ViewToggle', () => {
  it('marks the selected mode as pressed', () => {
    render(<ViewToggle value="list" onChange={() => {}} />);
    expect(screen.getByRole('button', { name: 'List view' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Grid view' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('reports the chosen mode', async () => {
    const onChange = vi.fn();
    render(<ViewToggle value="grid" onChange={onChange} />);
    await userEvent.click(screen.getByRole('button', { name: 'Table view' }));
    expect(onChange).toHaveBeenCalledWith('table');
  });

  it('renders only the requested modes', () => {
    render(<ViewToggle value="grid" onChange={() => {}} modes={['grid', 'list']} />);
    expect(screen.queryByRole('button', { name: 'Table view' })).not.toBeInTheDocument();
  });
});
