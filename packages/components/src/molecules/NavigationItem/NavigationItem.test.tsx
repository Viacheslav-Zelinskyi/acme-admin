import { render, screen } from '@testing-library/react';
import { NavigationItem } from './NavigationItem';

describe('NavigationItem', () => {
  it('renders an anchor and marks the active item', () => {
    render(<NavigationItem label="Users" href="/users" active />);
    const link = screen.getByRole('link', { name: 'Users' });
    expect(link).toHaveAttribute('href', '/users');
    expect(link).toHaveAttribute('aria-current', 'page');
  });

  it('delegates rendering to the host app', () => {
    render(
      <NavigationItem
        label="Users"
        href="/users"
        renderLink={({ href, children, ...rest }) => (
          <a data-testid="custom" data-to={href} {...rest}>
            {children}
          </a>
        )}
      />,
    );
    expect(screen.getByTestId('custom')).toHaveAttribute('data-to', '/users');
  });
});
