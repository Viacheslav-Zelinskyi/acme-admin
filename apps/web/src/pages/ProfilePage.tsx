import { Text } from '@acme/components';
import { useAuth } from '../features/auth/useAuth';

export function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <section className="stack">
        <Text as="h1" variant="display">
          Profile
        </Text>
        <Text tone="muted">Please log in to view your profile.</Text>
      </section>
    );
  }

  return (
    <section className="stack">
      <Text as="h1" variant="display">
        Profile
      </Text>
      <div className="stack" style={{ maxWidth: '32rem' }}>
        <div>
          <Text as="p" tone="muted">Full name</Text>
          <Text>{user.name}</Text>
        </div>
        <div>
          <Text as="p" tone="muted">Email</Text>
          <Text>{user.email}</Text>
        </div>
        <div>
          <Text as="p" tone="muted">Role</Text>
          <Text>{user.role}</Text>
        </div>
      </div>
    </section>
  );
}
