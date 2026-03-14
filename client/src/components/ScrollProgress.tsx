/*
 * ZERO AI — ScrollProgress Component
 * Thin emerald progress bar at the top of the page showing scroll position
 */

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent pointer-events-none">
      <div
        className="h-full transition-none"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, oklch(0.76 0.18 155), oklch(0.65 0.22 165))",
          boxShadow: "0 0 8px oklch(0.76 0.18 155 / 0.6)",
        }}
      />
    </div>
  );
}
