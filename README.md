# MetaCraze — Social Media Marketing Agency Website

A premium, multi-page marketing site built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4,
Framer Motion, GSAP-ready setup, Swiper, Lenis smooth scroll, React CountUp and Lucide icons.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Note on fonts:** This project uses `next/font/google` (Outfit, Inter, Poppins), which fetches
> font files from Google Fonts at build time. Make sure you have an internet connection the first
> time you run `npm run dev` or `npm run build`.

## Pages (true multi-page routing via App Router)

| Route        | Description                                   |
|--------------|------------------------------------------------|
| `/`          | Home — hero, services, growth stats, process, projects, testimonials, pricing, FAQ |
| `/about`     | Agency story, mission/vision, timeline, team, culture |
| `/services`  | All 10 services in detail, pricing, FAQ        |
| `/projects`  | Filterable portfolio, before/after case study  |
| `/contact`   | Contact form, office info, map placeholder, FAQ |

Every page has its own hero and unique section layouts, and the Navbar/Footer stay consistent
across all routes with animated page transitions (Framer Motion) between them.

## Project Structure

```
app/
  layout.tsx          Root layout — fonts, Navbar, Footer, smooth scroll, SEO metadata
  page.tsx             Home
  about/page.tsx
  services/page.tsx
  projects/page.tsx
  contact/page.tsx
  globals.css          Design tokens, brand colors, glass/gradient utilities

components/
  Navbar.tsx, Footer.tsx, PageTransition.tsx, SmoothScroll.tsx
  ui/                  Reusable primitives (Button, Reveal, SectionHeading, Stat, Accordion, Marquee, BeforeAfterSlider)
  sections/
    home/, about/, services/, projects/, contact/   Page-specific sections

lib/
  data.ts              Central content source (services, projects, testimonials, pricing, team, FAQs)
  utils.ts             cn() classname helper
```

## Customizing

- **Brand colors & fonts**: `app/globals.css` (`:root` and `@theme inline` blocks).
- **Content**: `lib/data.ts` — swap in real copy, images, team photos, testimonials, pricing.
- **Images**: Currently sourced from Unsplash (`images.unsplash.com`, allow-listed in
  `next.config.ts`). Replace with your own assets in `/public` or another remote host — remember to
  add new domains to `next.config.ts` under `images.remotePatterns`.

## Build for production

```bash
npm run build
npm run start
```
