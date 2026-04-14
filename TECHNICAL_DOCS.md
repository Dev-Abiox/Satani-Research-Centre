# Satani Research Centre — Technical Documentation

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 14.2.35 | React framework (App Router) |
| **React** | 18.3.1 | UI library |
| **TypeScript** | 6.0.2 | Type safety |
| **Tailwind CSS** | 3.4.19 | Styling |
| **Framer Motion** | 12.38.0 | Page transitions, animations |
| **Lottie React** | 2.4.1 | Brain loading animation |
| **Sharp** | 0.34.5 | Image optimization |
| **PostCSS** | 8.5.8 | CSS processing |

## Project Architecture

```
src/
├── app/                          # Routes (18 pages)
│   ├── layout.tsx                # Root layout (Navbar, Footer, SEO, JSON-LD)
│   ├── page.tsx                  # Homepage
│   ├── globals.css               # Global styles
│   ├── sitemap.ts                # Auto-generated sitemap
│   ├── robots.ts                 # Crawler rules
│   ├── not-found.tsx             # Custom 404
│   ├── about/
│   ├── careers/
│   ├── contact/
│   ├── insights/[slug]/          # Dynamic article pages
│   ├── resources/[slug]/         # Dynamic resource pages
│   ├── our-mission/
│   ├── patents/
│   ├── privacy-policy/
│   ├── procurement/
│   ├── projects/
│   ├── publications/
│   ├── research-topics/
│   ├── team/
│   └── terms-and-conditions/
│
├── components/                   # Reusable UI (20 components)
│   ├── Navbar.tsx                # Mega-menu, mobile slide-in
│   ├── Footer.tsx                # Newsletter, social links
│   ├── Hero.tsx                  # Video background + canvas lines
│   ├── FlowingLines.tsx          # Animated Bezier curves (canvas)
│   ├── SplashScreen.tsx          # Brain Lottie loader
│   ├── PageTransition.tsx        # Route fade animation
│   ├── BackToTop.tsx             # Scroll-to-top button
│   ├── StatsSection.tsx          # Auto-advancing stats tabs
│   ├── TabbedContent.tsx         # 6 project tabs with cards
│   ├── EventsSection.tsx         # Horizontal card carousel
│   ├── NewsInsights.tsx          # News card carousel
│   ├── MediaCTA.tsx              # Newsletter CTA
│   ├── CareerCTA.tsx             # Career CTA
│   ├── ResearchCard.tsx          # Research area card
│   ├── TeamMemberCard.tsx        # Team member card
│   ├── SectionWrapper.tsx        # Layout wrapper
│   ├── Timeline.tsx              # Milestone timeline
│   ├── insights/                 # InsightsBanner, InsightsGrid, InsightCard
│   └── resources/                # ResourcesBanner, ResourcesGrid, ResourceCard
│
├── data/                         # Static content
│   ├── insights.ts               # 7 articles (id, title, slug, date, image)
│   ├── articleContent.ts         # Full article content blocks
│   ├── resources.ts              # 5 resources (id, type, title, slug, image)
│   └── resourceContent.ts        # Full resource content blocks
│
└── public/
    ├── animations/brain-loading.json
    ├── hero-video.mp4
    ├── favicon.ico
    ├── site.webmanifest
    └── images/ (Team, Publications, Resources, Projects, News, Stats, Newsletter)
```

## Page Rendering Flow

```
User visits URL
    │
    ▼
┌─────────────────────────────┐
│  layout.tsx (Server)         │
│  ├─ Pre-hydration cover      │  ← Dark div, hidden on non-homepage
│  ├─ Navbar                   │  ← Fixed top, mega-menu
│  ├─ PageTransition           │  ← Fade animation wrapper
│  │   └─ {page content}       │  ← Route-specific page
│  ├─ Footer                   │  ← Newsletter, social links
│  └─ BackToTop                │  ← Appears after 400px scroll
└─────────────────────────────┘
```

## Homepage Flow (in order)

