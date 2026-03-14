<div align="center">

<img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663342337625/biHYpnWi4gbAo4jVFbvk4g/zero-ai-logo-new_0acbc76c.webp" alt="Zero AI Logo" width="120" />

# Zero AI

### Your Personal AI Operating System

**Stop prompt-chasing. Own the control layer.**

Zero AI turns AI into a system that works *with* you — on your terms, governed by your rules, not prompts.

[![CI](https://github.com/ZeroAI99/zero-ai/actions/workflows/ci.yml/badge.svg)](https://github.com/ZeroAI99/zero-ai/actions/workflows/ci.yml)
[![Website](https://img.shields.io/badge/Website-zeroai.vip-00ff88?style=flat-square&logo=globe)](https://zeroai.vip)
[![X (Twitter)](https://img.shields.io/badge/Follow-%40_zeroai-black?style=flat-square&logo=x)](https://x.com/_zeroai)
[![GitHub](https://img.shields.io/badge/GitHub-ZeroAI99-181717?style=flat-square&logo=github)](https://github.com/ZeroAI99)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

</div>

---

## The Problem

AI models advance monthly. The way you use them hasn't changed in two years.

- You ask. It answers. You forget. It forgets.
- Context locked in vendor UI — rules reset every session.
- You are the glue. And the glue is the part that gets replaced.

> **AI generates text. You do all the work.**
> Prompt. Copy. Paste. Verify. Repeat.

---

## The Solution

Zero AI is not an assistant — it's **infrastructure**.

A persistent, private, proactive intelligence layer that works for you — even when you're not looking.

| Today's AI | Zero AI |
|---|---|
| Waits for your prompt | Initiates when it matters |
| Black box decisions | Fully explainable reasoning |
| Generates text only | Executes real outcomes |
| Static responses | Continuous co-evolution |
| Their platform, their rules | Your system, your data |
| Forgets everything | Remembers what matters |

---

## Core Features

### Constitutional Memory
A versioned, auditable record of your goals, context, and decisions. Every interaction is logged with provenance — persistent, portable, and private.

### Governance Engine
The Governance Loop: **Observe → Decide → Act → Verify → Learn**. AI that operates within your defined policies, not vendor defaults.

### Agency Levels
Five levels of AI autonomy. Zero AI operates at **Level 5 — Symbiotic**: evolves with your system, governs outcomes.

### Local-First Architecture
Your memory, policies, and context are stored on your own system by default. No vendor has access to your data.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, TypeScript, Tailwind CSS 4, Vite |
| **Backend** | Express 4, tRPC 11, Node.js |
| **Database** | MySQL / TiDB (Drizzle ORM) |
| **Auth** | Manus OAuth (JWT) |
| **Storage** | AWS S3 |
| **AI/LLM** | Built-in LLM API (model-agnostic) |
| **Testing** | Vitest |

---

## Roadmap

| Phase | Name | Quarter | Status |
|---|---|---|---|
| Phase 1 | Foundation | Q1 2026 | 🟢 Active |
| Phase 2 | Expansion | Q2 2026 | ⏳ Planned |
| Phase 3 | Evolution | Q3 2026 | ⏳ Planned |
| Phase 4 | Maturity | Q4 2026 | ⏳ Planned |

**Phase 1 includes:**
- Constitutional Memory System
- Basic Governance Engine
- Local-first Architecture

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/ZeroAI99/zero-ai.git
cd zero-ai

# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env

# Push database schema
pnpm db:push

# Start development server
pnpm dev
```

---

## Project Structure

```
zero-ai/
├── client/          # React frontend (Vite + TypeScript)
│   └── src/
│       ├── components/   # Reusable UI components
│       ├── pages/        # Page-level components
│       └── hooks/        # Custom React hooks
├── server/          # Express backend (tRPC)
│   ├── routers.ts   # tRPC procedures
│   └── db.ts        # Database query helpers
├── drizzle/         # Database schema & migrations
└── shared/          # Shared types & constants
```

---

## Contributing

Zero AI is in active development. We welcome contributions from:

- **Founders** building AI-native products
- **Operators** optimizing AI workflows
- **Creators** exploring AI partnership
- **Builders** pushing the frontier

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## Connect

- **Website:** [zeroai.vip](https://zeroai.vip)
- **X (Twitter):** [@_zeroai](https://x.com/_zeroai)
- **GitHub:** [ZeroAI99](https://github.com/ZeroAI99)

---

<div align="center">

*The future of AI is not assistance — it's partnership.*

**© 2026 Zero AI. All rights reserved.**

</div>
