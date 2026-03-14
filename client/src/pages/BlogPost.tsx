/*
 * ZERO AI — Blog Post Page
 * Design: Obsidian Precision — Swiss Grid × Dark Matter Aesthetic
 */

import { useParams, Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LOGO = "https://iili.io/q1H6tnV.webp";

const POSTS: Record<string, {
  tag: string;
  date: string;
  readTime: string;
  title: string;
  author: string;
  content: string;
}> = {
  "introducing-zero-ai": {
    tag: "ANNOUNCEMENT",
    date: "March 15, 2026",
    readTime: "4 min read",
    title: "Introducing Zero AI: Your Personal AI Operating System",
    author: "Zero AI Team",
    content: `
## The Problem With AI Today

Every AI tool you use today has the same fundamental flaw: it forgets you.

You open a new chat. You re-explain your context. You prompt. You copy. You paste. You verify. You repeat. The most powerful technology in history, reduced to a glorified search bar.

The gap isn't in what AI can do. It's in what AI is *allowed* to do.

## What Zero AI Is

Zero AI is not an assistant. It's not an app. It's not another chatbot with a better system prompt.

**Zero AI is infrastructure.**

A persistent, private, proactive intelligence layer that works for you — even when you're not looking. It observes your goals, decides what matters, acts on your behalf, verifies outcomes, and learns from every interaction.

The Governance Loop: **Observe → Decide → Act → Verify → Learn**

## What Makes It Different

Most AI tools are designed to be visited. Zero AI is designed to work.

| Today's AI | Zero AI |
|---|---|
| Waits for your prompt | Initiates when it matters |
| Black box decisions | Fully explainable reasoning |
| Generates text only | Executes real outcomes |
| Static responses | Continuous co-evolution |
| Their platform, their rules | Your system, your data |
| Forgets everything | Remembers what matters |

## Constitutional Memory

The core of Zero AI is Constitutional Memory — a versioned, auditable, portable memory system that evolves with you. Every interaction is logged with provenance. Your goals persist across sessions. Your context is yours to own, export, and control.

## What's Next

Phase 1 (Foundation) is shipping in Q1 2026:
- Constitutional Memory System
- Basic Governance Engine  
- Local-first Architecture

We're building in public. Every decision, every tradeoff, every technical choice will be documented here.

**Request early access at the bottom of this page.**
    `,
  },
  "constitutional-memory-explained": {
    tag: "TECHNICAL",
    date: "March 10, 2026",
    readTime: "7 min read",
    title: "Constitutional Memory: Why AI Needs to Remember More Than Your Last Message",
    author: "Zero AI Team",
    content: `
## The Amnesia Problem

Current AI systems have a memory problem. Not a capability problem — a design problem.

Every session starts from zero. Your goals, your preferences, your context, your history — all of it evaporates the moment you close the tab. You are the memory. You are the glue. You are the part that gets replaced.

This isn't a technical limitation. It's an architectural choice made by platforms that benefit from keeping you dependent on their interface.

## What Constitutional Memory Is

Constitutional Memory is Zero AI's answer to session amnesia. It's a versioned, auditable, portable memory system built on three principles:

**1. Persistence** — Your goals and context survive across sessions, devices, and model upgrades.

**2. Provenance** — Every memory has a source, a timestamp, and a reason. You can trace exactly how your system's knowledge evolved.

**3. Portability** — Your memory is yours. Export it, back it up, migrate it to a different model. No vendor lock-in.

## The Memory Architecture

Constitutional Memory is organized into four layers:

\`\`\`
Layer 1: Constitutional Layer
  └── Core values, non-negotiable constraints, identity
  
Layer 2: Policy Layer  
  └── Behavioral rules, preferences, operating procedures
  
Layer 3: Context Layer
  └── Active goals, current projects, recent decisions
  
Layer 4: Episodic Layer
  └── Interaction history, outcomes, learned patterns
\`\`\`

Each layer has different persistence rules, update frequencies, and access controls.

## Versioning and Rollback

Every change to Constitutional Memory is versioned. You can:
- View the full history of any memory
- Roll back to any previous state
- Compare versions to understand how your system evolved
- Audit every decision that was made based on a specific memory state

This is not a nice-to-have. It's a requirement for any system you're going to trust with consequential decisions.

## What's Coming

In Phase 1, we're shipping the core Constitutional Memory System with:
- Persistent goal tracking
- Policy rule engine
- Basic versioning
- Local-first storage with optional sync

Phase 2 will add multi-device sync, advanced conflict resolution, and the full audit trail system.
    `,
  },
  "governance-engine-deep-dive": {
    tag: "TECHNICAL",
    date: "March 5, 2026",
    readTime: "9 min read",
    title: "The Governance Engine: How Zero AI Makes Decisions You Can Trust",
    author: "Zero AI Team",
    content: `
## Why Transparency Is Non-Negotiable

Every AI system makes decisions. Most of them make those decisions in a black box.

You ask. It answers. You have no idea why it said what it said, what alternatives it considered, or what constraints it was operating under. For low-stakes tasks, this is fine. For anything that matters — your finances, your relationships, your work — it's not acceptable.

Zero AI's Governance Engine is built on a single principle: **every decision must be explainable.**

## The Decision Pipeline

When Zero AI takes an action, it follows a structured decision pipeline:

\`\`\`
1. OBSERVE
   └── Collect relevant context from memory, environment, goals
   
2. EVALUATE  
   └── Check action against constitutional constraints
   └── Score against current policies
   └── Assess risk level
   
3. DECIDE
   └── Select action from approved option set
   └── Generate reasoning trace
   
4. ACT
   └── Execute with appropriate permissions
   └── Log action with full context
   
5. VERIFY
   └── Check outcome against expected result
   └── Update memory with outcome
   └── Trigger learning cycle if needed
\`\`\`

## Constitutional Constraints

Before any action is taken, it's evaluated against the Constitutional Layer. These are your non-negotiable rules — the things Zero AI will never do, regardless of what any other layer says.

Examples:
- Never share personal data with third parties
- Never make financial commitments above $X without explicit approval
- Never send communications on behalf of the user without review
- Always maintain an audit trail

Constitutional constraints cannot be overridden by policies or context. They are the bedrock of the system.

## The Audit Trail

Every action Zero AI takes generates an audit receipt:

\`\`\`json
{
  "action_id": "act_01J8X...",
  "timestamp": "2026-03-05T14:32:11Z",
  "action_type": "send_email",
  "triggered_by": "goal:follow_up_with_client",
  "reasoning": "Client hasn't responded in 3 days. Policy: follow up after 72h.",
  "constitutional_check": "passed",
  "policy_score": 0.94,
  "risk_level": "low",
  "outcome": "success",
  "memory_updated": true
}
\`\`\`

You can query, filter, and export your audit trail at any time.

## What's Coming

The Governance Engine in Phase 1 ships with:
- Constitutional constraint evaluation
- Policy scoring engine
- Basic audit trail
- Risk level assessment

Phase 2 adds advanced analytics, anomaly detection, and the full policy versioning system.
    `,
  },
  "why-own-your-ai": {
    tag: "ESSAY",
    date: "February 28, 2026",
    readTime: "5 min read",
    title: "Why You Should Own Your AI Infrastructure (Not Rent It)",
    author: "Zero AI Team",
    content: `
## The Renting Trap

You wouldn't rent your operating system. You wouldn't rent your database. You wouldn't rent your code editor.

So why are you renting your AI?

Every time you use a commercial AI tool, you're renting access to someone else's infrastructure. Your context lives in their database. Your rules reset every session. Your workflows depend on their uptime, their pricing, their terms of service, their decisions about what the model is allowed to do.

You are the tenant. They are the landlord.

## What Ownership Actually Means

Owning your AI infrastructure means:

**Your memory is portable.** You can export it, back it up, migrate it. If a vendor shuts down or changes their pricing, you don't lose years of accumulated context.

**Your rules persist.** Policies you define today are still in effect tomorrow. You don't re-explain yourself every session.

**Your data stays yours.** No training on your interactions. No selling your patterns to advertisers. No compliance risk from data leaving your control.

**Your model is interchangeable.** The infrastructure is yours. The model is just a component. Switch from GPT-4 to Claude to Gemini without losing anything.

## The Compound Advantage

Here's the thing about owning your AI infrastructure: it compounds.

Every interaction makes your system smarter. Every policy you define makes it more aligned. Every piece of context you add makes it more useful. Over time, your system becomes genuinely irreplaceable — not because the technology is unique, but because the accumulated knowledge is yours.

Renting doesn't compound. Every session starts from zero.

## The Moat

In a world where everyone has access to the same AI models, the moat is not the model. The moat is the system.

Your Constitutional Memory. Your Governance Engine. Your policies, your context, your history. These are things that can't be replicated by someone who just started using AI today.

That's the difference between renting and owning. And that's what Zero AI is built to give you.
    `,
  },
  "phase-1-foundation-update": {
    tag: "UPDATE",
    date: "February 20, 2026",
    readTime: "3 min read",
    title: "Phase 1 Foundation: What We've Built and What's Coming Next",
    author: "Zero AI Team",
    content: `
## Where We Are

Phase 1 of Zero AI is in active development. We're on track for Q1 2026.

Here's the current status of each component:

**Constitutional Memory System** — Core architecture complete. Persistence layer built. Versioning system in progress. ETA: 3 weeks.

**Basic Governance Engine** — Constitutional constraint evaluation complete. Policy scoring engine in progress. Audit trail: 60% complete. ETA: 4 weeks.

**Local-first Architecture** — Storage layer complete. Sync protocol in design. ETA: 5 weeks.

## What We've Learned

Building Zero AI has taught us a few things:

**Memory is harder than it looks.** The technical challenge isn't storing data — it's deciding what's worth storing, how to structure it, and how to make it useful across different contexts and models.

**Governance requires humility.** Building a system that makes decisions on your behalf requires deep respect for the ways things can go wrong. We've spent more time on failure modes than on happy paths.

**Local-first is a commitment.** Building for local-first means making hard tradeoffs. We've chosen correctness over convenience at every step.

## What's Next

After Phase 1 ships, we move immediately to Phase 2:
- Multi-model support
- Advanced policy engine
- Full audit trail system

We'll be sharing more technical details as we get closer to launch.

**If you haven't requested early access yet, now is the time.**
    `,
  },
  "ai-agency-levels": {
    tag: "ESSAY",
    date: "February 12, 2026",
    readTime: "6 min read",
    title: "The Five Levels of AI Agency: Where Most Systems Fail",
    author: "Zero AI Team",
    content: `
## A Taxonomy of AI Agency

Not all AI systems are created equal. The difference between a search engine and a symbiotic AI partner is not just capability — it's a fundamental difference in the nature of the relationship between human and machine.

We've mapped out five levels of AI agency. Most products today are stuck at Level 1 or 2.

## Level 1: Informational

**What it does:** Answers questions, provides information, retrieves data.

**Examples:** Search engines, basic Q&A chatbots, knowledge bases.

**The limitation:** Purely reactive. No memory. No initiative. No execution. You ask, it answers.

## Level 2: Assistive

**What it does:** Helps with tasks, suggests actions, drafts content.

**Examples:** Most commercial AI assistants today (ChatGPT, Claude, Gemini in standard use).

**The limitation:** Still reactive. Better at tasks, but still waiting for your prompt. No persistence. No real-world execution.

## Level 3: Agentic

**What it does:** Executes tasks autonomously, takes actions in the real world.

**Examples:** Early AI agents, browser automation, code execution environments.

**The limitation:** Task-focused but not goal-focused. Can execute, but doesn't understand your broader objectives. No governance. No memory of past executions.

## Level 4: Collaborative

**What it does:** Works with you on complex, multi-step problems. Maintains context across interactions. Adapts to your working style.

**Examples:** Advanced AI systems with memory and context management.

**The limitation:** Still requires significant human direction. Doesn't initiate. Doesn't govern itself. Doesn't evolve its own policies.

## Level 5: Symbiotic

**What it does:** Evolves with your system. Initiates when it matters. Governs its own behavior. Maintains a persistent model of your goals, values, and context.

**This is what Zero AI is building.**

A Level 5 system doesn't just respond to you — it works *with* you. It has its own understanding of your goals. It knows when to act and when to ask. It can explain every decision it makes. And it gets better over time.

## Why Most Systems Are Stuck at Level 2

The reason most AI products are stuck at Level 2 is not technical. It's economic.

Level 2 systems are easier to build, easier to monetize, and easier to control. They keep you dependent on the interface. They don't give you real ownership.

Level 5 requires a different architecture, a different business model, and a different relationship with the user.

That's what Zero AI is building. And that's why it matters.
    `,
  },
};

function renderMarkdown(content: string): React.ReactNode[] {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // H2
    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={key++}
          className="font-bold mt-12 mb-4"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "1.375rem",
            color: "oklch(0.93 0.005 265)",
          }}
        >
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }

    // Code block
    if (line.startsWith("```")) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre
          key={key++}
          className="my-6 p-5 rounded-sm border border-white/[0.06] bg-[oklch(0.06_0.006_265)] overflow-x-auto"
          style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.75rem", color: "oklch(0.76 0.18 155)", lineHeight: 1.7 }}
        >
          {codeLines.join("\n")}
        </pre>
      );
      i++;
      continue;
    }

    // Table
    if (line.startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      const rows = tableLines.filter((l) => !l.match(/^\|[-| ]+\|$/));
      const headers = rows[0]?.split("|").filter(Boolean).map((h) => h.trim()) ?? [];
      const body = rows.slice(1);
      elements.push(
        <div key={key++} className="my-6 overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr>
                {headers.map((h, hi) => (
                  <th
                    key={hi}
                    className="text-left py-3 px-4 border-b border-white/[0.08] text-[oklch(0.76_0.18_155)]"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, ri) => {
                const cells = row.split("|").filter(Boolean).map((c) => c.trim());
                return (
                  <tr key={ri} className="border-b border-white/[0.04]">
                    {cells.map((cell, ci) => (
                      <td
                        key={ci}
                        className="py-3 px-4 text-[oklch(0.6_0.01_265)]"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // List items
    if (line.startsWith("- ")) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={key++} className="my-4 space-y-2">
          {listItems.map((item, li) => (
            <li key={li} className="flex items-start gap-2">
              <span className="text-[oklch(0.76_0.18_155)] mt-0.5 flex-shrink-0">→</span>
              <span
                className="text-sm text-[oklch(0.6_0.01_265)] leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
                dangerouslySetInnerHTML={{
                  __html: item
                    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:oklch(0.85 0.005 265)">$1</strong>')
                    .replace(/`(.+?)`/g, '<code style="font-family:IBM Plex Mono,monospace;font-size:0.75rem;color:oklch(0.76 0.18 155)">$1</code>'),
                }}
              />
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Paragraph
    elements.push(
      <p
        key={key++}
        className="text-sm text-[oklch(0.6_0.01_265)] leading-relaxed my-4"
        style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
        dangerouslySetInnerHTML={{
          __html: line
            .replace(/\*\*(.+?)\*\*/g, '<strong style="color:oklch(0.85 0.005 265);font-weight:600">$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            .replace(/`(.+?)`/g, '<code style="font-family:IBM Plex Mono,monospace;font-size:0.75rem;color:oklch(0.76 0.18 155)">$1</code>'),
        }}
      />
    );
    i++;
  }

  return elements;
}

const TAG_COLORS: Record<string, string> = {
  ANNOUNCEMENT: "text-[oklch(0.76_0.18_155)] border-[oklch(0.76_0.18_155/0.3)] bg-[oklch(0.76_0.18_155/0.06)]",
  TECHNICAL: "text-[oklch(0.7_0.15_230)] border-[oklch(0.7_0.15_230/0.3)] bg-[oklch(0.7_0.15_230/0.06)]",
  ESSAY: "text-[oklch(0.75_0.12_50)] border-[oklch(0.75_0.12_50/0.3)] bg-[oklch(0.75_0.12_50/0.06)]",
  UPDATE: "text-[oklch(0.72_0.14_320)] border-[oklch(0.72_0.14_320/0.3)] bg-[oklch(0.72_0.14_320/0.06)]",
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? POSTS[slug] : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-[oklch(0.075_0.008_265)] text-[oklch(0.93_0.005_265)]">
        <Navbar />
        <div className="container pt-40 pb-20 text-center">
          <p
            className="text-sm text-[oklch(0.45_0.008_265)] mb-6"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            Post not found.
          </p>
          <Link href="/blog">
            <button className="btn-ghost text-sm">← Back to Blog</button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[oklch(0.075_0.008_265)] text-[oklch(0.93_0.005_265)]">
      <Navbar />

      {/* ─── ARTICLE HEADER ─────────────────────────────────────────────── */}
      <div className="pt-28 pb-12 border-b border-white/[0.06]">
        <div className="container max-w-3xl">
          <Link href="/blog">
            <button
              className="flex items-center gap-2 text-xs text-[oklch(0.45_0.008_265)] hover:text-[oklch(0.76_0.18_155)] transition-colors mb-8"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Back to Blog
            </button>
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span
              className={`text-xs px-2 py-1 rounded-sm border ${TAG_COLORS[post.tag] ?? ""}`}
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              {post.tag}
            </span>
            <span
              className="text-xs text-[oklch(0.35_0.006_265)]"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              {post.date} · {post.readTime}
            </span>
          </div>

          <h1
            className="font-extrabold leading-tight mb-6"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              color: "oklch(0.95 0.005 265)",
            }}
          >
            {post.title}
          </h1>

          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-sm bg-[oklch(0.76_0.18_155/0.15)] border border-[oklch(0.76_0.18_155/0.2)] flex items-center justify-center">
              <img src={LOGO} alt="Zero AI" className="w-4 h-4 object-contain" />
            </div>
            <span
              className="text-xs text-[oklch(0.55_0.01_265)]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {post.author}
            </span>
          </div>
        </div>
      </div>

      {/* ─── ARTICLE CONTENT ─────────────────────────────────────────────── */}
      <div className="container max-w-3xl py-16">
        <article>
          {renderMarkdown(post.content)}
        </article>

        {/* CTA */}
        <div className="mt-20 pt-12 border-t border-white/[0.06]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p
                className="text-xs text-[oklch(0.45_0.008_265)] mb-1"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                Ready to own your AI?
              </p>
              <p
                className="text-sm font-semibold text-[oklch(0.85_0.005_265)]"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Join the Zero AI waitlist
              </p>
            </div>
            <Link href="/#cta">
              <button className="btn-primary text-sm flex-shrink-0">
                Request Early Access
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </Link>
          </div>
        </div>

        {/* Back to blog */}
        <div className="mt-8">
          <Link href="/blog">
            <button
              className="flex items-center gap-2 text-xs text-[oklch(0.45_0.008_265)] hover:text-[oklch(0.76_0.18_155)] transition-colors"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              All posts
            </button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
