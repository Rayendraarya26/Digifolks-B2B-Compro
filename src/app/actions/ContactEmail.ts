"use server";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Sesuaikan tipe data dengan yang ada di client
type LaunchpadData = {
  name: string;
  company: string;
  email: string;
  service: string;
  budget: string;
  currency: "IDR" | "USD";
  details: string;
};

export async function sendLaunchpadEmail(formData: LaunchpadData) {
  try {
    const { name, company, email, service, budget, currency, details } = formData;
    const senderDomain = 'Digifolks System <hello@mail.digifolks.id>';
    const adminEmail = ['digifolkstech@gmail.com', 'marketing@digifolks.id'];

    const { data, error } = await resend.batch.send([
      // ==========================================
      // 1. EMAIL UNTUK ADMIN
      // ==========================================
      {
        from: senderDomain,
        to: adminEmail,
        replyTo: email,
        subject: `[NEW INQUIRY] Project request from ${name}`,
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
                  <p style="margin: 0 0 8px 0; font-size: 15px; color: #94A3B8;"><strong>Name:</strong> <span style="color: #FFFFFF;">${name}</span></p>
                  <p style="margin: 0 0 8px 0; font-size: 15px; color: #94A3B8;"><strong>Company:</strong> <span style="color: #FFFFFF;">${company}</span></p>
                  <p style="margin: 0; font-size: 15px; color: #94A3B8;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #10B981; text-decoration: none;">${email}</a></p>
                </div>

                <div style="background-color: #111827; border: 1px solid #1E293B; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
                  <h3 style="margin: 0 0 16px 0; border-bottom: 1px solid #1E293B; padding-bottom: 12px; color: #10B981; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">PROJECT SPECIFICATIONS</h3>
                  <p style="margin: 0 0 8px 0; font-size: 15px; color: #94A3B8;"><strong>Service:</strong> <span style="color: #FFFFFF;">${service}</span></p>
                  <p style="margin: 0; font-size: 15px; color: #94A3B8;"><strong>Budget:</strong> <span style="color: #FFFFFF;">${currency} ${budget}</span></p>
                </div>

                <h3 style="margin: 0 0 16px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #10B981;">PROJECT DETAILS</h3>
                <div style="background-color: #0B1120; border: 1px solid #1E293B; padding: 24px; border-radius: 8px;">
                  <p style="margin: 0; font-size: 15px; line-height: 1.6; white-space: pre-wrap; color: #E2E8F0;">${details}</p>
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
        to: [email], 
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
                  Hi <strong style="color: #FFFFFF;">${name}</strong>,<br/><br/>
                  Thank you for reaching out to Digifolks. We have successfully received your inquiry regarding <strong style="color: #FFFFFF;">${service}</strong>. Our engineering and consultant team will review your project details and get back to you shortly.
                </p>

                <div style="background-color: #111827; border: 1px solid #1E293B; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
                  <h4 style="margin: 0 0 12px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #10B981;">INQUIRY SUMMARY</h4>
                  <p style="margin: 0 0 8px 0; font-size: 14px; color: #94A3B8;">Budget Scope: <span style="color: #FFFFFF;">${currency} ${budget}</span></p>
                  <p style="margin: 0; font-size: 14px; white-space: pre-wrap; font-style: italic; color: #94A3B8; line-height: 1.5;">"${details}"</p>
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
      console.error("Resend Error:", error);
      return { success: false, message: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error("Server Action Error:", err);
    return { success: false, message: err.message || "Unknown error" };
  }
}