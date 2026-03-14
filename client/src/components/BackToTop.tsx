/*
 * ZERO AI — BackToTop Component
 * Floating button to scroll back to top, visible after scrolling 400px
 */

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-8 right-6 z-50 w-10 h-10 flex items-center justify-center border border-white/[0.1] rounded-sm transition-all duration-300"
      style={{
        background: "oklch(0.085 0.008 265 / 0.9)",
        backdropFilter: "blur(8px)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translateY(0)" : "translateY(12px)",
        color: "oklch(0.76 0.18 155)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = "oklch(0.76 0.18 155 / 0.4)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 12px oklch(0.76 0.18 155 / 0.2)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = "oklch(1 0 0 / 0.1)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}
