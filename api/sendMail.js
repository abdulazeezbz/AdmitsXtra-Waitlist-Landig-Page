import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }

  const { email } = req.body;
  if (!email) return res.status(400).send("Email required");

  const transporter = nodemailer.createTransport({
    host: "mail.umojamarkets.com",
    port: 587,
    secure: false,
    auth: {
      user: "noreplay@umojamarkets.com",
      pass: "vMYHquz9cyBuYkm",
    },
  });

  try {
    await transporter.sendMail({
      from: `"Admits Extra" <noreplay@umojamarkets.com>`,
      to: email,
      subject: "🎉 Welcome to Admits Extra! Your Early Access Awaits",
      html: `
      <html>
        <body style="margin:0; padding:0; font-family: 'Helvetica', Arial, sans-serif; background-color:#f8fafc; color:#1e293b;">
          <div style="max-width:600px; margin:40px auto; background:#ffffff; border-radius:12px; box-shadow:0 8px 20px rgba(0,0,0,0.1); border:1px solid rgba(99,102,241,0.3); overflow:hidden;">
            
            <!-- Header -->
            <div style="background:linear-gradient(135deg, #6366f1 0%, #ec4899 100%); color:#fff; text-align:center; padding:40px 20px;">
              <h1 style="margin:0; font-size:28px;">Welcome to Admits Extra 🎉</h1>
            </div>
            
            <!-- Content -->
            <div style="padding:30px 20px; text-align:center;">
              <p style="font-size:16px; margin:10px 0;">Hi there!</p>
              <p style="font-size:16px; line-height:1.5; margin:15px 0;">
                Thanks for joining our waitlist. You're now part of a growing community that discovers deals, attends events, shares coupons, and builds amazing experiences!
              </p>
              <a href="https://admitsextra.app" 
                 style="display:inline-block; background:#6366f1; color:#ffffff; text-decoration:none; padding:14px 36px; border-radius:8px; font-weight:bold; margin-top:20px; box-shadow:0 4px 15px rgba(99,102,241,0.3);">
                 Get Early Access
              </a>
            </div>

            <!-- Footer -->
            <div style="padding:20px; font-size:12px; color:#64748b; text-align:center; background:#f1f5f9;">
              You received this email because you signed up for Admits Extra.<br/>
              © ${new Date().getFullYear()} Admits Extra. All rights reserved.
            </div>

          </div>
        </body>
      </html>
      `,
      text: "Thanks for joining our waitlist! Visit https://admitsextra.app for early access.",
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
