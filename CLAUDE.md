# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Run production server
npm run lint     # ESLint
```

There is no test framework configured.

## Architecture

**Sansu** is a Next.js 16 + React 19 architecture portfolio site (Krono/Arch). The entire UI lives in a single large component.

### Key Files

- `app/page.tsx` — Entry point, renders `<ArchitectureWebsite />`
- `app/layout.tsx` — Root layout with metadata and Vercel Analytics
- `components/architecture-website.tsx` — The entire portfolio UI (~410 lines). All sections (Hero, Navigation, ProjectList, Philosophy, Journal, Footer) are defined and rendered here as one component.
- `app/globals.css` — Global styles with Tailwind v4 imports and CSS custom properties (oklch color space)
- `components/ui/` — 57 pre-installed shadcn/ui components; most are unused but available

### Animation Pattern

Framer Motion is the primary animation library. Key patterns used:
- `useScroll` + `useTransform` + `useSpring` for parallax scroll effects (Hero section)
- `motion.div` with `initial`/`animate`/`exit` for fade transitions
- `AnimatePresence` for the navigation modal overlay
- Staggered list animations via `variants` with `staggerChildren`

### Styling

Tailwind CSS v4 with `cn()` (from `lib/utils.ts`) for conditional class merging. Dark mode via `next-themes`. Colors use the oklch color space via CSS variables defined in `globals.css`.

### Data

All project and news data is hardcoded as arrays inside `architecture-website.tsx`. No backend, no database, no API routes.

### Config Notes

- `next.config.mjs` has `ignoreBuildErrors: true` and unoptimized images — intentional for this v0-generated project
- Path alias `@/*` maps to the project root
- shadcn/ui configured with `style: "new-york"` in `components.json`
