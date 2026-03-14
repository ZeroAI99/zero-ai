/*
 * ZERO AI — IntroScreen Component
 * Design: Exact match to odei.ai intro style
 * Full screen, neural background, large YES/NO buttons, section grid, social icons
 */

import { useState, useEffect } from "react";
import ParticleCanvas from "./ParticleCanvas";

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

  const handleAnswer = (choice: "yes" | "no") => {
    setAnswered(choice);
    sessionStorage.setItem("zeroai_intro_seen", "1");
    setTimeout(() => onEnter(), 700);
  };

  const scrollToSection = (id: string) => {
    sessionStorage.setItem("zeroai_intro_seen", "1");
    onEnter();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 500);
  };

  const mono = "'IBM Plex Mono', monospace";

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col overflow-hidden"
      style={{
        background: "#000",
        transition: answered ? "opacity 0.6s ease" : undefined,
        opacity: answered ? 0 : 1,
      }}
    >
      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Subtle dark overlay to keep text readable */}
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.55)" }} />

      {/* Main content — vertically centered, left-aligned like odei.ai */}
      <div className="relative z-10 flex flex-col justify-center flex-1 w-full max-w-2xl mx-auto px-6 md:px-10">

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
                onClick={() => handleAnswer("yes")}
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
                onClick={() => handleAnswer("no")}
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
