/*
 * ZERO AI — CursorGlow Component
 * Subtle emerald radial glow that follows the mouse cursor
 */

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    let rafId: number;
    let targetX = -200;
    let targetY = -200;
    let currentX = -200;
    let currentY = -200;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      el.style.transform = `translate(${currentX - 200}px, ${currentY - 200}px)`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    animate();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed top-0 left-0 z-[200] w-[400px] h-[400px] rounded-full"
      style={{
        background:
          "radial-gradient(circle, oklch(0.76 0.18 155 / 0.06) 0%, transparent 70%)",
        willChange: "transform",
      }}
    />
  );
}
