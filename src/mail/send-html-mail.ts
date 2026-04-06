import { transporter } from "./mail";

type SendHtmlMailParams = {
  to: string[];
  subject: string;
  html: string;
};

export async function sendHtmlMail({ to, subject, html }: SendHtmlMailParams) {
  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
  });
}
