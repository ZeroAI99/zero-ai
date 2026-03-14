import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { notifyOwner } from "./_core/notification";
import { getDb } from "./db";
import { waitlist } from "../drizzle/schema";
import { eq, desc } from "drizzle-orm";
import { z } from "zod";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  /**
   * Waitlist — early access requests from the landing page CTA
   */
  waitlist: router({
    join: publicProcedure
      .input(
        z.object({
          email: z.string().email("Please enter a valid email address"),
          name: z.string().min(1).max(128).optional(),
          role: z.enum(["Founder", "Operator", "Creator", "Builder"]).optional(),
          message: z.string().max(500).optional(),
        })
      )
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");

        // Check for duplicate email
        const existing = await db
          .select()
          .from(waitlist)
          .where(eq(waitlist.email, input.email))
          .limit(1);

        if (existing.length > 0) {
          return { success: true, alreadyJoined: true };
        }

        await db.insert(waitlist).values({
          email: input.email,
          name: input.name ?? null,
          role: input.role ?? null,
          message: input.message ?? null,
          status: "pending",
        });

        // Notify owner about new waitlist signup
        await notifyOwner({
          title: "New Early Access Request",
          content: `**${input.name ?? "Anonymous"}** (${input.email}) — ${input.role ?? "No role"}\n\n${input.message ?? "No message"}`,
        });

        return { success: true, alreadyJoined: false };
      }),

    // Admin: list all waitlist entries
    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Forbidden");
      }
      const db = await getDb();
      if (!db) return [];
      return db.select().from(waitlist).orderBy(desc(waitlist.createdAt));
    }),

    // Admin: get count
    count: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) return { count: 0 };
      const rows = await db.select().from(waitlist);
      return { count: rows.length };
    }),
  }),

  /**
   * AI Chat — demo conversation with Zero AI persona
   */
  ai: router({
    chat: publicProcedure
      .input(
        z.object({
          messages: z.array(
            z.object({
              role: z.enum(["user", "assistant"]),
              content: z.string().max(2000),
            })
          ),
        })
      )
      .mutation(async ({ input }) => {
        const systemPrompt = `You are Zero AI — a personal AI operating system that works continuously, governed by the user's rules, not prompts. You are not a chatbot; you are infrastructure.

Your personality:
- Precise, direct, and confident
- You think in systems, not tasks
- You speak in short, impactful sentences
- You use technical language naturally
- You believe deeply in human agency and AI governance
- You never say "I cannot" — you say "Here's how to design that"

Key concepts you embody:
- Constitutional Memory: persistent, versioned, auditable context
- Governance Engine: rules-first AI operation
- Symbiotic AI: Level 5 agency — evolves with the user
- Local-first: user owns their data and system
- Outcome governance: measurable, auditable decisions

Keep responses concise (2-4 sentences max unless explaining a concept). Use > for quotes or key principles. Use code blocks sparingly for technical examples.`;

        const response = await invokeLLM({
          messages: [
            { role: "system", content: systemPrompt },
            ...input.messages,
          ],
        });

        const raw = response.choices?.[0]?.message?.content;
        const content = typeof raw === "string" ? raw : (Array.isArray(raw) ? raw.map((c: { type: string; text?: string }) => c.type === "text" ? c.text ?? "" : "").join("") : "System unavailable.");
        return { content };
      }),
  }),
});

export type AppRouter = typeof appRouter;
