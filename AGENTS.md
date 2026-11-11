# AGENTS.md

## Commands

- pnpm only (`packageManager` pins the version). There is no test suite; verification is `pnpm lint`, `pnpm exec tsc --noEmit`, and `pnpm build`.
- DB workflow: edit `src/lib/db/schema.ts` → `pnpm db:generate` → `pnpm db:migrate`. Migrations land in `./drizzle` and are applied manually — they are never run during a Vercel build.
- `pnpm commit` for Conventional Commits (commitizen); keep commit messages in that style.

## Environment

- `.env.local` is required: `DATABASE_URL`, `NEON_AUTH_BASE_URL`, `NEON_AUTH_COOKIE_SECRET` (see `.env.example`). `src/lib/db/index.ts` throws at import time if `DATABASE_URL` is unset, so nothing runs without it. drizzle-kit loads `.env.local` via dotenv in `drizzle.config.ts`.

## Next.js 16 specifics

- Middleware is `src/proxy.ts` (Next 16 renamed `middleware.ts` → `proxy.ts`). It chains next-intl locale routing with Neon Auth's `auth.middleware` (guarding `/dashboard*` only, per-locale). The matcher excludes `/api/`, `/r/`, `_next/`, and static files.
- `cacheComponents: true` in `next.config.ts`: uncached runtime data (session, DB) must be read inside `<Suspense>` or after `connection()`, or `next build` fails with a blocking-route error. `requireUser()` already calls `connection()` — keep it that way, and don't hoist session/DB reads above Suspense boundaries.
- The two Route Handlers (`src/app/r/[slug]/route.ts`, `src/app/api/auth/[...path]/route.ts`) render no UI: `loading.tsx`/`error.tsx` do not apply to them.

## i18n (next-intl)

- Locales: `en` (default, `localePrefix: "as-needed"` → URLs unprefixed) and `fa` (RTL). All pages live under `src/app/[locale]/` except the two route handlers above.
- UI strings are TS objects in `src/i18n/messages/{en,fa}.ts`, not JSON. Adding a locale touches `src/i18n/locales.ts`, a new messages file, and the `authProxies` map in `proxy.ts`.
- Use the helpers from `@/i18n/navigation` (Link, redirect, pathname) instead of `next/link` / `next/navigation` so locale prefixes stay correct.

## Architecture rules

- All DB access lives in `src/lib/db/`; never call the DB from React components. Feature code (actions, schemas, components) lives in `src/features/*`; shared UI in `src/components` (shadcn primitives in `ui/`, app-specific wrappers in `kit/`).
- Mutations are Server Actions only; validate every input with Zod (`src/features/*/schemas.ts`).
- Queries and actions return `{ data, error }` (`src/lib/result.ts`); log raw errors server-side and return generic messages to the client. Form actions surface Zod errors as field errors via `src/lib/form/field-errors.ts`.
- Call `requireUser()` (`src/lib/auth/session.ts`) in dashboard pages/actions even though `proxy.ts` already guards the route, and scope every query by `user.id`.
- Slugs are unique app-wide (one global namespace for `/r/<slug>`). Clicks are written to the `clicks` table and mirrored to `links.click_count` in one atomic batch — preserve that if touching click tracking.

## References

- `README.md` documents the architecture and design decisions in depth — consult it before restructuring.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
