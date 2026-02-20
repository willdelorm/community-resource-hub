# Community Resource Hub

A full-stack CMS platform that helps nonprofits and community organizations connect members with local services. Built to solve a real problem: small orgs often lack the budget and technical resources to maintain a living, searchable directory of resources and events.

**Live demo:** [community-resource-hub-five.vercel.app](https://community-resource-hub-five.vercel.app/)

> The demo admin account is read-only. Log in with the credentials shown on the sign-in page to explore the CMS without affecting live data.

---

## What It Does

**For community members** — browse a searchable, filterable directory of local services across categories like housing, employment, food, mental health, healthcare, legal aid, and more. View upcoming events, read announcements, and submit a resource or event through a contact form.

**For administrators** — a password-protected dashboard with full CRUD for resources, announcements, and events. Create and edit content through modal forms, and publish or unpublish entries without deleting them.

---

## Technical Highlights

### Next.js App Router + React Server Components

The app is structured around Next.js route groups — `(public)` for unauthenticated pages and `(admin)` for the CMS — each with its own layout. Data-fetching pages are React Server Components that query Supabase directly on the server, keeping the client bundle lean. Mutations go through Next.js Server Actions with `revalidatePath` calls to keep cached pages fresh.

### Supabase Auth + Middleware Route Protection

Admin routes are protected by Next.js middleware that checks for a valid Supabase session on every request and redirects unauthenticated users to `/signin`. The auth flow supports email/password sign-in and email-link password recovery, routed through a `/auth/callback` handler. Admin accounts are provisioned directly in the Supabase dashboard — there's no public registration.

### Typed Database Layer

All database interactions are centralized in `lib/supabase/queries.ts` and typed against a generated Supabase schema. Server and browser clients are separated (`server.ts` / `client.ts`), with a dedicated proxy client for middleware. Insert, update, and row types are explicit — no `any` escapes.

### Demo Mode

A demo account pattern lets anyone explore the admin dashboard without write access. Mutation server actions check the current user's email against a `DEMO_ACCOUNT_EMAIL` environment variable and return a descriptive error instead of writing to the database. The UI displays a visible indicator when in demo mode.

### Testing

| Layer | Tools | Coverage |
|---|---|---|
| Component | Vitest + React Testing Library | Rendering, interactions, form behavior |
| Unit | Vitest | Server actions and database query functions |
| E2E | Playwright | Auth redirect, dashboard CRUD flows |

Server actions and server components are tested at the E2E layer; client components are tested in isolation with mocked action boundaries.

---

## Tech Stack

| | |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| UI Components | [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) |
| Backend | Next.js Server Actions |
| Database & Auth | [Supabase](https://supabase.com/) (PostgreSQL) |
| Testing | [Vitest](https://vitest.dev/), [React Testing Library](https://testing-library.com/), [Playwright](https://playwright.dev/) |
| Deployment | [Vercel](https://vercel.com/) |

---

## Project Structure

```
community-resource-hub/
├── app/
│   ├── (public)/             # Public-facing pages (no auth required)
│   │   ├── page.tsx          # Homepage with announcements
│   │   ├── about/            # Story, team, and contact pages
│   │   ├── events/           # Events listing
│   │   ├── resources/        # Searchable resource directory
│   │   └── donate/           # Donation options
│   ├── (admin)/              # Admin route group (auth required)
│   │   ├── signin/           # Sign-in and password recovery
│   │   └── dashboard/        # CMS dashboard
│   │       ├── announcements/
│   │       ├── events/
│   │       └── resources/
│   ├── actions/
│   │   ├── auth.ts           # signIn, signOut, sendPasswordReset
│   │   └── content.ts        # CRUD for resources, announcements, events
│   └── auth/callback/        # Supabase email-link callback
├── components/
│   ├── dashboard/            # Admin UI (tables, modals, delete buttons)
│   └── ui/                   # shadcn UI primitives
├── lib/supabase/
│   ├── client.ts             # Browser Supabase client
│   ├── server.ts             # Server Supabase client
│   ├── proxy.ts              # Middleware session helper
│   ├── queries.ts            # Typed database query functions
│   └── types.ts              # Generated schema types
├── middleware.ts              # Route protection
└── tests/
    ├── components/           # RTL component tests
    ├── unit/                 # Vitest unit tests
    └── e2e/                  # Playwright E2E tests
```

---

## Running Locally

**Install dependencies:**

```bash
npm install
```

**Set up environment variables:**

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
```

**Start the development server:**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Run production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run component/unit tests (watch) |
| `npm run test:run` | Run component/unit tests (single pass) |
| `npm run test:ui` | Open Vitest browser UI |
| `npm run test:e2e` | Run Playwright E2E tests |
| `npm run test:e2e:ui` | Open Playwright interactive UI |
