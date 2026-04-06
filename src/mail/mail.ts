import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

const transportOptions: SMTPTransport.Options = {
  host: process.env.SMTP_SERVER!,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(transportOptions);
