# AI Agency Landing Page — Premium Template

A dark, cinematic landing page for AI and digital agencies. Features a full-screen video background, glassmorphism UI widgets, scroll-driven parallax, character-level text animations, and a complete set of agency sections.

---

## Features

- **Cinematic hero** — Full-screen video background with gradient fallback, animated overlay grid, and floating stat cards
- **Premium text reveals** — Three distinct animation patterns: character split (3D rotate), word blur, and fade-up, all using a signature custom easing curve
- **Scroll-driven parallax** — Every section has subtle Y-offset parallax on cards, images, and decorative elements
- **Interactive navigation** — Animated tab indicator with shared layout animations (spring physics), frosted menu button, slide-in mobile menu
- **Complete agency sections** — Team intro, services, featured projects, founder bio, achievements, statistics, creative team, testimonials, pricing, contact form, and footer
- **Testimonial carousel** — Directional slide transitions with drag-sync dots and live client photos
- **Modal system** — Four animated modals (pricing, services, booking, projects) with spring scale-in and filtered project grid with layout animations
- **Fully responsive** — Mobile-first with Tailwind `md:` breakpoint; nav, cards, and grids adapt across all screen sizes
- **Dark theme** — Black/dark navy palette with cyan accent (`#00c6ff`), glassmorphism panels, and subtle ambient glow effects

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Language | TypeScript 5.8 |
| Build | Vite 6 |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion 12 / Motion 12 |
| Icons | Lucide React |

---

## Sections Included

| # | Section | File |
|---|---------|------|
| 1 | Navigation | `src/components/Navigation.tsx` |
| 2 | Hero (video + headline + CTAs) | `src/App.tsx` |
| 3 | Right sidebar widgets | `src/components/RightSidebar.tsx` |
| 4 | Stat cards | `src/components/StatCard.tsx` |
| 5 | Team intro | `src/components/TeamIntroSection.tsx` |
| 6 | Services | `src/components/ServicesSection.tsx` |
| 7 | Featured project | `src/components/FeaturedProjectSection.tsx` |
| 8 | Founder | `src/components/FounderSection.tsx` |
| 9 | Achievements | `src/components/AchievementsSection.tsx` |
| 10 | Statistics | `src/components/StatisticsSection.tsx` |
| 11 | Creative team | `src/components/CreativeTeamSection.tsx` |
| 12 | Testimonials | `src/components/TestimonialSection.tsx` |
| 13 | Pricing | `src/components/PricingSection.tsx` |
| 14 | Contact | `src/components/ContactSection.tsx` |
| 15 | Footer | `src/components/FooterSection.tsx` |
| 16 | Pricing modal | `src/components/PricingModal.tsx` |
| 17 | Services modal | `src/components/ServicesModal.tsx` |
| 18 | Booking modal | `src/components/BookingModal.tsx` |
| 19 | Projects modal | `src/components/ProjectsModal.tsx` |

---

## Getting Started

### Prerequisites

- Node.js 18+

### Installation

```bash
npm install
npm run dev
```

Opens at `http://localhost:3000`.

### Build

```bash
npm run build
```

Output in `dist/`.

---

## Customization Guide

### Colors & Theme

The project uses Tailwind CSS 4. The primary accent color is `#00c6ff` (cyan). To change the theme:

1. Edit `src/index.css` — this is where Tailwind is configured
2. Replace cyan color values across the codebase (search `#00c6ff` and `#0EA5E9`)
3. Background colors use `#080808`, `#000005`, `#14141e` — adjust these for a lighter theme

### Content

Each section file in `src/components/` contains its own data (client lists, team members, pricing plans, stats, etc.). Edit the arrays/objects at the top of each component to replace with your content.

| Section | Data location |
|---------|--------------|
| Team members | `TeamIntroSection.tsx` — `teamMembers` array |
| Services | `ServicesSection.tsx` — `services` array |
| Achievements | `AchievementsSection.tsx` — `achievements` and `award` data |
| Statistics | `StatisticsSection.tsx` — stat counters |
| Team cards | `CreativeTeamSection.tsx` — `teamMembers` array |
| Testimonials | `TestimonialSection.tsx` — `clients` array |
| Pricing | `PricingSection.tsx` — `plans` array |
| Nav tabs | `Navigation.tsx` — `tabs` array |
| Hero headline | `App.tsx` — headline text + subheading |

### Video Background

Replace the video URL in `src/App.tsx` (search `hero-background-video`). The video plays on loop, muted, with a gradient fallback if the video fails to load.

### Images

All images use external URLs (Cloudinary/Unsplash). Replace with your own image URLs. Images with `mix-blend-luminosity` class use a stylistic desaturated effect — remove this class for full-color images.

### Animations

The signature easing curve `[0.16, 1, 0.3, 1]` is defined inline in every `transition` prop. To adjust global animation feel:

- **Slower/faster reveals** — Change `duration: 1.1` in `charVariants` and `duration: 0.9` in `fadeUpVariants`
- **Remove parallax** — Delete the `useScroll`/`useTransform` block and the `style` prop on the target element in any section
- **Disable text animations** — Replace `SplitChars` components with plain `<span>` text

---

## Project Structure

```
src/
  App.tsx                    — Main app: hero section, menu overlay, modal wiring
  main.tsx                   — Entry point
  index.css                  — Tailwind imports
  components/
    Navigation.tsx            — Header nav bar with animated tabs
    StatCard.tsx              — Floating stat metric cards
    RightSidebar.tsx          — Right-side agent/social widgets
    TeamIntroSection.tsx      — About/team introduction
    ServicesSection.tsx       — Services grid
    FeaturedProjectSection.tsx — Featured case study
    FounderSection.tsx        — Founder photo/bio
    AchievementsSection.tsx   — Awards and milestones
    StatisticsSection.tsx     — Animated number counters
    CreativeTeamSection.tsx   — Team member cards with expand
    TestimonialSection.tsx    — Client testimonial carousel
    PricingSection.tsx        — Pricing plan cards
    ContactSection.tsx        — Contact form with magnetic button
    FooterSection.tsx         — Footer with links and socials
    PricingModal.tsx          — Pricing checkout modal
    ServicesModal.tsx         — Service detail modal
    BookingModal.tsx          — Booking/scheduling modal
    ProjectsModal.tsx         — Project portfolio modal with filtering
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | TypeScript type-check |

---

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge). Requires CSS `backdrop-filter` support for glassmorphism effects.

---

## License

This template is licensed for use by the purchaser. Redistribution as a template is prohibited.
