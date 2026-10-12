import nodemailer from "nodemailer";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://sataniresearchcentre.com")
  );
}

function getFromAddress(): string {
  const user = (process.env.SMTP_USER || "connect@sataniresearchcentre.com")
    .trim()
    .replace(/^["']|["']$/g, "");
  return `"Satani Research Centre" <${user}>`;
}

export function getTransporter() {
  const host = (process.env.SMTP_HOST || "smtp.hostinger.com").trim().replace(/^["']|["']$/g, "");
  const port = Number(process.env.SMTP_PORT?.trim()) || 465;
  const user = (process.env.SMTP_USER || "").trim().replace(/^["']|["']$/g, "");
  const pass = (process.env.SMTP_PASS || "").trim().replace(/^["']|["']$/g, "");

  const secure = port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: user && pass ? { user, pass } : undefined,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
    tls: {
      rejectUnauthorized: false,
      minVersion: "TLSv1.2",
    },
  });
}

export async function sendOwnerDecisionRequest(args: {
  to: string;
  userEmail: string;
  toolName: string;
  approveToken: string;
  denyToken: string;
}): Promise<void> {
  const site = getSiteUrl();
  const approveUrl = `${site}/api/lab-access/decide?token=${args.approveToken}`;
  const denyUrl = `${site}/api/lab-access/decide?token=${args.denyToken}`;
  const safeEmail = escapeHtml(args.userEmail);
  const safeTool = escapeHtml(args.toolName);

  const transporter = getTransporter();
  const recipient = args.to?.trim() || process.env.SMTP_USER?.trim() || "connect@sataniresearchcentre.com";

  await transporter.sendMail({
    from: getFromAddress(),
    to: recipient,
    subject: `${args.toolName} access request — ${args.userEmail}`,
    html: `
      <div style="font-family:system-ui,-apple-system,sans-serif;max-width:560px;margin:0 auto;padding:24px">
        <h2 style="margin-top:0">New ${safeTool} access request</h2>
        <p>The following email is requesting access to ${safeTool}:</p>
        <p style="font-size:18px;font-weight:600;background:#f5f5f5;padding:12px 16px;border-radius:6px">${safeEmail}</p>
        <p style="margin-top:24px">Choose an action:</p>
        <div style="display:flex;gap:12px;margin-top:8px">
          <a href="${approveUrl}" style="display:inline-block;padding:12px 24px;background:#0066cc;color:#fff;text-decoration:none;border-radius:6px;font-weight:600">✅ Approve</a>
          <a href="${denyUrl}" style="display:inline-block;padding:12px 24px;background:#cc0000;color:#fff;text-decoration:none;border-radius:6px;font-weight:600">❌ Deny</a>
        </div>
        <p style="color:#666;font-size:13px;margin-top:24px">These links expire in 48 hours.</p>
      </div>
    `,
  });
}

export async function sendUserApproval(args: {
  to: string;
  toolName: string;
  toolPath: string;
  launchToken: string;
  revokeToken: string;
  ownerEmail: string;
}): Promise<void> {
  const site = getSiteUrl();
  const launchUrl = `${site}/lab-tools/launch?token=${args.launchToken}`;
  const revokeUrl = `${site}/api/lab-access/revoke?token=${args.revokeToken}`;
  const toolPageUrl = `${site}${args.toolPath}`;
  const safeEmail = escapeHtml(args.to);
  const safeTool = escapeHtml(args.toolName);

  const transporter = getTransporter();
  const ownerRecipient = args.ownerEmail?.trim() || process.env.SMTP_USER?.trim() || "connect@sataniresearchcentre.com";

  // Notify the user with a one-click launch link
  await transporter.sendMail({
    from: getFromAddress(),
    to: args.to,
    subject: `Your ${args.toolName} access is approved`,
    html: `
      <div style="font-family:system-ui,-apple-system,sans-serif;max-width:560px;margin:0 auto;padding:24px">
        <h2 style="margin-top:0">Welcome to ${safeTool}</h2>
        <p>Your request for access has been approved. Click the button below to open ${safeTool}:</p>
        <p style="margin:24px 0">
          <a href="${launchUrl}" style="display:inline-block;padding:14px 28px;background:#0066cc;color:#fff;text-decoration:none;border-radius:6px;font-weight:600;font-size:16px">Launch ${safeTool} →</a>
        </p>
        <p style="color:#555;font-size:14px">After your first click, this device will remember you. You can also visit the <a href="${toolPageUrl}">${safeTool} page</a> directly any time and it'll open automatically.</p>
        <p style="color:#888;font-size:12px;margin-top:24px">Security note: the launch link respects revocation. If your access is later revoked, this link stops working immediately.</p>
      </div>
    `,
  });

  // Send confirmation + revoke link to owner — keep this email for revoke later
  try {
    await transporter.sendMail({
      from: getFromAddress(),
      to: ownerRecipient,
      subject: `Approved: ${args.to} — ${args.toolName}`,
      html: `
        <div style="font-family:system-ui,-apple-system,sans-serif;max-width:560px;margin:0 auto;padding:24px">
          <h2 style="margin-top:0">✅ Approved ${safeEmail}</h2>
          <p>This user has been granted ${safeTool} access and notified by email.</p>
          <p style="margin-top:24px">If you ever need to revoke their access, click below. <strong>Save this email</strong> — the link never expires.</p>
          <p style="margin:16px 0">
            <a href="${revokeUrl}" style="display:inline-block;padding:10px 20px;background:#cc0000;color:#fff;text-decoration:none;border-radius:6px;font-weight:600">Revoke ${safeEmail} (${safeTool})</a>
          </p>
        </div>
      `,
    });
  } catch (ownerErr) {
    console.error("[lab-access/email] Failed to send owner confirmation:", ownerErr);
  }
}

export async function sendUserRejection(args: {
  to: string;
  toolName: string;
}): Promise<void> {
  const safeTool = escapeHtml(args.toolName);
  const transporter = getTransporter();
  const contactEmail = process.env.SMTP_USER?.trim() || "connect@sataniresearchcentre.com";

  await transporter.sendMail({
    from: getFromAddress(),
    to: args.to,
    subject: `Your ${args.toolName} access request`,
    html: `
      <div style="font-family:system-ui,-apple-system,sans-serif;max-width:560px;margin:0 auto;padding:24px">
        <h2 style="margin-top:0">Access request update</h2>
        <p>Thank you for your interest in ${safeTool}. Unfortunately, your access request has not been approved at this time.</p>
        <p>If you have questions, please contact us at <a href="mailto:${contactEmail}">${contactEmail}</a>.</p>
      </div>
    `,
  });
}

