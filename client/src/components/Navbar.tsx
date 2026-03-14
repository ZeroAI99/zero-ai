/*
 * ZERO AI — Navbar Component
 * Design: Obsidian Precision — fixed top, minimal, with blur backdrop
 * Colors: near-black bg with emerald accent
 */

import { useState, useEffect } from "react";
import { Link } from "wouter";

const NAV_ITEMS = [
  { label: "Introduction", href: "#introduction", num: "01" },
  { label: "Problem", href: "#problem", num: "02" },
  { label: "Product", href: "#product", num: "03" },
  { label: "Agency", href: "#agency", num: "04" },
  { label: "Science", href: "#science", num: "05" },
  { label: "Memory", href: "#memory", num: "06" },
  { label: "Roadmap", href: "#roadmap", num: "07" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("introduction");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Detect active section
      const sections = NAV_ITEMS.map((item) => item.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[oklch(0.075_0.008_265/0.92)] backdrop-blur-md border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-2 group"
          >
            <img
              src="https://iili.io/q1H6tnV.webp"
              alt="Zero AI Logo"
              className="w-8 h-8 object-contain"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.num}
                onClick={() => scrollTo(item.href)}
                className={`px-3 py-1.5 text-xs transition-colors duration-200 rounded-sm ${
                  activeSection === item.href.replace("#", "")
                    ? "text-[oklch(0.76_0.18_155)]"
                    : "text-[oklch(0.55_0.01_265)] hover:text-[oklch(0.85_0.005_265)]"
                }`}
                style={{ fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.05em" }}
              >
                {item.num}
              </button>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/docs">
              <a
                className="text-[oklch(0.55_0.01_265)] hover:text-[oklch(0.85_0.005_265)] text-xs transition-colors duration-200"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Docs
              </a>
            </Link>
            <Link href="/changelog">
              <a
                className="text-[oklch(0.55_0.01_265)] hover:text-[oklch(0.85_0.005_265)] text-xs transition-colors duration-200"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Changelog
              </a>
            </Link>
            <Link href="/blog">
              <a
                className="text-[oklch(0.55_0.01_265)] hover:text-[oklch(0.85_0.005_265)] text-xs transition-colors duration-200"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Blog
              </a>
            </Link>
            <button
              onClick={() => scrollTo("#cta")}
              className="btn-primary text-xs py-2 px-4"
            >
              Request Access
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-[oklch(0.55_0.01_265)] hover:text-[oklch(0.93_0.005_265)] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5 w-5">
              <span className={`block h-px bg-current transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-px bg-current transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-px bg-current transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[oklch(0.075_0.008_265/0.98)] backdrop-blur-md border-b border-white/[0.06]">
          <div className="container py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.num}
                onClick={() => scrollTo(item.href)}
                className="flex items-center gap-3 py-2.5 text-left text-[oklch(0.55_0.01_265)] hover:text-[oklch(0.93_0.005_265)] transition-colors"
              >
                <span className="text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.label}</span>
              </button>
            ))}
            <div className="pt-3 border-t border-white/[0.06] flex flex-col gap-2">
              <div className="flex gap-3">
                <Link href="/docs"><a className="text-xs text-[oklch(0.55_0.01_265)] hover:text-[oklch(0.76_0.18_155)] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>Docs</a></Link>
                <Link href="/changelog"><a className="text-xs text-[oklch(0.55_0.01_265)] hover:text-[oklch(0.76_0.18_155)] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>Changelog</a></Link>
                <Link href="/blog"><a className="text-xs text-[oklch(0.55_0.01_265)] hover:text-[oklch(0.76_0.18_155)] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>Blog</a></Link>
                <Link href="/privacy"><a className="text-xs text-[oklch(0.55_0.01_265)] hover:text-[oklch(0.76_0.18_155)] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>Privacy</a></Link>
              </div>
              <button
                onClick={() => scrollTo("#cta")}
                className="btn-primary text-xs py-2 px-4 flex-1 justify-center"
              >
                Request Access
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
