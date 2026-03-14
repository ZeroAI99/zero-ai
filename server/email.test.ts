import { describe, expect, it, vi, beforeEach } from "vitest";

// Mock Resend
vi.mock("resend", () => {
  return {
    Resend: vi.fn().mockImplementation(() => ({
      emails: {
        send: vi.fn().mockResolvedValue({ data: { id: "mock-email-id" }, error: null }),
      },
    })),
  };
});

import { sendWaitlistConfirmation, sendAdminNotification } from "./email";

describe("sendWaitlistConfirmation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns false when RESEND_API_KEY is not set", async () => {
    const originalKey = process.env.RESEND_API_KEY;
    delete process.env.RESEND_API_KEY;

    const result = await sendWaitlistConfirmation({
      email: "test@example.com",
      name: "Test User",
      role: "Founder",
      queueNumber: 42,
    });

    expect(result).toBe(false);
    process.env.RESEND_API_KEY = originalKey;
  });

  it("sends email and returns true when RESEND_API_KEY is set", async () => {
    process.env.RESEND_API_KEY = "re_test_key_123";
    process.env.RESEND_FROM_EMAIL = "Zero AI <hello@zeroai.vip>";

    const result = await sendWaitlistConfirmation({
      email: "user@example.com",
      name: "Alice",
      role: "Founder",
      queueNumber: 7,
    });

    expect(result).toBe(true);
  });

  it("handles null name and role gracefully", async () => {
    process.env.RESEND_API_KEY = "re_test_key_123";

    const result = await sendWaitlistConfirmation({
      email: "anon@example.com",
      name: null,
      role: null,
      queueNumber: 1,
    });

    expect(result).toBe(true);
  });

  it("returns false when Resend returns an error", async () => {
    process.env.RESEND_API_KEY = "re_test_key_123";

    const { Resend } = await import("resend");
    vi.mocked(Resend).mockImplementationOnce(() => ({
      emails: {
        send: vi.fn().mockResolvedValue({ data: null, error: { message: "Invalid API key" } }),
      },
    }) as ReturnType<typeof Resend>);

    const result = await sendWaitlistConfirmation({
      email: "fail@example.com",
      name: "Bob",
      role: "Builder",
      queueNumber: 99,
    });

    expect(result).toBe(false);
  });
});

describe("sendAdminNotification", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns false when RESEND_API_KEY is not set", async () => {
    const originalKey = process.env.RESEND_API_KEY;
    delete process.env.RESEND_API_KEY;

    const result = await sendAdminNotification({
      email: "user@example.com",
      name: "Test User",
      role: "Founder",
      queueNumber: 5,
    });

    expect(result).toBe(false);
    process.env.RESEND_API_KEY = originalKey;
  });

  it("sends admin notification email and returns true", async () => {
    process.env.RESEND_API_KEY = "re_test_key_123";
    process.env.RESEND_FROM_EMAIL = "Zero AI <hello@zeroai.vip>";
    process.env.ADMIN_NOTIFICATION_EMAIL = "hello@zeroai.vip";

    const result = await sendAdminNotification({
      email: "newuser@example.com",
      name: "New User",
      role: "Builder",
      message: "Excited to try Zero AI!",
      queueNumber: 42,
    });

    expect(result).toBe(true);
  });

  it("handles missing optional fields gracefully", async () => {
    process.env.RESEND_API_KEY = "re_test_key_123";

    const result = await sendAdminNotification({
      email: "minimal@example.com",
      queueNumber: 1,
    });

    expect(result).toBe(true);
  });
});
