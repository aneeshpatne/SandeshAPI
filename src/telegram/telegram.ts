import TelegramBot from "node-telegram-bot-api";

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, {
  polling: false,
});

function getTelegramIds(): number[] {
  const rawIds = process.env.TELEGRAM_CHAT_IDS ?? process.env.TELEGRAM_CHAT_ID;

  if (!rawIds) {
    throw new Error(
      "Set TELEGRAM_CHAT_IDS or TELEGRAM_CHAT_ID to send Telegram messages.",
    );
  }

  return rawIds
    .split(",")
    .map((value) => Number(value.trim()))
    .filter((value) => Number.isInteger(value));
}

export async function sendTelegramHtml(html: string) {
  const telegramIds = getTelegramIds();

  return Promise.all(
    telegramIds.map((chatId) =>
      bot.sendMessage(chatId, html, {
        parse_mode: "HTML",
      }),
    ),
  );
}
