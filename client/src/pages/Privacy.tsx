/*
 * ZERO AI — Privacy Policy Page
 */

import { Link } from "wouter";

const LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663342337625/biHYpnWi4gbAo4jVFbvk4g/zero-ai-logo-v2_57ca5299.webp";
const mono = "'IBM Plex Mono', monospace";
const syne = "'Syne', sans-serif";
const dm = "'DM Sans', sans-serif";

const SECTIONS = [
  {
    id: "information-we-collect",
    title: "Information We Collect",
    content: `We collect information you provide directly to us when you join our waitlist or contact us. This includes your name, email address, professional role, and any message you choose to include. We do not collect any data beyond what you explicitly provide.

When you visit our website, we may collect standard server logs including IP address, browser type, and pages visited. This data is used solely for security monitoring and is not shared with third parties.`,
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    content: `We use the information we collect to:

— Send you updates about Zero AI's development and early access availability
— Respond to your inquiries and support requests
— Improve our website and services
— Comply with legal obligations

We will never sell your personal information to third parties. We will never use your data for advertising purposes outside of Zero AI communications.`,
  },
  {
    id: "data-storage",
    title: "Data Storage and Security",
    content: `Your data is stored on secure servers with industry-standard encryption. We use TiDB (MySQL-compatible) for data persistence with AES-256 encryption at rest and TLS in transit.

Zero AI is built on a local-first architecture principle. When the full product launches, your AI context, policies, and Constitutional Memory will be stored on your own infrastructure — not ours. We are committed to this principle from day one.`,
  },
  {
    id: "data-retention",
    title: "Data Retention",
    content: `We retain your waitlist information until you request deletion or until the waitlist program concludes. You may request deletion of your data at any time by emailing privacy@zeroai.vip.

Server logs are retained for 30 days for security purposes and then automatically deleted.`,
  },
  {
    id: "your-rights",
    title: "Your Rights",
    content: `You have the right to:

— Access the personal data we hold about you
— Request correction of inaccurate data
— Request deletion of your data
— Withdraw consent for communications at any time
— Data portability — receive your data in a machine-readable format

To exercise any of these rights, contact us at privacy@zeroai.vip. We will respond within 30 days.`,
  },
  {
    id: "cookies",
    title: "Cookies",
    content: `We use only essential cookies required for authentication and session management. We do not use tracking cookies, advertising cookies, or third-party analytics cookies.

The session cookie is used to maintain your authenticated state and expires when you close your browser or log out explicitly.`,
  },
  {
    id: "third-parties",
    title: "Third-Party Services",
    content: `We use the following third-party services:

— Manus Platform: hosting and authentication infrastructure
— TiDB Cloud: database hosting (data stored in Singapore region)
— Cloudfront CDN: static asset delivery

Each of these services has their own privacy policies. We have selected providers that meet our standards for data protection and security.`,
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    content: `We may update this privacy policy from time to time. We will notify waitlist members of any material changes via email. The date of the most recent revision is shown at the top of this page.

Continued use of our website after changes constitutes acceptance of the updated policy.`,
  },
  {
    id: "contact",
    title: "Contact Us",
    content: `If you have any questions about this privacy policy or our data practices, please contact us:

Email: privacy@zeroai.vip
Twitter: @_zeroai
GitHub: github.com/ZeroAI99

We take privacy seriously and will respond to all inquiries within 48 hours.`,
  },
];

export default function Privacy() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.075 0.008 265)", color: "oklch(0.93 0.005 265)" }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          background: "oklch(0.075 0.008 265 / 0.92)",
          backdropFilter: "blur(12px)",
          borderColor: "rgba(255,255,255,0.06)",
        }}
      >
        <div className="container">
          <div className="flex items-center justify-between h-14">
            <Link href="/">
              <a className="flex items-center gap-2">
                <img src={LOGO} alt="Zero AI" className="w-7 h-7 object-contain" />
                <span className="text-sm font-semibold" style={{ fontFamily: syne }}>ZERO AI</span>
              </a>
            </Link>
            <Link href="/">
              <a
                className="text-xs transition-colors"
                style={{ fontFamily: dm, color: "oklch(0.55 0.01 265)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.85 0.005 265)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.55 0.01 265)")}
              >
                ← Back to Home
              </a>
            </Link>
          </div>
        </div>
      </header>

      <div className="container py-16">
        <div className="max-w-3xl">
          {/* Title */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs tracking-widest uppercase" style={{ fontFamily: mono, color: "oklch(0.76 0.18 155)" }}>
                Legal
              </span>
              <span className="flex-1 h-px" style={{ background: "oklch(0.76 0.18 155 / 0.3)" }} />
            </div>
            <h1 className="font-bold mb-3" style={{ fontFamily: syne, fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Privacy Policy
            </h1>
            <p className="text-sm" style={{ fontFamily: mono, color: "oklch(0.45 0.008 265)" }}>
              Last updated: March 15, 2026
            </p>
            <p className="mt-4 text-sm leading-relaxed" style={{ fontFamily: dm, color: "oklch(0.55 0.01 265)" }}>
              Zero AI is committed to protecting your privacy. This policy explains how we collect, use, and protect your personal information when you use our website and services.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-10">
            {SECTIONS.map((section) => (
              <div key={section.id} id={section.id}>
                <h2 className="font-bold mb-4" style={{ fontFamily: syne, fontSize: "1.1rem", color: "oklch(0.88 0.005 265)" }}>
                  {section.title}
                </h2>
                <div
                  className="text-sm leading-relaxed whitespace-pre-line"
                  style={{ fontFamily: dm, color: "oklch(0.62 0.01 265)", lineHeight: 1.8 }}
                >
                  {section.content}
                </div>
                <div className="mt-6 h-px" style={{ background: "rgba(255,255,255,0.04)" }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t py-8" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs" style={{ fontFamily: mono, color: "oklch(0.35 0.006 265)" }}>
            © 2026 Zero AI. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            {[{ href: "/docs", label: "Docs" }, { href: "/changelog", label: "Changelog" }, { href: "/terms", label: "Terms" }].map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className="text-xs transition-colors"
                  style={{ fontFamily: mono, color: "oklch(0.45 0.008 265)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.76 0.18 155)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.45 0.008 265)")}
                >
                  {link.label}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
