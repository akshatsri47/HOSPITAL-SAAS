import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key_for_build");

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message, selectedPlan } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // 1. Send confirmation email TO the prospect from support@xyras.in
    await resend.emails.send({
      from: "Xyras <support@xyras.in>",
      to: email,
      subject: `Your Xyras Voice AI Setup Quote — ${selectedPlan}`,
      html: prospectEmailTemplate({ name, selectedPlan }),
    });

    // 2. Send captured lead details TO saatvikflip@gmail.com
    await resend.emails.send({
      from: "Xyras <support@xyras.in>",
      to: "saatvikflip@gmail.com",
      subject: `🔥 New Lead Capture: ${selectedPlan} from ${name || email}`,
      html: internalLeadTemplate({ name, email, phone, message, selectedPlan }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Resend contact error:", err);
    return NextResponse.json({ error: "Failed to process lead request" }, { status: 500 });
  }
}

/* ── Prospect email template ── */
function prospectEmailTemplate({ name, selectedPlan }: { name?: string; selectedPlan: string }) {
  const greeting = name ? `Hi ${name},` : "Hi there,";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#F8FAFC;font-family:-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAFC;padding:48px 20px;">
    <tr><td align="center">
      <table width="100%" style="max-width:560px;background:#ffffff;border:1px solid #E2E8F0;border-radius:24px;text-align:left;box-shadow:0 10px 30px rgba(0,0,0,0.02);overflow:hidden;">
        
        <!-- Top accent banner -->
        <tr><td style="background:#0E1726;height:6px;"></td></tr>

        <!-- Header -->
        <tr>
          <td style="padding:40px 40px 24px;border-bottom:1px solid #F1F5F9;">
            <p style="margin:0;font-size:24px;font-weight:800;color:#0E1726;letter-spacing:-0.04em;">xyras<span style="color:#00C2A8;">.</span></p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <h1 style="margin:0 0 16px;font-size:19px;font-weight:700;color:#0E1726;letter-spacing:-0.01em;">Setup Quote Initiated</h1>
            
            <p style="margin:0 0 24px;font-size:15px;color:#64748B;line-height:1.625;">
              ${greeting}<br><br>
              Thank you for initiating a setup quote for our <strong>${selectedPlan}</strong>. We've logged your preferences, and one of our voice operations architects will connect with you within <strong>24 hours</strong> to customize the platform to your operational workflow.
            </p>

            <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:16px;padding:24px;margin:32px 0;">
              <p style="margin:0 0 16px;font-size:10px;font-weight:800;color:#64748B;text-transform:uppercase;letter-spacing:0.1em;">Standard Integration Deliverables</p>
              
              <table width="100%" cellpadding="0" cellspacing="0">
                ${[
                  ["Latency", "Sub-0.8s response time (feels identical to a human call)"],
                  ["Concurrencies", "Handles 100+ simultaneous customer voice inquiries with zero queues"],
                  ["Dialect Sync", "Dynamic mid-sentence language switches across 12+ dialects"],
                  ["API / CRM Hooks", "Direct bi-directional synchronizations to logging systems"],
                ].map(([key, val]) => `
                <tr>
                  <td style="padding:6px 0;width:110px;vertical-align:top;">
                    <span style="font-family:monospace;font-size:11px;color:#00C2A8;background:#F0FDFA;padding:2px 6px;border-radius:6px;border:1px solid #CCFBF1;font-weight:bold;">${key}</span>
                  </td>
                  <td style="padding:6px 0;vertical-align:top;padding-left:12px;">
                    <span style="font-size:13px;color:#334155;line-height:1.4;">${val}</span>
                  </td>
                </tr>`).join("")}
              </table>
            </div>

            <p style="margin:0;font-size:15px;color:#64748B;line-height:1.625;">
              If you have custom integration requirements or would like to share legacy documentation, feel free to reply directly to this email.
              <br><br>
              Warm regards,<br>
              — <strong>The Xyras Team</strong>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:24px 40px 40px;background:#F8FAFC;border-top:1px solid #F1F5F9;text-align:center;">
            <p style="margin:0;font-size:11px;color:#94A3B8;line-height:1.6;font-family:monospace;">
              <strong>Xyras AI Foundry</strong><br>
              Empathy & Scale, Dematerialized.<br>
              <a href="https://xyras.in" style="color:#00C2A8;text-decoration:none;font-weight:bold;">xyras.in</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/* ── Internal notification template ── */
function internalLeadTemplate({ name, email, phone, message, selectedPlan }: { name?: string; email: string; phone?: string; message?: string; selectedPlan: string }) {
  return `
<!DOCTYPE html>
<html lang="en">
<body style="font-family:Arial,sans-serif;padding:24px;background:#F8FAFC;">
  <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:20px;padding:36px;border:1px solid #E2E8F0;box-shadow:0 8px 30px rgba(0,0,0,0.02);">
    <h2 style="margin:0 0 8px;color:#0E1726;font-size:20px;">🔥 New Voice AI Sales Lead</h2>
    <p style="margin:0 0 24px;font-size:13px;color:#64748B;">A client initiated contact from the dedicated /pricing matrix.</p>
    
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
      <tr style="border-bottom:1px solid #F1F5F9;"><td style="padding:10px 0;color:#64748B;font-size:13px;width:120px;">Selected Plan</td><td style="padding:10px 0;font-size:14px;font-weight:700;color:#00C2A8;">${selectedPlan}</td></tr>
      <tr style="border-bottom:1px solid #F1F5F9;"><td style="padding:10px 0;color:#64748B;font-size:13px;">Name</td><td style="padding:10px 0;font-size:14px;font-weight:600;color:#0E1726;">${name || "—"}</td></tr>
      <tr style="border-bottom:1px solid #F1F5F9;"><td style="padding:10px 0;color:#64748B;font-size:13px;">Email</td><td style="padding:10px 0;font-size:14px;color:#0E1726;font-weight:600;">${email}</td></tr>
      <tr style="border-bottom:1px solid #F1F5F9;"><td style="padding:10px 0;color:#64748B;font-size:13px;">Phone</td><td style="padding:10px 0;font-size:14px;color:#0E1726;">${phone || "—"}</td></tr>
      <tr><td style="padding:10px 0;color:#64748B;font-size:13px;vertical-align:top;">Message / Ops</td><td style="padding:10px 0;font-size:14px;color:#334155;line-height:1.5;">${message || "—"}</td></tr>
    </table>
    
    <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;padding:16px;text-align:center;">
      <p style="margin:0;font-size:12px;color:#64748B;">Reply directly to <a href="mailto:${email}" style="color:#00C2A8;text-decoration:none;font-weight:bold;">${email}</a> to initiate setup.</p>
    </div>
  </div>
</body>
</html>`;
}
