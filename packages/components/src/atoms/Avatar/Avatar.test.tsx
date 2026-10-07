import { fireEvent, render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('shows initials when there is no image', () => {
    render(<Avatar name="Ada Lovelace" />);
    expect(screen.getByRole('img', { name: 'Ada Lovelace' })).toHaveTextContent('AL');
  });

  it('falls back to initials when the image fails to load', () => {
    const { container } = render(<Avatar name="Alan Turing" src="https://invalid.test/a.png" />);
    fireEvent.error(container.querySelector('img')!);
    expect(screen.getByRole('img', { name: 'Alan Turing' })).toHaveTextContent('AT');
  });
});
