# YAZ Development — DESIGN.md

**Status:** Authoritative. Every PR, page, component, and animation in this repo must comply.
**Last revised:** 2026-06-22

This file is the design contract. When a build instruction here conflicts with anything elsewhere (issue comments, ad-hoc messages, Stitch output, prior iterations), **this file wins**. If a rule needs to change, edit this file in the same PR — never silently deviate.

---

## 0. North Star

YAZ Development is a Saudi surveying & construction contractor and exclusive Hi-Target distributor. The site must read as:

- **Technical authority** — surveyors, engineers, and procurement officers must trust us in under 5 seconds.
- **Vision-2030 aligned** — flagship work (NEOM, Riyadh Metro, KAFD, King Salman Park, KFSC Stadium, Diriyah Gate, King Abdulaziz Airport, Qiddiya) is the proof.
- **Quiet luxury, not flash** — calm whitespace, decisive type, restrained motion. No stock-photo glitz.

**Language scope (locked, user decision 2026-06-22):** The site is **English-only**. Arabic / RTL is deferred indefinitely — not Phase 2, not Phase 5. Any future re-introduction requires re-enabling the i18n stack (currently fully removed) and adding `_ar` columns to the schema. Until that happens, do not write Arabic strings, do not add `dir="rtl"` handling, do not assume bilingual content models.

If a design or code decision does not advance one of these, drop it.

---

## 1. Brand Tokens (source of truth — `src/lib/styles/tokens.css`)

### 1.1 Color

| Token | Hex | Use |
|---|---|---|
| `--color-bg` | `#FFFFFF` | Page background, default surfaces |
| `--color-surface` | `#F7F9FB` | Cards, sub-surfaces, alt sections |
| `--color-surface-2` | `#EEF2F5` | Pressed states, table stripes |
| `--color-ink` | `#0F172A` | Headings, primary body |
| `--color-ink-2` | `#334155` | Secondary body |
| `--color-ink-3` | `#64748B` | Captions, metadata |
| `--color-line` | `#E2E8F0` | Hairlines, dividers, default borders |
| `--color-brand-teal` | `#0E7490` | Primary brand, primary CTAs, links |
| `--color-deep-teal` | `#155E75` | Hover/active for brand, accent |
| `--color-abyss-teal` | `#0F3D4D` | Hero overlays, deepest accent |
| `--color-sky-tint` | `#ECFEFF` | Soft brand background, hover wash |
| `--color-mint-tint` | `#F0FDFA` | Alt section background (Services area) |
| `--color-sand` | `#F5EFE6` | Heritage/Vision-2030 accent surface |
| `--color-lime` | `#84CC16` | Reserved accent — high-conversion CTAs only (Contact/Submit). Never primary. |
| `--color-lime-deep` | `#4A7700` | Lime ink (on lime-bright surfaces) |
| `--color-lime-bright` | `#C2FF76` | Vision-2030 partner pill, progress dots |
| `--color-success` | `#15803D` | Success toasts/badges |
| `--color-warning` | `#B45309` | Warning toasts/badges |
| `--color-danger` | `#B91C1C` | Error toasts/form errors |
| `--color-focus` | `#0E7490` | Focus ring (with 2px solid + 2px offset) |

Rules:
- **Light theme only.** No dark mode work until explicitly scoped in a future phase.
- WCAG AA minimum: body text contrast ≥ 4.5:1; large text ≥ 3:1. Verify any pair before shipping.
- Never introduce a raw hex in a component — add it as a token here first, then consume.

### 1.2 Typography

- **Body / UI:** Inter (variable, 400/500/600/700).
- **Display headings:** Space Grotesk (600/700).
- **Technical / monospace:** JetBrains Mono (500/700) for chip labels, project codes (e.g. `SVC-01`), stat callouts, hero eyebrow.
- Load with `font-display: swap`, preload the variable Inter face. Self-host under `/static/fonts/` before production for privacy + LCP.

Type scale (mobile → desktop, fluid via `clamp()`):

| Token | Size | Use |
|---|---|---|
| `--text-display` | `clamp(2.5rem, 4.5vw + 1rem, 4.5rem)` / 1.05 | Hero H1 |
| `--text-h1` | `clamp(2rem, 2.5vw + 1rem, 3rem)` / 1.1 | Page H1 |
| `--text-h2` | `clamp(1.625rem, 1.5vw + 1rem, 2.25rem)` / 1.15 | Section H2 |
| `--text-h3` | `clamp(1.25rem, 0.8vw + 1rem, 1.625rem)` / 1.25 | Subsection H3 |
| `--text-body-lg` | `1.125rem` / 1.6 | Lead paragraphs |
| `--text-body` | `1rem` / 1.65 | Body |
| `--text-small` | `0.875rem` / 1.5 | Captions, meta |
| `--text-eyebrow` | `0.75rem` / 1.4, 0.12em tracking, uppercase | Eyebrows |
| `--text-label-mono` | `0.875rem` / 1.2, JetBrains Mono 500 | Technical labels, chip text, project codes |

