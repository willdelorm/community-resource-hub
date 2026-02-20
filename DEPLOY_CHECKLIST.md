# Pre-Deployment Checklist

Walk through each section before going live. Check off items as you complete them.

---

## 1. Code Quality

- [x] `npm run lint` — passes with no errors
- [x] `npm run build` — production build compiles successfully with no TypeScript errors
- [x] `npm run test:run` — all Vitest unit and component tests pass
- [x] `npm run test:e2e` — all Playwright end-to-end tests pass

---

## 2. Environment Variables

Set these in your hosting platform (Vercel → Project Settings → Environment Variables):

- [x] `NEXT_PUBLIC_SUPABASE_URL` — production Supabase project URL
- [x] `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` — production publishable (anon) key
- [x] `DEMO_ACCOUNT_EMAIL` — set to your demo user's email (or omit to hide demo login)
- [x] `DEMO_ACCOUNT_PASSWORD` — set to the demo user's password (or omit to hide demo login)
- [x] Confirm `.env.local` is in `.gitignore` and **not** committed to the repo

---

## 3. Supabase — Production Project

- [x] You are pointing to your **production** Supabase project, not a dev/staging one
- [x] All four tables exist: `resources`, `events`, `announcements`, `contact_submissions`
- [x] Row Level Security (RLS) is enabled on all tables
  - Public read allowed on `resources`, `events`, `announcements`
  - Public insert allowed on `contact_submissions` (contact form)
  - Write operations (insert/update/delete) on managed tables require authentication
- [x] Auth → Email confirmations are configured to your preference
- [x] Auth → Site URL is set to your production domain (e.g. `https://yourdomain.org`)
- [x] Auth → Redirect URLs includes your production domain's `/auth/callback` route
- [x] (Optional) Seed the database with initial resources, events, and announcements so the site isn't empty on launch

---

## 4. Demo Account

- [x] A demo user exists in Supabase Auth with the credentials set in your env vars
- [x] Confirm the demo account can log in at `/signin` with the displayed credentials
- [x] Confirm the demo account **cannot** create, edit, or delete any content (read-only)

---

## 5. Admin Account

- [ ] Your real admin account exists in Supabase Auth
- [ ] You can log in at `/signin` with your admin credentials
- [ ] You can create, edit, and delete resources, events, and announcements from `/dashboard`
- [ ] Password reset flow works (sends email, link routes through `/auth/callback`)

---

## 6. Public Pages — Content Review

Walk through each public page and verify content and links:

- [ ] **Homepage** (`/`) — headline, description, and calls-to-action are accurate
- [ ] **Resources** (`/resources`) — directory is populated and categories filter correctly
- [ ] **Events** (`/events`) — events display correctly; past events aren't cluttering the view
- [ ] **About** (`/about`) — org description is accurate
- [ ] **Our Story** (`/about/story`) — content is current
- [ ] **Our People** (`/about/people`) — team info is up to date
- [ ] **Contact** (`/about/contact`) — contact form submits successfully; submission appears in dashboard
- [ ] **Donate** (`/donate`) — donation links (external URLs) are correct and working
- [ ] All navigation links work and point to correct routes
- [ ] No placeholder text (e.g. "Lorem ipsum", "Your organization name") remains

---

## 7. Hosting Platform (Vercel)

- [x] Project is connected to your GitHub repo
- [x] Production branch is set to `main`
- [x] All environment variables from Section 2 are added for the **Production** environment
- [x] Build command is `npm run build` (Vercel default — should auto-detect Next.js)
- [o] Custom domain is configured (if applicable)
- [x] SSL certificate is active (Vercel provisions this automatically)

---

## 8. Post-Deployment Smoke Test

After deploying, verify these on the live URL:

- [ ] Homepage loads without errors
- [ ] Resources page loads and displays data from Supabase
- [ ] Events page loads and displays data from Supabase
- [ ] Contact form submits and you can see the submission in the dashboard
- [ ] `/signin` loads; demo login works (if configured)
- [ ] `/signin` loads; admin login works and redirects to `/dashboard`
- [ ] Dashboard CRUD: create a test resource, edit it, then delete it
- [ ] Sign out works and redirects to `/signin`
- [ ] Attempting to access `/dashboard` while signed out redirects to `/signin`
- [ ] No console errors in browser DevTools on key pages

---

## 9. Optional but Recommended

- [ ] Set up Supabase database backups (Supabase → Project Settings → Database → Backups)
- [ ] Add error monitoring (e.g. Sentry) to catch runtime errors in production
- [ ] Verify the site looks correct on mobile (responsive design)
- [ ] Test in Safari and Firefox in addition to Chrome
