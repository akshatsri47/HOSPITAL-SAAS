import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key_for_build");

export async function POST(req: NextRequest) {
  const { email, name, hospital } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  try {
    // 1. Send confirmation email TO the prospect
    await resend.emails.send({
      from: "Xyras <support@xyras.in>",
      to: email,
      subject: "We'll connect with you within 24 hours — Xyras",
      html: prospectEmail({ name, hospital }),
    });

    // 2. Send internal notification to your team
    await resend.emails.send({
      from: "Xyras Leads <support@xyras.in>",
      to: "support@xyras.in",
      subject: `🏥 New demo request from ${email}`,
      html: internalEmail({ email, name, hospital }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}

/* ── Email templates ── */

function prospectEmail({ name, hospital }: { name?: string; hospital?: string }) {
  const greeting = name ? `Hi ${name},` : "Hi there,";
  const hospitalLine = hospital ? `<p style="margin:0 0 24px;font-size:15px;color:#4B5563;line-height:1.6;">We noted your interest from <strong>${hospital}</strong> — our specialists will prepare a customized infrastructure overview.</p>` : "";

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;padding:48px 20px;">
    <tr><td align="center">
      <table width="100%" style="max-width:540px;background:#ffffff;text-align:left;">
        
        <!-- Header -->
        <tr>
          <td style="padding-bottom:32px;border-bottom:1px solid #E5E7EB;">
            <p style="margin:0;font-size:24px;font-weight:800;color:#0F172A;letter-spacing:-0.04em;">xyras<span style="color:#0D9488;">.</span></p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 0;">
            <h1 style="margin:0 0 20px;font-size:18px;font-weight:600;color:#111827;letter-spacing:-0.01em;">Demo Request Confirmed</h1>
            
            <p style="margin:0 0 24px;font-size:15px;color:#4B5563;line-height:1.625;">
              ${greeting}<br><br>
              We've received your request for a platform walkthrough. Our routing system has logged your details, and a product specialist will connect with you within <strong>24 hours</strong>.
            </p>
            
            ${hospitalLine}

            <!-- Tech Specs Block -->
            <div style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:8px;padding:24px;margin:32px 0;">
              <p style="margin:0 0 16px;font-size:11px;font-weight:700;color:#6B7280;text-transform:uppercase;letter-spacing:0.06em;">System Capabilities Overview</p>
              
              <table width="100%" cellpadding="0" cellspacing="0">
              ${[
                ["Throughput", "Answers 100% of concurrent inbound patient calls"],
                ["Localization", "12+ Indian languages natively supported (Zero latency)"],
                ["Deployment", "Cloud installation within 48h (No hardware required)"],
                ["Integration", "Direct hooks into Practo, Meditech, Epic, etc."],
              ].map(([key, val]) => `
                <tr>
                  <td style="padding:8px 0;width:105px;vertical-align:top;">
                    <span style="font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:12px;color:#0D9488;background:#F0FDFA;padding:2px 6px;border-radius:4px;border:1px solid #CCFBF1;">${key}</span>
                  </td>
                  <td style="padding:8px 0;vertical-align:top;padding-left:12px;">
                    <span style="font-size:13px;color:#374151;line-height:1.5;">${val}</span>
                  </td>
                </tr>`).join("")}
              </table>
            </div>

            <p style="margin:0;font-size:15px;color:#4B5563;line-height:1.625;">
              If you have urgent questions before our call, reply directly to this thread to be escalated to support.
              <br><br>
              — <strong>The Xyras Team</strong>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding-top:32px;border-top:1px solid #E5E7EB;">
            <p style="margin:0;font-size:12px;color:#9CA3AF;line-height:1.6;">
              <strong>Xyras AI Pvt. Ltd.</strong><br>
              Intelligent Hospital Triage.<br>
              <a href="https://xyras.in" style="color:#0D9488;text-decoration:none;">xyras.in</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function internalEmail({ email, name, hospital }: { email: string; name?: string; hospital?: string }) {
  return `
<!DOCTYPE html>
<html lang="en">
<body style="font-family:Arial,sans-serif;padding:24px;background:#f8fafc;">
  <div style="max-width:480px;margin:0 auto;background:#fff;border-radius:12px;padding:28px;border:1px solid #e2e8f0;">
    <h2 style="margin:0 0 16px;color:#0F172A;">🏥 New demo request</h2>
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:8px 0;color:#64748B;font-size:13px;width:100px;">Email</td><td style="padding:8px 0;font-size:14px;font-weight:600;color:#0F172A;">${email}</td></tr>
      <tr><td style="padding:8px 0;color:#64748B;font-size:13px;">Name</td><td style="padding:8px 0;font-size:14px;color:#0F172A;">${name || "—"}</td></tr>
      <tr><td style="padding:8px 0;color:#64748B;font-size:13px;">Hospital</td><td style="padding:8px 0;font-size:14px;color:#0F172A;">${hospital || "—"}</td></tr>
    </table>
    <p style="margin:20px 0 0;font-size:12px;color:#94A3B8;">Reply directly to ${email} to connect with them.</p>
  </div>
</body>
</html>`;
}
