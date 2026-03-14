/**
 * ZERO AI — Email Service
 * Uses Resend for transactional emails
 * Sends branded confirmation emails to waitlist signups
 */

import { Resend } from "resend";

const LOGO_URL = "https://iili.io/q1H6tnV.webp";

function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[Email] RESEND_API_KEY not set — skipping email send");
    return null;
  }
  return new Resend(apiKey);
}

/**
 * Send waitlist confirmation email to a new signup
 */
export async function sendWaitlistConfirmation({
  email,
  name,
  role,
  queueNumber,
}: {
  email: string;
  name?: string | null;
  role?: string | null;
  queueNumber: number;
}): Promise<boolean> {
  const resend = getResend();
  if (!resend) return false;

  const displayName = name ?? "there";
  const displayRole = role ?? "Early Adopter";
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "Zero AI <hello@zeroai.vip>";

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>You're on the Zero AI waitlist</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0f;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0f;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <img src="${LOGO_URL}" alt="Zero AI" width="56" height="56" style="display:block;border-radius:8px;" />
              <p style="margin:12px 0 0;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#3d3d4a;font-family:'Courier New',monospace;">
                ZERO AI
              </p>
            </td>
          </tr>

          <!-- Main card -->
          <tr>
            <td style="background-color:#111118;border:1px solid rgba(255,255,255,0.06);border-radius:4px;padding:40px 36px;">

              <!-- Queue number badge -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td>
                    <span style="display:inline-block;background-color:rgba(0,255,65,0.08);border:1px solid rgba(0,255,65,0.25);color:#00ff41;font-size:11px;font-family:'Courier New',monospace;letter-spacing:0.15em;padding:6px 14px;border-radius:2px;text-transform:uppercase;">
                      Queue Position #${queueNumber}
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Greeting -->
              <h1 style="margin:0 0 8px;font-size:26px;font-weight:700;color:#eeeef5;line-height:1.2;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
                You're in, ${displayName}.
              </h1>
              <p style="margin:0 0 24px;font-size:14px;color:#5a5a6e;line-height:1.6;">
                Your early access request has been received. You are <strong style="color:#00ff41;">#${queueNumber}</strong> in the queue.
              </p>

              <!-- Divider -->
              <hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin:24px 0;" />

              <!-- What you signed up as -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td style="padding:16px;background-color:#0d0d14;border:1px solid rgba(255,255,255,0.04);border-radius:4px;">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#3d3d4a;font-family:'Courier New',monospace;">
                      Signed up as
                    </p>
                    <p style="margin:0;font-size:14px;font-weight:600;color:#c8c8d4;">
                      ${displayRole}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- What happens next -->
              <p style="margin:0 0 12px;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#3d3d4a;font-family:'Courier New',monospace;">
                What happens next
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                ${[
                  ["01", "We review your application", "Our team evaluates each request individually."],
                  ["02", "You receive an invite", "When your spot opens, you'll get a private access link."],
                  ["03", "You own your AI", "Set up your Constitutional Memory and Governance Engine."],
                ].map(([num, title, desc]) => `
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.04);">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="28" valign="top" style="padding-top:1px;">
                          <span style="font-size:10px;color:#00ff41;font-family:'Courier New',monospace;">${num}</span>
                        </td>
                        <td>
                          <p style="margin:0 0 2px;font-size:13px;font-weight:600;color:#c8c8d4;">${title}</p>
                          <p style="margin:0;font-size:12px;color:#5a5a6e;line-height:1.5;">${desc}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>`).join("")}
              </table>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="https://zeroai.vip" style="display:inline-block;background-color:transparent;border:1px solid rgba(0,255,65,0.5);color:#00ff41;font-size:12px;font-family:'Courier New',monospace;letter-spacing:0.1em;padding:12px 28px;border-radius:2px;text-decoration:none;text-transform:uppercase;">
                      Visit zeroai.vip →
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:28px 0 0;">
              <p style="margin:0 0 8px;font-size:11px;color:#2d2d3a;font-family:'Courier New',monospace;">
                © 2026 Zero AI. All rights reserved.
              </p>
              <p style="margin:0;font-size:11px;color:#2d2d3a;">
                <a href="https://x.com/_zeroai" style="color:#2d2d3a;text-decoration:none;">@_zeroai</a>
                &nbsp;·&nbsp;
                <a href="https://zeroai.vip/privacy" style="color:#2d2d3a;text-decoration:none;">Privacy</a>
                &nbsp;·&nbsp;
                <a href="https://zeroai.vip/terms" style="color:#2d2d3a;text-decoration:none;">Terms</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: `You're #${queueNumber} on the Zero AI waitlist`,
      html,
    });

    if (result.error) {
      console.error("[Email] Resend error:", result.error);
      return false;
    }

    console.log(`[Email] Confirmation sent to ${email} (queue #${queueNumber})`);
    return true;
  } catch (err) {
    console.error("[Email] Failed to send confirmation:", err);
    return false;
  }
}

