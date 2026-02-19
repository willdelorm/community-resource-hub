# Community Resource Hub

A lightweight CMS platform for small nonprofits and community groups to connect members with local services and resources.

Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Resource Directory** — Centralized listing of local services (housing, employment, food, mental health, etc.)
- **Events Calendar** — Community event listings and submissions
- **Contact & Submissions** — Form for community members to submit resources or events
- **Team & Story Pages** — About section with organization history and team profiles
- **Donation Page** — Links to PayPal, Venmo, and Ko-fi for community support
- **Responsive Design** — Mobile-first layout with a collapsible navigation menu
- **Admin Dashboard** — Password-protected CMS with full CRUD for resources, announcements, and events

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript 5](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- [Lucide React](https://lucide.dev/) for icons
- [Supabase](https://supabase.com/) for authentication and database

## Getting Started

**Install dependencies:**

```bash
npm install
```

**Set up environment variables:**

Copy `.env.example` to `.env.local` and fill in your Supabase project credentials:

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

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
community-resource-hub/
├── app/
│   ├── (public)/             # Public-facing pages (no auth required)
│   │   ├── page.tsx          # Homepage
│   │   ├── about/            # About, story, people, and contact pages
│   │   ├── events/           # Events listing
│   │   ├── resources/        # Resource directory
│   │   └── donate/           # Donation options
│   ├── (admin)/              # Admin route group (auth required)
│   │   ├── signin/           # Admin sign-in page
│   │   └── dashboard/        # CMS dashboard overview
│   │       ├── announcements/ # Announcements management page
│   │       ├── events/        # Events management page
│   │       └── resources/     # Resources management page
│   ├── actions/
│   │   ├── auth.ts           # Server actions: signIn, signOut, sendPasswordReset
│   │   └── content.ts        # Server actions: CRUD for resources, announcements, events
│   └── auth/
│       └── callback/         # Supabase auth callback (email links)
├── components/               # Shared React components
│   ├── LoginForm.tsx
│   ├── RecoveryForm.tsx
│   ├── SignInCard.tsx
│   ├── LogoutButton.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── dashboard/            # Admin dashboard components
│   │   ├── DashboardTable.tsx
│   │   ├── DeleteButton.tsx
│   │   ├── NewResourceModal.tsx
│   │   ├── EditResourceModal.tsx
│   │   ├── NewAnnouncementModal.tsx
│   │   ├── EditAnnouncementModal.tsx
│   │   ├── NewEventModal.tsx
│   │   └── EditEventModal.tsx
│   └── ui/                   # shadcn UI primitives
├── lib/
│   ├── supabase/
│   │   ├── client.ts         # Browser Supabase client
│   │   ├── server.ts         # Server Supabase client
│   │   ├── proxy.ts          # Middleware session helper
│   │   ├── queries.ts        # Database CRUD functions
│   │   └── types.ts          # Database row/insert/update types
│   └── utils.ts
├── middleware.ts              # Route protection (redirects /dashboard → /signin)
└── tests/
    ├── setup.ts              # jest-dom global matchers
    ├── components/           # React Testing Library component tests
    ├── unit/                 # Vitest unit tests (actions, queries)
    └── e2e/                  # Playwright end-to-end tests
```

## Authentication

Admin pages are protected by Supabase Auth via Next.js middleware. The flow:

1. Unauthenticated requests to `/dashboard` are redirected to `/signin`
2. The sign-in form calls `signInWithPassword` and redirects to `/dashboard` on success
3. Email recovery links route through `/auth/callback` before landing on the dashboard
4. The Sign Out button in the admin header ends the session and redirects to `/signin`

Admin accounts are managed directly in the Supabase dashboard — there is no public sign-up.

## Testing

The project uses [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/) for unit/component tests, and [Playwright](https://playwright.dev/) for end-to-end tests.

**Run component/unit tests:**

```bash
npm test            # watch mode
npm run test:run    # single run
npm run test:ui     # browser UI
```

**Run E2E tests** (requires a running dev server, or Playwright will start one automatically):

```bash
npm run test:e2e        # headless
npm run test:e2e:ui     # interactive UI
```

**Test layout:**

| Path | Framework | What it covers |
|---|---|---|
| `tests/components/` | Vitest + RTL | Client component rendering and interactions |
| `tests/unit/` | Vitest | Database queries and server actions |
| `tests/e2e/` | Playwright | Full page flows (auth redirect, dashboard CRUD, etc.) |

Server components and server actions are best covered by E2E tests. Mock them at the boundary in component tests using `vi.mock`.

## Available Scripts

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

## Roadmap

- [x] Events calendar integration
- [x] Searchable/filterable resource table
- [x] Contact form backend (email or database)
- [x] Admin sign-in and CMS editing interface
- [x] Full CRUD for resources, announcements, and events
- [x] Supabase database schema and typed query layer
- [x] Supabase authentication
- [x] Unit and E2E test suite
