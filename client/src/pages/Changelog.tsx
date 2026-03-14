/*
 * ZERO AI — Changelog Page
 * Design: Obsidian Precision — dark, minimal, monospace
 */

import { Link } from "wouter";

const LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663342337625/biHYpnWi4gbAo4jVFbvk4g/zero-ai-logo-v2_57ca5299.webp";

const RELEASES = [
  {
    version: "v0.3.0",
    date: "2026-03-15",
    tag: "CURRENT",
    tagColor: "oklch(0.76 0.18 155)",
    title: "Documentation & Transitions",
    description: "Technical documentation portal and premium UI transitions.",
    changes: [
      { type: "feat", text: "Added /docs page with 8 technical sections: Architecture, Constitutional Memory, Governance Engine, Agency Levels, Data Model, API Reference, Technical Roadmap" },
      { type: "feat", text: "Sticky sidebar navigation with anchor links in /docs" },
      { type: "feat", text: "Code blocks with syntax highlighting and one-click copy" },
      { type: "feat", text: "Premium IntroScreen fade-out: glitch flash → blur dissolve → scale transition" },
      { type: "feat", text: "Logo with glow effect in IntroScreen" },
      { type: "feat", text: "Docs link added to Navbar" },
      { type: "improve", text: "Navbar desktop now shows full section names alongside numbers (01–07)" },
      { type: "improve", text: "Footer expanded to 4-column grid with brand description" },
    ],
  },
  {
    version: "v0.2.0",
    date: "2026-03-14",
    tag: "STABLE",
    tagColor: "oklch(0.65 0.15 220)",
    title: "Admin Dashboard & GitHub Integration",
    description: "Admin panel for waitlist management and full GitHub repository setup.",
    changes: [
      { type: "feat", text: "Admin Dashboard at /admin with role-based access control" },
      { type: "feat", text: "Waitlist management: view, approve, reject entries with status filters" },
      { type: "feat", text: "Stats cards: total, pending, approved, rejected counts" },
      { type: "feat", text: "GitHub Actions CI/CD pipeline: auto-run tests and build on push" },
      { type: "feat", text: "New Zero AI logo (green circle + lightning bolt) deployed across all surfaces" },
      { type: "feat", text: "GitHub repository at github.com/ZeroAI99/zero-ai with topics and description" },
      { type: "fix", text: "Git author name changed from manus-agent to Zero AI" },
      { type: "improve", text: "README.md with CI badge, logo, tech stack, and roadmap" },
    ],
  },
  {
    version: "v0.1.0",
    date: "2026-03-13",
    tag: "FOUNDATION",
    tagColor: "oklch(0.55 0.08 265)",
    title: "Foundation Release",
    description: "Initial launch of the Zero AI landing page and waitlist system.",
    changes: [
      { type: "feat", text: "Full landing page with 7 sections: Hero, Introduction, Problem, Product, Agency Levels, Science, Constitutional Memory, Roadmap" },
      { type: "feat", text: "IntroScreen with terminal typewriter effect, YES/NO buttons, particle canvas" },
      { type: "feat", text: "Waitlist system with email, name, role, and message fields" },
      { type: "feat", text: "AI Chat Demo powered by Zero AI LLM persona" },
      { type: "feat", text: "Testimonials and FAQ sections" },
      { type: "feat", text: "Animated stats bar with counters" },
      { type: "feat", text: "Cursor glow effect, scroll progress bar, back-to-top button" },
      { type: "feat", text: "Full-stack: React 19 + tRPC + Express + MySQL/TiDB" },
      { type: "feat", text: "Owner notification on new waitlist signup" },
    ],
  },
];

const TYPE_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  feat: { bg: "oklch(0.76 0.18 155 / 0.12)", text: "oklch(0.76 0.18 155)", label: "feat" },
  fix: { bg: "oklch(0.7 0.18 25 / 0.12)", text: "oklch(0.75 0.18 25)", label: "fix" },
  improve: { bg: "oklch(0.65 0.15 220 / 0.12)", text: "oklch(0.7 0.15 220)", label: "improve" },
  break: { bg: "oklch(0.65 0.2 0 / 0.12)", text: "oklch(0.7 0.2 0)", label: "breaking" },
};

