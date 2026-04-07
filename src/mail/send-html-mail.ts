import { transporter } from "./mail";

type SendHtmlMailParams = {
  app_id: string;
  to: string[];
  subject: string;
  html: string;
};

export async function sendHtmlMail({
  app_id,
  to,
  subject,
  html,
}: SendHtmlMailParams) {
  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: "[" + app_id + "]" + " - " + subject,
    html,
  });
}
