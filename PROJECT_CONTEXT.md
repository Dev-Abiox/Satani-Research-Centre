# Satani Research Centre — Complete Project Context

> **Purpose:** Give this file to any AI agent to instantly understand the entire project without exploration. Last updated: 2026-04-10.

---

## Quick Start

```bash
npm run dev      # http://localhost:3000
npm run build    # Production build
npm start        # Start production server
```

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 14.2.35 | App Router framework |
| React | 18.3.1 | UI library |
| TypeScript | 6.0.2 | Type safety |
| Tailwind CSS | 3.4.19 | Styling |
| Framer Motion | 12.38.0 | Animations |
| Lottie React | 2.4.1 | Brain loading animation |
| Sharp | 0.34.5 | Image optimization |

---

## All Routes

| Route | File | Client/Server | Title |
|-------|------|---------------|-------|
| `/` | `src/app/page.tsx` | Server | Home \| Satani Research Centre |
| `/about` | `src/app/about/page.tsx` | Server | About |
| `/our-mission` | `src/app/our-mission/page.tsx` | Server | Our Mission |
| `/team` | `src/app/team/page.tsx` | Server | Team |
| `/research-topics` | `src/app/research-topics/page.tsx` | Client | Research Topics |
| `/projects` | `src/app/projects/page.tsx` | Client | Projects |
| `/patents` | `src/app/patents/page.tsx` | Client | Patents |
| `/publications` | `src/app/publications/page.tsx` | Client | Publications |
| `/careers` | `src/app/careers/page.tsx` | Client | Careers |
| `/insights` | `src/app/insights/page.tsx` | Client | Insights |
| `/insights/[slug]` | `src/app/insights/[slug]/page.tsx` | Client | Dynamic |
| `/resources` | `src/app/resources/page.tsx` | Server | Resources |
| `/resources/[slug]` | `src/app/resources/[slug]/page.tsx` | Client | Dynamic |
| `/contact` | `src/app/contact/page.tsx` | Client | Contact |
| `/privacy-policy` | `src/app/privacy-policy/page.tsx` | Server | Privacy Policy |
| `/terms-and-conditions` | `src/app/terms-and-conditions/page.tsx` | Server | Terms & Conditions |
| `/procurement` | `src/app/procurement/page.tsx` | Server | Procurement |
| 404 | `src/app/not-found.tsx` | Server | Not Found |

---

## Layout Chain

```
RootLayout (src/app/layout.tsx)
├── <head> — DNS prefetch, preconnect, JSON-LD schema
├── <body>
│   ├── #__splash_prehydration (dark cover, hidden on non-homepage via inline script)
│   ├── <Navbar /> (fixed top, z-800)
│   ├── <main>
│   │   └── <PageTransition> (fade on route change, skips initial load)
│   │       └── {page content}
│   ├── <Footer />
│   └── <BackToTop /> (appears after 400px scroll)
```

## Homepage Component Order

```
1. SplashScreen (Lottie brain, 1.2s, fades out)
2. Hero (video bg + FlowingLines canvas + h1)
3. StatsSection (4 auto-advancing tabs)
4. MediaCTA (newsletter CTA)
5. TabbedContent (6 project tabs)
6. EventsSection heading="Patent" (3 cards)
7. EventsSection heading="Publications" (8 cards)
8. CareerCTA
9. NewsInsights (7 news cards)
10. EventsSection heading="Resources" (5 cards)
```

---

## Navbar Structure

**File:** `src/components/Navbar.tsx`

### Link URL Mappings (line 8-21)
```
About Us → /about
Our Mission → /our-mission
Team → /team
Research Topic → /research-topics
Patent → /patents
Preprint → /publications?section=preprints
Publication → /publications?section=publications
Open Positions & Internship → /careers
Articles → /insights
Projects → /projects
Resources → /resources
Conference → # (DEAD LINK)
```

### Menu Structure
```
Company
├── Organisation: About Us, Our Mission, Team
└── Join Us: Open Positions & Internship, Fellowships (Upcoming) ← DEAD LINK

Publications
├── Research Output: Patent, Publication, Preprint, Conference ← DEAD LINK
└── News and Media: Articles, Videos ← DEAD LINK

Projects
└── Research Topic, Projects, Resources
```

### Dead Links: Fellowships (Upcoming), Videos, Conference — all fall back to `#`

---

## All Components

### Layout
| Component | File | Purpose |
|-----------|------|---------|
| Navbar | `src/components/Navbar.tsx` | Fixed mega-menu, mobile slide-in |
| Footer | `src/components/Footer.tsx` | Newsletter forms, social links (LinkedIn, Instagram) |
| PageTransition | `src/components/PageTransition.tsx` | 0.3s fade on route change |
| BackToTop | `src/components/BackToTop.tsx` | Scroll-to-top, shows after 400px |
| SectionWrapper | `src/components/SectionWrapper.tsx` | Padding/bg wrapper |

