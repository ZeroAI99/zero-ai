/*
 * ZERO AI — Home Page
 * Design: Obsidian Precision — Swiss Grid × Dark Matter Aesthetic
 * All sections: Hero, Introduction, Problem, Product, Agency, Science, Memory, Roadmap, Testimonials, FAQ, CTA
 */

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatsBar from "@/components/StatsBar";
import CursorGlow from "@/components/CursorGlow";
import WaitlistModal from "@/components/WaitlistModal";
import AIChatDemo from "@/components/AIChatDemo";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663342337625/biHYpnWi4gbAo4jVFbvk4g/zero-ai-hero-bg-NGi9BN85d6de2rtPtNunGB.webp";
const MEMORY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663342337625/biHYpnWi4gbAo4jVFbvk4g/zero-ai-memory-visual-KdKdmAhQTKTJnXpqiq74e3.webp";
const GOVERNANCE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663342337625/biHYpnWi4gbAo4jVFbvk4g/zero-ai-governance-visual-N45iWK5YBaoGPMEJfFhxMX.webp";

// Intersection Observer hook for entrance animations
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// Animated counter
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView(0.5);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 40;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 30);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// FAQ Item
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.06]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span
          className="text-sm text-[oklch(0.85_0.005_265)] group-hover:text-[oklch(0.93_0.005_265)] transition-colors pr-8"
          style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
        >
          {question}
        </span>
        <span className={`text-[oklch(0.76_0.18_155)] text-lg transition-transform duration-200 flex-shrink-0 ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      {open && (
        <div className="pb-5">
          <p
            className="text-sm text-[oklch(0.55_0.01_265)] leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

// Section wrapper with entrance animation
function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <section
      id={id}
      ref={ref}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </section>
  );
}

export default function Home() {
  const [agreed, setAgreed] = useState<boolean | null>(null);
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [showChatDemo, setShowChatDemo] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[oklch(0.075_0.008_265)] text-[oklch(0.93_0.005_265)]">
      {showWaitlist && <WaitlistModal onClose={() => setShowWaitlist(false)} />}
      <CursorGlow />
      <Navbar />

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <div
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center right",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.075_0.008_265)] via-[oklch(0.075_0.008_265/0.85)] to-[oklch(0.075_0.008_265/0.4)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.075_0.008_265)] via-transparent to-transparent" />

        <div className="relative container pt-24 pb-20">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div
              className={`flex items-center gap-3 mb-8 transition-all duration-700 delay-100 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <span className="section-number">Personal AI Infrastructure</span>
              <span className="accent-line" />
            </div>

            {/* Headline */}
            <h1
              className={`font-extrabold leading-[1.05] tracking-tight mb-6 transition-all duration-700 delay-200 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                color: "oklch(0.95 0.005 265)",
              }}
            >
              Your Personal<br />
              <span style={{ color: "oklch(0.76 0.18 155)" }}>AI Operating</span><br />
              System
            </h1>

            {/* Subheadline */}
            <p
              className={`text-lg text-[oklch(0.55_0.01_265)] leading-relaxed mb-10 max-w-xl transition-all duration-700 delay-300 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
            >
              Stop prompt-chasing. Own the control layer. Zero AI turns AI into a system that works with you — on your terms.
            </p>

            {/* CTAs */}
            <div
              className={`flex flex-wrap gap-4 mb-16 transition-all duration-700 delay-400 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              <button
                onClick={() => setShowWaitlist(true)}
                className="btn-primary"
              >
                Request Early Access
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={() => scrollTo("roadmap")}
                className="btn-ghost"
              >
                Read Docs
              </button>
            </div>

            {/* Agreement prompt */}
            <div
              className={`transition-all duration-700 delay-500 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              <div className="inline-block border border-white/[0.08] rounded-sm p-5 bg-[oklch(0.1_0.008_265/0.6)] backdrop-blur-sm max-w-sm">
                <p
                  className="text-xs text-[oklch(0.45_0.008_265)] mb-1"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  AI generates text. You do all the work.<br />
                  Prompt. Copy. Paste. Verify. Repeat.
                </p>
                <p
                  className="text-sm font-semibold text-[oklch(0.85_0.005_265)] mb-4 mt-3"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Your AI must work continuously,<br />governed by your rules, not prompts.
                </p>
                <p
                  className="text-xs text-[oklch(0.55_0.01_265)] mb-3"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Do you agree?
                </p>
                {agreed === null ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setAgreed(true)}
                      className="btn-primary text-xs py-1.5 px-4"
                    >
                      YES
                    </button>
                    <button
                      onClick={() => setAgreed(false)}
                      className="btn-ghost text-xs py-1.5 px-4"
                    >
                      NO
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-[oklch(0.76_0.18_155)] text-xs" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                      {agreed ? "✓ Welcome to the future of AI." : "→ You will be soon."}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs text-[oklch(0.45_0.008_265)]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[oklch(0.45_0.008_265)] to-transparent" />
        </div>
      </div>

      {/* ─── STATS BAR ────────────────────────────────────────────────────── */}
      <StatsBar />

      {/* ─── INTRODUCTION ─────────────────────────────────────────────────── */}
      <Section id="introduction" className="py-24 border-t border-white/[0.06]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="section-number">01 — Introduction</span>
                <span className="accent-line" />
              </div>
              <h2
                className="font-bold leading-tight mb-6"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                  color: "oklch(0.93 0.005 265)",
                }}
              >
                The gap isn't in what AI can do. It's in what AI is{" "}
                <span style={{ color: "oklch(0.76 0.18 155)" }}>allowed to do.</span>
              </h2>
              <p
                className="text-[oklch(0.55_0.01_265)] leading-relaxed text-base"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
              >
                AI models advance monthly. The way you use them hasn't changed in two years. You ask. It answers. You forget. It forgets. The most powerful technology in history, reduced to a glorified search bar.
              </p>
            </div>

            {/* Right — Comparison table */}
            <div className="grid grid-cols-2 gap-4">
              {/* Today's AI */}
              <div className="card-surface rounded-sm p-5">
                <h3
                  className="text-xs font-semibold text-[oklch(0.45_0.008_265)] mb-4 tracking-widest uppercase"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  Today's AI
                </h3>
                <ul className="space-y-3">
                  {[
                    "Waits for your prompt",
                    "Black box decisions",
                    "Generates text only",
                    "Static responses",
                    "Their platform, their rules",
                    "Forgets everything",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-[oklch(0.4_0.008_265)] mt-0.5 flex-shrink-0">→</span>
                      <span
                        className="text-xs text-[oklch(0.5_0.008_265)]"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What's Possible */}
              <div className="rounded-sm p-5 border border-[oklch(0.76_0.18_155/0.2)] bg-[oklch(0.76_0.18_155/0.04)]">
                <h3
                  className="text-xs font-semibold text-[oklch(0.76_0.18_155)] mb-4 tracking-widest uppercase"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  What's Possible
                </h3>
                <ul className="space-y-3">
                  {[
                    "Initiates when it matters",
                    "Fully explainable reasoning",
                    "Executes real outcomes",
                    "Continuous co-evolution",
                    "Your system, your data",
                    "Remembers what matters",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-[oklch(0.76_0.18_155)] mt-0.5 flex-shrink-0">✓</span>
                      <span
                        className="text-xs text-[oklch(0.75_0.008_265)]"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── PROBLEM ──────────────────────────────────────────────────────── */}
      <Section id="problem" className="py-24 border-t border-white/[0.06]">
        <div className="container">
          <div className="flex items-center gap-3 mb-12">
            <span className="section-number">02 — Problem</span>
            <span className="accent-line" />
          </div>

          <div className="max-w-2xl mb-12">
            <h2
              className="font-bold leading-tight mb-4"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                color: "oklch(0.93 0.005 265)",
              }}
            >
              Why This Gap Exists
            </h2>
            <p
              className="text-[oklch(0.55_0.01_265)] leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
            >
              It's not a technology problem — today's AI models are extraordinary. The limitation is architectural: they're designed as products you visit, not partners who know you. They optimize for engagement metrics, not your life outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                tag: "THE MATH",
                title: "Zero Moat",
                body: "Same models as everyone = 0 moat. You're competing with everyone.",
                footnote: "No compounding. No leverage. Just labor.",
              },
              {
                tag: "THE TAX",
                title: "+2h / week wasted",
                body: "Time tax, attention tax, failure tax. Hours per week re-explaining, fixing, following up.",
                footnote: null,
                highlight: true,
              },
              {
                tag: "THE TRAP",
                title: "You are the glue",
                body: "Context locked in vendor UI. Rules reset every session. Manual copy-paste loop.",
                footnote: "If you are the glue — you're the part that gets replaced.",
              },
            ].map((card) => (
              <div
                key={card.tag}
                className={`card-surface rounded-sm p-6 transition-all duration-300 hover:-translate-y-0.5 ${
                  card.highlight ? "border-[oklch(0.76_0.18_155/0.25)] bg-[oklch(0.76_0.18_155/0.04)]" : ""
                }`}
              >
                <span
                  className="text-xs text-[oklch(0.76_0.18_155)] tracking-widest uppercase block mb-3"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  {card.tag}
                </span>
                <h3
                  className="font-bold text-lg text-[oklch(0.93_0.005_265)] mb-3"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-sm text-[oklch(0.55_0.01_265)] leading-relaxed mb-3"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {card.body}
                </p>
                {card.footnote && (
                  <p
                    className="text-xs text-[oklch(0.4_0.008_265)] italic"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {card.footnote}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── PRODUCT ──────────────────────────────────────────────────────── */}
      <Section id="product" className="py-24 border-t border-white/[0.06]">
        <div className="container">
          <div className="flex items-center gap-3 mb-12">
            <span className="section-number">03 — Product</span>
            <span className="accent-line" />
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <h2
                className="font-bold leading-tight mb-6"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                  color: "oklch(0.93 0.005 265)",
                }}
              >
                Own the{" "}
                <span style={{ color: "oklch(0.76 0.18 155)" }}>Infrastructure</span>
              </h2>
              <p
                className="text-[oklch(0.55_0.01_265)] leading-relaxed mb-8"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
              >
                Zero AI changes what AI is allowed to do. Not a chatbot. Not an app. A persistent, private, proactive intelligence layer that works for you — even when you're not looking.
              </p>

              {/* Governance Loop */}
              <div className="mb-8">
                <p
                  className="text-xs text-[oklch(0.45_0.008_265)] tracking-widest uppercase mb-4"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  The Governance Loop
                </p>
                <div className="flex items-center gap-1 flex-wrap">
                  {["Observe", "Decide", "Act", "Verify", "Learn"].map((step, i) => (
                    <div key={step} className="flex items-center gap-1">
                      <div className="flex flex-col items-center">
                        <span
                          className="text-xs text-[oklch(0.76_0.18_155)]"
                          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className="text-sm font-medium text-[oklch(0.85_0.005_265)]"
                          style={{ fontFamily: "'Syne', sans-serif" }}
                        >
                          {step}
                        </span>
                      </div>
                      {i < 4 && (
                        <span className="text-[oklch(0.35_0.006_265)] mx-1">→</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Governance visual */}
            <div className="relative">
              <img
                src={GOVERNANCE_IMG}
                alt="Governance Loop Visualization"
                className="w-full max-w-sm mx-auto rounded-sm opacity-90"
              />
            </div>
          </div>

          {/* Six Problems */}
          <div>
            <p
              className="text-xs text-[oklch(0.45_0.008_265)] tracking-widest uppercase mb-6"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              Six Problems Solved
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { num: "01", title: "Initiative", desc: "AI waits for prompts → Goal-triggered actions" },
                { num: "02", title: "Transparency", desc: "Black box decisions → Fully explainable reasoning" },
                { num: "03", title: "Execution", desc: "Text suggestions only → Real outcome execution" },
                { num: "04", title: "Adaptation", desc: "Static configuration → Versioned policies" },
                { num: "05", title: "Control", desc: "Platform lock-in → Local-first, exportable" },
                { num: "06", title: "Continuity", desc: "Session amnesia → Constitutional Memory" },
              ].map((item) => (
                <div key={item.num} className="card-surface rounded-sm p-5 group hover:-translate-y-0.5 transition-all duration-200">
                  <span
                    className="text-xs text-[oklch(0.76_0.18_155)] block mb-2"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    {item.num}
                  </span>
                  <h4
                    className="font-semibold text-[oklch(0.93_0.005_265)] mb-2"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {item.title}
                  </h4>
                  <p
                    className="text-xs text-[oklch(0.5_0.008_265)] leading-relaxed"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Renting vs Owning */}
          <div className="mt-16 grid md:grid-cols-2 gap-6">
            <div className="card-surface rounded-sm p-6">
              <h3
                className="text-sm font-semibold text-[oklch(0.45_0.008_265)] mb-4 tracking-widest uppercase"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                Renting
              </h3>
              <ul className="space-y-2.5">
                {[
                  "Context locked in vendor UI",
                  "Rules reset every session",
                  "Manual copy-paste loop",
                  "No audit trail",
                  "Vendor lock-in",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-[oklch(0.4_0.008_265)]">✗</span>
                    <span className="text-sm text-[oklch(0.5_0.008_265)]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-sm p-6 border border-[oklch(0.76_0.18_155/0.25)] bg-[oklch(0.76_0.18_155/0.04)]">
              <h3
                className="text-sm font-semibold text-[oklch(0.76_0.18_155)] mb-4 tracking-widest uppercase"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                Owning
              </h3>
              <ul className="space-y-2.5">
                {[
                  "Memory portable, versioned, yours",
                  "Policy rules that persist",
                  "Execution actions, not drafts",
                  "Audit receipts for everything",
                  "Model swap anytime",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-[oklch(0.76_0.18_155)]">✓</span>
                    <span className="text-sm text-[oklch(0.75_0.008_265)]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-white/[0.06]">
            <p
              className="text-xl font-semibold text-[oklch(0.85_0.005_265)] max-w-xl"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Assistants are an interface.{" "}
              <span style={{ color: "oklch(0.76 0.18 155)" }}>Zero AI is infrastructure.</span>
            </p>
            <p
              className="text-sm text-[oklch(0.45_0.008_265)] mt-3 max-w-lg"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Models are interchangeable — your system isn't. Others can prompt — they can't replicate your compound memory. That's the difference between renting and owning.
            </p>
          </div>
        </div>
      </Section>

      {/* ─── AGENCY LEVELS ────────────────────────────────────────────────── */}
      <Section id="agency" className="py-24 border-t border-white/[0.06]">
        <div className="container">
          <div className="flex items-center gap-3 mb-12">
            <span className="section-number">04 — Agency Levels</span>
            <span className="accent-line" />
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2
                className="font-bold leading-tight mb-4"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                  color: "oklch(0.93 0.005 265)",
                }}
              >
                Operational Taxonomy
              </h2>
              <p
                className="text-[oklch(0.55_0.01_265)] leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
              >
                They're all building agents. We're building the next level. An operational taxonomy of AI autonomy — from informational systems to symbiotic AI. Five levels. Only one creates true partnership.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { level: "Level 1", name: "Informational", desc: "Answers questions, provides information", active: false },
                { level: "Level 2", name: "Assistive", desc: "Helps with tasks, suggests actions", active: false },
                { level: "Level 3", name: "Agentic", desc: "Executes tasks autonomously", active: false },
                { level: "Level 4", name: "Collaborative", desc: "Works with you on complex problems", active: false },
                { level: "Level 5", name: "Symbiotic", desc: "Evolves with your system, governs outcomes", active: true },
              ].map((item) => (
                <div
                  key={item.level}
                  className={`flex items-center gap-4 p-4 rounded-sm transition-all duration-200 ${
                    item.active
                      ? "border border-[oklch(0.76_0.18_155/0.3)] bg-[oklch(0.76_0.18_155/0.06)]"
                      : "card-surface opacity-60"
                  }`}
                >
                  <div className="flex-shrink-0">
                    <div
                      className={`w-2 h-2 rounded-full ${item.active ? "bg-[oklch(0.76_0.18_155)]" : "bg-[oklch(0.3_0.006_265)]"}`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span
                        className="text-xs text-[oklch(0.45_0.008_265)]"
                        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                      >
                        {item.level}
                      </span>
                      <span
                        className={`font-semibold text-sm ${item.active ? "text-[oklch(0.93_0.005_265)]" : "text-[oklch(0.55_0.01_265)]"}`}
                        style={{ fontFamily: "'Syne', sans-serif" }}
                      >
                        {item.name}
                      </span>
                    </div>
                    <p
                      className="text-xs text-[oklch(0.45_0.008_265)] mt-0.5"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {item.desc}
                    </p>
                  </div>
                  {item.active && (
                    <span
                      className="text-xs text-[oklch(0.76_0.18_155)] flex-shrink-0"
                      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                      ✓ Zero AI
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ─── SCIENCE ──────────────────────────────────────────────────────── */}
      <Section id="science" className="py-24 border-t border-white/[0.06]">
        <div className="container">
          <div className="flex items-center gap-3 mb-12">
            <span className="section-number">05 — Science</span>
            <span className="accent-line" />
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2
                className="font-bold leading-tight mb-4"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                  color: "oklch(0.93 0.005 265)",
                }}
              >
                The Science Behind It
              </h2>
              <p
                className="text-[oklch(0.55_0.01_265)] leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
              >
                Zero AI is built on proven research in human-AI collaboration, constitutional AI, and outcome governance. Our approach combines the latest advances in AI safety, interpretability, and autonomous systems.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "Constitutional AI", desc: "AI systems guided by explicit values and constraints" },
                { title: "Outcome Governance", desc: "Measurable, auditable AI decision-making" },
                { title: "Human-AI Collaboration", desc: "Optimal teaming between humans and AI agents" },
                { title: "Interpretability", desc: "Understanding why AI makes specific decisions" },
              ].map((item) => (
                <div key={item.title} className="card-surface rounded-sm p-5 hover:-translate-y-0.5 transition-all duration-200">
                  <div className="w-8 h-8 rounded-sm bg-[oklch(0.76_0.18_155/0.1)] border border-[oklch(0.76_0.18_155/0.2)] flex items-center justify-center mb-3">
                    <div className="w-2 h-2 rounded-full bg-[oklch(0.76_0.18_155)]" />
                  </div>
                  <h4
                    className="font-semibold text-sm text-[oklch(0.93_0.005_265)] mb-2"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {item.title}
                  </h4>
                  <p
                    className="text-xs text-[oklch(0.5_0.008_265)] leading-relaxed"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ─── AI CHAT DEMO ─────────────────────────────────────────────────── */}
      <Section className="py-24 border-t border-white/[0.06]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="section-number">Live Demo</span>
                <span className="accent-line" />
              </div>
              <h2
                className="font-bold leading-tight mb-4"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                  color: "oklch(0.93 0.005 265)",
                }}
              >
                Talk to{" "}
                <span style={{ color: "oklch(0.76 0.18 155)" }}>Zero AI</span>
              </h2>
              <p
                className="text-[oklch(0.55_0.01_265)] leading-relaxed mb-6"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
              >
                Experience the Zero AI persona firsthand. Ask about Constitutional Memory, Governance Engine, or what it means to own your AI infrastructure.
              </p>
              <p
                className="text-xs text-[oklch(0.35_0.006_265)]"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                &gt; This is a live preview — powered by the Zero AI system prompt.
              </p>
            </div>
            <div>
              <AIChatDemo />
            </div>
          </div>
        </div>
      </Section>

      {/* ─── MEMORY ───────────────────────────────────────────────────────── */}
      <Section id="memory" className="py-24 border-t border-white/[0.06]">
        <div className="container">
          <div className="flex items-center gap-3 mb-12">
            <span className="section-number">06 — Memory</span>
            <span className="accent-line" />
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Visual */}
            <div className="order-2 lg:order-1">
              <img
                src={MEMORY_IMG}
                alt="Constitutional Memory Visualization"
                className="w-full rounded-sm opacity-90"
              />
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <h2
                className="font-bold leading-tight mb-4"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                  color: "oklch(0.93 0.005 265)",
                }}
              >
                Constitutional Memory
              </h2>
              <p
                className="text-[oklch(0.55_0.01_265)] leading-relaxed mb-8"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
              >
                Zero AI's memory system is designed to persist across sessions, maintain context, and evolve with your goals. Every interaction is recorded with provenance, making your system's knowledge truly yours.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { title: "Persistent", desc: "Your goals and context survive across sessions" },
                  { title: "Versioned", desc: "Track changes and rollback to previous states" },
                  { title: "Portable", desc: "Export your memory and switch systems anytime" },
                  { title: "Auditable", desc: "See exactly how decisions were made" },
                  { title: "Evolving", desc: "Memory improves as you interact with the system" },
                  { title: "Private", desc: "Your data stays local, never shared" },
                ].map((item) => (
                  <div key={item.title} className="card-surface rounded-sm p-4">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[oklch(0.76_0.18_155)]" />
                      <h4
                        className="text-xs font-semibold text-[oklch(0.85_0.005_265)]"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                      >
                        {item.title}
                      </h4>
                    </div>
                    <p
                      className="text-xs text-[oklch(0.45_0.008_265)] leading-relaxed"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── ROADMAP ──────────────────────────────────────────────────────── */}
      <Section id="roadmap" className="py-24 border-t border-white/[0.06]">
        <div className="container">
          <div className="flex items-center gap-3 mb-12">
            <span className="section-number">07 — Roadmap</span>
            <span className="accent-line" />
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2
                className="font-bold leading-tight mb-4"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                  color: "oklch(0.93 0.005 265)",
                }}
              >
                Roadmap
              </h2>
              <p
                className="text-[oklch(0.55_0.01_265)] leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
              >
                We're building Zero AI in phases, with each release adding new capabilities while maintaining our core principles of transparency, control, and outcome governance.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  phase: "Phase 1",
                  name: "Foundation",
                  quarter: "Q1 2026",
                  items: ["Constitutional Memory System", "Basic Governance Engine", "Local-first Architecture"],
                  active: true,
                },
                {
                  phase: "Phase 2",
                  name: "Expansion",
                  quarter: "Q2 2026",
                  items: ["Multi-model Support", "Advanced Policy Engine", "Audit Trail System"],
                  active: false,
                },
                {
                  phase: "Phase 3",
                  name: "Evolution",
                  quarter: "Q3 2026",
                  items: ["Real-time Collaboration", "Advanced Analytics", "Community Plugins"],
                  active: false,
                },
                {
                  phase: "Phase 4",
                  name: "Maturity",
                  quarter: "Q4 2026",
                  items: ["Enterprise Features", "Advanced Integrations", "Full Ecosystem"],
                  active: false,
                },
              ].map((item) => (
                <div
                  key={item.phase}
                  className={`rounded-sm p-5 transition-all duration-200 ${
                    item.active
                      ? "border border-[oklch(0.76_0.18_155/0.3)] bg-[oklch(0.76_0.18_155/0.04)]"
                      : "card-surface opacity-70"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span
                        className="text-xs text-[oklch(0.76_0.18_155)]"
                        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                      >
                        {item.phase}
                      </span>
                      <h4
                        className="font-semibold text-[oklch(0.93_0.005_265)]"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                      >
                        {item.name}
                      </h4>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-sm ${
                        item.active
                          ? "bg-[oklch(0.76_0.18_155/0.15)] text-[oklch(0.76_0.18_155)]"
                          : "bg-white/[0.04] text-[oklch(0.45_0.008_265)]"
                      }`}
                      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                      {item.quarter}
                    </span>
                  </div>
                  <ul className="space-y-1.5">
                    {item.items.map((feat) => (
                      <li key={feat} className="flex items-center gap-2">
                        <span className={item.active ? "text-[oklch(0.76_0.18_155)]" : "text-[oklch(0.35_0.006_265)]"}>→</span>
                        <span
                          className="text-xs text-[oklch(0.55_0.01_265)]"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ─── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <Section className="py-24 border-t border-white/[0.06]">
        <div className="container">
          <div className="text-center mb-12">
            <h2
              className="font-bold text-2xl text-[oklch(0.93_0.005_265)] mb-3"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              What People Are Saying
            </h2>
            <p
              className="text-sm text-[oklch(0.45_0.008_265)]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Hear from founders, operators, and creators who are already exploring Zero AI.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                initials: "SC",
                name: "Sarah Chen",
                role: "Founder, AI Research Lab",
                quote: "Zero AI finally gives us the control layer we've been missing. It's not about better prompts—it's about owning the entire system.",
              },
              {
                initials: "MJ",
                name: "Marcus Johnson",
                role: "Operations Director",
                quote: "The constitutional memory feature alone saves us hours every week. No more re-explaining context or rebuilding workflows.",
              },
              {
                initials: "ER",
                name: "Elena Rodriguez",
                role: "Product Manager",
                quote: "This is what AI infrastructure should look like. Transparent, auditable, and actually designed for how we work.",
              },
            ].map((t) => (
              <div key={t.name} className="card-surface rounded-sm p-6 hover:-translate-y-0.5 transition-all duration-200">
                <p
                  className="text-sm text-[oklch(0.65_0.01_265)] leading-relaxed mb-5 italic"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                >
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-sm bg-[oklch(0.76_0.18_155/0.15)] border border-[oklch(0.76_0.18_155/0.2)] flex items-center justify-center">
                    <span
                      className="text-xs font-semibold text-[oklch(0.76_0.18_155)]"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {t.initials}
                    </span>
                  </div>
                  <div>
                    <p
                      className="text-xs font-semibold text-[oklch(0.85_0.005_265)]"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {t.name}
                    </p>
                    <p
                      className="text-xs text-[oklch(0.45_0.008_265)]"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── FAQ ──────────────────────────────────────────────────────────── */}
      <Section className="py-24 border-t border-white/[0.06]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2
                className="font-bold text-2xl text-[oklch(0.93_0.005_265)] mb-3"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Frequently Asked Questions
              </h2>
              <p
                className="text-sm text-[oklch(0.45_0.008_265)]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Everything you need to know about Zero AI.
              </p>
            </div>

            <div>
              {[
                {
                  question: "What makes Zero AI different from other AI assistants?",
                  answer: "Zero AI is not an assistant — it's infrastructure. While other AI tools require you to prompt them every time, Zero AI operates as a persistent governance layer that initiates actions, maintains context across sessions, and executes real outcomes based on your defined policies.",
                },
                {
                  question: "Is my data stored locally or in the cloud?",
                  answer: "Zero AI is built on a local-first architecture. Your memory, policies, and context are stored on your own system by default. You control what gets synced and where. No vendor has access to your data.",
                },
                {
                  question: "Can I switch AI models?",
                  answer: "Yes. Zero AI is model-agnostic. You can switch between GPT-4, Claude, Gemini, or any other model without losing your context, policies, or memory. The system is yours — the models are interchangeable.",
                },
                {
                  question: "How does Constitutional Memory work?",
                  answer: "Constitutional Memory is a versioned, auditable record of your goals, context, and decisions. Every interaction is logged with provenance, so you can track how your system evolved, roll back to previous states, and export your memory at any time.",
                },
                {
                  question: "When will Zero AI be available?",
                  answer: "We're currently in early access. Phase 1 (Foundation) is shipping in Q1 2026, with Constitutional Memory System, Basic Governance Engine, and Local-first Architecture. Request early access to be among the first users.",
                },
                {
                  question: "What's the pricing model?",
                  answer: "Pricing details will be announced closer to the public launch. Early access participants will receive special pricing. The model will be designed to align with our principle of ownership — you pay for your system, not for access to someone else's platform.",
                },
              ].map((faq) => (
                <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ─── CTA ──────────────────────────────────────────────────────────── */}
      <Section id="cta" className="py-24 border-t border-white/[0.06]">
        <div className="container">
          <div className="flex flex-col items-center text-center">

            {/* JOIN THE JOURNEY label */}
            <div className="mb-8">
              <span
                className="inline-block border border-white/[0.15] px-4 py-1.5 text-xs tracking-[0.2em] uppercase text-[oklch(0.45_0.008_265)]"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                JOIN THE JOURNEY
              </span>
            </div>

            {/* Headline */}
            <h2
              className="font-bold leading-tight mb-3"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(2.25rem, 5vw, 4rem)",
                color: "oklch(0.93 0.005 265)",
              }}
            >
              Ready to own
            </h2>
            <h2
              className="font-bold leading-tight mb-6"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(2.25rem, 5vw, 4rem)",
                color: "oklch(0.76 0.18 155)",
              }}
            >
              your AI?
            </h2>

            <p
              className="text-[oklch(0.5_0.008_265)] leading-relaxed mb-10 max-w-md text-sm"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              Zero AI is in active development. We're building the infrastructure for true human-AI partnership.
            </p>

            {/* THIS IS FOR */}
            <div className="w-full max-w-lg mb-6">
              <div className="border border-white/[0.08] rounded-sm p-6">
                <p
                  className="text-xs text-[oklch(0.35_0.006_265)] tracking-[0.2em] uppercase mb-4"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  THIS IS FOR
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {["Founders", "Operators", "Creators", "Builders"].map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-1.5 border border-white/[0.12] text-xs text-[oklch(0.65_0.01_265)] rounded-sm"
                      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="w-full max-w-lg mb-4">
              <div className="border border-[oklch(0.76_0.18_155/0.4)] rounded-sm p-5 bg-[oklch(0.76_0.18_155/0.04)]">
                <button
                  onClick={() => setShowWaitlist(true)}
                  className="block w-full py-4 text-center font-semibold text-base tracking-wide transition-all duration-200 hover:bg-[oklch(0.76_0.18_155/0.08)] rounded-sm"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: "oklch(0.76 0.18 155)",
                    border: "1px solid oklch(0.76 0.18 155 / 0.5)",
                  }}
                >
                  Request Early Access →
                </button>
                <p
                  className="text-xs text-[oklch(0.35_0.006_265)] mt-3 text-center"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  We'll respond within 48h
                </p>
              </div>
            </div>

            {/* OR CONNECT DIRECTLY */}
            <div className="w-full max-w-lg">
              <p
                className="text-xs text-[oklch(0.35_0.006_265)] tracking-[0.15em] uppercase mb-4"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                OR CONNECT DIRECTLY
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="https://x.com/_zeroai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-white/[0.1] rounded-sm text-xs text-[oklch(0.55_0.01_265)] hover:text-[oklch(0.76_0.18_155)] hover:border-[oklch(0.76_0.18_155/0.3)] transition-all duration-200"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  @_zeroai
                </a>
                <a
                  href="https://github.com/ZeroAI99"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-white/[0.1] rounded-sm text-xs text-[oklch(0.55_0.01_265)] hover:text-[oklch(0.76_0.18_155)] hover:border-[oklch(0.76_0.18_155/0.3)] transition-all duration-200"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>

              </div>
            </div>

            {/* Tagline */}
            <p
              className="mt-12 text-xs text-[oklch(0.3_0.006_265)] italic"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              The future of AI is not assistance — it's partnership.
            </p>

          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
