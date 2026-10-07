/** Presence/account status; purely a visual concern for the UI library */
export type UserStatus = 'active' | 'away' | 'inactive';

/**
 * Minimal user shape the components need. It is intentionally decoupled from any
 * API model: the host application maps its own data to this shape.
 */
export interface UserSummary {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role?: string;
  status?: UserStatus;
}