### Homepage
| Component | File | Purpose |
|-----------|------|---------|
| SplashScreen | `src/components/SplashScreen.tsx` | Lottie brain loader (homepage only) |
| Hero | `src/components/Hero.tsx` | Video bg, FlowingLines, h1 |
| FlowingLines | `src/components/FlowingLines.tsx` | Canvas Bezier curves |
| StatsSection | `src/components/StatsSection.tsx` | 4 tabs with stats + images |
| TabbedContent | `src/components/TabbedContent.tsx` | 6 project tabs |
| EventsSection | `src/components/EventsSection.tsx` | Horizontal card carousel |
| NewsInsights | `src/components/NewsInsights.tsx` | News card carousel |
| MediaCTA | `src/components/MediaCTA.tsx` | Newsletter CTA |
| CareerCTA | `src/components/CareerCTA.tsx` | Career CTA |

### Cards
| Component | File | Props |
|-----------|------|-------|
| ResearchCard | `src/components/ResearchCard.tsx` | icon, title, description |
| TeamMemberCard | `src/components/TeamMemberCard.tsx` | name, role, bio, imageUrl? |
| InsightCard | `src/components/insights/InsightCard.tsx` | article: InsightArticle |
| ResourceCard | `src/components/resources/ResourceCard.tsx` | resource: ResourceItem |
| InsightsBanner | `src/components/insights/InsightsBanner.tsx` | None |
| InsightsGrid | `src/components/insights/InsightsGrid.tsx` | articles[] |
| ResourcesBanner | `src/components/resources/ResourcesBanner.tsx` | None |
| ResourcesGrid | `src/components/resources/ResourcesGrid.tsx` | resources[] |
| Timeline | `src/components/Timeline.tsx` | milestones[] |

---

## Data Files

### insights.ts (7 articles)
```typescript
interface InsightArticle { id, title, imageUrl, date, slug }
// Images: /images/news/News1.jpg - News7.jpg
// Slugs: dbs-surgery-london, cognitively-operated-system, computer-whisperer,
//        brain-computer-interface, dentist-chair-eeg, detecting-alzheimers-early,
//        biase-deep-learning
```

### articleContent.ts (7 full articles)
```typescript
interface ContentBlock { type: "heading" | "paragraph" | "author", text: string }
// Each article: slug, title, date, location, imageUrl, breadcrumbLabel, content[]
```

### resources.ts (5 resources)
```typescript
type ResourceType = "Product/Service Material" | "Publication" | "Poster" | "Podcast" | "Form" | "Catalog/Price List"
interface ResourceItem { id, type, title, description?, imageUrl, slug, layout }
// Images: /images/Resources/R1.jpg - R5.jpg
// Slugs: enhance-cgt-manufacturing, biopharma-resources-pipeline,
//        strategic-biomarker-discovery, analytical-methods-biologics,
//        preclinical-safety-assessment
```

### resourceContent.ts (5 full resources)
```typescript
// Same ContentBlock interface, plus optional pdfUrl
// 1 PDF: /How-to-Efficiently-and-Critically-Read-a-Research-Paper.pdf
```

---

## Forms

### Contact Form (`src/app/contact/page.tsx`)
- **Fields:** firstName*, lastName*, email*, phone, country*, address*, city*, state*, area*, message*, optIn
- **State:** idle → submitting → success/error
- **Backend:** NOT WIRED — simulates success after 1s timeout
- **Does NOT reset** form after success (known bug)
- **Does NOT send** data anywhere

### Footer Newsletter (`src/components/Footer.tsx`)
- **Fields:** email input (mobile + desktop versions)
- **Backend:** NOT WIRED — `onSubmit={(e) => e.preventDefault()}`

### MediaCTA Newsletter (`src/components/MediaCTA.tsx`)
- **Fields:** email input
- **Backend:** NOT WIRED — TODO comment on line 13

---

## Tailwind Custom Theme

### Colors
```
Primary: #F5F9FF → #005AA8 (500) → #001222 (900)
Neutral: #F7F7F7 → #0D0D0D
Accent: #005AA8, light: #2273B9, dark: #004886, panel: #003D99, career: #001739
```

### Typography
```
Font: Inter (Google Fonts, display: swap)
display: 64px/light, heading-1: 52px, heading-2: 40px, heading-3: 32px, heading-4: 24px
body-lg: 18px, body: 16px, body-sm: 14px
```

### Breakpoints
```
sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px, 3xl: 1920px
```

