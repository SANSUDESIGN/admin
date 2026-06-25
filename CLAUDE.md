# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3001)
npm run build    # Production build
npm run start    # Run production server
npm run lint     # ESLint
```

There is no test framework configured.

## Architecture

**Sansu admin** is a Next.js 16 (app router) + React 19 content panel for the Sansu storefront
(repo `SANSUDESIGN/sansuart`). Deployed on Vercel (project `admin`, auto-deploys from `main`). Auth is
a cookie session gated by `ADMIN_PASSWORD`, enforced in `middleware.ts`.

**Scope (intentionally reduced):** upload photos, edit text, edit product descriptions, add products,
and activate/deactivate products. The previous deploy/publish flow and the font editor were removed —
**this admin cannot deploy or hard-delete products.** The prior full-scope admin is preserved at the
`archive/v1` branch and `archive/v1-pre-relaunch` tag.

### Key Files

- `app/admin/page.tsx` — dashboard (cards link to each editor; no Publish/Font cards).
- `app/admin/{hero,works,values,studio,faq,footer}/` — content editors (hero includes tagline).
- `app/admin/products/` — list with **activate/deactivate** (`ProductListClient.tsx`), `new`, and
  `[id]` edit (series / status / edition). No hard-delete.
- `app/admin/upload/` — photo upload to the Vercel Blob CDN via `/api/upload`.
- `app/api/admin/{hero,works,values,studio,faq,footer,products}/` — write endpoints.
- `app/api/auth/{login,logout}/`, `app/login/` — auth.
- `middleware.ts` — session enforcement.

### Data

Writes go to **Upstash Redis** via `lib/content.ts` `writeKv()` — the same backend the storefront
reads from. Photo uploads go to the Vercel Blob CDN.

### Config Notes

- Env: `KV_REST_API_URL` / `KV_REST_API_TOKEN` / `BLOB_READ_WRITE_TOKEN` / `ADMIN_PASSWORD` (set in
  the Vercel project for Production; local `.env.development.local` for dev).
- Path alias `@/*` maps to the project root.

### Removed vs. the prior admin

- `app/admin/font` + `app/api/admin/font` (font editor)
- `app/api/admin/publish` + the dashboard Publish card (deploy)
- product hard-delete in `app/admin/products/ProductListClient.tsx` (activate/deactivate kept)
