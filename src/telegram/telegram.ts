import TelegramBot from "node-telegram-bot-api";
import { telegramIds } from "./id";

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, {
  polling: false,
});

export async function sendTelegramHtml(html: string) {
  return Promise.all(
    telegramIds.map((chatId) =>
      bot.sendMessage(chatId, html, {
        parse_mode: "HTML",
      }),
    ),
  );
}
