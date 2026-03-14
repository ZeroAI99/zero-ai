import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the database module
vi.mock("./db", () => ({
  getDb: vi.fn(),
}));

// Mock the notification module
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

// Mock the LLM module
vi.mock("./_core/llm", () => ({
  invokeLLM: vi.fn().mockResolvedValue({
    choices: [{ message: { content: "Zero AI response here." } }],
  }),
}));

import { getDb } from "./db";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("waitlist.join", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns alreadyJoined=true when email already exists", async () => {
    const mockDb = {
      select: vi.fn().mockReturnThis(),
      from: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      limit: vi.fn().mockResolvedValue([{ id: 1, email: "test@example.com" }]),
      insert: vi.fn().mockReturnThis(),
      values: vi.fn().mockResolvedValue(undefined),
    };
    vi.mocked(getDb).mockResolvedValue(mockDb as ReturnType<typeof import("drizzle-orm/mysql2").drizzle>);

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.waitlist.join({ email: "test@example.com" });

    expect(result.success).toBe(true);
    expect(result.alreadyJoined).toBe(true);
  });

  it("inserts new entry and returns alreadyJoined=false for new email", async () => {
    const mockDb = {
      select: vi.fn().mockReturnThis(),
      from: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      limit: vi.fn().mockResolvedValue([]),
      insert: vi.fn().mockReturnThis(),
      values: vi.fn().mockResolvedValue(undefined),
    };
    vi.mocked(getDb).mockResolvedValue(mockDb as ReturnType<typeof import("drizzle-orm/mysql2").drizzle>);

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.waitlist.join({
      email: "new@example.com",
      name: "New User",
      role: "Founder",
      message: "Excited to try Zero AI!",
    });

    expect(result.success).toBe(true);
    expect(result.alreadyJoined).toBe(false);
    expect(mockDb.insert).toHaveBeenCalled();
  });

  it("rejects invalid email format", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.waitlist.join({ email: "not-an-email" })
    ).rejects.toThrow();
  });
});

describe("waitlist.count", () => {
  it("returns count of waitlist entries with status breakdown", async () => {
    const mockRows = [
      { status: "pending" },
      { status: "approved" },
      { status: "pending" },
    ];
    const mockDb = {
      select: vi.fn().mockReturnThis(),
      from: vi.fn().mockResolvedValue(mockRows),
    };
    vi.mocked(getDb).mockResolvedValue(mockDb as ReturnType<typeof import("drizzle-orm/mysql2").drizzle>);

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.waitlist.count();
    expect(result.total).toBe(3);
    expect(result.pending).toBe(2);
    expect(result.approved).toBe(1);
    expect(result.rejected).toBe(0);
  });
});

describe("ai.chat", () => {
  it("returns AI response for a valid message", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.ai.chat({
      messages: [{ role: "user", content: "What is Zero AI?" }],
    });
    expect(typeof result.content).toBe("string");
    expect(result.content.length).toBeGreaterThan(0);
  });
});