Rules:
- Headings: Space Grotesk, weight 600 unless display (700).
- Body: Inter, weight 400.
- Never use `text-align: justify` — breaks rag.

### 1.3 Spacing & layout

8-pt base. Tokens: `--space-1` (4px), `--space-2` (8px), `--space-3` (12px), `--space-4` (16px), `--space-5` (24px), `--space-6` (32px), `--space-8` (48px), `--space-10` (64px), `--space-12` (96px), `--space-14` (128px), `--space-16` (160px).

Container: `--container-max: 1280px`; horizontal padding `--space-5` mobile, `--space-8` tablet, `--space-10` desktop.

Grid: 12-col desktop / 8-col tablet / 4-col mobile, gutter `--space-5`.

### 1.4 Radii & shadow

- `--radius-sm` 6px (small inputs), `--radius-md` 10px (buttons, default surfaces), `--radius-lg` 16px (cards), `--radius-xl` 24px (hero containers, structural wrappers), `--radius-pill` 9999px (chips, FAB).
- `--shadow-sm` `0 1px 2px rgba(15,23,42,.06)`, `--shadow-md` `0 8px 24px -8px rgba(15,23,42,.12)`, `--shadow-lg` `0 24px 48px -16px rgba(15,23,42,.18)`.
- No drop-shadows on text. No glow effects.

### 1.5 Motion tokens

- `--ease-out`: `cubic-bezier(0.22, 1, 0.36, 1)` (default)
- `--ease-in-out`: `cubic-bezier(0.65, 0, 0.35, 1)`
- `--ease-emphasis`: `cubic-bezier(0.16, 1, 0.3, 1)` (hero, reveals)
- Durations: `--dur-1` 120ms (micro), `--dur-2` 200ms (hover/state), `--dur-3` 360ms (reveals), `--dur-4` 600ms (hero beats), `--dur-5` 900ms (timeline)

---

## 2. Layout & section rhythm

Vertical rhythm between sections: `--space-12` mobile / `--space-14` desktop. Hero is full-viewport on home, otherwise `min-height: 60vh`. Every section uses the standard container; full-bleed visuals break the container only inside their own wrapper.

Sticky nav: **72px desktop** / 56px mobile (tokens `--nav-h-desktop` / `--nav-h-mobile`), white-translucent (`rgba(255,255,255,0.85)` + `backdrop-filter: blur(12px) saturate(180%)`), bottom hairline `--color-line` after scroll > 8px.

Decorative motifs from the Stitch institutional framework (utility classes in `app.css`):
- `.mesh-pattern` — radial-dot grid at 32px spacing, 5% teal opacity. Hero & section backgrounds.
- `.contour-lines` — SVG sine curves at 200px tile, 3% teal opacity. Layer on top of mesh-pattern for hero only.
- `.hover-lift` — card hover lift: `translateY(-4px)` + `shadow-md`. Disabled under `prefers-reduced-motion`.

---

## 3. Component contracts (in `src/lib/components/ui/`)

Every primitive ships with: a TypeScript `Props` interface, a default variant, keyboard support, visible focus ring, and a 44×44 minimum touch target on mobile.

- **Button** — variants: `primary | secondary | ghost | accent`. `primary` = brand-teal fill, white text. `secondary` = transparent + 1.5px brand-teal border. `ghost` = brand-teal text, sky-tint hover wash. `accent` = lime fill + abyss-teal text, **reserved for high-conversion CTAs** (Contact, Submit, Request quote). Sizes: `sm | md | lg`. Supports `href` (renders `<a>`) or `onclick` (renders `<button>`). Magnetic hover only on primary CTAs ≥ md. Default radius `--radius-md`.
- **Card** — variants: `flat | elevated | outlined`. Default uses `--radius-lg` (16px), padding `--space-5`/`--space-6`, 1px `--color-line` border. Compose with `.hover-lift` for interactive cards.
- **Chip** — pill-shaped (`--radius-pill`), `--color-sky-tint` bg, brand-teal text in **JetBrains Mono** at `--text-label-mono`. Used for eyebrows, project codes, filter tags. Selected filter state: brand-teal bg + white text.
- **Input / Textarea / Select** — 44px min height, `--radius-md` (10px), 1.5px `--color-line` border. Focus state: border swaps to brand-teal + 3px sky-tint glow (`box-shadow: 0 0 0 3px var(--color-sky-tint)`). Labels always visible; never use placeholders as labels.
- **Accordion** — single-open by default, keyboard-accessible (Up/Down/Home/End), `aria-expanded` correct.

