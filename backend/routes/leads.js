import { Router } from "express";
import { randomUUID } from "crypto";
import { appendLead, readLeads } from "../storage.js";
import { notifyTelegram } from "../telegram.js";
import { resolveRelation } from "../relations.js";

const router = Router();

function isValidPhone(phone) {
  const digits = String(phone || "").replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 15;
}

// POST /api/leads — public endpoint used by the landing page form
router.post("/", async (req, res) => {
  const { name, phone, relation, source } = req.body || {};

  const errors = {};
  if (!name || typeof name !== "string" || name.trim().length < 2) {
    errors.name = "Исм камида 2 белгидан иборат бўлиши керак";
  }
  if (!isValidPhone(phone)) {
    errors.phone = "Телефон рақами нотўғри форматда";
  }

  // "Kim uchun" — majburiy maydon
  const resolvedRelation = resolveRelation(relation);
  if (!resolvedRelation) {
    errors.relation = "Ким учун мурожаат қилаётганингизни танланг";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      message: "Маълумотларни текшириб қайта юборинг",
      errors,
    });
  }

  const lead = {
    id: randomUUID(),
    name: name.trim().slice(0, 120),
    phone: String(phone).trim().slice(0, 30),
    relationKey: resolvedRelation.key,
    relation: resolvedRelation.uz,
    relationLabel: resolvedRelation.cyr,
    source: typeof source === "string" ? source.slice(0, 60) : "halila-landing",
    createdAt: new Date().toISOString(),
    ip: req.ip,
  };

  try {
    await appendLead(lead);
    notifyTelegram(lead); // fire and forget, no-op if not configured
    return res.status(201).json({ message: "Қабул қилинди", id: lead.id });
  } catch (err) {
    console.error("Failed to save lead:", err);
    return res.status(500).json({ message: "Серверда хатолик юз берди. Бироздан сўнг қайта уриниб кўринг." });
  }
});

// GET /api/leads — simple admin listing, protected by a shared secret key
router.get("/", async (req, res) => {
  const adminKey = req.headers["x-admin-key"];
  if (!process.env.ADMIN_KEY || adminKey !== process.env.ADMIN_KEY) {
    return res.status(401).json({ message: "Рухсат берилмаган" });
  }
  const leads = await readLeads();
  return res.json({ count: leads.length, leads });
});

export default router;
