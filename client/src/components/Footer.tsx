/*
 * ZERO AI — Footer Component
 * Design: Obsidian Precision — minimal, dark, with emerald accent
 */

import { Link } from "wouter";

const LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663342337625/biHYpnWi4gbAo4jVFbvk4g/zero-ai-logo-new_0acbc76c.webp";
const mono = "'IBM Plex Mono', monospace";
const dm = "'DM Sans', sans-serif";
const syne = "'Syne', sans-serif";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/">
              <a className="flex items-center gap-2 mb-3">
                <img src={LOGO} alt="Zero AI Logo" className="w-8 h-8 object-contain" />
                <span className="text-sm font-bold" style={{ fontFamily: syne, color: "oklch(0.93 0.005 265)" }}>
                  ZERO AI
                </span>
              </a>
            </Link>
            <p className="text-xs leading-relaxed mb-4" style={{ fontFamily: dm, color: "oklch(0.45 0.008 265)" }}>
              Your personal AI operating system. Own the control layer. Govern outcomes.
            </p>
            <span className="text-xs" style={{ fontFamily: mono, color: "oklch(0.35 0.006 265)" }}>
              zeroai.vip
            </span>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: mono, color: "oklch(0.45 0.008 265)" }}>
              Product
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Introduction", href: "/#introduction" },
                { label: "Features", href: "/#product" },
                { label: "Roadmap", href: "/#roadmap" },
                { label: "Changelog", href: "/changelog" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href}>
                    <a
                      className="text-xs transition-colors duration-200"
                      style={{ fontFamily: dm, color: "oklch(0.5 0.008 265)" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.76 0.18 155)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.5 0.008 265)")}
                    >
                      {item.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: mono, color: "oklch(0.45 0.008 265)" }}>
              Technology
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Documentation", href: "/docs" },
                { label: "Architecture", href: "/docs#architecture" },
                { label: "Memory System", href: "/docs#constitutional-memory" },
                { label: "Governance", href: "/docs#governance-engine" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href}>
                    <a
                      className="text-xs transition-colors duration-200"
                      style={{ fontFamily: dm, color: "oklch(0.5 0.008 265)" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.76 0.18 155)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.5 0.008 265)")}
                    >
                      {item.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Connect */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: mono, color: "oklch(0.45 0.008 265)" }}>
              Legal
            </h4>
            <ul className="space-y-2.5 mb-6">
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href}>
                    <a
                      className="text-xs transition-colors duration-200"
                      style={{ fontFamily: dm, color: "oklch(0.5 0.008 265)" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.76 0.18 155)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.5 0.008 265)")}
                    >
                      {item.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {[
                {
                  href: "https://x.com/_zeroai",
                  label: "X / Twitter",
                  icon: (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                },
                {
                  href: "https://github.com/ZeroAI99",
                  label: "GitHub",
                  icon: (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                  ),
                },
                {
                  href: "#",
                  label: "Instagram",
                  icon: (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                    </svg>
                  ),
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href !== "#" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-7 h-7 border rounded-sm flex items-center justify-center transition-all duration-200"
                  style={{ borderColor: "rgba(255,255,255,0.08)", color: "oklch(0.45 0.008 265)" }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = "oklch(0.76 0.18 155)";
                    el.style.borderColor = "oklch(0.76 0.18 155 / 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = "oklch(0.45 0.008 265)";
                    el.style.borderColor = "rgba(255,255,255,0.08)";
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs" style={{ fontFamily: mono, color: "oklch(0.35 0.006 265)" }}>
            © 2026 Zero AI. All rights reserved.
          </p>
          <p className="text-xs" style={{ fontFamily: mono, color: "oklch(0.35 0.006 265)" }}>
            v0.3.0 — Documentation Release
          </p>
        </div>
      </div>
    </footer>
  );
}