Forbidden: importing Stitch's HTML/JSX. See §7.

---

## 4. Motion (GSAP-only)

All motion is implemented per the rules below. The animation modules live in `src/lib/animations/`.

1. **Plugin registration once** in `gsap.ts`. Components import `gsap` from there.
2. **Every animation is wrapped** in `gsap.context()` inside `onMount`, with `return () => ctx.revert()`.
3. **Every animation respects `prefers-reduced-motion`** via `gsap.matchMedia()`. The reduced branch sets final state immediately (no tween) — never just "shorter duration".
4. **Never animate `top`/`left`/`width`/`height`** for layout effects. Use `x`/`y`/`scale`/`opacity`. For layout transitions use Flip.
5. **SplitText:** character split for body, character + word for hero display headlines. (RTL rules removed — site is EN-only.)
6. **No infinite background loops** outside the hero. Hero ambient motion stops after 12s and is paused when tab is hidden (`document.visibilityState`).
7. **Lenis** smooth scroll wires into ScrollTrigger via `ScrollTrigger.update`; disable Lenis entirely under reduced motion.
8. **Magnetic hover:** disabled below 1024px viewport; max 12px displacement; eases back on `pointerleave`.
9. **Hero video:** poster-first, lazy-load via `IntersectionObserver`, swap to static image under reduced motion.

If a component animates, its file MUST contain the matchMedia branch — not a comment promising it later.

---

## 5. Locale, numerals & dates

The site is **English-only** (see §0). `<html lang="en" dir="ltr">` is hard-coded in `app.html`; no cookies, no Paraglide runtime, no language toggle.

- Strings live as plain literals in `.svelte` files. If a string-extraction layer is ever needed, introduce it then — do not pre-build an i18n stack "just in case".
- Numbers always render in Latin digits (0–9). Dates always use the Gregorian calendar.
- All number/date formatting routes through `src/lib/utils/format.ts` (Intl-backed). No hand-rolled formatting.
- Content tables in `src/lib/server/db/schema.ts` carry single English columns (`name`, `summary`, `description` — no `_en`/`_ar` suffixes). When bilingual support is re-introduced, schema migrations add the `_ar` columns and a fallback policy lands here in §5.

---

## 6. Accessibility (WCAG 2.2 AA)

- Visible focus ring on every interactive element: `outline: 2px solid var(--color-focus); outline-offset: 2px`. Never set `outline: none` without a replacement.
- Skip-to-content link as first focusable node in `+layout.svelte`.
- Color contrast verified for every text/background pairing — including hover and disabled.
- Forms: every input has a `<label>`; errors announced via `aria-live="polite"`; required state via `aria-required`, not just an asterisk.
- Images: meaningful `alt` always; decorative images use `alt=""`; never `alt="image"`.
- Heading order: never skip a level. One `<h1>` per page.
- Carousels expose prev/next as buttons (not divs), with `aria-label`. Pause-on-hover required.
- Modals: focus trap, `Esc` closes, focus returns to the trigger.
- Touch targets ≥ 44×44 on mobile.

---

## 7. The Stitch boundary (HARD)

Stitch MCP output is a **Figma-equivalent screenshot**, nothing more. Reproduce these rules verbatim in every commit:

**Never:**
- Copy any Stitch HTML, JSX, TSX, React component, or inline event handler into the repo.
- Ship a file ending in `.html`/`.jsx`/`.tsx` from Stitch output.
- Use Stitch's class names verbatim where they conflict with our token system.
- Treat Stitch markup as the source of truth for state or logic.

**Always:**
- Extract from Stitch only: tokens (colors, spacing, type, shadows, radii), layout structure, component visual specs.
- Rewrite every screen as `.svelte` using Svelte 5 Runes (`$state`, `$derived`, `$effect`, `$props`, snippets).
- Translate Tailwind classes to our token-driven Tailwind 4 setup.
- Replace any form Stitch produces with `sveltekit-superforms` + Zod.
- Replace any Stitch carousel with `embla-carousel-svelte` + GSAP entrance.
- Replace any Stitch modal with an a11y-correct Svelte dialog.

If a stitch fetch is impossible (offline, key missing), build the screen from spec in this file + the master prompt — do not block.

---

## 8. Data layer (Drizzle + Neon)

- All queries via Drizzle. Raw SQL is only allowed in migration files under `drizzle/`.
- Two connections: pooled (`DATABASE_URL`, runtime), unpooled (`DATABASE_URL_UNPOOLED`, drizzle-kit only).
- Server-only secrets read from `$env/static/private`. Never `process.env` in app code.
- Schema lives in `src/lib/server/db/schema.ts`; one source of truth for table types.
- Soft-delete pattern: prefer `published boolean` flags over hard deletes for content tables.
- User input is validated server-side with Zod **before** any DB call, even if a superform validated it client-side.