```
1. SplashScreen     → Brain Lottie animation (1.2s) → fades out
2. Hero             → Video bg + FlowingLines canvas + h1 fade-in
3. StatsSection     → 4 tabs auto-advancing with stats + images
4. MediaCTA         → Newsletter signup CTA
5. TabbedContent    → 6 project tabs with video/image + feature cards
6. EventsSection    → Patent cards (horizontal scroll)
7. EventsSection    → Publication cards (horizontal scroll)
8. CareerCTA        → Join the team CTA
9. NewsInsights     → News article cards (horizontal scroll)
10. EventsSection   → Resource cards (horizontal scroll)
```

## Data Flow

```
src/data/*.ts (static TypeScript arrays)
    │
    ▼
Page components (import directly)
    │
    ▼
Card components (receive data as props)
    │
    ▼
Rendered HTML
```

No database, no API, no CMS — all content is hardcoded in TypeScript files.

## Animation System

| Animation | Library | Duration | Trigger |
|-----------|---------|----------|---------|
| Brain splash screen | Lottie React | 1.2s min | Page refresh (homepage only) |
| Page transitions | Framer Motion | 0.3s | Route navigation |
| Hero heading | Framer Motion | 0.8s, 0.3s delay | Page load |
| Flowing lines | Canvas API | 9.5s per cycle | Continuous, pauses off-screen |
| Navbar dropdown | Framer Motion | 0.12s | Click |
| Mobile menu | Framer Motion | 0.3s | Click |
| Tab content switch | Framer Motion | 0.2s | Tab click |
| Stats auto-advance | CSS keyframes | 0.4s | Timer (auto) |
| Card image hover | Tailwind CSS | 0.5s | Hover |
| Card shadow hover | Tailwind CSS | 0.3s | Hover |
| Back-to-top | Tailwind CSS | Instant show | Scroll > 400px |

## SEO Setup

| Feature | Implementation |
|---------|---------------|
| **Metadata** | All 18 pages have unique title + description |
| **Title template** | `%s \| Satani Research Centre` |
| **Sitemap** | Auto-generated: 13 static + 7 insights + 5 resources = 25 URLs |
| **Robots.txt** | Allow all, points to sitemap |
| **JSON-LD** | ResearchOrganization schema in root layout |
| **OpenGraph** | Type, siteName, title, description |
| **Twitter Cards** | summary_large_image |
| **metadataBase** | `https://sataniresearchcentre.com` |
| **Manifest** | `/site.webmanifest` with theme color #005AA8 |
| **Font** | Inter with `display: swap` |
| **Preconnect** | `images.unsplash.com` (dns-prefetch + preconnect) |

## Image Optimization

- All images use Next.js `<Image>` component
- Quality set to `95` on every Image component
- Unsplash source URLs upgraded to `w=1200&q=90`
- `priority` prop on above-fold hero/banner images
- `sizes` prop configured for responsive breakpoints

## State Management

No external state library. All state is local via `useState`:

| Component | State |
|-----------|-------|
| Navbar | mobileOpen, activeDropdown, hoveredItem, scrolled |
| SplashScreen | isVisible, removed |
| Hero | paused (video) |
| StatsSection | activeTab |
| TabbedContent | activeTab |
| EventsSection | canScrollLeft, canScrollRight |
| Contact form | form fields, submitState |
| PageTransition | hasNavigated |

## Tailwind Custom Theme

### Colors
- **Primary Blues**: #F5F9FF → #005AA8 → #001222
- **Neutrals**: #F7F7F7 → #0D0D0D
- **Accent**: #005AA8 (light: #2273B9, dark: #004886)

### Typography
- Display: 64px (light)
- Heading-1: 52px, Heading-2: 40px, Heading-3: 32px, Heading-4: 24px
- Body: 16px, Body-sm: 14px

### Breakpoints
- sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px, 3xl: 1920px

## Build Commands

```bash
npm run dev      # Development server (http://localhost:3000)
npm run build    # Production build
npm start        # Start production server
npm run lint     # Run Next.js linter
```

## Known Limitations

| Item | Status |
|------|--------|
| Contact form backend | Not wired — simulates success |
| Newsletter forms | Not wired — preventDefault() only |
| "Fellowships", "Videos", "Conference" nav links | Point to # |
| No CMS | Content hardcoded in TypeScript |
| No search | Browse-only navigation |
| No analytics | Google Analytics not installed |
| No API routes | src/app/api/ doesn't exist |