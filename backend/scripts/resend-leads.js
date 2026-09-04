// backend/scripts/resend-leads.js
//
// Ishlatish (backend papkasida):
//   node scripts/resend-leads.js
//
// Bu skript:
//  1) Avval TELEGRAM_BOT_TOKEN va TELEGRAM_CHAT_ID to'g'ri ekanini tekshiradi
//     (getMe va getChat orqali) va aniq xato sababini chiqaradi.
//  2) Agar hammasi joyida bo'lsa, data/leads.json dagi barcha yozuvlarni
//     guruhga qayta yuboradi.
//
// Diqqat: bu skript sizning kompyuteringizda (yoki internetga chiqa oladigan
// muhitda) ishlashi kerak — u yerda TELEGRAM ga to'g'ridan-to'g'ri ulanish bo'ladi.

import "dotenv/config";
import { readLeads } from "../storage.js";
import { buildLeadMessage } from "../telegram.js";

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

function fail(msg) {
  console.error("❌ " + msg);
  process.exit(1);
}

async function main() {
  if (!token) fail("TELEGRAM_BOT_TOKEN .env faylida yo'q. Backend papkasidagi .env ni tekshiring.");
  if (!chatId) fail("TELEGRAM_CHAT_ID .env faylida yo'q. Backend papkasidagi .env ni tekshiring.");

  console.log("1) Bot tokenni tekshiryapmiz (getMe)...");
  const meRes = await fetch(`https://api.telegram.org/bot${token}/getMe`);
  const me = await meRes.json();
  if (!me.ok) {
    fail(
      `Bot token noto'g'ri yoki bekor qilingan. Telegram javobi: ${JSON.stringify(me)}\n` +
        `-> @BotFather ga boring, botingizni tanlang va "Revoke current token / API token" orqali yangi token oling, so'ng .env dagi TELEGRAM_BOT_TOKEN ni yangilang.`
    );
  }
  console.log(`   OK — bot: @${me.result.username} (${me.result.first_name})`);

  console.log("2) Chat ID ni tekshiryapmiz (getChat)...");
  const chatRes = await fetch(`https://api.telegram.org/bot${token}/getChat?chat_id=${encodeURIComponent(chatId)}`);
  const chat = await chatRes.json();
  if (!chat.ok) {
    fail(
      `Chat ID (${chatId}) bilan bog'lanib bo'lmadi. Telegram javobi: ${JSON.stringify(chat)}\n` +
        `Sabablari ko'pincha shular:\n` +
        `  - Bot guruhga umuman qo'shilmagan\n` +
        `  - Bot guruhdan chiqarib yuborilgan\n` +
        `  - Guruh "supergroup"ga aylantirilgan va ID o'zgargan (endi -100 bilan boshlanishi kerak)\n\n` +
        `Yechim: guruhga botni (@${me.result.username}) admin qilib qo'shing, so'ng botga guruhda\n` +
        `birorta xabar yuboring va shu manzilni brauzerda oching:\n` +
        `  https://api.telegram.org/bot${token}/getUpdates\n` +
        `Javobdagi "chat":{"id": ...} qiymatini .env dagi TELEGRAM_CHAT_ID ga qo'ying.`
    );
  }
  console.log(`   OK — chat: "${chat.result.title || chat.result.first_name}" (turi: ${chat.result.type})`);

  console.log("3) leads.json o'qilyapti...");
  const leads = await readLeads();
  if (leads.length === 0) {
    console.log("   Hech qanday lead topilmadi. Yakunlandi.");
    return;
  }
  console.log(`   ${leads.length} ta lead topildi. Guruhga yuborilyapti...`);

  let sent = 0;
  for (const lead of leads) {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: buildLeadMessage(lead) }),
    });
    const body = await res.json();
    if (!body.ok) {
      console.error(`   ❌ ${lead.name} (${lead.id}) yuborilmadi:`, JSON.stringify(body));
    } else {
      sent++;
      console.log(`   ✅ ${lead.name} (${lead.phone}) yuborildi`);
    }
    // Telegram flood limitiga tegmaslik uchun kichik pauza
    await new Promise((r) => setTimeout(r, 300));
  }

  console.log(`\nTayyor: ${sent}/${leads.length} ta lead guruhga yuborildi.`);
}

main().catch((err) => {
  console.error("Kutilmagan xato:", err);
  process.exit(1);
});
