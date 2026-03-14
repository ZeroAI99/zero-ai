/*
 * ZERO AI — WaitlistModal
 * Early access request form that saves to database and notifies owner
 */

import { useState } from "react";
import { trpc } from "@/lib/trpc";

interface WaitlistModalProps {
  onClose: () => void;
}

const ROLES = ["Founder", "Operator", "Creator", "Builder"] as const;

export default function WaitlistModal({ onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<typeof ROLES[number] | "">("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [alreadyJoined, setAlreadyJoined] = useState(false);

  const joinMutation = trpc.waitlist.join.useMutation({
    onSuccess: (data) => {
      setSubmitted(true);
      setAlreadyJoined(data.alreadyJoined);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    joinMutation.mutate({
      email,
      name: name || undefined,
      role: role || undefined,
      message: message || undefined,
    });
  };

  const mono = { fontFamily: "'IBM Plex Mono', monospace" };
  const syne = { fontFamily: "'Syne', sans-serif" };
  const dm = { fontFamily: "'DM Sans', sans-serif" };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "oklch(0.05 0.008 265 / 0.95)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-md border border-white/[0.1] rounded-sm p-8 relative"
        style={{ background: "oklch(0.085 0.008 265)" }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[oklch(0.4_0.008_265)] hover:text-[oklch(0.76_0.18_155)] transition-colors"
          style={mono}
        >
          ✕
        </button>

        {!submitted ? (
          <>
            <div className="mb-6">
              <span
                className="text-xs text-[oklch(0.76_0.18_155)] tracking-[0.2em] uppercase block mb-2"
                style={mono}
              >
                Early Access
              </span>
              <h2 className="font-bold text-xl text-[oklch(0.93_0.005_265)]" style={syne}>
                Join the Waitlist
              </h2>
              <p className="text-xs text-[oklch(0.45_0.008_265)] mt-1" style={dm}>
                Be among the first to experience Zero AI.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="text-xs text-[oklch(0.45_0.008_265)] block mb-1.5" style={mono}>
                  EMAIL *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-transparent border border-white/[0.1] rounded-sm px-3 py-2.5 text-sm text-[oklch(0.85_0.005_265)] placeholder-[oklch(0.3_0.006_265)] focus:outline-none focus:border-[oklch(0.76_0.18_155/0.5)] transition-colors"
                  style={mono}
                />
              </div>

              {/* Name */}
              <div>
                <label className="text-xs text-[oklch(0.45_0.008_265)] block mb-1.5" style={mono}>
                  NAME
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full bg-transparent border border-white/[0.1] rounded-sm px-3 py-2.5 text-sm text-[oklch(0.85_0.005_265)] placeholder-[oklch(0.3_0.006_265)] focus:outline-none focus:border-[oklch(0.76_0.18_155/0.5)] transition-colors"
                  style={mono}
                />
              </div>

              {/* Role */}
              <div>
                <label className="text-xs text-[oklch(0.45_0.008_265)] block mb-1.5" style={mono}>
                  I AM A
                </label>
                <div className="flex flex-wrap gap-2">
                  {ROLES.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(role === r ? "" : r)}
                      className="px-3 py-1.5 border rounded-sm text-xs transition-all duration-150"
                      style={{
                        ...mono,
                        borderColor: role === r ? "oklch(0.76 0.18 155 / 0.6)" : "oklch(1 0 0 / 0.1)",
                        color: role === r ? "oklch(0.76 0.18 155)" : "oklch(0.55 0.01 265)",
                        background: role === r ? "oklch(0.76 0.18 155 / 0.08)" : "transparent",
                      }}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-xs text-[oklch(0.45_0.008_265)] block mb-1.5" style={mono}>
                  MESSAGE (OPTIONAL)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What problem are you trying to solve?"
                  rows={3}
                  maxLength={500}
                  className="w-full bg-transparent border border-white/[0.1] rounded-sm px-3 py-2.5 text-sm text-[oklch(0.85_0.005_265)] placeholder-[oklch(0.3_0.006_265)] focus:outline-none focus:border-[oklch(0.76_0.18_155/0.5)] transition-colors resize-none"
                  style={dm}
                />
              </div>

              {/* Error */}
              {joinMutation.error && (
                <p className="text-xs text-red-400" style={mono}>
                  {joinMutation.error.message}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={joinMutation.isPending || !email}
                className="w-full py-3 font-semibold text-sm tracking-wide transition-all duration-200 rounded-sm disabled:opacity-50"
                style={{
                  ...mono,
                  border: "1px solid oklch(0.76 0.18 155 / 0.5)",
                  color: "oklch(0.76 0.18 155)",
                  background: joinMutation.isPending ? "oklch(0.76 0.18 155 / 0.08)" : "transparent",
                }}
              >
                {joinMutation.isPending ? "Submitting..." : "Request Early Access →"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div
              className="w-12 h-12 rounded-sm border border-[oklch(0.76_0.18_155/0.3)] bg-[oklch(0.76_0.18_155/0.08)] flex items-center justify-center mx-auto mb-4"
            >
              <span className="text-[oklch(0.76_0.18_155)] text-xl">✓</span>
            </div>
            <h2 className="font-bold text-xl text-[oklch(0.93_0.005_265)] mb-2" style={syne}>
              {alreadyJoined ? "Already on the list!" : "You're on the list."}
            </h2>
            <p className="text-sm text-[oklch(0.55_0.01_265)] mb-6" style={dm}>
              {alreadyJoined
                ? "This email is already registered. We'll reach out soon."
                : "We'll reach out within 48 hours. Follow @_zeroai for updates."}
            </p>
            <a
              href="https://x.com/_zeroai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-white/[0.1] rounded-sm text-xs text-[oklch(0.55_0.01_265)] hover:text-[oklch(0.76_0.18_155)] hover:border-[oklch(0.76_0.18_155/0.3)] transition-all duration-200"
              style={mono}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Follow @_zeroai
            </a>
            <button
              onClick={onClose}
              className="block w-full mt-3 text-xs text-[oklch(0.35_0.006_265)] hover:text-[oklch(0.55_0.01_265)] transition-colors"
              style={mono}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
