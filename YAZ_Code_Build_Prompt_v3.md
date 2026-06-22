# YAZ Development — Code Build Prompt (v3)

**Stack:** SvelteKit 2 + Svelte 5 Runes + Auth.js + Neon PostgreSQL + Drizzle ORM + Vercel
**Animation:** GSAP 3 + ScrollTrigger + Flip + Lenis
**Design Source:** Google Stitch MCP — **as visual reference ONLY** (DO NOT use its HTML output)

---

## ⚠️ CRITICAL

Google Stitch outputs HTML + Tailwind (sometimes React). The agent must NEVER use that code directly. Stitch is a visual reference only — every line of code in `src/` is written from scratch in Svelte 5 / SvelteKit.

---

## SETUP — Stitch MCP Connection

Run once in your terminal to register Stitch as an MCP server in Claude Code:

```bash
claude mcp add stitch \
  --transport http \
  --header "X-Goog-Api-Key: YOUR_GOOGLE_API_KEY_HERE" \
  https://stitch.googleapis.com/mcp
```

⚠️ **Never paste the API key into chats, prompts, repos, or any public surface. Keep it in your local shell env only.**

---

## MASTER PROMPT (paste this into Claude Code as the first message)

```
You are building the production frontend for YAZ Development Contracting Co. Ltd. — a Saudi surveying & construction company, exclusive Hi-Target distributor in Saudi Arabia, working on NEOM, Riyadh Metro, KAFD, King Salman Park, KFSC Stadium, Diriyah Gate, King Abdulaziz Airport, and Qiddiya.

The visual design is provided via the connected Google Stitch MCP server. The site is LIGHT-THEMED throughout — white and off-white surfaces with teal accents (#0E7490, #155E75, #0F3D4D). Brand colors derive from the YAZ logo.

═══════════════════════════════════════════════════════
⚠️ STITCH MCP — HARD RULES (READ BEFORE ANY OUTPUT)
═══════════════════════════════════════════════════════

Google Stitch generates HTML + Tailwind code (sometimes React). YOU MUST NOT USE THAT CODE.

DO NOT:
- Copy any HTML markup from Stitch into the project
- Copy any React components, JSX, or .tsx files from Stitch
- Use Stitch's class names verbatim if they conflict with the Svelte component structure
- Treat Stitch output as the source of truth for component logic
- Output any file ending in .html, .jsx, .tsx, or React component syntax
- Use vanilla HTML <form> with action attributes — always use SvelteKit form actions

DO:
- Treat Stitch output as a VISUAL REFERENCE ONLY — the equivalent of a Figma screenshot
- Extract from Stitch ONLY: design tokens (colors, spacing, typography, shadows, radii), layout structure (what sections exist, their order, their proportions), component visual specs (sizes, states, hover behaviors)
- Rebuild every page, section, and component from scratch in Svelte 5 with Runes ($state, $derived, $effect, $props)
- Write all markup as .svelte files
- Use Svelte's reactive primitives instead of any React/HTML state patterns Stitch suggests
- Use SvelteKit conventions: +page.svelte, +page.server.ts, +layout.svelte, form actions, load functions
- Convert any Tailwind classes from Stitch into the project's Tailwind 4 setup using design tokens from tokens.css
- Replace any inline event handlers (onclick="...") with Svelte on:click handlers
- Replace any HTML <a href="..."> for internal nav with Svelte's enhanced anchors and data-sveltekit-preload-data

STITCH-TO-SVELTE TRANSLATION WORKFLOW:

For every screen Stitch produces:

1. CALL Stitch MCP to fetch the screen spec
2. EXTRACT visual tokens (look at Stitch's CSS/Tailwind classes, identify actual values, write them to src/lib/styles/tokens.css as CSS custom properties; never copy Stitch's class names — derive semantic token names)
3. EXTRACT layout structure (identify sections, component composition, responsive breakpoints)
4. REWRITE in Svelte: one .svelte file per section in src/lib/components/sections/, one per primitive in src/lib/components/ui/; use Tailwind utility classes referencing tokens; use Svelte 5 Runes for state, never React patterns
5. VERIFY visual parity: match spacing within 4px tolerance, colors exactly, typography exactly

EXAMPLE TRANSLATION:

Stitch outputs:
  <button class="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition">
    Get a Quote
  </button>

You write (src/lib/components/ui/Button.svelte):
  <script lang="ts">
    interface Props {
      variant?: 'primary' | 'secondary' | 'ghost';
      size?: 'sm' | 'md' | 'lg';
      href?: string;
      onclick?: () => void;
      children: import('svelte').Snippet;
    }
    let { variant = 'primary', size = 'md', href, onclick, children }: Props = $props();
    const variants = {
      primary: 'bg-brand-teal text-white hover:bg-deep-teal',
      secondary: 'bg-white text-brand-teal border border-brand-teal hover:bg-sky-tint',
      ghost: 'text-brand-teal hover:underline'
    };
    const sizes = { sm: 'h-9 px-4 text-sm', md: 'h-11 px-6', lg: 'h-13 px-8 text-lg' };
  </script>
  {#if href}
    <a {href} class="inline-flex items-center justify-center rounded-lg font-medium transition {variants[variant]} {sizes[size]}">
      {@render children()}
    </a>
  {:else}
    <button {onclick} class="inline-flex items-center justify-center rounded-lg font-medium transition {variants[variant]} {sizes[size]}">
      {@render children()}
    </button>
  {/if}

The Stitch HTML is REFERENCE — the Svelte file above is the DELIVERABLE.

If Stitch produces a form, IGNORE the form markup entirely and build it with sveltekit-superforms + Zod. If Stitch produces a carousel, IGNORE its JS and use embla-carousel-svelte. If Stitch produces a modal, IGNORE its markup and use a Svelte dialog component with proper a11y.

NEVER ship any file in the repo that originated from Stitch. Every line of code in src/ must be written by you in Svelte/TypeScript syntax.

═══════════════════════════════════════════════════════
TECH STACK (locked — do not substitute)
═══════════════════════════════════════════════════════

- SvelteKit 2.x (latest stable)
- Svelte 5 with Runes ($state, $derived, $effect, $props, snippets)
- TypeScript strict mode
- Tailwind CSS 4.x with @theme directive (consume Stitch-derived tokens as CSS variables)
- Auth.js (@auth/sveltekit) — Google + Email magic link providers
- Neon PostgreSQL (serverless driver: @neondatabase/serverless)
- Drizzle ORM + drizzle-kit for migrations
- Vercel deployment (Edge runtime where possible, Node for DB writes)
- Paraglide JS for i18n (EN/AR with RTL)
- lucide-svelte for icons
- embla-carousel-svelte for carousels
- Zod for validation
- sveltekit-superforms for forms
- Resend for transactional email
- Vercel Blob for media storage
- Upstash Redis for rate limiting

═══════════════════════════════════════════════════════
ANIMATION (GSAP — mandatory)
═══════════════════════════════════════════════════════

- GSAP 3.x core
- GSAP ScrollTrigger
- GSAP Flip (for project filtering layout transitions)
- GSAP SplitText (free as of 2024)
- Lenis (free smooth scroll, integrated with ScrollTrigger)

Rules:
- All GSAP animations wrapped in gsap.context() for automatic cleanup on Svelte component destroy
- All animations respect prefers-reduced-motion via gsap.matchMedia()
- Register plugins ONCE in src/lib/animations/gsap.ts
- Lazy-load plugins per route via dynamic import where possible
- Never animate top/left — always x/y/transform
- For Arabic (RTL), flip x direction in slide-in animations; disable SplitText character split (use word split only)

Animation modules under src/lib/animations/:
- gsap.ts (plugin registration + matchMedia setup)
- smooth-scroll.ts (Lenis integration with ScrollTrigger)
- hero.ts (page-load hero timeline)
- reveals.ts (ScrollTrigger fade-up reveals via use:reveal action)
- counters.ts (KPI counter tween)
- parallax.ts (subtle image parallax)
- magnetic.ts (magnetic hover for primary CTAs)
- filter.ts (GSAP Flip for project filter transitions)
- carousel.ts (Embla + GSAP entrance transitions)
- split-text.ts (character/word reveal wrapper)

GSAP integration pattern:
  <script lang="ts">
    import { onMount } from 'svelte';
    import { gsap } from '$lib/animations/gsap';
    let container: HTMLElement;
    onMount(() => {
      const ctx = gsap.context(() => {
        gsap.from('.reveal', {
          y: 24, opacity: 0, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: container, start: 'top 80%' }
        });
      }, container);
      return () => ctx.revert();
    });
  </script>

═══════════════════════════════════════════════════════
PROJECT STRUCTURE
═══════════════════════════════════════════════════════

yaz-web/
├── src/
│   ├── lib/
│   │   ├── server/
│   │   │   ├── db/{index.ts, schema.ts, seed.ts}
│   │   │   ├── auth.ts
│   │   │   ├── email.ts
│   │   │   └── rate-limit.ts
│   │   ├── animations/{gsap, smooth-scroll, hero, reveals, counters, parallax, magnetic, filter, carousel, split-text}.ts
│   │   ├── components/
│   │   │   ├── layout/{Nav, MegaMenu, Footer, LangToggle, WhatsAppFab}.svelte
│   │   │   ├── ui/{Button, Card, Chip, Input, Textarea, Select, Accordion}.svelte
│   │   │   ├── sections/{HeroCinematic, TrustLogos, ServicesGrid, ProjectsMasonry, DevicesCarousel, Vision2030Split, StatsCounters, LeadershipGrid, CtaBand}.svelte
│   │   │   ├── project/{ProjectCard, ProjectFilters, BeforeAfterSlider}.svelte
│   │   │   ├── device/{DeviceCard, SpecsTable}.svelte
│   │   │   └── motion/{FadeUp, CountUp, ParallaxImage, SplitTextReveal, SmoothScroll}.svelte
│   │   ├── i18n/messages/{en.json, ar.json}, runtime.ts
│   │   ├── styles/{tokens.css, fonts.css, app.css}
│   │   ├── stores/lang.svelte.ts
│   │   └── utils/{seo.ts, format.ts}
│   ├── routes/
│   │   ├── +layout.svelte, +layout.server.ts
│   │   ├── +page.svelte (Home)
│   │   ├── about/+page.svelte
│   │   ├── services/{+page.svelte, [slug]/+page.svelte}
│   │   ├── projects/{+page.svelte, +page.server.ts, [slug]/{+page.svelte, +page.server.ts}}
│   │   ├── devices/{+page.svelte, [slug]/+page.svelte}
│   │   ├── contact/{+page.svelte, +page.server.ts}
│   │   ├── api/{auth/[...auth]/+server.ts, leads/+server.ts, quote/+server.ts}
│   │   ├── admin/{+layout.server.ts, leads/+page.svelte, projects/+page.svelte, devices/+page.svelte}
│   │   └── sitemap.xml/+server.ts
│   ├── app.html, app.d.ts, hooks.server.ts
├── drizzle/, drizzle.config.ts
├── svelte.config.js, vite.config.ts, tailwind.config.ts, tsconfig.json
├── .env.example, package.json

═══════════════════════════════════════════════════════
DATABASE SCHEMA (Drizzle)
═══════════════════════════════════════════════════════

1. users — Auth.js standard (id, name, email, emailVerified, image, role)
2. accounts, sessions, verification_tokens — Auth.js adapter tables
3. projects — id, slug, name_en, name_ar, client, main_contractor, year, location, sector (enum: infrastructure/residential/commercial/heritage/sports/aviation), services (text[]), equipment (text[]), area_sqm, team_size, summary_en/ar, challenge_en/ar, approach_en/ar, outcome_en/ar, hero_image_url, gallery (jsonb), featured (bool), published (bool), created_at, updated_at
4. services — id, slug, code, name_en/ar, tagline_en/ar, description_en/ar, outputs_en/ar (text[]), equipment (text[]), example_project_ids (uuid[]), hero_image_url, icon, order_index, published
5. devices — id, slug, model, category (enum: gnss_rtk/total_station/controller/accessory), tagline_en/ar, description_en/ar, specs (jsonb), key_features (jsonb), hero_image_url, gallery (jsonb), datasheet_url, related_device_ids (uuid[]), order_index, published
6. leads — id, name, company, email, phone, project_type, message, source (contact/quote/device), device_id (nullable), status (new/contacted/qualified/closed), ip, user_agent, created_at
7. team_members — id, name_en/ar, title_en/ar, bio_en/ar, portrait_url, linkedin_url, expertise (text[]), order_index, published
8. clients — id, name, logo_url, order_index, featured
9. timeline_milestones — id, year, title_en/ar, description_en/ar, image_url, order_index

═══════════════════════════════════════════════════════
KEY ROUTES & FEATURES
═══════════════════════════════════════════════════════

PUBLIC:
- / — Home (hero timeline, services, projects masonry, devices carousel, stats, leadership, CTA)
- /about — Timeline + Vision/Mission + leadership + KPIs
- /services + /services/[slug]
- /projects + /projects/[slug] — Filterable with GSAP Flip + before/after slider
- /devices + /devices/[slug] — Carousel + product detail
- /contact — sveltekit-superforms + Zod

API:
- POST /api/leads — validate, rate-limit, insert to DB, Resend
- POST /api/quote — with device context
- /api/auth/* — Auth.js handler

ADMIN (Auth.js role='admin'):
- /admin/leads — table, filters, status, CSV export
- /admin/projects, /admin/devices, /admin/team — CRUD with Blob upload

═══════════════════════════════════════════════════════
i18n / RTL
═══════════════════════════════════════════════════════

- Paraglide JS for type-safe messages
- All content tables have _en and _ar columns
- lang rune store persisted in cookie
- dir="rtl" toggled on <html>
- Logical CSS properties only (ms-* me-* ps-* pe-*) — never left/right
- IBM Plex Sans Arabic loaded only when lang=ar
- Numbers via Intl.NumberFormat with locale
- GSAP slide-ins flip x direction for RTL
- SplitText character split disabled for Arabic (word split only)

═══════════════════════════════════════════════════════
AUTH.JS
═══════════════════════════════════════════════════════

- Providers: Google OAuth + Resend Email magic link
- DrizzleAdapter
- Session strategy: database
- Callbacks: session attaches role from DB; signIn checks email allow-list for admin
- Custom /admin/signin
- /admin/* protected in hooks.server.ts

═══════════════════════════════════════════════════════
PERFORMANCE TARGETS
═══════════════════════════════════════════════════════

- Lighthouse: Performance >= 90, Accessibility >= 95, Best Practices 100, SEO 100
- LCP < 2.0s, CLS < 0.05, INP < 200ms
- GSAP plugins lazy-loaded per route
- enhanced:img for static, Vercel Image Optimization for dynamic
- Hero video lazy + poster image first; reduced-motion -> static image only
- Fonts subset Latin + Arabic, preload, font-display swap
- data-sveltekit-preload-data="hover"
- Edge runtime for reads, Node for writes

═══════════════════════════════════════════════════════
SEO & ACCESSIBILITY
═══════════════════════════════════════════════════════

- Per-page <svelte:head> with title, description, OG tags (EN + AR)
- hreflang tags for EN/AR alternates
- JSON-LD: Organization, LocalBusiness, BreadcrumbList, Service, Product
- /sitemap.xml + /robots.txt + /llms.txt
- WCAG AA contrast verified against tokens
- Keyboard nav, visible focus rings, skip-to-content
- prefers-reduced-motion disables Lenis + GSAP transforms
- alt text on all images
- Form errors via aria-live

═══════════════════════════════════════════════════════
ENVIRONMENT VARIABLES (.env.example)
═══════════════════════════════════════════════════════

DATABASE_URL=postgres://...neon...
AUTH_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_TRUST_HOST=true
RESEND_API_KEY=
RESEND_FROM=noreply@yazdvs.com
ADMIN_EMAILS=nasr@yazdvs.com,info@yazdv.com
PUBLIC_SITE_URL=https://yazdvs.com
PUBLIC_WHATSAPP_NUMBER=966553932623
BLOB_READ_WRITE_TOKEN=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

═══════════════════════════════════════════════════════
BUILD ORDER
═══════════════════════════════════════════════════════

PHASE 0 — Scaffold
1. pnpm create svelte@latest yaz-web (skeleton, TS strict)
2. Install all dependencies
3. Configure Tailwind 4 with @theme, Paraglide, Auth.js, Drizzle
4. Create folder structure
5. Set up Neon connection + first empty migration

PHASE 1 — Design System from Stitch (TRANSLATE, do not copy)
1. Call Stitch MCP, fetch design specs for home page first
2. Extract tokens -> write tokens.css with CSS custom properties
3. Wire Tailwind theme to consume tokens
4. Reference Stitch visually to build ui/ primitives FROM SCRATCH in Svelte 5
5. Build layout/ components
6. Build motion/ wrappers
7. Verify GSAP context cleanup on component destroy
8. STOP and show me: tokens.css + Button.svelte + Card.svelte before continuing

PHASE 2 — Database & Auth
1. Full Drizzle schema
2. Generate + run migrations
3. Auth.js with DrizzleAdapter
4. Seed services (10), devices (8), team (4), clients (~30), milestones
5. Seed featured projects (NEOM, Riyadh Metro, King Salman Park, KAFD, Diriyah Gate, KFSC, King Abdulaziz Airport, Qiddiya)

PHASE 3 — Public Pages with GSAP
1. Home — Hero timeline + ScrollTrigger reveals + counters + parallax
2. About — Horizontal pin scroll timeline
3. Services index + detail — Sticky left-nav scrub indicator
4. Projects index with GSAP Flip filter + detail with before/after slider
5. Devices index with Embla+GSAP carousel + detail
6. Contact — sveltekit-superforms

PHASE 4 — Admin
1. /admin/signin
2. /admin/leads
3. /admin/projects, /admin/devices, /admin/team

PHASE 5 — Polish
1. SEO meta + JSON-LD + sitemap + hreflang
2. Lighthouse pass
3. RTL test on every page (verify GSAP directions flip)
4. prefers-reduced-motion test on every animation
5. Test forms, rate limiting, email delivery
6. Test Auth.js flows
7. Deploy to Vercel

═══════════════════════════════════════════════════════
DELIVERY RULES
═══════════════════════════════════════════════════════

- NEVER ship Stitch's HTML/JSX/React code — Stitch is visual reference only
- Every src/ file authored in Svelte 5 / TypeScript / SvelteKit conventions
- Svelte 5 Runes only — no legacy stores in components, no $: reactive statements
- TypeScript strict — no `any`, no @ts-ignore
- All forms use sveltekit-superforms + Zod
- All DB queries via Drizzle — no raw SQL except migrations
- All user input validated server-side
- Rate limit /api/leads and /api/quote (Upstash: 5 req/min per IP)
- Server-only secrets in $env/static/private
- Every component has TypeScript props interface
- All GSAP animations wrapped in gsap.context() with cleanup
- All GSAP animations respect prefers-reduced-motion via gsap.matchMedia
- Conventional commits
- README.md with setup, env, dev, build, deploy instructions
- Light theme only — teal #0E7490 primary — all colors from Stitch-derived tokens

═══════════════════════════════════════════════════════
START
═══════════════════════════════════════════════════════

Begin with Phase 0. Confirm scaffolding before moving to Phase 1. After Phase 1, show:
1. The design tokens extracted from Stitch (tokens.css)
2. The GSAP plugin registration module (gsap.ts)
3. Two example Svelte components (Button.svelte and Card.svelte) demonstrating the Stitch-to-Svelte translation

Pause between phases for review.
```
