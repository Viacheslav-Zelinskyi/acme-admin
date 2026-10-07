# Atomic Design Monorepo (Rush + pnpm)

```
apps/web               Main application (routing, pages, state, services)
packages/components    Presentational UI library (atoms / molecules / organisms)
```

## Getting started

```bash
npm i -g @microsoft/rush pnpm
rush update          # install dependencies
rush build           # build components, then web
rush lint
rush test
```

Per project:

```bash
cd packages/components && pnpm storybook   # component playground
cd apps/web && pnpm dev                    # run the app
```

## Architecture rules

- `packages/components` is purely presentational: data and callbacks come via props.
- No routing, API calls, auth, or business logic there. ESLint enforces the
  most obvious violations (`no-restricted-imports`).
- Anything application-specific lives in `apps/web`.
- Dependency direction: `apps/web` -> `packages/components`, never the reverse.

## Mock authentication

The web app provides `/login` and `/register` screens backed by a local mock
service. Both simulate an API delay and accept any non-empty password; account
credentials are not verified against a server.
