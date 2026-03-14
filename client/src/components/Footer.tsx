/*
 * ZERO AI — Footer Component
 * Design: Obsidian Precision — minimal, dark, with emerald accent
 */

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-10">
      <div className="container">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-sm bg-[oklch(0.76_0.18_155)] flex items-center justify-center">
              <span className="text-[oklch(0.07_0.008_265)] font-bold text-xs" style={{ fontFamily: "'Syne', sans-serif" }}>Z</span>
            </div>
            <span
              className="text-[oklch(0.93_0.005_265)] font-semibold text-sm tracking-widest uppercase"
              style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "0.18em" }}
            >
              Zero AI
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs text-[oklch(0.45_0.008_265)] hover:text-[oklch(0.76_0.18_155)] transition-colors duration-200"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-xs text-[oklch(0.45_0.008_265)] hover:text-[oklch(0.76_0.18_155)] transition-colors duration-200"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Docs
            </a>
            <a
              href="#"
              className="text-xs text-[oklch(0.45_0.008_265)] hover:text-[oklch(0.76_0.18_155)] transition-colors duration-200"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Connect
            </a>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              aria-label="Twitter / X"
              className="w-8 h-8 border border-white/[0.08] rounded-sm flex items-center justify-center text-[oklch(0.45_0.008_265)] hover:text-[oklch(0.76_0.18_155)] hover:border-[oklch(0.76_0.18_155/0.3)] transition-all duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="w-8 h-8 border border-white/[0.08] rounded-sm flex items-center justify-center text-[oklch(0.45_0.008_265)] hover:text-[oklch(0.76_0.18_155)] hover:border-[oklch(0.76_0.18_155/0.3)] transition-all duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="w-8 h-8 border border-white/[0.08] rounded-sm flex items-center justify-center text-[oklch(0.45_0.008_265)] hover:text-[oklch(0.76_0.18_155)] hover:border-[oklch(0.76_0.18_155/0.3)] transition-all duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p
            className="text-xs text-[oklch(0.35_0.006_265)]"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            © 2026 Zero AI. All rights reserved.
          </p>
          <p
            className="text-xs text-[oklch(0.35_0.006_265)]"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            v1.0.0 — Foundation
          </p>
        </div>
      </div>
    </footer>
  );
}
