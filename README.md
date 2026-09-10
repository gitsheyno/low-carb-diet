# Plateful Client

Plateful is a personal nutrition and meal-planning product. It helps people understand their daily nutrition targets, track meals and progress, discover recipes, and build a practical routine around their own goals.

This directory contains the React client. The API lives separately in `server/low-carb-server`.

## Product experience

- Product landing page with links to account creation and login
- Account registration and authentication
- Personalized nutrition targets and daily progress
- Meal logging and meal planning
- Recipe search and recipe details
- User profile and nutrition preferences
- Responsive layouts for mobile, tablet, and desktop

## Routes

| Route                         | Purpose                           |
| ----------------------------- | --------------------------------- |
| `/`                           | Public product landing page       |
| `/signup`                     | Create an account                 |
| `/signin`                     | Legacy alias for account creation |
| `/login`                      | Log in to an existing account     |
| `/dashboard/:user`            | Nutrition dashboard               |
| `/dashboard/:user/planning`   | Meal planner                      |
| `/dashboard/:user/recipes`    | Recipe discovery                  |
| `/dashboard/:user/recipe/:id` | Recipe details                    |
| `/dashboard/:user/profile`    | User profile                      |

## Technology

- React 19 and TypeScript
- Vite with the standard React plugin
- React Router 8
- TanStack Query
- Redux Toolkit
- Tailwind CSS and Material UI
- Recharts
- Zod

## Getting started

Requirements:

- Node.js 22.22 or newer
- npm

Install dependencies and start the local client:

```bash
npm install
npm run dev
```

## Available commands

| Command                | Description                                    |
| ---------------------- | ---------------------------------------------- |
| `npm run dev`          | Start the Vite development server on port 3001 |
| `npm run build`        | Type-check and create a production build       |
| `npm run preview`      | Preview the production build locally           |
| `npm run typecheck`    | Run TypeScript without emitting files          |
| `npm run lint`         | Run ESLint with zero warnings allowed          |
| `npm run format`       | Format source files with Prettier              |
| `npm run format:check` | Check source formatting                        |

## Bundle analysis

Production builds generate `bundle-analyzer-report.html` using Rollup Visualizer. Open that report locally to inspect bundle composition and identify large dependencies. The generated report is intentionally ignored by Git.

## Project structure

```text
src/
├── app/              Application wiring: routes, layouts, and Redux store
├── features/         Product capabilities, organized by feature
│   ├── auth/         Authentication API and screens
│   ├── dashboard/    Daily nutrition dashboard
│   ├── landing/      Public landing page
│   ├── meal-planning/ Meal search, selection, persistence, and Redux state
│   ├── profile/      Profile form and API operations
│   └── recipes/      Recipe search, details, types, and screens
├── shared/           Reusable UI and hooks with no feature ownership
├── styles/           Global product and landing-page styles
└── main.tsx          Browser and TanStack Query providers
```

## Architecture

The client uses a feature-based architecture. A feature owns the code needed
for one product capability, including its pages, UI components, API functions,
state, and types. This keeps code that changes together close together.

Dependencies should generally point in this direction:

```text
main -> app -> features -> shared
```

- `app` composes features and owns application-wide wiring.
- A feature may import from `shared` and from its own folders.
- Features should not reach into another feature's internal components, API,
  or state. Promote truly reusable code to `shared` or expose an intentional
  feature entry point if cross-feature collaboration becomes necessary.
- `shared` must not import from `features` or `app`.

This is not a full Domain-Driven Design architecture. Domain types and rules
can live inside their owning feature until the business model becomes complex
enough to warrant framework-independent domain and application layers.
