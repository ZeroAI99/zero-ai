/*
 * ZERO AI — Documentation Page
 * Design: Obsidian Precision — technical docs with sidebar navigation
 * Covers: Architecture, Constitutional Memory, Governance Engine
 */

import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";

const LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663342337625/biHYpnWi4gbAo4jVFbvk4g/zero-ai-logo-new_0acbc76c.webp";

const mono = "'IBM Plex Mono', monospace";
const sans = "'DM Sans', sans-serif";
const syne = "'Syne', sans-serif";

const SECTIONS = [
  { id: "overview", label: "Overview", num: "00" },
  { id: "architecture", label: "Architecture", num: "01" },
  { id: "constitutional-memory", label: "Constitutional Memory", num: "02" },
  { id: "governance-engine", label: "Governance Engine", num: "03" },
  { id: "agency-levels", label: "Agency Levels", num: "04" },
  { id: "data-model", label: "Data Model", num: "05" },
  { id: "api-reference", label: "API Reference", num: "06" },
  { id: "roadmap", label: "Technical Roadmap", num: "07" },
];

function CodeBlock({ code, lang = "typescript" }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative group my-5 rounded-sm overflow-hidden border border-white/[0.08]">
      <div className="flex items-center justify-between px-4 py-2 bg-[oklch(0.1_0.008_265)] border-b border-white/[0.06]">
        <span className="text-[10px] text-[oklch(0.4_0.008_265)]" style={{ fontFamily: mono }}>
          {lang}
        </span>
        <button
          onClick={copy}
          className="text-[10px] text-[oklch(0.4_0.008_265)] hover:text-[oklch(0.76_0.18_155)] transition-colors"
          style={{ fontFamily: mono }}
        >
          {copied ? "✓ copied" : "copy"}
        </button>
      </div>
      <pre
        className="p-4 overflow-x-auto text-xs leading-relaxed"
        style={{ fontFamily: mono, color: "oklch(0.75 0.01 265)", background: "oklch(0.085 0.008 265)" }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}

function SectionTag({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-xs text-[oklch(0.76_0.18_155)]" style={{ fontFamily: mono }}>
        {num}
      </span>
      <span className="accent-line" style={{ flex: 1, height: "1px", background: "oklch(0.76 0.18 155 / 0.2)", maxWidth: "40px" }} />
      <span className="text-xs text-[oklch(0.45_0.008_265)] tracking-widest uppercase" style={{ fontFamily: mono }}>
        {label}
      </span>
    </div>
  );
}

function Heading({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className="font-bold mb-4 scroll-mt-24"
      style={{ fontFamily: syne, fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", color: "oklch(0.93 0.005 265)" }}
    >
      {children}
    </h2>
  );
}

function SubHeading({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h3
      id={id}
      className="font-semibold mt-8 mb-3 scroll-mt-24"
      style={{ fontFamily: syne, fontSize: "1.05rem", color: "oklch(0.85 0.005 265)" }}
    >
      {children}
    </h3>
  );
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-[oklch(0.6_0.01_265)] leading-relaxed mb-4" style={{ fontFamily: sans, fontWeight: 300 }}>
      {children}
    </p>
  );
}

function Callout({ type = "info", children }: { type?: "info" | "warning" | "tip"; children: React.ReactNode }) {
  const styles = {
    info: { border: "oklch(0.76 0.18 155 / 0.25)", bg: "oklch(0.76 0.18 155 / 0.04)", label: "NOTE", labelColor: "oklch(0.76 0.18 155)" },
    warning: { border: "oklch(0.85 0.15 60 / 0.25)", bg: "oklch(0.85 0.15 60 / 0.04)", label: "WARNING", labelColor: "oklch(0.85 0.15 60)" },
    tip: { border: "oklch(0.7 0.15 200 / 0.25)", bg: "oklch(0.7 0.15 200 / 0.04)", label: "TIP", labelColor: "oklch(0.7 0.15 200)" },
  }[type];
  return (
    <div
      className="my-5 p-4 rounded-sm border"
      style={{ borderColor: styles.border, background: styles.bg }}
    >
      <span className="text-[10px] font-bold tracking-widest block mb-2" style={{ fontFamily: mono, color: styles.labelColor }}>
        {styles.label}
      </span>
      <p className="text-xs text-[oklch(0.65_0.01_265)] leading-relaxed" style={{ fontFamily: sans }}>
        {children}
      </p>
    </div>
  );
}

function PropTable({ rows }: { rows: { prop: string; type: string; desc: string }[] }) {
  return (
    <div className="my-5 border border-white/[0.08] rounded-sm overflow-hidden">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-white/[0.06] bg-[oklch(0.1_0.008_265)]">
            <th className="text-left px-4 py-2.5 text-[oklch(0.45_0.008_265)]" style={{ fontFamily: mono }}>Property</th>
            <th className="text-left px-4 py-2.5 text-[oklch(0.45_0.008_265)]" style={{ fontFamily: mono }}>Type</th>
            <th className="text-left px-4 py-2.5 text-[oklch(0.45_0.008_265)]" style={{ fontFamily: mono }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.prop} className={i % 2 === 0 ? "" : "bg-white/[0.02]"}>
              <td className="px-4 py-2.5 text-[oklch(0.76_0.18_155)]" style={{ fontFamily: mono }}>{row.prop}</td>
              <td className="px-4 py-2.5 text-[oklch(0.6_0.12_200)]" style={{ fontFamily: mono }}>{row.type}</td>
              <td className="px-4 py-2.5 text-[oklch(0.55_0.01_265)]" style={{ fontFamily: sans }}>{row.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Docs() {
  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-20% 0% -70% 0%", threshold: 0 }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[oklch(0.075_0.008_265)] text-[oklch(0.93_0.005_265)]">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[oklch(0.075_0.008_265/0.95)] backdrop-blur-md border-b border-white/[0.06]">
        <div className="flex items-center justify-between h-14 px-6">
          <div className="flex items-center gap-4">
            <Link href="/">
              <a className="flex items-center gap-2 group">
                <img src={LOGO} alt="Zero AI" className="w-6 h-6 object-contain" />
                <span className="text-xs text-[oklch(0.45_0.008_265)] group-hover:text-[oklch(0.76_0.18_155)] transition-colors" style={{ fontFamily: mono }}>
                  zero-ai
                </span>
              </a>
            </Link>
            <span className="text-[oklch(0.25_0.006_265)]">/</span>
            <span className="text-xs text-[oklch(0.76_0.18_155)]" style={{ fontFamily: mono }}>docs</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/ZeroAI99/zero-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[oklch(0.45_0.008_265)] hover:text-[oklch(0.76_0.18_155)] transition-colors hidden sm:block"
              style={{ fontFamily: mono }}
            >
              GitHub ↗
            </a>
            <Link href="/#cta">
              <a className="btn-primary text-xs py-1.5 px-3">Request Access</a>
            </Link>
            {/* Mobile sidebar toggle */}
            <button
              className="lg:hidden text-[oklch(0.55_0.01_265)] p-1"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className="flex pt-14">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-14 left-0 z-40 h-[calc(100vh-3.5rem)] w-60 border-r border-white/[0.06] bg-[oklch(0.075_0.008_265)] overflow-y-auto transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="p-5">
            <p className="text-[10px] text-[oklch(0.35_0.006_265)] tracking-widest uppercase mb-4" style={{ fontFamily: mono }}>
              Documentation
            </p>
            <nav className="space-y-0.5">
              {SECTIONS.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollTo(section.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-sm text-left transition-all duration-150 ${
                      isActive
                        ? "bg-[oklch(0.76_0.18_155/0.08)] text-[oklch(0.76_0.18_155)]"
                        : "text-[oklch(0.45_0.008_265)] hover:text-[oklch(0.85_0.005_265)] hover:bg-white/[0.03]"
                    }`}
                  >
                    <span className="text-[10px] flex-shrink-0" style={{ fontFamily: mono, color: isActive ? "oklch(0.76 0.18 155 / 0.7)" : "oklch(0.3 0.006 265)" }}>
                      {section.num}
                    </span>
                    <span className="text-xs" style={{ fontFamily: sans }}>
                      {section.label}
                    </span>
                    {isActive && <span className="ml-auto w-1 h-1 rounded-full bg-[oklch(0.76_0.18_155)]" />}
                  </button>
                );
              })}
            </nav>

            <div className="mt-8 pt-6 border-t border-white/[0.06]">
              <p className="text-[10px] text-[oklch(0.3_0.006_265)] mb-3" style={{ fontFamily: mono }}>v1.0.0 — Foundation</p>
              <a
                href="https://github.com/ZeroAI99/zero-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-[oklch(0.4_0.008_265)] hover:text-[oklch(0.76_0.18_155)] transition-colors"
                style={{ fontFamily: sans }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/60 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main ref={contentRef} className="flex-1 min-w-0 px-6 md:px-12 lg:px-16 py-12 max-w-3xl mx-auto lg:mx-0">

          {/* ── OVERVIEW ─────────────────────────────────────── */}
          <section id="overview" className="mb-16 scroll-mt-24">
            <SectionTag num="00" label="Overview" />
            <Heading>Zero AI Documentation</Heading>
            <Paragraph>
              Zero AI is a personal AI operating system — not a chatbot, not an assistant, but a persistent governance layer that works for you continuously. This documentation covers the technical architecture, core systems, and API reference for developers building on or integrating with Zero AI.
            </Paragraph>
            <Callout type="info">
              Zero AI is currently in Phase 1 (Foundation). Some APIs and features described here are in active development. Check the Technical Roadmap section for release timelines.
            </Callout>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
              {[
                { label: "Core Language", value: "TypeScript" },
                { label: "Runtime", value: "Node.js 22" },
                { label: "Database", value: "MySQL / TiDB" },
                { label: "Frontend", value: "React 19 + Vite" },
              ].map((item) => (
                <div key={item.label} className="border border-white/[0.08] rounded-sm p-3 bg-[oklch(0.09_0.008_265)]">
                  <p className="text-[10px] text-[oklch(0.4_0.008_265)] mb-1" style={{ fontFamily: mono }}>{item.label}</p>
                  <p className="text-xs text-[oklch(0.76_0.18_155)]" style={{ fontFamily: mono }}>{item.value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── ARCHITECTURE ─────────────────────────────────── */}
          <section id="architecture" className="mb-16 scroll-mt-24">
            <SectionTag num="01" label="Architecture" />
            <Heading>System Architecture</Heading>
            <Paragraph>
              Zero AI is built on a layered architecture that separates concerns between data persistence, reasoning, governance, and execution. The system is designed to be local-first — your data and policies live on your infrastructure, not in a vendor's cloud.
            </Paragraph>

            <SubHeading>Core Layers</SubHeading>
            <div className="space-y-3 my-5">
              {[
                {
                  layer: "Perception Layer",
                  desc: "Ingests signals from connected data sources — calendar, email, files, APIs. Normalizes events into a unified event stream.",
                  color: "oklch(0.76 0.18 155)",
                },
                {
                  layer: "Memory Layer",
                  desc: "Constitutional Memory system. Stores versioned context, goals, and decisions with full provenance tracking.",
                  color: "oklch(0.7 0.15 200)",
                },
                {
                  layer: "Governance Engine",
                  desc: "Evaluates incoming events against your policy rules. Decides whether to act, defer, or escalate.",
                  color: "oklch(0.75 0.12 280)",
                },
                {
                  layer: "Execution Layer",
                  desc: "Carries out approved actions — sending messages, updating records, triggering workflows, calling APIs.",
                  color: "oklch(0.8 0.12 40)",
                },
                {
                  layer: "Audit Layer",
                  desc: "Records every decision and action with cryptographic receipts. Enables full replay and rollback.",
                  color: "oklch(0.65 0.1 160)",
                },
              ].map((item, i) => (
                <div key={item.layer} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-6 h-6 rounded-sm flex items-center justify-center text-[10px]" style={{ background: item.color + " / 0.12", border: `1px solid ${item.color} / 0.3`, fontFamily: mono, color: item.color }}>
                      {String(i).padStart(2, "0")}
                    </div>
                    {i < 4 && <div className="w-px h-4 mt-1" style={{ background: "oklch(0.2 0.006 265)" }} />}
                  </div>
                  <div className="pb-2">
                    <p className="text-sm font-semibold mb-1" style={{ fontFamily: syne, color: item.color }}>{item.layer}</p>
                    <p className="text-xs text-[oklch(0.55_0.01_265)] leading-relaxed" style={{ fontFamily: sans }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <SubHeading>Request Flow</SubHeading>
            <CodeBlock lang="text" code={`Event Source (calendar / email / API trigger)
       │
       ▼
Perception Layer  ──→  normalize to EventSchema
       │
       ▼
Memory Layer  ──→  enrich with context + history
       │
       ▼
Governance Engine  ──→  evaluate against PolicyRules
       │
       ├── APPROVED  ──→  Execution Layer  ──→  Action
       ├── DEFERRED  ──→  Queue for human review
       └── BLOCKED   ──→  Audit log + notification`} />

            <SubHeading>Stack Overview</SubHeading>
            <CodeBlock lang="typescript" code={`// server/routers.ts — tRPC procedure example
export const appRouter = router({
  // Public procedures — no auth required
  waitlist: router({
    join: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .mutation(async ({ input }) => { /* ... */ }),
  }),

  // Protected procedures — requires valid session
  memory: router({
    getContext: protectedProcedure
      .query(async ({ ctx }) => {
        return await getConstitutionalMemory(ctx.user.id);
      }),
  }),
});`} />
          </section>

          {/* ── CONSTITUTIONAL MEMORY ────────────────────────── */}
          <section id="constitutional-memory" className="mb-16 scroll-mt-24">
            <SectionTag num="02" label="Constitutional Memory" />
            <Heading>Constitutional Memory</Heading>
            <Paragraph>
              Constitutional Memory is the core persistence mechanism of Zero AI. Unlike session-based context in conventional AI systems, Constitutional Memory is versioned, auditable, and portable. Every piece of context has provenance — you know exactly when it was created, what triggered it, and how it has evolved.
            </Paragraph>

            <SubHeading>Memory Schema</SubHeading>
            <Paragraph>
              Memory is organized into three tiers: <strong style={{ color: "oklch(0.85 0.005 265)" }}>Constitutional</strong> (immutable core values and long-term goals), <strong style={{ color: "oklch(0.85 0.005 265)" }}>Episodic</strong> (session and interaction history), and <strong style={{ color: "oklch(0.85 0.005 265)" }}>Semantic</strong> (extracted facts and relationships).
            </Paragraph>
            <CodeBlock lang="typescript" code={`interface ConstitutionalMemory {
  // Tier 1: Constitutional — immutable core
  constitution: {
    values: string[];          // "privacy-first", "async-by-default"
    goals: Goal[];             // long-term objectives with deadlines
    constraints: Constraint[]; // hard limits that cannot be overridden
  };

  // Tier 2: Episodic — interaction history
  episodes: Episode[];         // timestamped interaction records
  
  // Tier 3: Semantic — extracted knowledge
  facts: Fact[];               // subject-predicate-object triples
  relationships: Relation[];   // entity graph

  // Metadata
  version: number;             // monotonically increasing
  checksum: string;            // SHA-256 of canonical JSON
  createdAt: Date;
  updatedAt: Date;
}`} />

            <SubHeading>Versioning</SubHeading>
            <Paragraph>
              Every write to Constitutional Memory creates a new version. Versions are immutable — you can always roll back to any previous state. The versioning system uses content-addressed storage, meaning identical states produce identical checksums.
            </Paragraph>
            <CodeBlock lang="typescript" code={`// Writing to memory — creates new version
const newVersion = await memory.write({
  type: "goal",
  content: {
    id: "goal_001",
    title: "Ship Zero AI v1.0",
    deadline: new Date("2026-06-30"),
    priority: "high",
  },
  source: "user_input",
  confidence: 1.0,
});

// Reading — always returns latest unless version specified
const current = await memory.read({ type: "goals" });
const historical = await memory.read({ type: "goals", version: 12 });

// Rollback to previous version
await memory.rollback({ targetVersion: 12, reason: "Incorrect goal added" });`} />

            <Callout type="tip">
              Constitutional Memory exports to a portable JSON format. You can migrate your entire context between Zero AI instances or use it as a seed for a new system.
            </Callout>

            <SubHeading>Memory Properties</SubHeading>
            <PropTable rows={[
              { prop: "persistent", type: "boolean", desc: "Survives across sessions and system restarts" },
              { prop: "versioned", type: "number", desc: "Every write increments the version counter" },
              { prop: "auditable", type: "boolean", desc: "Full provenance trail for every memory entry" },
              { prop: "portable", type: "boolean", desc: "Exportable to JSON; importable to any Zero AI instance" },
              { prop: "encrypted", type: "boolean", desc: "AES-256 encryption at rest; keys stay local" },
              { prop: "indexed", type: "boolean", desc: "Full-text and semantic search over all memory tiers" },
            ]} />
          </section>

          {/* ── GOVERNANCE ENGINE ────────────────────────────── */}
          <section id="governance-engine" className="mb-16 scroll-mt-24">
            <SectionTag num="03" label="Governance Engine" />
            <Heading>Governance Engine</Heading>
            <Paragraph>
              The Governance Engine is the decision-making core of Zero AI. It evaluates every proposed action against your policy rules before execution. No action happens without governance approval — this is the fundamental difference between Zero AI and conventional AI agents.
            </Paragraph>

            <SubHeading>Policy Rules</SubHeading>
            <Paragraph>
              Policies are written in a declarative DSL (Domain-Specific Language) that describes conditions and consequences. Policies are versioned alongside Constitutional Memory and can be updated at any time without restarting the system.
            </Paragraph>
            <CodeBlock lang="typescript" code={`// Policy definition example
const emailPolicy: Policy = {
  id: "pol_email_001",
  name: "Email Response Governance",
  version: 3,
  
  // Conditions that trigger this policy
  triggers: [
    { event: "email.received", filter: { from: "!internal" } }
  ],
  
  // Rules evaluated in order — first match wins
  rules: [
    {
      condition: "email.priority === 'urgent' && email.from.isKnownContact",
      action: "respond",
      template: "urgent_response",
      requireApproval: false,   // auto-execute
    },
    {
      condition: "email.containsLegalLanguage",
      action: "defer",
      reason: "Legal review required",
      notifyOwner: true,
    },
    {
      condition: "true",         // default fallback
      action: "queue",
      reviewWithin: "24h",
    },
  ],
  
  // Audit configuration
  audit: {
    logLevel: "full",
    retentionDays: 90,
  },
};`} />

            <SubHeading>Decision Pipeline</SubHeading>
            <Paragraph>
              When an event enters the Governance Engine, it passes through a sequential evaluation pipeline. Each stage can approve, block, or modify the proposed action before it reaches the Execution Layer.
            </Paragraph>
            <CodeBlock lang="typescript" code={`// Governance decision types
type GovernanceDecision =
  | { outcome: "APPROVED"; action: ExecutableAction; confidence: number }
  | { outcome: "DEFERRED"; reason: string; reviewBy: Date }
  | { outcome: "BLOCKED"; reason: string; policyId: string }
  | { outcome: "MODIFIED"; original: Action; modified: ExecutableAction };

// Evaluating an action
const decision = await governanceEngine.evaluate({
  proposedAction: {
    type: "send_message",
    channel: "email",
    recipient: "client@example.com",
    content: draftContent,
  },
  context: await memory.read({ type: "current_context" }),
  userId: ctx.user.id,
});

if (decision.outcome === "APPROVED") {
  await executionLayer.run(decision.action);
  await auditLog.record(decision);
}`} />

            <SubHeading>Audit Trail</SubHeading>
            <Paragraph>
              Every governance decision is recorded in an immutable audit log. Each entry contains the full decision context, the policy that was applied, the confidence score, and a cryptographic receipt. The audit trail can be exported and verified independently.
            </Paragraph>
            <CodeBlock lang="typescript" code={`interface AuditEntry {
  id: string;                    // UUID v4
  timestamp: Date;               // UTC
  eventId: string;               // source event reference
  policyId: string;              // policy that was applied
  decision: GovernanceDecision;  // full decision object
  executionResult?: ActionResult; // if APPROVED and executed
  receipt: string;               // SHA-256(id + timestamp + decision)
  userId: string;
}`} />
          </section>

          {/* ── AGENCY LEVELS ────────────────────────────────── */}
          <section id="agency-levels" className="mb-16 scroll-mt-24">
            <SectionTag num="04" label="Agency Levels" />
            <Heading>Agency Levels</Heading>
            <Paragraph>
              Zero AI defines a five-level taxonomy of AI agency. Each level represents an increasing degree of autonomy and capability. Zero AI targets Level 5 — Symbiotic — where the system evolves with the user and governs outcomes proactively.
            </Paragraph>
            <div className="space-y-3 my-6">
              {[
                { level: 1, name: "Informational", desc: "Answers questions on demand. No memory, no initiative. Standard chatbot behavior.", current: false },
                { level: 2, name: "Assistive", desc: "Suggests actions and helps with tasks. Limited context retention within a session.", current: false },
                { level: 3, name: "Agentic", desc: "Executes multi-step tasks autonomously. Can use tools and APIs. No persistent governance.", current: false },
                { level: 4, name: "Collaborative", desc: "Works alongside the user on complex, long-horizon problems. Maintains context across sessions.", current: false },
                { level: 5, name: "Symbiotic", desc: "Evolves with the user's system. Proactively governs outcomes. Constitutional Memory + Governance Engine. Full audit trail.", current: true },
              ].map((item) => (
                <div
                  key={item.level}
                  className={`flex gap-4 p-4 rounded-sm border transition-all ${
                    item.current
                      ? "border-[oklch(0.76_0.18_155/0.3)] bg-[oklch(0.76_0.18_155/0.05)]"
                      : "border-white/[0.06] bg-[oklch(0.09_0.008_265)] opacity-70"
                  }`}
                >
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-sm flex items-center justify-center text-xs font-bold"
                    style={{
                      fontFamily: mono,
                      background: item.current ? "oklch(0.76 0.18 155 / 0.15)" : "oklch(0.12 0.008 265)",
                      color: item.current ? "oklch(0.76 0.18 155)" : "oklch(0.4 0.008 265)",
                    }}
                  >
                    L{item.level}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold" style={{ fontFamily: syne, color: item.current ? "oklch(0.93 0.005 265)" : "oklch(0.6 0.01 265)" }}>
                        {item.name}
                      </span>
                      {item.current && (
                        <span className="text-[10px] px-2 py-0.5 rounded-sm" style={{ fontFamily: mono, background: "oklch(0.76 0.18 155 / 0.15)", color: "oklch(0.76 0.18 155)" }}>
                          Zero AI target
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[oklch(0.5_0.008_265)] leading-relaxed" style={{ fontFamily: sans }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── DATA MODEL ───────────────────────────────────── */}
          <section id="data-model" className="mb-16 scroll-mt-24">
            <SectionTag num="05" label="Data Model" />
            <Heading>Data Model</Heading>
            <Paragraph>
              Zero AI uses a relational database (MySQL / TiDB) for structured data and S3-compatible object storage for files and binary data. The schema is managed with Drizzle ORM and versioned migrations.
            </Paragraph>
            <SubHeading>Core Tables</SubHeading>
            <CodeBlock lang="sql" code={`-- Users table (managed by Manus OAuth)
CREATE TABLE users (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  open_id     VARCHAR(255) UNIQUE NOT NULL,
  name        VARCHAR(255),
  avatar      TEXT,
  role        ENUM('admin', 'user') DEFAULT 'user',
  created_at  BIGINT NOT NULL  -- UTC milliseconds
);

-- Waitlist table
CREATE TABLE waitlist (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  email       VARCHAR(255) UNIQUE NOT NULL,
  name        VARCHAR(128),
  role        ENUM('Founder','Operator','Creator','Builder'),
  message     TEXT,
  status      ENUM('pending','approved','rejected') DEFAULT 'pending',
  created_at  BIGINT NOT NULL
);

-- Memory entries (Phase 2)
CREATE TABLE memory_entries (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  user_id     INT NOT NULL REFERENCES users(id),
  tier        ENUM('constitutional','episodic','semantic') NOT NULL,
  type        VARCHAR(64) NOT NULL,
  content     JSON NOT NULL,
  version     INT NOT NULL DEFAULT 1,
  checksum    VARCHAR(64) NOT NULL,
  source      VARCHAR(128),
  confidence  FLOAT DEFAULT 1.0,
  created_at  BIGINT NOT NULL
);`} />
          </section>

          {/* ── API REFERENCE ────────────────────────────────── */}
          <section id="api-reference" className="mb-16 scroll-mt-24">
            <SectionTag num="06" label="API Reference" />
            <Heading>API Reference</Heading>
            <Paragraph>
              Zero AI exposes a type-safe tRPC API. All procedures are available under <code className="text-xs px-1.5 py-0.5 rounded" style={{ fontFamily: mono, background: "oklch(0.12 0.008 265)", color: "oklch(0.76 0.18 155)" }}>/api/trpc</code>. Authentication uses HTTP-only session cookies set by the Manus OAuth flow.
            </Paragraph>

            <SubHeading>Authentication</SubHeading>
            <CodeBlock lang="typescript" code={`// Client-side: get login URL
import { getLoginUrl } from "@/const";
window.location.href = getLoginUrl("/dashboard");

// Server-side: access authenticated user
// In any protectedProcedure:
const user = ctx.user; // { id, openId, name, avatar, role }

// Logout
const logout = trpc.auth.logout.useMutation({
  onSuccess: () => window.location.href = "/",
});`} />

            <SubHeading>Waitlist Procedures</SubHeading>
            <PropTable rows={[
              { prop: "waitlist.join", type: "mutation", desc: "Submit email to waitlist. Accepts email, name, role, message." },
              { prop: "waitlist.count", type: "query", desc: "Get total + breakdown by status. Public." },
              { prop: "waitlist.list", type: "query", desc: "Get all entries ordered by date. Admin only." },
              { prop: "waitlist.updateStatus", type: "mutation", desc: "Approve or reject a waitlist entry. Admin only." },
            ]} />

            <SubHeading>AI Chat Procedures</SubHeading>
            <CodeBlock lang="typescript" code={`// Send a message to Zero AI persona
const chat = trpc.ai.chat.useMutation();

await chat.mutateAsync({
  messages: [
    { role: "user", content: "What is Constitutional Memory?" },
    { role: "assistant", content: "Constitutional Memory is..." },
    { role: "user", content: "How does versioning work?" },
  ],
});
// Returns: { content: string }`} />

            <Callout type="warning">
              The AI chat endpoint is rate-limited to 20 requests per minute per IP. In production, authenticated users will have higher limits based on their plan.
            </Callout>
          </section>

          {/* ── TECHNICAL ROADMAP ────────────────────────────── */}
          <section id="roadmap" className="mb-16 scroll-mt-24">
            <SectionTag num="07" label="Technical Roadmap" />
            <Heading>Technical Roadmap</Heading>
            <Paragraph>
              Zero AI is being built in four phases. Each phase ships a complete, production-ready set of capabilities before the next phase begins.
            </Paragraph>
            <div className="space-y-4 my-6">
              {[
                {
                  phase: "Phase 1 — Foundation",
                  quarter: "Q1 2026",
                  status: "active",
                  items: [
                    "Constitutional Memory System (schema + versioning)",
                    "Basic Governance Engine (policy evaluation)",
                    "Local-first Architecture",
                    "Waitlist + Admin Dashboard",
                    "AI Chat Demo (Zero AI persona)",
                  ],
                },
                {
                  phase: "Phase 2 — Expansion",
                  quarter: "Q2 2026",
                  status: "planned",
                  items: [
                    "Multi-model Support (GPT-4, Claude, Gemini)",
                    "Advanced Policy Engine (DSL + visual editor)",
                    "Audit Trail System (cryptographic receipts)",
                    "Memory Export / Import",
                    "Webhook integrations",
                  ],
                },
                {
                  phase: "Phase 3 — Evolution",
                  quarter: "Q3 2026",
                  status: "planned",
                  items: [
                    "Real-time Collaboration",
                    "Advanced Analytics Dashboard",
                    "Community Plugins API",
                    "Mobile companion app",
                    "End-to-end encryption",
                  ],
                },
                {
                  phase: "Phase 4 — Maturity",
                  quarter: "Q4 2026",
                  status: "planned",
                  items: [
                    "Enterprise SSO + RBAC",
                    "On-premise deployment",
                    "Advanced Integrations (Slack, Notion, Linear)",
                    "Full Ecosystem + Marketplace",
                  ],
                },
              ].map((item) => (
                <div
                  key={item.phase}
                  className={`p-5 rounded-sm border ${
                    item.status === "active"
                      ? "border-[oklch(0.76_0.18_155/0.3)] bg-[oklch(0.76_0.18_155/0.04)]"
                      : "border-white/[0.06] bg-[oklch(0.09_0.008_265)] opacity-80"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold" style={{ fontFamily: syne, color: item.status === "active" ? "oklch(0.93 0.005 265)" : "oklch(0.65 0.01 265)" }}>
                      {item.phase}
                    </span>
                    <div className="flex items-center gap-2">
                      {item.status === "active" && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.76_0.18_155)] animate-pulse" />
                      )}
                      <span
                        className="text-xs px-2 py-0.5 rounded-sm"
                        style={{
                          fontFamily: mono,
                          background: item.status === "active" ? "oklch(0.76 0.18 155 / 0.15)" : "oklch(0.12 0.008 265)",
                          color: item.status === "active" ? "oklch(0.76 0.18 155)" : "oklch(0.4 0.008 265)",
                        }}
                      >
                        {item.quarter}
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-1.5">
                    {item.items.map((feat) => (
                      <li key={feat} className="flex items-start gap-2">
                        <span className="mt-0.5 flex-shrink-0" style={{ color: item.status === "active" ? "oklch(0.76 0.18 155)" : "oklch(0.35 0.006 265)" }}>→</span>
                        <span className="text-xs leading-relaxed" style={{ fontFamily: sans, color: item.status === "active" ? "oklch(0.65 0.01 265)" : "oklch(0.45 0.008 265)" }}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs text-[oklch(0.35_0.006_265)]" style={{ fontFamily: mono }}>
              Zero AI Documentation — v1.0.0
            </p>
            <Link href="/">
              <a className="text-xs text-[oklch(0.45_0.008_265)] hover:text-[oklch(0.76_0.18_155)] transition-colors" style={{ fontFamily: mono }}>
                ← Back to zeroai.vip
              </a>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
