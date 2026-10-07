import { render, screen } from '@testing-library/react';
import { NavigationMenu } from './NavigationMenu';

describe('NavigationMenu', () => {
  it('renders links inside a labelled navigation landmark', () => {
    render(
      <NavigationMenu
        items={[
          { key: 'home', label: 'Home', href: '/', active: true },
          { key: 'users', label: 'Users', href: '/users' },
        ]}
      />,
    );
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Users' })).not.toHaveAttribute('aria-current');
  });
});
