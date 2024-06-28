import nodemailer from 'nodemailer';
const { Transporter } = nodemailer;
import ejs from 'ejs'
import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import dotenv from 'dotenv'
dotenv.config()
const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    services: process.env.SMTP_SERVICES,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,

    }
  })

  const { email, subject, template, data } = options;

  // Get the path to the template file
  const templateFile = path.join(__dirname, "../mails", template)

  // Render the Email template with ejs
  const html = await ejs.renderFile(templateFile, data);

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject,
    html
  };
  await transporter.sendMail(mailOptions);
}

export default sendMail;