/**
 * Send admin notification email when a new user joins the waitlist
 */
export async function sendAdminNotification({
  email,
  name,
  role,
  message,
  queueNumber,
}: {
  email: string;
  name?: string | null;
  role?: string | null;
  message?: string | null;
  queueNumber: number;
}): Promise<boolean> {
  const resend = getResend();
  if (!resend) return false;

  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL ?? "hello@zeroai.vip";
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "Zero AI <hello@zeroai.vip>";
  const now = new Date().toISOString();

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>New Waitlist Signup — Zero AI</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0f;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0f;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="padding-bottom:24px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <img src="${LOGO_URL}" alt="Zero AI" width="32" height="32" style="display:inline-block;vertical-align:middle;border-radius:4px;" />
                    <span style="vertical-align:middle;margin-left:10px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#3d3d4a;font-family:'Courier New',monospace;">ZERO AI ADMIN</span>
                  </td>
                  <td align="right">
                    <span style="display:inline-block;background-color:rgba(0,255,65,0.08);border:1px solid rgba(0,255,65,0.25);color:#00ff41;font-size:10px;font-family:'Courier New',monospace;letter-spacing:0.1em;padding:4px 10px;border-radius:2px;">NEW SIGNUP</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background-color:#111118;border:1px solid rgba(255,255,255,0.06);border-radius:4px;padding:32px;">

              <h2 style="margin:0 0 20px;font-size:18px;font-weight:700;color:#eeeef5;">
                New Waitlist Signup <span style="color:#00ff41;">#${queueNumber}</span>
              </h2>

              <!-- Details table -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                ${[
                  ["Name", name ?? "—"],
                  ["Email", email],
                  ["Role", role ?? "—"],
                  ["Queue Position", `#${queueNumber}`],
                  ["Timestamp", now],
                ].map(([label, value]) => `
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.04);width:120px;">
                    <span style="font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:#3d3d4a;font-family:'Courier New',monospace;">${label}</span>
                  </td>
                  <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.04);">
                    <span style="font-size:13px;color:#c8c8d4;">${value}</span>
                  </td>
                </tr>`).join("")}
              </table>

              ${message ? `
              <!-- Message -->
              <div style="background-color:#0d0d14;border:1px solid rgba(255,255,255,0.04);border-radius:4px;padding:16px;margin-bottom:20px;">
                <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:#3d3d4a;font-family:'Courier New',monospace;">Message</p>
                <p style="margin:0;font-size:13px;color:#8888a0;line-height:1.6;">${message}</p>
              </div>` : ""}

              <!-- Action buttons -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <a href="https://zeroai.vip/admin" style="display:inline-block;background-color:transparent;border:1px solid rgba(0,255,65,0.4);color:#00ff41;font-size:11px;font-family:'Courier New',monospace;letter-spacing:0.08em;padding:10px 20px;border-radius:2px;text-decoration:none;margin-right:10px;">View Admin Dashboard →</a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 0 0;">
              <p style="margin:0;font-size:10px;color:#2d2d3a;font-family:'Courier New',monospace;">This is an automated notification from Zero AI. Do not reply to this email.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject: `[Zero AI] New waitlist signup: ${name ?? email} (#${queueNumber})`,
      html,
    });

    if (result.error) {
      console.error("[Email] Admin notification error:", result.error);
      return false;
    }

    console.log(`[Email] Admin notification sent for signup #${queueNumber}`);
    return true;
  } catch (err) {
    console.error("[Email] Failed to send admin notification:", err);
    return false;
  }
}
