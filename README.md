# Satani Research Centre

Official website for **Satani Research Centre (SRC)** — a biomedical research organisation advancing neuroscience, brain-computer interfaces, and translational medicine.

Built with Next.js 14 (App Router), TypeScript, and Tailwind CSS. Fully server-rendered with SSG for article pages, SEO-complete metadata and structured data, and a custom email pipeline via Nodemailer for contact + newsletter submissions.

**Live:** <https://sataniresearchcentre.com>

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | ^14.2.35 |
| UI | React | ^18.3.1 |
| Language | TypeScript | ^6.0.2 |
| Styling | Tailwind CSS | ^3.4.19 |
| Animation | Framer Motion | ^12.38.0 |
| Splash | Lottie React | ^2.4.1 |
| Mail | Nodemailer | ^8.0.5 |
| Images | Sharp, next/image (AVIF + WebP) | ^0.34.5 |

---

## Features

- **17 static routes** + 2 dynamic `[slug]` collections (insights, resources) with `generateStaticParams` → full SSG
- **Per-route metadata** with title templates, canonical URLs, OpenGraph, and Twitter cards
- **Structured data** (JSON-LD): `ResearchOrganization`, `WebSite` + `SearchAction`, `Article`, `BreadcrumbList`
- **Auto-generated** `sitemap.xml` and `robots.txt`
- **Security headers**: HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- **Contact + newsletter forms** wired to `/api/contact` and `/api/newsletter` with:
  - Server-side validation
  - Honeypot + timestamp anti-bot
  - Per-IP rate limiting
  - HTML-escaped email bodies via Nodemailer
- **Accessible navbar**: focus trap, Escape-to-close, Tab-loop inside the mobile drawer
- **Responsive** (375 → 1920 px verified): aspect-ratio banners, adaptive grids, font-scaled headings
- **Performance**: AVIF/WebP image formats, 30-day image cache TTL, font preloading, Inter weights 300–700, compressed banner assets (up to 95% smaller than source)
- **Splash screen** with Lottie brain animation and graceful logo fallback on slow connections

---

## Project Structure

```
.
├── public/
│   ├── animations/brain-loading.json         # Lottie splash
│   ├── images/
│   │   ├── Team/, news/, Publications/, Resources/, Projects/, Stats/, Newsletter/
│   │   ├── about-us-banner.jpg
│   │   ├── Our Mission banner.jpg
│   │   ├── patents-banner.jpg
│   │   ├── Publications/publication-banner.jpg
│   │   ├── Projects/projects-banner.jpg
│   │   ├── Open positions banner.webp
│   │   ├── Research Topic Banner.jpg
│   │   └── hero.jpg
│   ├── Logo.png
│   ├── og-default.jpg
│   └── site.webmanifest
├── src/
│   ├── app/
│   │   ├── layout.tsx                         # Root layout, metadata, JSON-LD
│   │   ├── page.tsx                           # Homepage
│   │   ├── about/, our-mission/, team/, careers/, contact/
│   │   ├── research-topics/, projects/, patents/, publications/
│   │   ├── insights/                          # + [slug]/
│   │   ├── resources/                         # + [slug]/
│   │   ├── privacy-policy/, terms-and-conditions/, procurement/
│   │   ├── api/
│   │   │   ├── contact/route.ts               # POST, nodemailer
│   │   │   └── newsletter/route.ts            # POST, nodemailer
│   │   ├── sitemap.ts, robots.ts
│   │   ├── not-found.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Navbar.tsx, Footer.tsx, BackToTop.tsx
│   │   ├── PageTransition.tsx, SplashScreen.tsx, ScrollToSection.tsx
│   │   ├── Hero.tsx, StatsSection.tsx, TabbedContent.tsx
│   │   ├── EventsSection.tsx, NewsInsights.tsx
│   │   ├── MediaCTA.tsx, CareerCTA.tsx
│   │   ├── TeamMemberCard.tsx, ResearchCard.tsx, Timeline.tsx
│   │   ├── insights/ (InsightCard, InsightsBanner, InsightsGrid)
│   │   └── resources/ (ResourceCard, ResourcesBanner, ResourcesGrid)
│   └── data/
│       ├── articleContent.ts, insights.ts      # 7 articles
│       └── resourceContent.ts, resources.ts    # 5 resources
├── next.config.js                             # Images, headers, AVIF/WebP
├── tailwind.config.ts                         # Custom theme
├── tsconfig.json
├── .env.example                               # Env template
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js **18.17+** (recommend 20.x)
- npm 10+
- A Hostinger mailbox (or any SMTP server) if you want the contact form to actually deliver mail

### Install
```bash
git clone https://github.com/Dev-Abiox/Satani-Research-Centre.git
cd Satani-Research-Centre
npm ci
```

### Configure environment
Copy the example and fill in real SMTP credentials:
```bash
cp .env.example .env.local
```
Edit `.env.local`:
```
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=your-mailbox@yourdomain.com
SMTP_PASS=your-password
```
> `.env.local` is gitignored — never commit real credentials.

### Run
```bash
npm run dev         # http://localhost:3000
```

### Build
```bash
npm run build       # optimized production build (34 pages)
npm run start       # serves the build on port 3000
```

---

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start dev server with HMR at <http://localhost:3000> |
| `npm run build` | Produce optimized production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run Next.js / ESLint rules |

---

## Environment Variables

All four are **server-side only** and used by the API routes. Never prefix with `NEXT_PUBLIC_`.

| Variable | Example | Used by |
|---|---|---|
| `SMTP_HOST` | `smtp.hostinger.com` | `api/contact`, `api/newsletter` |
| `SMTP_PORT` | `465` | same |
| `SMTP_USER` | `connect@sataniresearchcentre.com` | same |
| `SMTP_PASS` | _(mailbox password)_ | same |

Template: [`.env.example`](.env.example).

---

## Deployment (Hostinger VPS)

This project uses Node.js API routes and therefore requires a runtime, not static hosting. Recommended: **Hostinger KVM 1 VPS** (or higher).

### 1. Provision
Ubuntu 22.04 LTS, open ports 22/80/443.

### 2. Install Node.js 20 + PM2 + Nginx
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs nginx
npm install -g pm2
```

