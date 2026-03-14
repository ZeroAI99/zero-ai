/*
 * ZERO AI — IntroScreen Component
 * Design: Exact match to odei.ai intro style
 * Full screen, neural background, large YES/NO buttons, section grid, social icons
 * Premium fade-out: multi-layer dissolve with glitch flash + blur + scale
 */

import { useState, useEffect, useRef } from "react";
import ParticleCanvas from "./ParticleCanvas";

const LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663342337625/biHYpnWi4gbAo4jVFbvk4g/zero-ai-logo-v2_57ca5299.webp";

const NAV_SECTIONS = [
  { label: "Introduction", href: "introduction" },
  { label: "Problem", href: "problem" },
  { label: "Product", href: "product" },
  { label: "Agency Levels", href: "agency" },
  { label: "Science", href: "science" },
  { label: "Memory", href: "memory" },
  { label: "Roadmap", href: "roadmap" },
];

interface IntroScreenProps {
  onEnter: () => void;
}

export default function IntroScreen({ onEnter }: IntroScreenProps) {
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [showHeadline, setShowHeadline] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [showSocial, setShowSocial] = useState(false);
  const [answered, setAnswered] = useState<"yes" | "no" | null>(null);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [skipped] = useState(() => sessionStorage.getItem("zeroai_intro_seen") === "1");

  // Fade-out state machine: idle → glitch → dissolve → done
  const [exitPhase, setExitPhase] = useState<"idle" | "glitch" | "dissolve" | "done">("idle");
  const exitTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const TEXT1 = "> AI generates text. You do all the work.";
  const TEXT2 = "> Prompt. Copy. Paste. Verify. Repeat.";

  // Blinking cursor
  useEffect(() => {
    const blink = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(blink);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (skipped) return;
    let i = 0;
    const t1 = setInterval(() => {
      setLine1(TEXT1.slice(0, i + 1));
      i++;
      if (i >= TEXT1.length) {
        clearInterval(t1);
        let j = 0;
        const t2 = setInterval(() => {
          setLine2(TEXT2.slice(0, j + 1));
          j++;
          if (j >= TEXT2.length) {
            clearInterval(t2);
            setTimeout(() => setShowHeadline(true), 300);
            setTimeout(() => setShowQuestion(true), 700);
            setTimeout(() => setShowButtons(true), 900);
            setTimeout(() => setShowNav(true), 1200);
            setTimeout(() => setShowSocial(true), 1500);
          }
        }, 26);
      }
    }, 26);
    return () => clearInterval(t1);
  }, [skipped]);

  useEffect(() => {
    if (skipped) onEnter();
  }, [skipped, onEnter]);

  // Cleanup exit timers on unmount
  useEffect(() => {
    return () => exitTimers.current.forEach(clearTimeout);
  }, []);

  const triggerExit = (choice: "yes" | "no") => {
    setAnswered(choice);
    sessionStorage.setItem("zeroai_intro_seen", "1");

    // Phase 1: glitch flash at 0ms
    setExitPhase("glitch");

    // Phase 2: dissolve at 120ms
    const t1 = setTimeout(() => setExitPhase("dissolve"), 120);
    // Phase 3: call onEnter at 900ms (after dissolve completes)
    const t2 = setTimeout(() => {
      setExitPhase("done");
      onEnter();
    }, 900);

    exitTimers.current.push(t1, t2);
  };

  const scrollToSection = (id: string) => {
    sessionStorage.setItem("zeroai_intro_seen", "1");
    setExitPhase("glitch");
    const t1 = setTimeout(() => setExitPhase("dissolve"), 120);
    const t2 = setTimeout(() => {
      setExitPhase("done");
      onEnter();
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }, 900);
    exitTimers.current.push(t1, t2);
  };

  const mono = "'IBM Plex Mono', monospace";

  // Compute container styles based on exit phase
  const containerStyle: React.CSSProperties = {
    background: "#000",
    // Glitch phase: brief white flash + horizontal skew
    ...(exitPhase === "glitch" && {
      filter: "brightness(2.5) saturate(0) blur(1px)",
      transform: "skewX(-1.5deg) scale(1.01)",
      transition: "filter 0.08s ease, transform 0.08s ease",
    }),
    // Dissolve phase: fade + scale up + blur
    ...(exitPhase === "dissolve" && {
      opacity: 0,
      filter: "blur(18px) brightness(0.3)",
      transform: "scale(1.06)",
      transition: "opacity 0.75s cubic-bezier(0.4, 0, 1, 1), filter 0.75s ease, transform 0.75s ease",
    }),
    // Done phase: fully hidden
    ...(exitPhase === "done" && {
      opacity: 0,
      pointerEvents: "none",
    }),
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col overflow-hidden"
      style={containerStyle}
    >
      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Subtle dark overlay to keep text readable */}
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.55)" }} />

      {/* Glitch scan-line overlay — only visible during glitch phase */}
      {exitPhase === "glitch" && (
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,100,0.04) 2px, rgba(0,255,100,0.04) 4px)",
            mixBlendMode: "screen",
          }}
        />
      )}

      {/* Main content — vertically centered, left-aligned like odei.ai */}
      <div className="relative z-10 flex flex-col justify-center flex-1 w-full max-w-2xl mx-auto px-6 md:px-10">

        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <div
            className="mb-2"
            style={{
              filter: "drop-shadow(0 0 16px oklch(0.76 0.18 155 / 0.55))",
              transition: "opacity 0.5s ease",
              opacity: showHeadline ? 1 : 0,
            }}
          >
            <img src={LOGO} alt="Zero AI" className="w-14 h-14 object-contain" />
          </div>
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{
              fontFamily: mono,
              color: "oklch(0.76 0.18 155 / 0.7)",
              transition: "opacity 0.5s ease 0.1s",
              opacity: showHeadline ? 1 : 0,
            }}
          >
            ZERO AI
          </span>
        </div>

        {/* Terminal lines */}
        <div className="mb-8">
          <p
            className="text-base md:text-lg leading-relaxed mb-1"
            style={{ fontFamily: mono, color: "rgba(200,220,210,0.75)" }}
          >
            {line1}
            {line1.length < TEXT1.length && line2.length === 0 && (
              <span style={{ opacity: cursorVisible ? 1 : 0 }}>_</span>
            )}
          </p>
          <p
            className="text-base md:text-lg leading-relaxed"
            style={{ fontFamily: mono, color: "rgba(200,220,210,0.75)" }}
          >
            {line2}
            {line1.length >= TEXT1.length && line2.length < TEXT2.length && (
              <span style={{ opacity: cursorVisible ? 1 : 0 }}>_</span>
            )}
          </p>
        </div>

        {/* Headline */}
        <div
          className="mb-6"
          style={{
            transition: "opacity 0.5s ease, transform 0.5s ease",
            opacity: showHeadline ? 1 : 0,
            transform: showHeadline ? "translateY(0)" : "translateY(12px)",
          }}
        >
          <h1
            className="font-bold leading-snug"
            style={{
              fontFamily: mono,
              fontSize: "clamp(1.6rem, 5.5vw, 2.4rem)",
              color: "#fff",
              letterSpacing: "-0.01em",
              textAlign: "center",
            }}
          >
            Your AI must work<br />
            continuously, governed<br />
            by your rules, not<br />
            <span style={{ color: "oklch(0.76 0.18 155)" }}>prompts</span>
          </h1>
        </div>

        {/* Question */}
        <div
          className="mb-5 text-center"
          style={{
            transition: "opacity 0.4s ease, transform 0.4s ease",
            opacity: showQuestion ? 1 : 0,
            transform: showQuestion ? "translateY(0)" : "translateY(8px)",
          }}
        >
          <p
            className="text-base md:text-lg"
            style={{ fontFamily: mono, color: "oklch(0.76 0.18 155)" }}
          >
            &gt; Do you agree?{" "}
            <span style={{ opacity: showButtons && answered === null ? (cursorVisible ? 1 : 0) : 0 }}>_</span>
          </p>
        </div>

        {/* YES / NO Buttons */}
        <div
          className="flex gap-4 justify-center mb-10"
          style={{
            transition: "opacity 0.4s ease, transform 0.4s ease",
            opacity: showButtons ? 1 : 0,
            transform: showButtons ? "translateY(0)" : "translateY(8px)",
          }}
        >
          {answered === null ? (
            <>
              <button
                onClick={() => triggerExit("yes")}
                className="flex-1 max-w-[180px] py-4 text-base font-bold tracking-widest transition-all duration-200"
                style={{
                  fontFamily: mono,
                  color: "oklch(0.76 0.18 155)",
                  border: "2px solid oklch(0.76 0.18 155)",
                  background: "oklch(0.76 0.18 155 / 0.08)",
                  letterSpacing: "0.15em",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "oklch(0.76 0.18 155 / 0.18)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 20px oklch(0.76 0.18 155 / 0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "oklch(0.76 0.18 155 / 0.08)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                }}
              >
                [ YES ]
              </button>
              <button
                onClick={() => triggerExit("no")}
                className="flex-1 max-w-[180px] py-4 text-base font-bold tracking-widest transition-all duration-200"
                style={{
                  fontFamily: mono,
                  color: "rgba(200,200,200,0.7)",
                  border: "2px solid rgba(150,150,150,0.35)",
                  background: "transparent",
                  letterSpacing: "0.15em",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(200,200,200,0.6)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(150,150,150,0.35)";
                }}
              >
                [ NO ]
              </button>
            </>
          ) : (
            <p
              className="text-sm"
              style={{ fontFamily: mono, color: "oklch(0.76 0.18 155)" }}
            >
              {answered === "yes" ? "> Welcome to the future of AI." : "> You will be soon."}
            </p>
          )}
        </div>

        {/* Navigation grid */}
        <div
          className="mb-8"
          style={{
            transition: "opacity 0.4s ease, transform 0.4s ease",
            opacity: showNav ? 1 : 0,
            transform: showNav ? "translateY(0)" : "translateY(8px)",
          }}
        >
          <div className="flex flex-wrap justify-center gap-2">
            {NAV_SECTIONS.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="px-4 py-2 text-xs transition-all duration-200"
                style={{
                  fontFamily: mono,
                  color: "rgba(180,200,190,0.6)",
                  border: "1px solid rgba(150,180,160,0.2)",
                  background: "transparent",
                  letterSpacing: "0.04em",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.76 0.18 155)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "oklch(0.76 0.18 155 / 0.45)";
                  (e.currentTarget as HTMLButtonElement).style.background = "oklch(0.76 0.18 155 / 0.06)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(180,200,190,0.6)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(150,180,160,0.2)";
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Social icons */}
        <div
          className="flex items-center justify-center gap-8"
          style={{
            transition: "opacity 0.4s ease, transform 0.4s ease",
            opacity: showSocial ? 1 : 0,
            transform: showSocial ? "translateY(0)" : "translateY(8px)",
          }}
        >
          {/* X */}
          <a
            href="https://x.com/_zeroai"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            style={{ color: "rgba(180,200,190,0.45)", transition: "color 0.2s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.76 0.18 155)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(180,200,190,0.45)"; }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          {/* GitHub */}
          <a
            href="https://github.com/ZeroAI99"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            style={{ color: "rgba(180,200,190,0.45)", transition: "color 0.2s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.76 0.18 155)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(180,200,190,0.45)"; }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          {/* LinkedIn */}
          <a
            href="#"
            aria-label="LinkedIn"
            style={{ color: "rgba(180,200,190,0.45)", transition: "color 0.2s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.76 0.18 155)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(180,200,190,0.45)"; }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          {/* Instagram */}
          <a
            href="#"
            aria-label="Instagram"
            style={{ color: "rgba(180,200,190,0.45)", transition: "color 0.2s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.76 0.18 155)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(180,200,190,0.45)"; }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>
          </a>
        </div>

      </div>
    </div>
  );
}
