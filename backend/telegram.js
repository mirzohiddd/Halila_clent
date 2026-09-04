const LINE = "━━━━━━━━━━━━━━━━━━";

const SITE_NAME = process.env.TELEGRAM_SITE_NAME || "Halila";

// "halila-article-oshqozon" -> "oshqozon"
function topicFromSource(source) {
  if (typeof source !== "string" || !source) return "—";
  return source.replace(/^halila-article-/, "").replace(/^halila-/, "");
}

function formatDate(iso) {
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, "0");
  return (
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ` +
    `${pad(d.getHours())}:${pad(d.getMinutes())}`
  );
}

export function buildLeadMessage(lead) {
  return [
    LINE,
    "📥 ЯНГИ МИЖОЗ",
    `🌐 Сайт: ${SITE_NAME}`,
    `👤 Исм: ${lead.name}`,
    `📞 Тел рақам: ${lead.phone}`,
    `📝 Мавзу: ${topicFromSource(lead.source)}`,
    `👨‍👩‍👧 Ким учун: ${lead.relationLabel || lead.relation || "—"}`,
    `🕒 Сана: ${formatDate(lead.createdAt)}`,
    LINE,
  ].join("\n");
}

export async function notifyTelegram(lead) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error("Telegram notify skipped: TELEGRAM_BOT_TOKEN yoki TELEGRAM_CHAT_ID .env da yo'q/bo'sh");
    return;
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: buildLeadMessage(lead) }),
    });
    const body = await res.text();
    if (!res.ok) {
      console.error(`Telegram notify failed [${res.status}]:`, body);
    } else {
      console.log("Telegram notify OK:", lead.id);
    }
  } catch (err) {
    console.error("Telegram notify error (tarmoq/fetch xatosi):", err.message);
  }
}