const mono = "'IBM Plex Mono', monospace";
const syne = "'Syne', sans-serif";
const dm = "'DM Sans', sans-serif";

export default function Changelog() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.075 0.008 265)", color: "oklch(0.93 0.005 265)" }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          background: "oklch(0.075 0.008 265 / 0.92)",
          backdropFilter: "blur(12px)",
          borderColor: "rgba(255,255,255,0.06)",
        }}
      >
        <div className="container">
          <div className="flex items-center justify-between h-14">
            <Link href="/">
              <a className="flex items-center gap-2">
                <img src={LOGO} alt="Zero AI" className="w-7 h-7 object-contain" />
                <span
                  className="text-sm font-semibold"
                  style={{ fontFamily: syne, color: "oklch(0.93 0.005 265)" }}
                >
                  ZERO AI
                </span>
              </a>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/docs">
                <a
                  className="text-xs transition-colors"
                  style={{ fontFamily: dm, color: "oklch(0.55 0.01 265)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.85 0.005 265)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.55 0.01 265)")}
                >
                  Docs
                </a>
              </Link>
              <Link href="/">
                <a
                  className="text-xs transition-colors"
                  style={{ fontFamily: dm, color: "oklch(0.55 0.01 265)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.85 0.005 265)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.55 0.01 265)")}
                >
                  ← Back to Home
                </a>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="container py-16">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-xs tracking-widest uppercase"
              style={{ fontFamily: mono, color: "oklch(0.76 0.18 155)" }}
            >
              Release History
            </span>
            <span
              className="flex-1 h-px"
              style={{ background: "oklch(0.76 0.18 155 / 0.3)" }}
            />
          </div>
          <h1
            className="font-bold mb-3"
            style={{ fontFamily: syne, fontSize: "clamp(2rem, 4vw, 3rem)", color: "oklch(0.95 0.005 265)" }}
          >
            Changelog
          </h1>
          <p
            className="max-w-lg"
            style={{ fontFamily: dm, color: "oklch(0.55 0.01 265)", lineHeight: 1.7 }}
          >
            Every change to Zero AI is documented here. We ship fast, document everything, and never break what you depend on.
          </p>
        </div>
      </div>

      {/* Releases */}
      <div className="container py-16">
        <div className="max-w-3xl">
          {RELEASES.map((release, idx) => (
            <div
              key={release.version}
              className="relative"
              style={{ paddingLeft: "2rem", marginBottom: idx < RELEASES.length - 1 ? "4rem" : 0 }}
            >
              {/* Timeline line */}
              {idx < RELEASES.length - 1 && (
                <div
                  className="absolute left-[7px] top-8 bottom-0 w-px"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                />
              )}

              {/* Timeline dot */}
              <div
                className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2"
                style={{
                  background: idx === 0 ? "oklch(0.76 0.18 155)" : "oklch(0.12 0.008 265)",
                  borderColor: idx === 0 ? "oklch(0.76 0.18 155)" : "rgba(255,255,255,0.15)",
                  boxShadow: idx === 0 ? "0 0 12px oklch(0.76 0.18 155 / 0.5)" : "none",
                }}
              />

              {/* Release header */}
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span
                  className="text-lg font-bold"
                  style={{ fontFamily: mono, color: "oklch(0.93 0.005 265)" }}
                >
                  {release.version}
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded-sm font-semibold tracking-wider"
                  style={{
                    fontFamily: mono,
                    color: release.tagColor,
                    background: `${release.tagColor.replace(")", " / 0.12)")}`,
                    border: `1px solid ${release.tagColor.replace(")", " / 0.3)")}`,
                  }}
                >
                  {release.tag}
                </span>
                <span
                  className="text-xs"
                  style={{ fontFamily: mono, color: "oklch(0.45 0.008 265)" }}
                >
                  {release.date}
                </span>
              </div>

              <h2
                className="font-bold mb-2"
                style={{ fontFamily: syne, fontSize: "1.25rem", color: "oklch(0.88 0.005 265)" }}
              >
                {release.title}
              </h2>
              <p
                className="mb-5 text-sm"
                style={{ fontFamily: dm, color: "oklch(0.55 0.01 265)", lineHeight: 1.7 }}
              >
                {release.description}
              </p>

              {/* Changes list */}
              <div
                className="rounded-sm border p-5 space-y-2.5"
                style={{
                  background: "oklch(0.1 0.008 265)",
                  borderColor: "rgba(255,255,255,0.06)",
                }}
              >
                {release.changes.map((change, i) => {
                  const typeStyle = TYPE_COLORS[change.type] ?? TYPE_COLORS.feat;
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <span
                        className="text-xs px-1.5 py-0.5 rounded-sm flex-shrink-0 mt-0.5 font-semibold"
                        style={{
                          fontFamily: mono,
                          background: typeStyle.bg,
                          color: typeStyle.text,
                          minWidth: "3.5rem",
                          textAlign: "center",
                        }}
                      >
                        {typeStyle.label}
                      </span>
                      <span
                        className="text-sm leading-relaxed"
                        style={{ fontFamily: dm, color: "oklch(0.7 0.008 265)" }}
                      >
                        {change.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming */}
        <div className="max-w-3xl mt-16 pt-16 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-3 mb-6">
            <span
              className="text-xs tracking-widest uppercase"
              style={{ fontFamily: mono, color: "oklch(0.45 0.008 265)" }}
            >
              Upcoming
            </span>
            <span className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
          </div>
          <h2
            className="font-bold mb-3"
            style={{ fontFamily: syne, fontSize: "1.5rem", color: "oklch(0.88 0.005 265)" }}
          >
            v0.4.0 — Multi-Model Support
          </h2>
          <p
            className="text-sm mb-6"
            style={{ fontFamily: dm, color: "oklch(0.55 0.01 265)", lineHeight: 1.7 }}
          >
            Planned for Q2 2026. Switch between GPT-4, Claude, Gemini, and local models without losing your context, policies, or memory.
          </p>
          <div
            className="rounded-sm border p-5 space-y-2.5"
            style={{ background: "oklch(0.1 0.008 265)", borderColor: "rgba(255,255,255,0.06)" }}
          >
            {[
              "Multi-model router with automatic fallback",
              "Model performance benchmarking per task type",
              "Advanced Policy Engine v2 with conditional branching",
              "Audit Trail System with cryptographic receipts",
              "Export Constitutional Memory to portable JSON",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span style={{ color: "oklch(0.45 0.008 265)", marginTop: 2 }}>→</span>
                <span
                  className="text-sm"
                  style={{ fontFamily: dm, color: "oklch(0.55 0.01 265)" }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        className="border-t py-8"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <span
            className="text-xs"
            style={{ fontFamily: mono, color: "oklch(0.35 0.006 265)" }}
          >
            © 2026 Zero AI. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            <Link href="/docs">
              <a
                className="text-xs transition-colors"
                style={{ fontFamily: mono, color: "oklch(0.45 0.008 265)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.76 0.18 155)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.45 0.008 265)")}
              >
                Docs
              </a>
            </Link>
            <Link href="/privacy">
              <a
                className="text-xs transition-colors"
                style={{ fontFamily: mono, color: "oklch(0.45 0.008 265)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.76 0.18 155)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.45 0.008 265)")}
              >
                Privacy
              </a>
            </Link>
            <Link href="/terms">
              <a
                className="text-xs transition-colors"
                style={{ fontFamily: mono, color: "oklch(0.45 0.008 265)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.76 0.18 155)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.45 0.008 265)")}
              >
                Terms
              </a>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
