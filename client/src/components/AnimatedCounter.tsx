/*
 * ZERO AI — AnimatedCounter Component
 * Counts up to a target number when scrolled into view
 */

import { useEffect, useState } from "react";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  inView: boolean;
}

export default function AnimatedCounter({
  target,
  duration = 1800,
  suffix = "",
  prefix = "",
  inView,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return (
    <span>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}
