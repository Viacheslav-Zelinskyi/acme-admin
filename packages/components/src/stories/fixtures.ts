import type { UserSummary } from '../types/user';

/** Inline image so stories work offline */
export const sampleAvatar =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#93c5fd"/><circle cx="32" cy="26" r="12" fill="#1e3a8a"/><path d="M8 64c2-16 14-22 24-22s22 6 24 22z" fill="#1e3a8a"/></svg>',
  );

export const sampleUsers: UserSummary[] = [
  { id: '1', name: 'Ada Lovelace', email: 'ada@example.com', role: 'Engineer', status: 'active', avatarUrl: sampleAvatar },
  { id: '2', name: 'Alan Turing', email: 'alan@example.com', role: 'Researcher', status: 'away' },
  { id: '3', name: 'Grace Hopper', email: 'grace@example.com', role: 'Admiral', status: 'active' },
  { id: '4', name: 'Linus Torvalds', email: 'linus@example.com', role: 'Maintainer', status: 'inactive' },
  { id: '5', name: 'Margaret Hamilton', email: 'margaret@example.com', role: 'Lead', status: 'active' },
  { id: '6', name: 'Dennis Ritchie', email: 'dennis@example.com', role: 'Engineer', status: 'away' },
];