---

## 9. Forms & API

- Forms: `sveltekit-superforms` + Zod schemas living in `src/lib/schemas/`. Same schema used client- and server-side.
- API: `+server.ts` endpoints under `src/routes/api/`. Always validate, always rate-limit POSTs.
- Rate limit: Upstash, 5 requests / minute / IP on `/api/leads` and `/api/quote`. When `RATE_LIMIT_DISABLED=true`, bypass in dev only (assert `import.meta.env.DEV`).
- Email via Resend. `RESEND_FROM` must use the verified domain. Reply-To set to `RESEND_REPLY_TO`. Internal notifications go to every address in `NOTIFY_EMAIL` (comma-split, trimmed).

---

## 10. Auth.js

- DrizzleAdapter, session strategy `database`.
- Providers: Google OAuth + Resend Email magic link.
- `session` callback attaches `role` from the DB; `signIn` callback grants `role='admin'` to any address in `ADMIN_EMAILS` (comma-split, lowercased, trimmed) on first sign-in.
- `/admin/**` is guarded in `hooks.server.ts` — redirect unauthenticated to `/admin/signin`; 403 for authenticated non-admin.
- Custom signin page at `/admin/signin`. Never expose the Auth.js default UI.

---

## 11. Performance budget (per-page)

- Lighthouse mobile: Performance ≥ 90, A11y ≥ 95, Best Practices = 100, SEO = 100.
- LCP < 2.0s, CLS < 0.05, INP < 200ms.
- Initial JS payload ≤ 180KB gzip on every public route. GSAP plugins must be lazy-loaded per route via dynamic import — never globally registered at the layout level.
- Images: `enhanced:img` for static assets, Vercel Image Optimization for DB-driven media. Always provide `width`/`height` to lock CLS. Hero LCP image is preloaded.
- Fonts: subset, `font-display: swap`, preload the critical face only.
- Route runtime: edge for reads, node for DB writes and Auth.js.

---

## 12. SEO

- Per-page `<svelte:head>` with `title`, `description`, OG image, Twitter card.
- Bilingual: `<link rel="alternate" hreflang="en" .../>` and `hreflang="ar"` on every public page, including `x-default`.
- JSON-LD: `Organization` + `LocalBusiness` site-wide; `BreadcrumbList` on every nested page; `Service` on service pages; `Product` on device pages.
- `/sitemap.xml`, `/robots.txt`, `/llms.txt` are routes — generated from DB, not static files.
- Canonical URLs always include the locale where the URL is locale-dependent.

---

## 13. Folder discipline

The structure under `src/` matches the master prompt exactly. Do not create siblings:
- New section component → `src/lib/components/sections/`
- New UI primitive → `src/lib/components/ui/`
- New motion wrapper → `src/lib/components/motion/`
- New animation module → `src/lib/animations/`
- New schema → `src/lib/schemas/`
- New util → `src/lib/utils/`
- Server-only code → under `src/lib/server/` (SvelteKit will refuse to bundle this to the client).

No barrel `index.ts` files. Import by full path.

---

## 14. Commit & PR discipline

- Conventional commits: `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`, `perf:`, `a11y:`.
- One concern per PR. Token changes, schema changes, and route changes never share a PR.
- Every PR that touches a public page checks: tokens (no raw hex), motion (matchMedia branch present), reduced motion (visual diff with `prefers-reduced-motion: reduce`).
- The CI gate: `svelte-check`, `eslint`, `vitest`, `playwright` smoke, `lighthouse-ci` on `/` and `/projects`.

---

## 15. Forbidden patterns (auto-reject)

- `any`, `@ts-ignore`, `@ts-expect-error` without a tracking issue link.
- Svelte 4 patterns in components: `$:` reactive statements, `export let`, legacy stores in `.svelte` files. Use Runes.
- `process.env.*` in app code (server or client).
- Inline styles for color, spacing, or radius (must use tokens via Tailwind).
- `setTimeout` to coordinate animations (use GSAP timelines).
- Bare `<a href>` for internal navigation (use SvelteKit's anchor; rely on `data-sveltekit-preload-data` set at the layout).
- `console.log` left in production code (use the project logger; `console.error` is allowed in `hooks.server.ts`).
- Mocking the database in integration tests for `/api/*` routes.

---

## 16. When in doubt

1. Re-read §0 (North Star) and §1 (tokens). If the decision doesn't serve the North Star or use existing tokens, simplify.
2. Choose the option with less motion, less color, more whitespace.
3. If two patterns conflict, the one closer to SvelteKit / Svelte 5 idiomatic wins.
4. If still stuck, ask the user — never invent product or scope.

---

*End of contract. Edits to this file must be discussed in the PR description.*
