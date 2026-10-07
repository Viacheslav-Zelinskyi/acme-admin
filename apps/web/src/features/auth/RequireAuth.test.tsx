import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { RequireAuth } from './RequireAuth';

describe('RequireAuth', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('redirects unauthenticated users to the login page', () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/users']}>
          <Routes>
            <Route
              path="/users"
              element={
                <RequireAuth>
                  <div>Protected resource</div>
                </RequireAuth>
              }
            />
            <Route path="/login" element={<div>Login page</div>} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>,
    );

    expect(screen.getByText('Login page')).toBeInTheDocument();
    expect(screen.queryByText('Protected resource')).not.toBeInTheDocument();
  });

  it('allows authenticated users to access the protected resource', () => {
    localStorage.setItem(
      'acme.auth.user',
      JSON.stringify({
        id: 'user-1',
        name: 'Alex',
        email: 'alex@example.com',
        role: 'Administrator',
      }),
    );

    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/users']}>
          <Routes>
            <Route
              path="/users"
              element={
                <RequireAuth>
                  <div>Protected resource</div>
                </RequireAuth>
              }
            />
            <Route path="/login" element={<div>Login page</div>} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>,
    );

    expect(screen.getByText('Protected resource')).toBeInTheDocument();
    expect(screen.queryByText('Login page')).not.toBeInTheDocument();
  });
});
