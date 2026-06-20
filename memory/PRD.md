# PrivyAlgo WallStreet Terminal — Landing Page PRD

## Original Problem Statement
Build a high-end, enterprise-grade Turkish landing page for "PrivyAlgo WallStreet Terminal" — a quantitative algorithmic options trading platform. Cyber-finance / Wall Street black-box aesthetic. Deep black background, glassmorphism panels, amber #f59e0b primary accent, teal #2dd4bf and purple #a855f7 data accents. JetBrains Mono typography. All UI copy in TURKISH. Cyber-tech-heavy animations (particles + animated grid).

## Architecture
- Static React landing page (no backend logic added).
- Routing: single `/` route → `pages/Landing.jsx`.
- Sections: `Navbar`, `Hero` (terminal mockup + volatility surface), `Features` (Opus Wall, Greeks Heatmap, 0DTE Map, Interval Map), `Technology` (ThetaData/Alpaca/Deribit/Yahoo), `Community` (nFinans socials), `FooterSection`.
- Animated `CyberBackground` overlay (CSS grid + particles + scan-line) fixed behind content.

## User Personas
- Quant / options traders evaluating an institutional analytics terminal.
- Members / followers of the nFinans community arriving via YouTube / X / Instagram.

## Core Requirements (static)
- Turkish copy throughout.
- JetBrains Mono headings + numerical data; Inter body.
- Color palette: #000 background, amber #f59e0b primary, teal/purple data accents.
- Glassmorphism cards with amber hover-edge glow.
- Cyber-tech animated background.
- All interactive elements carry `data-testid` attributes.

## What's Been Implemented (2026-06-20)
- Animated cyber background (grid + particle drift + scan-line).
- Sticky glass navbar with desktop + mobile hamburger menu.
- Hero with Turkish headline, dual CTAs (Sisteme Eriş, Eğitimleri İzle → YouTube), ticker marquee, GEX/DEX terminal mockup, and SVG volatility surface.
- Features grid (4 cards) with custom per-card visualizations (heatmap, gamma profile, interval bars).
- Technology section with 4 data-partner cards + KPI stats.
- nFinans community section with real YouTube / X / Instagram links + quote.
- Footer with system-status panel, disclaimer, copyright.
- Tested 100% via testing_agent_v3 (iteration_1.json).

## Environment Fix
- `webpack-dev-server` resolution in `frontend/package.json` updated from 5.2.4 → 4.15.2 to match react-scripts 5.0.1 expectations (fixed `onAfterSetupMiddleware` schema error).

## Prioritized Backlog
- **P1**: Add proper internal routes for `/giris` (login) and `/egitim` (tutorials) if the actual terminal app gets wired in later.
- **P1**: Lead-capture form (e-mail bülten + demo isteği) → MongoDB; trade analytics e-mail sequence.
- **P2**: i18n switch (TR/EN) for an international audience.
- **P2**: Real WebGL volatility surface (three.js) replacing the SVG mock for added depth.
- **P2**: Add testimonials / customer logos once available.
- **P3**: A/B test alternate hero copy and CTA labels.

## Next Tasks
- Decide on lead-capture vs. pure marketing site.
- Wire actual terminal authentication URL into "Sisteme Eriş".
- Add OpenGraph / Twitter card meta tags + favicon optimization for sharing.
