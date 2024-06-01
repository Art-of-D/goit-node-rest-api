import nodemailer from 'nodemailer';
import 'dotenv/config';

const { MAIL_USER, MAIL_PASSWORD, MAIL_HOST, MAIL_PORT } = process.env;

const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  secure: true,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  },
});

const sendMail = async (email, subject, html) => {
  const info = await transporter.sendMail({
    from: MAIL_USER,
    to: email,
    subject,
    html,
  });
};

export default sendMail;
