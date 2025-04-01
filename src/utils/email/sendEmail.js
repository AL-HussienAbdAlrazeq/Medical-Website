import nodemailer from "nodemailer";

export const sendEmail = async ({
  to = [],
  cc = [],
  bcc = [],
  subject = "Route",
  text = "",
  html = "",
  attachments = []

} = {}) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    service: "gmail", // true for port 465, false for other ports
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false, // Allow self-signed certificates
    },
  });


  const info = await transporter.sendMail({
    from: `"Route Foo Koch 👻" ${process.env.EMAIL}`, // sender address
    to,
    cc,
    bcc,
    subject,
    text,
    html,
    attachments
  });
}
