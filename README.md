# yaz-web

Production frontend for **YAZ Development Contracting Co. Ltd.** — Saudi surveying & construction, exclusive Hi-Target distributor.

Stack: **SvelteKit 2 · Svelte 5 Runes · TypeScript (strict) · Tailwind 4 · Auth.js · Neon Postgres · Drizzle ORM · Vercel**. Motion: **GSAP 3 + ScrollTrigger + Flip + Lenis**. i18n: **Paraglide (EN/AR with RTL)**.

> 📐 **The design contract lives in [`DESIGN.md`](./DESIGN.md).** Every PR is checked against it.

---

## Prerequisites

- Node **≥ 20.10** (Node 24 tested)
- pnpm **≥ 9** (pnpm 11 tested)
- A Neon Postgres database (free tier is fine for dev)
- Google OAuth client + Resend API key + Upstash Redis (for later phases — not required for Phase 0 `pnpm dev`)

---

## Quick start

```bash
# 1. Install
pnpm install

# 2. Configure env
cp .env.example .env
#   edit .env and fill in DATABASE_URL, AUTH_SECRET (run: openssl rand -base64 32), etc.

# 3. Dev server
pnpm dev
#   → http://127.0.0.1:5173
```

---

## Scripts

| Command | Purpose |
|---|---|
| `pnpm dev` | Vite dev server on `127.0.0.1:5173` |
| `pnpm build` | Production build (Vercel adapter) |
| `pnpm preview` | Preview the production build locally |
| `pnpm check` | `svelte-check` + TS type-check |
| `pnpm lint` | Prettier + ESLint |
| `pnpm format` | Prettier write |
| `pnpm test` | Vitest unit tests |
| `pnpm test:e2e` | Playwright end-to-end smoke |
| `pnpm db:generate` | Generate SQL migration from `schema.ts` |
| `pnpm db:migrate` | Apply migrations (uses `DATABASE_URL_UNPOOLED`) |
| `pnpm db:studio` | Drizzle Studio (DB GUI) |
| `pnpm db:seed` | Seed reference data (Phase 2+) |

---

## Project layout

```
src/
├── app.html               · HTML shell with Paraglide placeholders
├── app.d.ts               · App.Locals / App.PageData types
├── hooks.server.ts        · i18n + admin guard
├── routes/                · SvelteKit file-based routing
└── lib/
    ├── animations/        · GSAP modules (lazy-loaded per route)
    ├── components/        · ui/  layout/  sections/  project/  device/  motion/
    ├── i18n/              · message bundles + runtime
    ├── schemas/           · Zod schemas (forms + API)
    ├── server/            · DB, auth, email, rate-limit (server-only)
    ├── stores/            · Svelte 5 rune stores
    ├── styles/            · tokens.css · fonts.css · app.css
    └── utils/             · seo, format, helpers
drizzle/                   · generated SQL migrations
static/                    · public assets (favicon, robots.txt, manifest)
```

---

## Build phases (see `YAZ_Code_Build_Prompt_v3.md`)

- [x] **Phase 0** — Scaffold: configs, folder structure, dev server boots
- [ ] **Phase 1** — Design system from Stitch (tokens + primitives + motion wrappers)
- [ ] **Phase 2** — DB schema + Auth.js + seed
- [ ] **Phase 3** — Public pages (home, about, services, projects, devices, contact)
- [ ] **Phase 4** — Admin (leads, projects, devices, team CRUD)
- [ ] **Phase 5** — SEO, Lighthouse, RTL audit, deploy

Pause between phases for review.

---

## Deploy (Vercel)

1. `vercel link` against the project.
2. Add every variable from `.env.example` to Vercel → Settings → Environment Variables (Production + Preview + Development).
3. `vercel --prod` or push to `main`.
4. After first deploy: verify the Resend sending domain (`yazdvs.com`) and add SPF / DKIM / DMARC records.

---

## Important conventions

- **Svelte 5 Runes only.** No `export let`, no `$:`, no legacy stores in `.svelte` files.
- **TS strict.** No `any`, no `@ts-ignore`.
- **Tokens, not hex.** All colors / spacing / radii come from `src/lib/styles/tokens.css` via Tailwind `@theme`.
- **Logical CSS only.** `ms-*` / `me-*`, never `ml-*` / `mr-*`.
- **GSAP in `gsap.context()`** with `gsap.matchMedia()` for reduced motion.
- **Forms** via `sveltekit-superforms` + Zod.
- **Server secrets** via `$env/static/private` / `$env/dynamic/private`, never `process.env` in app code.

See [`DESIGN.md`](./DESIGN.md) for the full contract.

---

## License

Proprietary — © YAZ Development Contracting Co. Ltd. All rights reserved.
