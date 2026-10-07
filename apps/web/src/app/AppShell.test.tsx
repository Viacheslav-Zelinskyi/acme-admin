import { render, screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../features/auth/AuthContext';
import { AppShell } from './AppShell';

function renderAppShell() {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={['/home']}>
        <Routes>
          <Route path="/" element={<AppShell />}>
            <Route path="home" element={<div>Home page</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </AuthProvider>,
  );
}

describe('AppShell navigation', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('hides Users and Profile from the sidebar when logged out', () => {
    renderAppShell();

    const navigation = within(
      screen.getByRole('navigation', { name: 'Main navigation' }),
    );
    expect(navigation.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(navigation.getByRole('link', { name: 'About' })).toBeInTheDocument();
    expect(navigation.queryByRole('link', { name: 'Users' })).not.toBeInTheDocument();
    expect(navigation.queryByRole('link', { name: 'Profile' })).not.toBeInTheDocument();
  });

  it('shows Users but not Profile in the sidebar when logged in', () => {
    localStorage.setItem(
      'acme.auth.user',
      JSON.stringify({
        id: 'user-1',
        name: 'Alex',
        email: 'alex@example.com',
        role: 'Administrator',
      }),
    );
    renderAppShell();

    const navigation = within(
      screen.getByRole('navigation', { name: 'Main navigation' }),
    );
    expect(navigation.getByRole('link', { name: 'Users' })).toBeInTheDocument();
    expect(navigation.queryByRole('link', { name: 'Profile' })).not.toBeInTheDocument();
  });
});
