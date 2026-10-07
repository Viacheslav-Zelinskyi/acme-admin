import { Text } from '@acme/components';

export function AboutPage() {
  return (
    <section className="stack">
      <Text as="h1" variant="display">
        About
      </Text>
      <Text tone="muted">
        This application demonstrates a clean React + TypeScript monorepo built around Atomic Design.
        The shared package remains presentational and reusable, while app-specific services, routing,
        and state live in the web project.
      </Text>
      <div className="stack" style={{ maxWidth: '32rem' }}>
        <Text as="h2" variant="title">
          Included patterns
        </Text>
        <Text tone="muted">•Atomic Design atoms, molecules, organisms</Text>
        <Text tone="muted">•Client-side routing with React Router</Text>
        <Text tone="muted">•Mock user service with paginated data</Text>
        <Text tone="muted">•Responsive application shell and navigation</Text>
      </div>
    </section>
  );
}
