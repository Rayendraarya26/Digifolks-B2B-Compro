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
      // 1. EMAIL UNTUK ADMIN (MASUK KE INBOX LU)
      // ==========================================
      {
        from: senderDomain,
        to: adminEmail,
        replyTo: email,
        subject: `[NEW MISSION] Launch sequence from ${name} (${company})`,
        html: `
          <div style="font-family: 'Courier New', Courier, monospace; padding: 40px 20px; background-color: #f4f4f5; color: #000;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #FFF; border: 4px solid #000; box-shadow: 8px 8px 0px #000; border-radius: 16px; overflow: hidden;">
              
              <div style="background-color: #B8E1FF; border-bottom: 4px solid #000; padding: 20px; text-align: center;">
                <h1 style="margin: 0; font-size: 28px; text-transform: uppercase; font-weight: 900; letter-spacing: 2px;">
                  MISSION LAUNCHED
                </h1>
              </div>

              <div style="padding: 30px;">
                <div style="background-color: #FF90E8; border: 3px solid #000; box-shadow: 4px 4px 0px #000; padding: 15px; border-radius: 12px; margin-bottom: 24px;">
                  <h3 style="margin: 0 0 10px 0; border-bottom: 2px dashed #000; padding-bottom: 5px;">CLIENT DOSSIER</h3>
                  <p style="margin: 0 0 5px 0; font-size: 16px;"><strong>Name:</strong> ${name}</p>
                  <p style="margin: 0 0 5px 0; font-size: 16px;"><strong>Company:</strong> ${company}</p>
                  <p style="margin: 0; font-size: 16px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #000; font-weight: bold;">${email}</a></p>
                </div>

                <div style="background-color: #FFEA00; border: 3px solid #000; box-shadow: 4px 4px 0px #000; padding: 15px; border-radius: 12px; margin-bottom: 24px;">
                  <h3 style="margin: 0 0 10px 0; border-bottom: 2px dashed #000; padding-bottom: 5px;">PROJECT SPECS</h3>
                  <p style="margin: 0 0 5px 0; font-size: 16px;"><strong>Service:</strong> ${service}</p>
                  <p style="margin: 0; font-size: 16px;"><strong>Budget:</strong> ${currency} ${budget}</p>
                </div>

                <h3 style="margin: 0 0 12px 0; font-size: 20px; text-transform: uppercase; font-weight: 900;">The Blueprint / Secret Idea:</h3>
                <div style="background-color: #23A094; color: #FFF; border: 3px solid #000; box-shadow: 4px 4px 0px #000; padding: 20px; border-radius: 12px;">
                  <p style="margin: 0; font-size: 16px; line-height: 1.6; white-space: pre-wrap; font-weight: bold;">${details}</p>
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
        subject: `Coordinates Received! Welcome aboard, ${name}.`,
        html: `
          <div style="font-family: 'Courier New', Courier, monospace; padding: 40px 20px; background-color: #f4f4f5; color: #000;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #FFF; border: 4px solid #000; box-shadow: 8px 8px 0px #000; border-radius: 16px; overflow: hidden;">
              
              <div style="background-color: #B8E1FF; border-bottom: 4px solid #000; padding: 20px; text-align: center;">
                <h1 style="margin: 0; font-size: 28px; text-transform: uppercase; font-weight: 900; letter-spacing: 2px;">
                  COORDINATES LOCKED!
                </h1>
              </div>

              <div style="padding: 30px;">
                <h3 style="margin: 0 0 16px 0; font-size: 22px; text-transform: uppercase; font-weight: 900;">Houston, we have a new mission from ${company}!</h3>
                
                <div style="background-color: #FFEA00; border: 3px solid #000; box-shadow: 4px 4px 0px #000; padding: 20px; border-radius: 12px; margin-bottom: 24px;">
                  <p style="margin: 0; font-size: 16px; line-height: 1.6; font-weight: bold;">
                    Hi ${name}, thank you for reaching out! Your mission brief for <strong>${service}</strong> has safely landed on Digifolks' mainframe. Our crew is analyzing your blueprint and will beam a reply to this comm channel shortly.
                  </p>
                </div>

                <p style="font-size: 14px; font-weight: bold; margin-bottom: 8px; text-transform: uppercase;">Mission Summary:</p>
                <div style="background-color: #f4f4f5; border: 2px dashed #000; padding: 15px; border-radius: 8px;">
                  <p style="margin: 0 0 5px 0; font-size: 14px; font-weight: bold;">Budget Scope: ${currency} ${budget}</p>
                  <p style="margin: 0; font-size: 14px; white-space: pre-wrap; font-style: italic;">"${details}"</p>
                </div>
              </div>

              <div style="background-color: #FF90E8; border-top: 4px solid #000; padding: 15px; text-align: center;">
                <p style="margin: 0; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
                  Prepare for liftoff! - The Digifolks Crew
                </p>
              </div>
              
            </div>
          </div>
        `,
      }
    ]);

    if (error) {
      console.error("Resend Error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Server Action Error:", err);
    return { success: false, error: err };
  }
}