---

## Animations

| Animation | Library | Duration | Trigger |
|-----------|---------|----------|---------|
| Brain splash | Lottie React | 1.2s | Page refresh (homepage) |
| Page transitions | Framer Motion | 0.3s | Route navigation |
| Hero heading | Framer Motion | 0.8s, 0.3s delay | Page load |
| Flowing lines | Canvas API | 9.5s/cycle | Continuous |
| Navbar dropdown | Framer Motion | 0.12s | Click |
| Mobile menu | Framer Motion | 0.3s | Click |
| Tab switch | Framer Motion | 0.2s | Tab click |
| Stats advance | CSS keyframes | 0.4s | Auto timer |
| Card image hover | CSS | 0.5s | Hover (scale 1.05) |
| Card shadow hover | CSS | 0.3s | Hover |

---

## SEO Setup

- **Metadata:** All 18 pages have unique title + description
- **Title template:** `%s | Satani Research Centre`
- **Sitemap:** 13 static + 7 insights + 5 resources = 25 URLs
- **Robots:** Allow all, sitemap link
- **JSON-LD:** ResearchOrganization schema
- **OpenGraph + Twitter Cards:** Configured in root layout
- **metadataBase:** `https://sataniresearchcentre.com`
- **Manifest:** `/site.webmanifest` (theme: #005AA8)
- **Font:** Inter with `display: swap`
- **Preconnect:** `images.unsplash.com`

---

## Image Optimization

- All `<Image>` components have `quality={95}`
- Unsplash URLs: `w=1200&q=90`
- `priority` on above-fold images
- `sizes` prop on all images
- Sharp for server-side optimization

---

## Public Assets

```
public/
├── animations/brain-loading.json       # Lottie splash animation
├── hero-video.mp4                      # Hero background video (21MB)
├── favicon.ico
├── site.webmanifest
├── How-to-Efficiently-and-Critically-Read-a-Research-Paper.pdf
└── images/
    ├── Team/ (10 photos: Abhijeet Satani, Param Barodia, Heth Joshi, etc.)
    ├── news/ (News1-7.jpg)
    ├── Publications/ (Pub1-8.jpg)
    ├── Resources/ (R1-5.jpg)
    ├── Projects/ (Project1.mp4, Project2.jpg, Project3.mp4, Project4.jpg)
    ├── Newsletter/ (N1.jpg)
    ├── Stats/ (AboutUs.jpg)
    ├── hero-poster.jpg
    └── join-our-team.jpg
```

---

## Known Bugs

| # | Bug | Severity | File |
|---|-----|----------|------|
| 1 | "Fellowships (Upcoming)" nav → # | High | Navbar.tsx |
| 2 | "Videos" nav → # | High | Navbar.tsx |
| 3 | "Conference" nav → # | High | Navbar.tsx:20 |
| 4 | Contact form doesn't reset after success | High | contact/page.tsx:112 |
| 5 | Contact form doesn't send data | Medium | contact/page.tsx:115 |
| 6 | Related article shows itself when only 1 | Medium | insights/[slug]:15 |
| 7 | Related resource shows itself when only 1 | Medium | resources/[slug]:15 |
| 8 | Footer newsletter does nothing | Low | Footer.tsx:25 |
| 9 | MediaCTA newsletter not wired | Low | MediaCTA.tsx:13 |

---

## State Management

Local `useState` only — no external state library.

| Component | State Variables |
|-----------|----------------|
| Navbar | mobileOpen, activeDropdown, hoveredItem, scrolled |
| SplashScreen | isVisible, removed |
| Hero | paused |
| StatsSection | activeTab |
| TabbedContent | activeTab |
| EventsSection | canScrollLeft, canScrollRight |
| Contact form | form (11 fields), submitState |
| PageTransition | hasNavigated |
| BackToTop | visible |

---

## Email Addresses Used

- `connect@sataniresearchcentre.com` — Career inquiries (contact page + careers page)
- `team@abhijeetsatani.com` — Team contact (contact page + careers page)

## Social Links

- LinkedIn: `https://www.linkedin.com/in/abhijeetsatani/`
- Instagram: `https://www.instagram.com/abhijeetsatani/`

---

## Config Files

| File | Purpose |
|------|---------|
| `next.config.js` | Unsplash remote patterns |
| `tailwind.config.ts` | Custom colors, typography, breakpoints |
| `tsconfig.json` | Strict mode, `@/*` path alias |
| `postcss.config.js` | Tailwind + Autoprefixer |
| `CLAUDE.md` | AI agent instructions |
| `TECHNICAL_DOCS.md` | Tech stack documentation |
| `PROJECT_CONTEXT.md` | This file |