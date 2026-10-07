export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
  status?: 'active' | 'away' | 'inactive';
}

const STORAGE_KEY = 'acme.auth.user';
const MOCK_API_DELAY_MS = 600;

function simulateApiRequest(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, MOCK_API_DELAY_MS));
}

function isAuthUser(value: unknown): value is AuthUser {
  if (typeof value !== 'object' || value === null) return false;

  const user = value as Partial<AuthUser>;
  return (
    typeof user.id === 'string' &&
    typeof user.name === 'string' &&
    typeof user.email === 'string' &&
    typeof user.role === 'string' &&
    (user.avatarUrl === undefined || typeof user.avatarUrl === 'string') &&
    (user.status === undefined ||
      user.status === 'active' ||
      user.status === 'away' ||
      user.status === 'inactive')
  );
}

function createUser(email: string, name: string): AuthUser {
  const normalizedEmail = email.trim().toLowerCase();

  return {
    id: `user-${normalizedEmail.replace(/[^a-z0-9]+/g, '-')}`,
    name,
    email: normalizedEmail,
    role: 'Administrator',
    avatarUrl: '/avatars/current-user.svg',
    status: 'active',
  };
}

function saveUser(user: AuthUser): AuthUser {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return user;
}

export async function login(email: string, password: string): Promise<AuthUser> {
  void password;
  await simulateApiRequest();
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail) throw new Error('Email is required');

  const name = normalizedEmail
    .split('@')[0]
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(' ') || 'User';

  return saveUser(createUser(normalizedEmail, name));
}

export async function register(
  name: string,
  email: string,
  password: string,
): Promise<AuthUser> {
  void password;
  await simulateApiRequest();
  const trimmedName = name.trim();
  const normalizedEmail = email.trim().toLowerCase();
  if (!trimmedName) throw new Error('Name is required');
  if (!normalizedEmail) throw new Error('Email is required');

  return saveUser(createUser(normalizedEmail, trimmedName));
}

export function logout(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function getStoredUser(): AuthUser | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const stored: unknown = JSON.parse(raw);
    if (isAuthUser(stored)) return stored;

    localStorage.removeItem(STORAGE_KEY);
    return null;
  } catch (error) {
    if (!(error instanceof SyntaxError)) throw error;

    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}