### 3. Clone + env + build
```bash
cd /var/www
git clone https://github.com/Dev-Abiox/Satani-Research-Centre.git
cd Satani-Research-Centre

cat > .env.production <<EOF
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=connect@sataniresearchcentre.com
SMTP_PASS=your-password
EOF
chmod 600 .env.production

npm ci
npm run build
pm2 start npm --name satani -- start
pm2 save
pm2 startup              # follow the printed command
```

### 4. Nginx reverse proxy
`/etc/nginx/sites-available/satani`:
```nginx
server {
    listen 80;
    server_name sataniresearchcentre.com www.sataniresearchcentre.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```
Enable + reload:
```bash
ln -s /etc/nginx/sites-available/satani /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

### 5. SSL via Let's Encrypt
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d sataniresearchcentre.com -d www.sataniresearchcentre.com
```

### 6. Future deploys
```bash
cd /var/www/Satani-Research-Centre
git pull
npm ci
npm run build
pm2 restart satani
```

---

## Routes

| Route | Type | Description |
|---|---|---|
| `/` | Static | Home — hero, stats, projects, events, news |
| `/about` | Static | About the centre |
| `/our-mission` | Static | Mission statement |
| `/team` | Static | Team profiles |
| `/research-topics` | Static | Research focus areas |
| `/patents` | Static | Patent portfolio |
| `/publications` | Static | Publications, preprints, conferences (`?section=` deep-linking) |
| `/projects` | Static | Active research projects |
| `/insights` | Static | News index |
| `/insights/[slug]` | SSG | Individual article |
| `/resources` | Static | Resource library |
| `/resources/[slug]` | SSG | Individual resource |
| `/careers` | Static | Open positions |
| `/contact` | Static | Contact form (POST → `/api/contact`) |
| `/privacy-policy` | Static | Legal |
| `/terms-and-conditions` | Static | Legal |
| `/procurement` | Static | Procurement policy |
| `/sitemap.xml` | Auto | Generated from `src/app/sitemap.ts` |
| `/robots.txt` | Auto | Generated from `src/app/robots.ts` |
| `/api/contact` | Serverless | POST — contact form submissions |
| `/api/newsletter` | Serverless | POST — newsletter subscriptions |

---

## Data Files

Content lives in TypeScript, not a CMS:

| File | Purpose |
|---|---|
| [`src/data/insights.ts`](src/data/insights.ts) | 7 article metadata entries |
| [`src/data/articleContent.ts`](src/data/articleContent.ts) | Full body blocks for each article |
| [`src/data/resources.ts`](src/data/resources.ts) | 5 resource metadata entries |
| [`src/data/resourceContent.ts`](src/data/resourceContent.ts) | Full body blocks for each resource |

Adding new content = edit these files + drop an image in `public/images/news/` or `public/images/Resources/` + rebuild.

---

## Brand Theme

Custom Tailwind theme in [`tailwind.config.ts`](tailwind.config.ts):

- **Primary:** `#005AA8` (SRC brand blue)
- **Accent scale:** default / light / dark / panel / career
- **Neutral scale:** `#F7F7F7` → `#0D0D0D`
- **Font:** Inter (Google Fonts, weights 300–700, `display: swap`)
- **Breakpoints:** `sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`, `3xl 1920`
- **Typography scale:** display 64px → body-sm 14px

---

## License

© Satani Research Centre. All rights reserved.

---

## Contact

- **General:** connect@sataniresearchcentre.com
- **Team:** team@abhijeetsatani.com
- **LinkedIn:** <https://www.linkedin.com/in/abhijeetsatani/>
- **Instagram:** <https://www.instagram.com/abhijeetsatani/>
