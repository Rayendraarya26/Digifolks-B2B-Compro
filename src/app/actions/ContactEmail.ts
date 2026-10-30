"use server";
import { Resend } from 'resend';
import { createClient } from '@/lib/supabase/server';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

const resend = new Resend(process.env.RESEND_API_KEY);

// Sesuaikan tipe data dengan yang ada di client
export type LaunchpadData = {
  name: string;
  company: string;
  email: string;
  service: string;
  budget: string;
  currency: "IDR" | "USD";
  details: string;
  honeypot?: string;
};

// Disallow newline and control characters in single-line headers/fields (CRLF / Header Injection defense)
function sanitizeSingleLine(str: string): string {
  if (!str) return "";
  return str.replace(/[\r\n\x00-\x1F\x7F]+/g, " ").trim();
}

function escapeHtml(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendLaunchpadEmail(formData: LaunchpadData) {
  try {
    const { name, company, email, service, budget, currency, details, honeypot } = formData;

    // 1. Honeypot check: Bots auto-filling invisible fields are silently dropped
    if (honeypot && honeypot.trim().length > 0) {
      console.warn("Honeypot field triggered. Silently dropping submission.");
      return { success: true };
    }

    // 2. Rate Limiting Check (per IP)
    const clientIp = await getClientIp();
    const ipRateLimit = checkRateLimit(clientIp, {
      keyPrefix: 'contact_form_ip',
      limit: 5, // max 5 submissions
      windowMs: 15 * 60 * 1000, // per 15 minutes
    });

    if (!ipRateLimit.success) {
      return {
        success: false,
        message: "Too many requests from your IP. Please wait a few minutes before trying again.",
      };
    }

    const senderDomain = 'Digifolks System <hello@mail.digifolks.id>';
    const adminEmail = ['digifolkstech@gmail.com', 'marketing@digifolks.id'];

    // 3. Strict Input Sanitization & CRLF Defense
    const cleanName = sanitizeSingleLine(name).slice(0, 100);
    const cleanCompany = sanitizeSingleLine(company).slice(0, 100);
    const cleanEmail = sanitizeSingleLine(email).slice(0, 120);
    const cleanService = sanitizeSingleLine(service).slice(0, 200);
    const cleanBudget = sanitizeSingleLine(budget).slice(0, 50);
    const cleanCurrency = currency === "USD" ? "USD" : "IDR";
    const cleanDetails = (details || "").trim().slice(0, 4000);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanName || !cleanEmail || !emailRegex.test(cleanEmail)) {
      return { success: false, message: "Invalid name or email address provided." };
    }

    // 4. Rate Limiting Check (per Email address to prevent spamming the same inbox)
    const emailRateLimit = checkRateLimit(cleanEmail.toLowerCase(), {
      keyPrefix: 'contact_form_email',
      limit: 3, // max 3 submissions
      windowMs: 15 * 60 * 1000, // per 15 minutes
    });

    if (!emailRateLimit.success) {
      return {
        success: false,
        message: "Too many requests for this email address. Please try again later.",
      };
    }

    // 5. Save inquiry to Supabase database
    try {
      const supabase = await createClient();
      await supabase.from('contact_submissions').insert({
        name: cleanName,
        company: cleanCompany,
        email: cleanEmail,
        service: cleanService,
        budget: cleanBudget,
        currency: cleanCurrency,
        details: cleanDetails,
        status: 'new'
      });
    } catch (dbErr) {
      console.error("Failed to store submission in database:", dbErr);
    }

    const safeName = escapeHtml(cleanName);
    const safeCompany = escapeHtml(cleanCompany || "Not Provided");
    const safeEmail = escapeHtml(cleanEmail);
    const safeService = escapeHtml(cleanService || "Not Provided");
    const safeBudget = escapeHtml(cleanBudget || "Not Provided");
    const safeCurrency = escapeHtml(cleanCurrency);
    const safeDetails = escapeHtml(cleanDetails);

    const { data, error } = await resend.batch.send([
      // ==========================================
      // 1. EMAIL UNTUK ADMIN
      // ==========================================
      {
        from: senderDomain,
        to: adminEmail,
        replyTo: cleanEmail,
        subject: `[NEW INQUIRY] Project request from ${safeName}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px 20px; background-color: #0B1120; color: #FFFFFF;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #0f172a; border: 1px solid #1E293B; border-radius: 12px; overflow: hidden;">
              
              <div style="background-color: #111827; border-bottom: 1px solid #1E293B; padding: 24px; text-align: center;">
                <h1 style="margin: 0; font-size: 20px; text-transform: uppercase; font-weight: 700; letter-spacing: 1.5px; color: #FFFFFF;">
                  NEW PROJECT INQUIRY
                </h1>
              </div>

              <div style="padding: 32px;">
                <div style="background-color: #111827; border: 1px solid #1E293B; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
                  <h3 style="margin: 0 0 16px 0; border-bottom: 1px solid #1E293B; padding-bottom: 12px; color: #10B981; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">CLIENT DETAILS</h3>
                  <p style="margin: 0 0 8px 0; font-size: 15px; color: #94A3B8;"><strong>Name:</strong> <span style="color: #FFFFFF;">${safeName}</span></p>
                  <p style="margin: 0 0 8px 0; font-size: 15px; color: #94A3B8;"><strong>Company:</strong> <span style="color: #FFFFFF;">${safeCompany}</span></p>
                  <p style="margin: 0; font-size: 15px; color: #94A3B8;"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color: #10B981; text-decoration: none;">${safeEmail}</a></p>
                </div>

                <div style="background-color: #111827; border: 1px solid #1E293B; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
                  <h3 style="margin: 0 0 16px 0; border-bottom: 1px solid #1E293B; padding-bottom: 12px; color: #10B981; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">PROJECT SPECIFICATIONS</h3>
                  <p style="margin: 0 0 8px 0; font-size: 15px; color: #94A3B8;"><strong>Service:</strong> <span style="color: #FFFFFF;">${safeService}</span></p>
                  <p style="margin: 0; font-size: 15px; color: #94A3B8;"><strong>Budget:</strong> <span style="color: #FFFFFF;">${safeCurrency} ${safeBudget}</span></p>
                </div>

                <h3 style="margin: 0 0 16px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #10B981;">PROJECT DETAILS</h3>
                <div style="background-color: #0B1120; border: 1px solid #1E293B; padding: 24px; border-radius: 8px;">
                  <p style="margin: 0; font-size: 15px; line-height: 1.6; white-space: pre-wrap; color: #E2E8F0;">${safeDetails}</p>
                </div>
              </div>
              
            </div>
          </div>
        `,
      },

      // ==========================================
      // 2. EMAIL UNTUK CLIENT (AUTO-RESPONDER)
      // ==========================================
      {
        from: senderDomain,
        to: [cleanEmail], 
        replyTo: adminEmail[0],
        subject: `Your Inquiry Has Been Received - Digifolks`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px 20px; background-color: #0B1120; color: #FFFFFF;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #0f172a; border: 1px solid #1E293B; border-radius: 12px; overflow: hidden;">
              
              <div style="background-color: #111827; border-bottom: 1px solid #1E293B; padding: 24px; text-align: center;">
                <h1 style="margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 1px; color: #FFFFFF;">
                  Digifolks
                </h1>
              </div>

              <div style="padding: 32px;">
                <h3 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #FFFFFF;">Request Received</h3>
                
                <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #94A3B8;">
                  Hi <strong style="color: #FFFFFF;">${safeName}</strong>,<br/><br/>
                  Thank you for reaching out to Digifolks. We have successfully received your inquiry regarding <strong style="color: #FFFFFF;">${safeService}</strong>. Our engineering and consultant team will review your project details and get back to you shortly.
                </p>

                <div style="background-color: #111827; border: 1px solid #1E293B; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
                  <h4 style="margin: 0 0 12px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #10B981;">INQUIRY SUMMARY</h4>
                  <p style="margin: 0 0 8px 0; font-size: 14px; color: #94A3B8;">Budget Scope: <span style="color: #FFFFFF;">${safeCurrency} ${safeBudget}</span></p>
                  <p style="margin: 0; font-size: 14px; white-space: pre-wrap; font-style: italic; color: #94A3B8; line-height: 1.5;">"${safeDetails}"</p>
                </div>

                <p style="margin: 0; font-size: 15px; color: #94A3B8;">
                  Best regards,<br/>
                  <strong style="color: #FFFFFF;">The Digifolks Team</strong>
                </p>
              </div>

              <div style="background-color: #111827; border-top: 1px solid #1E293B; padding: 20px; text-align: center;">
                <p style="margin: 0; font-size: 12px; color: #64748B;">
                  &copy; ${new Date().getFullYear()} Digifolks. All rights reserved.
                </p>
              </div>
              
            </div>
          </div>
        `,
      }
    ]);

    if (error) {
      console.error("Resend API Error:", error);
      // Return generic error message to prevent leaking internal library error details
      return { success: false, message: "Failed to send message. Please try again later." };
    }

    return { success: true };
  } catch (err: any) {
    console.error("Server Action Error in sendLaunchpadEmail:", err);
    // Generic error message without internal error leakage
    return { success: false, message: "An unexpected error occurred. Please try again later." };
  }
}