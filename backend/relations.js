// "Kim uchun murojaat qilyapsiz?" — yagona manba.
// key  — frontend yuboradigan barqaror kod
// uz   — lotincha nom (eski leadlar bilan moslik uchun)
// cyr  — Telegram xabarida va admin ro'yxatida ko'rinadigan matn
export const RELATIONS = [
  { key: "self", uz: "O'zim uchun", cyr: "Ўзим учун" },
  { key: "mother", uz: "Onam uchun", cyr: "Онам учун" },
  { key: "father", uz: "Otam uchun", cyr: "Отам учун" },
  { key: "spouse", uz: "Turmush o'rtog'im uchun", cyr: "Турмуш ўртоғим учун" },
  { key: "relative", uz: "Yaqin insonim uchun", cyr: "Яқин инсоним учун" },
];

// Frontend key, eski lotincha qiymat yoki kirillcha matn — hammasi qabul qilinadi.
export function resolveRelation(value) {
  if (typeof value !== "string") return null;
  const v = value.trim();
  if (!v) return null;
  return (
    RELATIONS.find((r) => r.key === v || r.uz === v || r.cyr === v) || null
  );
}
