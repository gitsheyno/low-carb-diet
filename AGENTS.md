# AGENTS.md

This file applies to the entire `low-carb-diet` repository.

Repository-level Codex defaults live in `.codex/config.toml`. Keep credentials,
provider configuration, telemetry, notifications, and personal preferences out
of that file; those belong in each developer's user-level Codex configuration.

## Repository overview

Plateful is a React 19 and TypeScript single-page application built with Vite.
It talks directly to the deployed API at
`https://low-carb-server.onrender.com`; the API origin is currently hard-coded
in the feature API modules and `RemoteImage`.

## Before changing code

- Read the owning feature before editing shared code.
- Preserve unrelated working-tree changes.
- Prefer focused changes; do not reorganize features as part of an unrelated
  fix.
- Use the existing package manager and lockfile: npm and `package-lock.json`.
- Node.js 22.22.0 is the repository version (`.nvmrc`).

## Commands

```bash
npm install          # install dependencies
npm run dev          # Vite development server on port 3001
npm run typecheck    # TypeScript check without output
npm run lint         # ESLint; warnings fail the command
npm run format:check # check source formatting
npm run build        # type-check and build dist/
```

There is currently no automated test suite or `npm test` script. For code
changes, run `npm run typecheck` and `npm run lint` at minimum. Run
`npm run build` when routing, build configuration, dependencies, or production
behavior changes. The Vite visualizer generates `bundle-analyzer-report.html`
during a production build and is configured to open it.

## Code organization

- `src/app`: application routing, protected layout, navigation, and Redux store
- `src/features`: feature-owned UI, API functions, state, and types
- `src/shared`: reusable components, hooks, UI primitives, and the shared
  authenticated fetch wrapper
- `src/styles`: global, landing, and product CSS
- `src/main.tsx`: React root and application-wide providers

Keep feature-specific code inside its feature. Put code in `shared` only when
it has no single feature owner. Application wiring belongs in `app`.

## State and data fetching

- TanStack Query owns remote/server state and mutations.
- Redux Toolkit currently owns only the in-progress meal-plan selection.
- `AuthContext` owns the in-memory authenticated user and profile-completion
  status.
- Local component state owns transient form and presentation state.

Do not duplicate server data into Redux without a concrete requirement. Use
stable, feature-scoped TanStack Query keys and invalidate or clear affected
queries after mutations when needed.

## Authentication and API rules

- Authentication uses an HttpOnly session cookie; never store session tokens
  in local storage, session storage, Redux, or source code.
- Protected requests must use `src/shared/api/apiFetch.ts`. It always sends
  `credentials: "include"` and reports a `401` to `AuthContext`.
- A protected-request `401` clears the TanStack Query cache and local auth
  state. `DashboardLayout` then redirects to `/login`.
- Login and signup currently use direct `fetch` calls because an expected auth
  failure must not be treated like an expired authenticated session. They must
  still use `credentials: "include"`.
- A `403` means the user is authenticated but forbidden; do not treat it as a
  logout.
- Cross-tab logout is not instantaneous. Another tab learns that its session
  is stale on its next protected request (often a query refetch on focus).
- Keep backend response-shape normalization inside API modules rather than UI
  components.

When adding API calls, account for the deployed server's CORS and cookie
requirements. If API configurability is introduced, centralize the base URL
instead of adding another hard-coded copy.

## Routing and UI conventions

- Routes are declared in `src/app/AppRouter.tsx`.
- Dashboard pages are protected by `DashboardLayout`; keep new private routes
  beneath `/dashboard`.
- Generate dynamic path values with `encodeURIComponent`.
- The currently implemented recipe-list route uses `/Recipes` with an uppercase
  `R`; preserve that spelling unless all declarations and links are migrated
  together.
- Reuse the existing loading, error, empty-state, and responsive layout
  patterns before introducing new ones.
- Maintain accessible labels, keyboard behavior, semantic controls, and visible
  form errors.

## Style and quality

- TypeScript strict mode is enabled. Avoid `any`; narrow unknown API data at
  boundaries where practical.
- Follow the repository's Prettier configuration (double quotes).
- Remove debug logging and stale commented-out code in touched areas.
- Keep user-facing errors useful without exposing credentials, cookies, or raw
  server internals.
- Do not edit generated output in `dist/` or
  `bundle-analyzer-report.html` directly.
