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
├── components/       Shared UI and authentication screens
├── routes/           Recipe and dashboard route views
├── store/            Redux store and feature slices
├── utils/            API requests, hooks, types, and helpers
├── App.tsx           Public landing page
├── App.css           Landing-page design system and responsive styles
└── main.tsx          App providers and route configuration
```
