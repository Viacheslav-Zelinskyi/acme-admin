import { getStoredUser, login, logout, register } from './authService';

describe('mock authService', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('logs in with any password after simulating an API delay', async () => {
    const request = login('alex@example.com', 'not-the-real-password');

    expect(localStorage.getItem('acme.auth.user')).toBeNull();
    await vi.advanceTimersByTimeAsync(600);

    await expect(request).resolves.toMatchObject({
      name: 'Alex',
      email: 'alex@example.com',
    });
    expect(localStorage.getItem('acme.auth.user')).not.toBeNull();
  });

  it('registers the supplied user after simulating an API delay', async () => {
    const request = register('Sam Example', 'sam@example.com', 'weak');

    await vi.advanceTimersByTimeAsync(600);

    await expect(request).resolves.toMatchObject({
      name: 'Sam Example',
      email: 'sam@example.com',
    });
  });

  it('does not consider a missing stored user authenticated', () => {
    expect(getStoredUser()).toBeNull();
  });

  it('restores a valid stored user and clears it on logout', async () => {
    const request = login('alex@example.com', 'password');
    await vi.advanceTimersByTimeAsync(600);
    const user = await request;

    expect(getStoredUser()).toEqual(user);

    logout();
    expect(getStoredUser()).toBeNull();
  });

  it('rejects invalid stored authentication data', () => {
    localStorage.setItem('acme.auth.user', JSON.stringify({ name: 'Guest' }));

    expect(getStoredUser()).toBeNull();
    expect(localStorage.getItem('acme.auth.user')).toBeNull();
  });
});
