import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchInput } from './SearchInput';

describe('SearchInput', () => {
  it('reports typed text', async () => {
    const onChange = vi.fn();
    render(<SearchInput value="" onChange={onChange} />);
    await userEvent.type(screen.getByRole('searchbox', { name: 'Search' }), 'a');
    expect(onChange).toHaveBeenCalledWith('a');
  });

  it('clears the value through the clear button', async () => {
    const onChange = vi.fn();
    render(<SearchInput value="ada" onChange={onChange} />);
    await userEvent.click(screen.getByRole('button', { name: 'Clear search' }));
    expect(onChange).toHaveBeenCalledWith('');
  });

  it('hides the clear button when empty', () => {
    render(<SearchInput value="" onChange={() => {}} />);
    expect(screen.queryByRole('button', { name: 'Clear search' })).not.toBeInTheDocument();
  });
});
