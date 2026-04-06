import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

export const transportOptions: SMTPTransport.Options = {
  host: process.env.SMTP_SERVER!,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_PASSWORD,
  },
};

export const transporter = nodemailer.createTransport(transportOptions);
