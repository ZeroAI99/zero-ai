/*
 * ZERO AI — IntroScreen Component
 * Design: Terminal aesthetic — full black screen, monospace text, [YES]/[NO] buttons
 * Inspired by odei.ai intro experience
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
  const [showNav, setShowNav] = useState(false);
  const [showSocial, setShowSocial] = useState(false);
  const [answered, setAnswered] = useState<"yes" | "no" | null>(null);
  const [skipped] = useState(() => sessionStorage.getItem("zeroai_intro_seen") === "1");

  const TEXT1 = "> AI generates text. You do all the work.";
  const TEXT2 = "> Prompt. Copy. Paste. Verify. Repeat.";

  // Typewriter effect
  useEffect(() => {
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
            setTimeout(() => setShowNav(true), 1100);
            setTimeout(() => setShowSocial(true), 1400);
          }
        }, 28);
      }
    }, 28);
    return () => clearInterval(t1);
  }, []);

  useEffect(() => {
    if (skipped) {
      onEnter();
    }
  }, [skipped, onEnter]);

  const handleAnswer = (choice: "yes" | "no") => {
    setAnswered(choice);
    sessionStorage.setItem("zeroai_intro_seen", "1");
    setTimeout(() => onEnter(), 800);
  };

  const scrollToSection = (id: string) => {
    onEnter();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 500);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "#000000",
        backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663342337625/biHYpnWi4gbAo4jVFbvk4g/zero-ai-hero-bg-NGi9BN85d6de2rtPtNunGB.webp)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: answered ? "opacity 0.6s ease" : undefined,
        opacity: answered ? 0 : 1,
      }}
    >
      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Heavy dark overlay */}
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.72)" }} />

      <div className="relative z-10 w-full max-w-lg px-6 flex flex-col items-center text-center">

        {/* Logo */}
        <div className="mb-8">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663342337625/biHYpnWi4gbAo4jVFbvk4g/zero-ai-logo_a8c58afd.webp"
            alt="Zero AI"
            className="w-20 h-20 object-contain mx-auto"
          />
        </div>

        {/* Terminal lines */}
        <div className="w-full mb-8 text-left">
          <p
            className="text-sm leading-relaxed mb-1"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              color: "oklch(0.65 0.01 265)",
              minHeight: "1.5rem",
            }}
          >
            {line1}
            {line1.length < TEXT1.length && (
              <span className="animate-pulse">_</span>
            )}
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              color: "oklch(0.65 0.01 265)",
              minHeight: "1.5rem",
            }}
          >
            {line2}
            {line1.length >= TEXT1.length && line2.length < TEXT2.length && (
              <span className="animate-pulse">_</span>
            )}
          </p>
        </div>

        {/* Headline */}
        <div
          className={`mb-6 transition-all duration-500 ${showHeadline ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <h1
            className="font-bold leading-snug text-center"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "clamp(1.4rem, 5vw, 2rem)",
              color: "oklch(0.95 0.005 265)",
              letterSpacing: "-0.01em",
            }}
          >
            Your AI must work<br />
            continuously, governed<br />
            by your rules, not<br />
            <span style={{ color: "oklch(0.76 0.18 155)" }}>prompts</span>
          </h1>
        </div>

        {/* Question + Buttons */}
        <div
          className={`mb-10 transition-all duration-500 delay-100 ${showQuestion ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <p
            className="text-sm mb-5"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              color: "oklch(0.76 0.18 155)",
            }}
          >
            &gt; Do you agree?
          </p>

          {answered === null ? (
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => handleAnswer("yes")}
                className="px-10 py-3 text-sm font-semibold transition-all duration-200"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  color: "oklch(0.76 0.18 155)",
                  border: "1px solid oklch(0.76 0.18 155)",
                  background: "transparent",
                  letterSpacing: "0.1em",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "oklch(0.76 0.18 155 / 0.12)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                }}
              >
                [ YES ]
              </button>
              <button
                onClick={() => handleAnswer("no")}
                className="px-10 py-3 text-sm font-semibold transition-all duration-200"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  color: "oklch(0.65 0.01 265)",
                  border: "1px solid oklch(0.35 0.006 265)",
                  background: "transparent",
                  letterSpacing: "0.1em",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "oklch(1 0 0 / 0.05)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                }}
              >
                [ NO ]
              </button>
            </div>
          ) : (
            <p
              className="text-sm"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                color: "oklch(0.76 0.18 155)",
              }}
            >
              {answered === "yes" ? "> Welcome to the future of AI." : "> You will be soon."}
            </p>
          )}
        </div>

        {/* Navigation grid */}
        <div
          className={`w-full mb-8 transition-all duration-500 delay-200 ${showNav ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="flex flex-wrap justify-center gap-2">
            {NAV_SECTIONS.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="px-3 py-1.5 text-xs transition-all duration-200"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  color: "oklch(0.55 0.01 265)",
                  border: "1px solid oklch(0.25 0.006 265)",
                  background: "transparent",
                  letterSpacing: "0.03em",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.76 0.18 155)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "oklch(0.76 0.18 155 / 0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.55 0.01 265)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "oklch(0.25 0.006 265)";
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Social icons */}
        <div
          className={`flex items-center gap-6 transition-all duration-500 delay-300 ${showSocial ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <a
            href="https://x.com/_zeroai"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="transition-colors duration-200"
            style={{ color: "oklch(0.4 0.008 265)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.76 0.18 155)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.4 0.008 265)"; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="#"
            aria-label="LinkedIn"
            className="transition-colors duration-200"
            style={{ color: "oklch(0.4 0.008 265)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.76 0.18 155)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.4 0.008 265)"; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="transition-colors duration-200"
            style={{ color: "oklch(0.4 0.008 265)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.76 0.18 155)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.4 0.008 265)"; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>
          </a>
        </div>

      </div>
    </div>
  );
}
