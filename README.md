# Halila — maqola (gazeta) formatidagi lead sayti

Landing page emas. Foydalanuvchi yo'li:
**LINK → MAQOLA → MAQOLA → ... → FORM → РЎЙХАТДАН ЎТИШ**

Sahifada faqat maqola matni ko'rinadi; ro'yxatdan o'tish formasi maqolaning
eng oxirida joylashgan. Barcha ko'rinadigan matnlar **kirill alifbosida**.
## Tuzilma
```
halila/
├── backend/                Express API (o'zgarmagan logika)
│   └── routes/leads.js     POST /api/leads  +  GET /api/leads (admin)
└── frontend/               Vue 3 + Vite, tashqi CSS/router kutubxonasisiz
    ├── src/content/        ← MARKETINGOLOG FAQAT SHU YERNI TAHRIRLAYDI
    │   ├── common.js       forma yorliqlari, disclaimer, footer
    │   ├── ishtaha.js      /ishtaha
    │   ├── oshqozon.js     /oshqozon
    │   ├── jigar.js        /jigar
    │   ├── opka.js         /o-pka
    │   ├── miya.js         /miya
    │   └── index.js        segmentlar ro'yxati
    ├── src/router.js       kichik path/hash router (vue-router kerak emas)
    ├── src/components/ArticlePage.vue   maqolani chizadi
    ├── src/components/LeadForm.vue      forma (Исм + Телефон рақами)
    └── src/style.css       oq fon, qora matn, serif, max 740px
```

`frontend2/` va `frontend3/` (eski Dizayn B va C landing sahifalari) olib tashlandi.

## Kontentni almashtirish

Yangi matn kelganda faqat `src/content/<segment>.js` faylini tahrirlash kifoya.
Blok turlari: `{ type: "p", text }`, `{ type: "h2", text }`, `{ type: "disclaimer" }`.

Yangi segment qo'shish: yangi fayl yarating (`path: "/prostata"` va h.k.) va
`src/content/index.js` ichidagi `articles` ro'yxatiga qo'shing.

## Ishga tushirish

```bash
cd backend  && npm install && npm run dev     # http://localhost:4000
cd frontend && cp .env.example .env && npm install && npm run dev   # :5173
```

Build:

```bash
cd frontend && npm run build     # dist/
```

`public/_redirects` mavjud — Netlify/Vercel'da `/ishtaha` kabi yo'llar
`index.html`ga qaytariladi. Nginx uchun: `try_files $uri /index.html;`

## Leadlar

Forma `POST /api/leads` ga `{ name, phone, source }` yuboradi.
`source` maydoni qaysi maqoladan kelganini ko'rsatadi:
`halila-article-ishtaha`, `halila-article-oshqozon`, `halila-article-jigar`,
`halila-article-o-pka`, `halila-article-miya`.

```bash
curl -H "x-admin-key: SIZNING_ADMIN_KEY" http://localhost:4000/api/leads
```

## Muhim

Sahifa BAA (biologik faol qo'shimcha) haqida. Har bir maqolada dori vositasi
emasligi haqidagi ogohlantirish (`{ type: "disclaimer" }`) ataylab qoldirilgan —
uni olib tashlamang.
