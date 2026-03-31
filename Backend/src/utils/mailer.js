const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"AI Interview Prep" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html, // 🔥 using HTML now
  });
};

module.exports = sendEmail;