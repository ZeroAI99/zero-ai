# Zero AI - Project TODO

## Core Website
- [x] Basic landing page with Obsidian Precision dark design
- [x] 7 main sections: Hero, Introduction, Problem, Product, Agency Levels, Science, Constitutional Memory, Roadmap
- [x] Testimonials and FAQ sections
- [x] CTA section with waitlist modal
- [x] Navbar with logo and navigation
- [x] Footer with social links

## Design & UX
- [x] Intro/welcome screen inspired by odei.ai with terminal typewriter effect
- [x] YES/NO buttons with border styling
- [x] Section navigation grid in intro screen
- [x] Zero AI logo (green circle with lightning bolt) in Navbar, IntroScreen, Footer
- [x] Social media links: X/Twitter (@_zeroai), GitHub (ZeroAI99), Instagram, LinkedIn
- [x] Mobile menu without numbers (01, 02, etc.)
- [x] Cursor glow effect
- [x] Particle canvas animation in intro screen
- [x] Scroll progress bar
- [x] Back-to-top button
- [x] Animated stats bar with counters
- [x] Session-based skip intro for returning visitors

## Backend & Database
- [x] Full-stack upgrade with tRPC + Express
- [x] PostgreSQL database with Drizzle ORM
- [x] Waitlist table (email, name, role, message, status, timestamps)
- [x] Waitlist API: join, list, count procedures
- [x] Owner notification on new waitlist signup
- [x] AI Chat Demo section with LLM integration
- [x] 6 unit tests passing

## Admin Dashboard
- [x] Admin Dashboard at /admin route
- [x] Authentication check (admin role required)
- [x] Waitlist entries table with email, name, role, message, timestamp
- [x] Status filter (pending/approved/rejected)
- [x] Search functionality
- [x] Status update (approve/reject) actions
- [x] Stats cards (total, pending, approved, rejected)
- [x] updateStatus tRPC procedure in server/routers.ts

## GitHub
- [x] Repository at github.com/ZeroAI99/zero-ai
- [x] Git author set to ZeroAI99
- [x] Comprehensive README.md with tech stack and roadmap
- [x] 10 GitHub topics/tags for discoverability
- [x] Homepage set to zeroai.vip
- [x] README logo updated to use actual Zero AI logo from CDN
- [x] CI badge added to README

## CI/CD
- [x] GitHub Actions CI workflow (.github/workflows/ci.yml)
- [x] Auto-run tests on push to main/develop
- [x] Auto-run build check
- [x] Format check job

## SEO & Meta
- [x] Favicon with Zero AI logo
- [x] OG/Twitter meta tags
- [x] Canonical URL pointing to zeroai.vip

## Domain
- [ ] Bind custom domain zeroai.vip in Management UI Settings → Domains
