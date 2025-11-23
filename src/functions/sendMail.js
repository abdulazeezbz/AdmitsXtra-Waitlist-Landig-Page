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
      subject: "Welcome to Admits Extra!",
      text: "Thanks for joining our waitlist!",
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
