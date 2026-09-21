# Plateful Client

Plateful is a responsive nutrition and meal-planning web app. Users can create
an account, calculate personal nutrition targets, track daily meals, search for
recipes, and assemble a meal plan.

This repository contains the React client only. It currently connects to the
deployed API at `https://low-carb-server.onrender.com`.

## What is implemented

- Public landing page
- Account registration, login, logout, and protected dashboard routes
- Personal profile and nutrition-goal setup
- Daily calorie and macronutrient progress
- Meal search, selection, and meal-plan saving
- Recipe search and recipe details
- Responsive desktop, tablet, and mobile layouts

## Requirements

- Node.js 22.22.0 or newer (`.nvmrc` contains the expected version)
- npm
- Network access to the deployed API

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed by Vite. The development server is configured for port
`3001`.

There is no local API environment variable at present. API modules call the
deployed Render service directly, so authentication and private features depend
on that service being available and allowing credentialed requests from the
client origin.

## Commands

| Command                | Purpose                                                |
| ---------------------- | ------------------------------------------------------ |
| `npm run dev`          | Start the Vite development server on port 3001         |
| `npm run typecheck`    | Run TypeScript without emitting files                  |
| `npm run lint`         | Run ESLint and fail on warnings                        |
| `npm run format`       | Format source files with Prettier                      |
| `npm run format:check` | Check source formatting                                |
| `npm run build`        | Type-check and create the production bundle in `dist/` |
| `npm run preview`      | Serve the production bundle locally                    |

The project does not currently have an automated test suite or an `npm test`
script.

Production builds generate `bundle-analyzer-report.html`. The Vite visualizer
is currently configured to open that report automatically.

## Routes

| Route                         | Access  | Purpose                              |
| ----------------------------- | ------- | ------------------------------------ |
| `/`                           | Public  | Product landing page                 |
| `/signup`                     | Public  | Create an account                    |
| `/login`                      | Public  | Log in                               |
| `/signin`                     | Public  | Legacy redirect to `/login`          |
| `/dashboard/:user`            | Private | Daily nutrition dashboard            |
| `/dashboard/:user/planning`   | Private | Search, assemble, and save meal plan |
| `/dashboard/:user/Recipes`    | Private | Recipe search                        |
| `/dashboard/:user/recipe/:id` | Private | Recipe details                       |
| `/dashboard/:user/profile`    | Private | Profile and nutrition preferences    |

The uppercase `R` in `/Recipes` matches the current route and navigation code.

## Authentication and stale sessions

Authentication is server-session based. The API sets an HttpOnly cookie, and
the browser attaches it to requests because the client sends
`credentials: "include"`. JavaScript does not read or persist the cookie.

At application startup, `AuthProvider` requests the current session. Private
routes show a loading state during that check and redirect anonymous users to
`/login`.

Protected API calls go through `src/shared/api/apiFetch.ts`. When the server
returns `401`, the client:

1. clears the TanStack Query cache;
2. removes the authenticated user from `AuthContext`; and
3. lets the protected dashboard layout redirect to `/login`.

Cookies are shared by tabs, but React state is not. If a user logs out in one
tab, another open tab may still look authenticated until it makes a protected
request. TanStack Query's normal refetch-on-focus behavior often triggers that
check when the user returns to the tab. There is currently no `BroadcastChannel`
or storage-event implementation for immediate cross-tab logout.

## Architecture

The source is organized by product feature:

```text
src/
├── app/
│   ├── AppRouter.tsx          Route declarations
│   ├── components/            Application navigation
│   ├── layouts/               Protected dashboard shell
│   └── store.ts               Redux store configuration
├── features/
│   ├── auth/                  Session API, context, login, and signup
│   ├── dashboard/             Daily meals and nutrition progress
│   ├── landing/               Public landing page
│   ├── meal-planning/         Search, selection, saving, and Redux slice
│   ├── profile/               Profile loading and editing
│   └── recipes/               Recipe search and detail views
├── shared/
│   ├── api/apiFetch.ts        Credentialed fetch and global 401 handling
│   ├── components/            Reusable application components
│   ├── hooks/                 Reusable hooks
│   └── ui/                    Small UI primitives
├── styles/                    Global, landing, and product styles
└── main.tsx                   Router, Query Client, and Auth providers
```

State ownership is intentionally split by responsibility:

- TanStack Query manages API-backed server state and mutations.
- Redux Toolkit manages the temporary meal-plan selection.
- `AuthContext` manages the current user, session status, and whether the
  nutrition profile is configured.
- Components manage transient form and presentation state.

## API integration

The API base URL is currently repeated in the feature API modules rather than
read from an environment variable. Important endpoints used by the client
include:

| Method  | Endpoint                 | Client feature          |
| ------- | ------------------------ | ----------------------- |
| `POST`  | `/signin`                | Registration            |
| `POST`  | `/login`                 | Login                   |
| `POST`  | `/logout`                | Logout                  |
| `GET`   | `/api/dashboard/meals`   | Session and daily meals |
| `POST`  | `/api/dashboard/meals`   | Save meal plan          |
| `PATCH` | `/api/dashboard/profile` | Save profile            |
| `POST`  | `/api/dashboard/:user`   | Load profile            |
| `POST`  | `/api/dashboard/planing` | Search meals            |
| `POST`  | `/api/recipes/:query`    | Search recipes          |
| `GET`   | `/api/recipe/:id`        | Recipe details          |

`/api/dashboard/planing` is spelled with one `n` because that is the endpoint
currently called by the application.

All authenticated endpoints should use the shared `apiFetch` wrapper. Login
and signup use direct `fetch` calls so expected invalid-credential responses do
not trigger the global expired-session handler.

## Deployment

`vercel.json` rewrites all paths to `index.html`, allowing React Router routes
to load directly in a Vercel deployment. The production client is otherwise a
static Vite build from `dist/`.

## Contributing

Repository-specific guidance for coding agents and contributors is in
[`AGENTS.md`](./AGENTS.md). Shared Codex defaults are defined in
[`config.toml`](./.codex/config.toml); Codex loads project configuration only
after the repository has been trusted. Personal authentication and provider
settings are not stored in this repository.

Before opening a change, run:

```bash
npm run typecheck
npm run lint
npm run format:check
```
