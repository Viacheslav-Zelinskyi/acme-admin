import type { BadgeTone } from '../atoms/Badge';
import type { UserStatus } from '../types/user';

export const userStatusLabels: Record<UserStatus, string> = {
  active: 'Active',
  away: 'Away',
  inactive: 'Inactive',
};

export const userStatusTones: Record<UserStatus, BadgeTone> = {
  active: 'success',
  away: 'warning',
  inactive: 'neutral',
};
