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

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript 5](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- [Lucide React](https://lucide.dev/) for icons

## Getting Started

**Install dependencies:**

```bash
npm install
```

**Start the development server:**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
community-resource-hub/
├── app/                  # Next.js App Router pages
│   ├── page.tsx          # Homepage (announcements, CTAs)
│   ├── about/            # About, story, people, and contact pages
│   ├── events/           # Events listing page
│   ├── resources/        # Resource directory page
│   └── donate/           # Donation options page
├── components/           # Shared React components
│   ├── Navbar.tsx
│   ├── NavMenu.tsx
│   ├── Footer.tsx
│   ├── ContactForm.tsx
│   ├── PeopleBio.tsx
│   └── ui/               # shadcn UI primitives
└── lib/
    └── utils.ts          # Utility helpers (cn)
```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Run production build |
| `npm run lint` | Run ESLint |

## Roadmap

- [ ] Events calendar integration
- [ ] Searchable/filterable resource table
- [ ] Contact form backend (email or database)
- [ ] Admin sign-in and CMS editing interface
