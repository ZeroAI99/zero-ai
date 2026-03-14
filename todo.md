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

## Logo Update
- [x] Upload new Zero AI logo (green circle + lightning bolt + ZERO AI text) to CDN
- [x] Replace logo in Navbar, Footer, Admin Dashboard, favicon, OG/Twitter meta tags, README

## Domain
- [ ] Bind custom domain zeroai.vip in Management UI Settings → Domains

## Fitur Tambahan (Maret 2026)
- [x] Logo Zero AI di IntroScreen dengan efek glow hijau
- [x] Navbar desktop menampilkan nama section + angka (bukan hanya angka 01-07)
- [x] Footer diperluas dengan grid 4 kolom (Brand, Product, Technology, Connect)
- [x] Footer menampilkan nama brand ZERO AI + deskripsi singkat
- [x] GitHub repo rebuild dengan satu commit bersih, author "Zero AI"
- [x] GitHub topics ditambahkan (ai, personal-ai, react, typescript, trpc, dll)

## Docs & Transitions
- [x] Halaman /docs dengan 8 seksi teknis (Overview, Architecture, Constitutional Memory, Governance Engine, Agency Levels, Data Model, API Reference, Technical Roadmap)
- [x] Sidebar navigasi sticky di halaman /docs dengan anchor links
- [x] Code blocks dengan syntax highlighting dan tombol copy
- [x] Animasi fade-out premium di IntroScreen: glitch flash + blur dissolve + scale
- [x] Logo Zero AI di IntroScreen dengan efek glow hijau
- [x] Link "Docs" di Navbar mengarah ke /docs
- [x] Route /docs ditambahkan di App.tsx

## Fitur Lengkap (Rebuild - Maret 2026)
- [ ] Halaman /changelog dengan versi history Zero AI
- [ ] Halaman /blog atau /updates untuk artikel/berita
- [ ] Contact form di halaman CTA (nama, email, pesan) dengan backend
- [ ] Newsletter subscribe di footer (simpan ke DB)
- [ ] Loading skeleton di semua data fetch
- [ ] Toast notification yang lebih informatif
- [ ] 404 page yang sesuai branding Zero AI
- [ ] Halaman /privacy-policy dan /terms
- [ ] SEO meta tags yang lebih lengkap (JSON-LD structured data)
- [ ] GitHub repo: squash semua commit jadi 1 commit bersih author "Zero AI"
- [ ] GitHub repo: description, topics, homepage, social preview image
- [ ] README.md yang sangat lengkap dengan badges, screenshots, installation guide

## Email & Live Counter (Maret 2026)
- [x] Ganti logo dengan URL baru https://iili.io/q1H6tnV.webp (upload ke CDN)
- [x] Resend email integration untuk konfirmasi waitlist otomatis
- [x] Email template HTML branded Zero AI dengan nomor antrian
- [x] Counter waitlist live di Hero section (real-time dari database, refresh setiap 30s)
- [x] Push ke GitHub dengan author Zero AI
