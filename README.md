# Short Link Manager

A small, production-minded short link app. Sign up, create short links, share `/r/<slug>`, and watch the clicks come in.

**Live demo:** https://short-link-manager-az.vercel.app/

**Repository:** https://github.com/AZCPCF/short-link-manager

## Features

- Email + password auth (Neon Auth), protected `/dashboard`
- Create links with a long URL, optional custom slug and optional title; a random 6-character slug is generated when none is given
- Dashboard with copy-to-clipboard, delete with confirmation dialog, and an empty state
- `/r/[slug]` redirects with `307` and counts the click; unknown slugs end up on a styled 404 page
- Link detail page with a clicks-per-day chart for the last 7 days
- Responsive layout, dark mode, skeleton loading states, toast notifications

## Stack

Next.js 16 (App Router, TypeScript strict) · Tailwind CSS v4 + shadcn/ui · Drizzle ORM + Neon Postgres · Neon Auth · Zod · Recharts · next-themes · sonner · pnpm · Vercel

## Getting started

**Prerequisites:** Node.js 20.9+, pnpm, and a free [Neon](https://neon.com) project with Auth enabled.

```bash
pnpm install
cp .env.example .env.local
```

Fill in `.env.local`:

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | Neon Postgres connection string |
| `NEON_AUTH_BASE_URL` | Auth URL from the Neon console (Project → Branch → Auth → Configuration) |
| `NEON_AUTH_COOKIE_SECRET` | Random secret, e.g. `openssl rand -base64 32` |

Apply the migrations and start the dev server:

```bash
pnpm db:migrate
pnpm dev
```

Open http://localhost:3000.

### Scripts

| Script | Purpose |
| --- | --- |
| `pnpm dev` | Start the dev server |
| `pnpm build` / `pnpm start` | Production build and server |
| `pnpm lint` | ESLint |
| `pnpm db:generate` | Generate a migration from `schema.ts` |
| `pnpm db:migrate` | Apply migrations to `DATABASE_URL` |
| `pnpm db:studio` | Open Drizzle Studio |
| `pnpm commit` | Commitizen prompt for Conventional Commits |

Migrations are applied manually and are not part of the Vercel build.

## Deployment

The app is deployed on Vercel from `main`. To deploy your own copy, set `DATABASE_URL`, `NEON_AUTH_BASE_URL` and `NEON_AUTH_COOKIE_SECRET` in the Vercel project settings (preferably with a different cookie secret than local), run `pnpm db:migrate` against the production database, and redeploy.

## Architecture

- **UI:** Server Components by default. Client components are limited to forms, dialogs, the theme toggle, the copy button and the chart.
- **Mutations:** Server Actions only. Every input is validated with Zod on the server.
- **Data:** all database access lives in `src/lib/db/`. No DB calls inside React components.
- **Errors:** queries and actions return `{ data, error }`. Raw database and auth errors are logged on the server and never sent to the client.
- **Auth:** `proxy.ts` redirects unauthenticated users away from `/dashboard`, and `requireUser()` checks the session again in pages and actions. Every query is scoped by the session's user id.
- **Structure:** feature code (actions, schemas, components) lives in `src/features/*`. Shared infrastructure lives in `src/lib` and shared UI in `src/components`.

### Project structure

```text
src
├── app                        routes, layouts, loading and error boundaries
│   ├── (auth)                 login and signup pages
│   ├── api/auth               Neon Auth SDK handler
│   ├── dashboard              links list and links/[id] detail page
│   ├── r/[slug]/route.ts      redirect and click tracking
│   └── not-found.tsx          styled 404 page
├── components                 shared UI (shadcn primitives in ui/)
├── features
│   ├── auth                   actions, schemas, login and signup forms
│   └── links
│       ├── actions.ts         create and delete Server Actions
│       ├── schemas.ts         Zod schemas
│       ├── slug.ts            random slug generator
│       ├── chart.ts           7-day click series helper
│       └── components
│           ├── create/        create link dialog and form
│           ├── list/          links list, table, skeleton, empty state
│           ├── detail/        link detail, skeleton, clicks chart
│           └── buttons/       copy and delete buttons
├── lib
│   ├── auth                   Neon Auth server instance, requireUser()
│   ├── db                     Drizzle client, schema, queries
│   ├── form                   form helpers
│   └── result.ts              { data, error } result type
└── proxy.ts                   protects /dashboard
```

## Decisions I made

The brief asked not to ask questions, so these are the ambiguities I resolved myself.

1. **Slugs are unique across the whole app, not per user.** `/r/[slug]` is a single global namespace, so per-user uniqueness would make two users collide.
2. **`/r/[slug]` is a Route Handler.** It validates the slug with Zod, records the click and answers with a `307` to the destination. A database failure returns a plain `500` response with a generic message.
3. **Unknown or malformed slugs redirect to `/link-not-found`.** That path is intentionally not a route, so Next.js renders the app's styled 404 page. The trade-off is that the first response is a `307` and the URL changes.
4. **Two Route Handlers exist:** `/api/auth/[...path]`, which the Neon Auth SDK requires, and `/r/[slug]`, which renders no UI. All application mutations are Server Actions. Because Route Handlers have no React tree, `loading.tsx` and `error.tsx` do not apply to them.
5. **Clicks are stored in a `clicks` table** (needed for the 7-day chart) and mirrored in `links.click_count` for fast listing. Both are updated in one atomic batch.
6. **Chart dates use UTC**, and days without clicks are filled with zero.
7. **Session reads happen inside `<Suspense>`.** Next.js 16 rejects uncached runtime data outside Suspense during prerendering.
8. **Random slugs** are 6 lowercase alphanumeric characters from `crypto.randomInt`, retried up to 5 times on collision.
9. **Feature folders.** Code is grouped by feature instead of by file type, so everything about links lives in `src/features/links`.
10. **Conventional Commits** via Commitizen to keep the history readable.

## How I used AI tools

I used Claude in the chat interface to plan the work step by step, generate most of the code (schema, queries, actions, forms, UI) and debug errors. I decided the architecture and structure, including the feature-based folder layout, reviewed every diff, and tested each step by hand. I ran `tsc`, `lint` and `build` regularly.

What worked well: small steps with one commit each, and pasting real error output back in for quick fixes.

Where AI tripped me up:

- It suggested a `.gitignore` rule that also ignored `.env.example`.
- Its Neon Auth setup came from docs that had changed names between versions, so I had to check the current docs.
- Reading the session at the top of a page broke the Next.js 16 build with a "blocking route" error. The fix was moving it inside `<Suspense>`.
- Its first design for `/r/[slug]` was a Server Component page; the final version is a Route Handler.
- Unused shadcn components such as `form` were added early, so I removed them later.

## Known limitations

- Every request to `/r/[slug]` counts as a click, including bots and link-preview fetchers. There is no deduplication.
- No link editing, since the brief did not ask for it.
- No automated tests. I verified the flow manually: sign up, create a link, open the short URL, see the count increase.
- The Neon free tier can add latency on the first request after idle time.
