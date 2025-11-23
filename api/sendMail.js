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
  <head>
    <style>
      :root {
        --primary: #6366f1;
        --primary-dark: #4338ca;
        --secondary: #ec4899;
        --accent: #8b5cf6;
        --dark: #0f172a;
        --light: #f8fafc;
        --text-dark: #1e293b;
        --text-light: #64748b;
        --white: #ffffff;
        --gradient: linear-gradient(135deg, #6366f1 0%, #57f542 100%);
      }

      body {
        font-family: 'Helvetica', Arial, sans-serif;
        background: var(--light);
        color: var(--text-dark);
        margin: 0;
        padding: 0;
      }

      .container {
        max-width: 600px;
        margin: 40px auto;
        background: var(--white);
        border-radius: 12px;
        box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        overflow: hidden;
        border: 1px solid rgba(99, 102, 241, 0.3);
      }

      .header {
        background: var(--gradient);
        color: var(--white);
        padding: 40px 20px;
        text-align: center;
      }

      .header h1 {
        margin: 0;
        font-size: 28px;
      }

      .content {
        padding: 30px 20px;
        text-align: center;
      }

      .content p {
        font-size: 16px;
        line-height: 1.5;
        margin: 15px 0;
      }

      .btn {
        display: inline-block;
        background: var(--primary);
        color: var(--white);
        text-decoration: none;
        padding: 12px 30px;
        border-radius: 8px;
        font-weight: bold;
        margin-top: 20px;
        box-shadow: 0 4px 15px rgba(99,102,241,0.3);
      }

      .footer {
        padding: 20px;
        font-size: 12px;
        color: var(--text-light);
        text-align: center;
      }

      @media (max-width: 500px) {
        .container { margin: 20px; }
        .header h1 { font-size: 24px; }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Welcome to Admits Extra 🎉</h1>
      </div>
      <div class="content">
        <p>Hi there!</p>
        <p>Thanks for joining our waitlist. You're now part of a growing community that discovers deals, attends events, shares coupons, and builds amazing experiences!</p>
        <a href="https://admitsextra.app" class="btn">Get Early Access</a>
      </div>
      <div class="footer">
        You received this email because you signed up for Admits Extra. <br>
        © ${new Date().getFullYear()} Admits Extra. All rights reserved.
      </div>
    </div>
  </body>
  </html>
  `,
      text: "Thanks for joining our waitlist!",
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
