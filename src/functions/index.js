// functions/index.js
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

const transporter = nodemailer.createTransport({
  host: functions.config().smtp.host,
  port: parseInt(functions.config().smtp.port) || 587,
  secure: false, // true for port 465
  auth: {
    user: functions.config().smtp.user,
    pass: functions.config().smtp.pass
  }
});

exports.sendWelcomeEmail = functions.database.ref("/waitlist/{pushId}")
  .onCreate(async (snapshot) => {
    const email = snapshot.val().email;

    const mailOptions = {
      from: `"Admits Extra" <${functions.config().smtp.user}>`,
      to: email,
      subject: "Welcome to Admits Extra Waitlist!",
      text: `Hi! Thanks for joining the Admits Extra waitlist. We'll notify you when we launch.`
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent to:", email);
    } catch (err) {
      console.error("Error sending email:", err);
    }
  });
