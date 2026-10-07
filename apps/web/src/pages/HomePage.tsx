import { Text } from '@acme/components';

export function HomePage() {
  return (
    <section className="stack">
      <Text as="h1" variant="display">
        Welcome to the application
      </Text>
      <Text tone="muted">
        Manage your users, explore the application, and use the navigation menu to review reports,
        account details, and company information.
      </Text>
      <div className="stack" style={{ maxWidth: '36rem' }}>
        <Text as="h2" variant="title">
          Quick overview
        </Text>
        <Text tone="muted">• Users directory with search, filtering, and pagination</Text>
        <Text tone="muted">• Shared component library built using Atomic Design</Text>
        <Text tone="muted">• Mock auth state and responsive application shell</Text>
      </div>
    </section>
  );
}
