/*
 * ZERO AI — Blog Page
 * Design: Obsidian Precision — Swiss Grid × Dark Matter Aesthetic
 */

import { useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LOGO = "https://iili.io/q1H6tnV.webp";

const POSTS = [
  {
    slug: "introducing-zero-ai",
    tag: "ANNOUNCEMENT",
    date: "March 15, 2026",
    readTime: "4 min read",
    title: "Introducing Zero AI: Your Personal AI Operating System",
    excerpt:
      "Today we're announcing Zero AI — a persistent, private, proactive intelligence layer that works for you, even when you're not looking. This is not another chatbot. This is infrastructure.",
    author: "Zero AI Team",
    featured: true,
  },
  {
    slug: "constitutional-memory-explained",
    tag: "TECHNICAL",
    date: "March 10, 2026",
    readTime: "7 min read",
    title: "Constitutional Memory: Why AI Needs to Remember More Than Your Last Message",
    excerpt:
      "Current AI systems suffer from session amnesia — every conversation starts from zero. Constitutional Memory is our solution: a versioned, auditable, portable memory system that evolves with you.",
    author: "Zero AI Team",
    featured: false,
  },
  {
    slug: "governance-engine-deep-dive",
    tag: "TECHNICAL",
    date: "March 5, 2026",
    readTime: "9 min read",
    title: "The Governance Engine: How Zero AI Makes Decisions You Can Trust",
    excerpt:
      "Transparency is not optional. Every decision Zero AI makes is logged, explainable, and auditable. Here's how our Governance Engine works under the hood.",
    author: "Zero AI Team",
    featured: false,
  },
  {
    slug: "why-own-your-ai",
    tag: "ESSAY",
    date: "February 28, 2026",
    readTime: "5 min read",
    title: "Why You Should Own Your AI Infrastructure (Not Rent It)",
    excerpt:
      "You wouldn't rent your operating system. You wouldn't rent your database. So why are you renting your AI? The difference between owning and renting AI is the difference between leverage and labor.",
    author: "Zero AI Team",
    featured: false,
  },
  {
    slug: "phase-1-foundation-update",
    tag: "UPDATE",
    date: "February 20, 2026",
    readTime: "3 min read",
    title: "Phase 1 Foundation: What We've Built and What's Coming Next",
    excerpt:
      "Phase 1 of Zero AI is in active development. Constitutional Memory System, Basic Governance Engine, and Local-first Architecture are all on track for Q1 2026. Here's where we stand.",
    author: "Zero AI Team",
    featured: false,
  },
  {
    slug: "ai-agency-levels",
    tag: "ESSAY",
    date: "February 12, 2026",
    readTime: "6 min read",
    title: "The Five Levels of AI Agency: Where Most Systems Fail",
    excerpt:
      "From informational to symbiotic — we've mapped out five levels of AI agency. Most products today are stuck at Level 1 or 2. Zero AI is designed for Level 5. Here's what that means.",
    author: "Zero AI Team",
    featured: false,
  },
];

const TAG_COLORS: Record<string, string> = {
  ANNOUNCEMENT: "text-[oklch(0.76_0.18_155)] border-[oklch(0.76_0.18_155/0.3)] bg-[oklch(0.76_0.18_155/0.06)]",
  TECHNICAL: "text-[oklch(0.7_0.15_230)] border-[oklch(0.7_0.15_230/0.3)] bg-[oklch(0.7_0.15_230/0.06)]",
  ESSAY: "text-[oklch(0.75_0.12_50)] border-[oklch(0.75_0.12_50/0.3)] bg-[oklch(0.75_0.12_50/0.06)]",
  UPDATE: "text-[oklch(0.72_0.14_320)] border-[oklch(0.72_0.14_320/0.3)] bg-[oklch(0.72_0.14_320/0.06)]",
};

const ALL_TAGS = ["ALL", "ANNOUNCEMENT", "TECHNICAL", "ESSAY", "UPDATE"];

export default function Blog() {
  const [activeTag, setActiveTag] = useState("ALL");

  const filtered = activeTag === "ALL" ? POSTS : POSTS.filter((p) => p.tag === activeTag);
  const featured = filtered.find((p) => p.featured) ?? filtered[0];
  const rest = filtered.filter((p) => p !== featured);

  return (
    <div className="min-h-screen bg-[oklch(0.075_0.008_265)] text-[oklch(0.93_0.005_265)]">
      <Navbar />

      {/* ─── HEADER ─────────────────────────────────────────────────────── */}
      <div className="pt-28 pb-16 border-b border-white/[0.06]">
        <div className="container">
          <div className="flex items-center gap-3 mb-6">
            <span
              className="text-xs text-[oklch(0.76_0.18_155)] tracking-widest uppercase"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              Zero AI
            </span>
            <span className="flex-1 h-px bg-white/[0.06]" />
          </div>
          <h1
            className="font-extrabold leading-tight mb-4"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "oklch(0.95 0.005 265)",
            }}
          >
            Blog
          </h1>
          <p
            className="text-[oklch(0.55_0.01_265)] max-w-lg text-base"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
          >
            Updates, essays, and technical deep-dives from the Zero AI team.
          </p>

          {/* Tag filter */}
          <div className="flex flex-wrap gap-2 mt-8">
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`text-xs px-3 py-1.5 rounded-sm border transition-all duration-200 ${
                  activeTag === tag
                    ? "border-[oklch(0.76_0.18_155/0.5)] bg-[oklch(0.76_0.18_155/0.1)] text-[oklch(0.76_0.18_155)]"
                    : "border-white/[0.08] text-[oklch(0.45_0.008_265)] hover:border-white/[0.15] hover:text-[oklch(0.65_0.01_265)]"
                }`}
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── FEATURED POST ───────────────────────────────────────────────── */}
      {featured && (
        <div className="border-b border-white/[0.06]">
          <div className="container py-16">
            <Link href={`/blog/${featured.slug}`}>
              <div className="group cursor-pointer grid lg:grid-cols-2 gap-12 items-center">
                {/* Left: content */}
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className={`text-xs px-2 py-1 rounded-sm border ${TAG_COLORS[featured.tag] ?? ""}`}
                      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                      {featured.tag}
                    </span>
                    <span
                      className="text-xs text-[oklch(0.35_0.006_265)]"
                      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                      FEATURED
                    </span>
                  </div>
                  <h2
                    className="font-bold leading-tight mb-4 group-hover:text-[oklch(0.76_0.18_155)] transition-colors duration-200"
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                      color: "oklch(0.93 0.005 265)",
                    }}
                  >
                    {featured.title}
                  </h2>
                  <p
                    className="text-[oklch(0.55_0.01_265)] leading-relaxed mb-6 text-sm"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                  >
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-4">
                    <span
                      className="text-xs text-[oklch(0.45_0.008_265)]"
                      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                      {featured.date}
                    </span>
                    <span className="text-[oklch(0.3_0.006_265)]">·</span>
                    <span
                      className="text-xs text-[oklch(0.45_0.008_265)]"
                      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                      {featured.readTime}
                    </span>
                  </div>
                </div>

                {/* Right: visual */}
                <div className="relative">
                  <div className="aspect-video rounded-sm border border-white/[0.06] bg-[oklch(0.1_0.008_265)] flex items-center justify-center overflow-hidden group-hover:border-[oklch(0.76_0.18_155/0.2)] transition-colors duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.76_0.18_155/0.05)] to-transparent" />
                    <img
                      src={LOGO}
                      alt="Zero AI"
                      className="w-24 h-24 object-contain opacity-30 group-hover:opacity-50 transition-opacity duration-300"
                    />
                    <div className="absolute bottom-4 right-4">
                      <span
                        className="text-xs text-[oklch(0.76_0.18_155)] flex items-center gap-1"
                        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                      >
                        Read article
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* ─── POST GRID ───────────────────────────────────────────────────── */}
      <div className="container py-16">
        {rest.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <div className="group cursor-pointer border border-white/[0.06] rounded-sm p-6 bg-[oklch(0.09_0.008_265)] hover:border-[oklch(0.76_0.18_155/0.2)] hover:-translate-y-0.5 transition-all duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-sm border ${TAG_COLORS[post.tag] ?? ""}`}
                      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                      {post.tag}
                    </span>
                    <span
                      className="text-xs text-[oklch(0.35_0.006_265)]"
                      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                      {post.readTime}
                    </span>
                  </div>

                  <h3
                    className="font-semibold leading-snug mb-3 group-hover:text-[oklch(0.76_0.18_155)] transition-colors duration-200"
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: "1rem",
                      color: "oklch(0.93 0.005 265)",
                    }}
                  >
                    {post.title}
                  </h3>

                  <p
                    className="text-xs text-[oklch(0.5_0.008_265)] leading-relaxed mb-5 line-clamp-3"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
                    <span
                      className="text-xs text-[oklch(0.35_0.006_265)]"
                      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                      {post.date}
                    </span>
                    <span className="text-[oklch(0.76_0.18_155)] group-hover:translate-x-1 transition-transform duration-200">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p
              className="text-sm text-[oklch(0.45_0.008_265)]"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              No posts in this category yet.
            </p>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-20 border border-white/[0.06] rounded-sm p-8 bg-[oklch(0.09_0.008_265)] text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src={LOGO} alt="Zero AI" className="w-8 h-8 object-contain" />
            <span
              className="text-xs text-[oklch(0.76_0.18_155)] tracking-widest uppercase"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              Stay Updated
            </span>
          </div>
          <h3
            className="font-bold text-xl text-[oklch(0.93_0.005_265)] mb-3"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Get notified when we publish
          </h3>
          <p
            className="text-sm text-[oklch(0.5_0.008_265)] mb-6 max-w-sm mx-auto"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
          >
            Join the waitlist to receive updates, technical deep-dives, and early access news.
          </p>
          <Link href="/#cta">
            <button className="btn-primary text-sm">
              Join the Waitlist
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
