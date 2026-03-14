/*
 * ZERO AI — StatsBar Component
 * Animated statistics bar shown below hero
 */

import AnimatedCounter from "./AnimatedCounter";
import { useInView } from "@/hooks/useInView";

const STATS = [
  { value: 2, suffix: "h", label: "saved per day", prefix: "" },
  { value: 47, suffix: "%", label: "less context switching", prefix: "" },
  { value: 3, suffix: "x", label: "faster decision making", prefix: "" },
  { value: 100, suffix: "%", label: "your rules, your data", prefix: "" },
];

export default function StatsBar() {
  const { ref, inView } = useInView(0.2);

  return (
    <div
      ref={ref}
      className="border-t border-b border-white/[0.06] py-8"
      style={{ background: "oklch(0.085 0.008 265 / 0.6)" }}
    >
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-white/[0.06]">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className={`flex flex-col items-center text-center px-4 transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <span
                className="font-bold leading-none mb-1"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                  color: "oklch(0.76 0.18 155)",
                }}
              >
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  inView={inView}
                  duration={1600 + i * 200}
                />
              </span>
              <span
                className="text-xs text-[oklch(0.45_0.008_265)] mt-1"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
