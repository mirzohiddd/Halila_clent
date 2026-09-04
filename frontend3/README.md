# frontend3 — Ошқозон саратони landing (Халила)

Bu mustaqil Vue 3 + Vite loyihasi (frontend2 bilan bir xil qobiq/uslubda,
lekin ОШҚОЗОН САРАТОНИ mavzusi uchun). Asosiy `halila` loyihasidagi
backendga ulanadi (`/api/leads`), lekin frontend kod bazasi butunlay
alohida va mustaqil ishga tushiriladi.

## O'rnatish

```bash
npm install
```

## Local ishga tushirish

```bash
npm run dev
```

## Build (production)

```bash
npm run build
```

Natija `dist/` papkasida bo'ladi — istalgan statik hosting (Netlify, Vercel,
Nginx va h.k.) ga joylash mumkin.

## Backend bilan bog'lanish

Forma `/api/leads` manziliga POST so'rov yuboradi. Backend manzilini
o'zgartirish uchun `.env` fayl yarating (`.env.example`dan nusxa oling):

```
VITE_API_BASE_URL=https://halila-backend.onrender.com
```

## Tuzilma

```
src/
  App.vue                     — sahifa qobig'i (tungi rejim, footer)
  main.js                     — ilova kirish nuqtasi
  style.css                   — barcha uslublar (asosiy loyiha bilan bir xil)
  theme.js                    — tungi/kunduzgi rejim holati
  progress.js                 — o'qish progress-bari holati
  content/
    common.js                 — umumiy matnlar (sayt nomi, forma, disclaimer, footer)
    oshqozon.js                — ОШҚОЗОН САРАТОНИ maqolasi (to'liq matn shu yerda)
  components/
    ArticlePage.vue           — maqolani render qiluvchi umumiy komponent
    LeadForm.vue                — ism/telefon/"kim uchun" forma + backendga yuborish
    ReadingProgress.vue         — sahifa tepasidagi o'qish progress chizig'i
  composables/useReadingProgress.js
  directives/reveal.js         — bloklarning skroll paytida yumshoq chiqishi
```

## Kontentni tahrirlash

Butun sahifa matni `src/content/oshqozon.js` faylida — sarlavha, maqola
bloklari (`blocks`), va forma sarlavhasi/CTA matni (`formHeading`,
`formIntro`, `formSubmitLabel`) shu yerda. Bu sahifada "kim uchun
murojaat qilyapsiz" variantlari standart (Ўзим/Онам/Отам/Турмуш
ўртоғим/Яқин инсоним) — `common.js` dagi umumiy variantlar ishlatiladi,
alohida override berilmagan.

Umumiy matnlar (sayt nomi, telefon raqami, standart forma matnlari,
disclaimer, footer) — `src/content/common.js` faylida.

## Eslatma

Manba matnidagi yakuniy "MUHIM MA'LUMOT" qismida "bosh miya saratonini
davolash uchun mo'ljallanmagan" degan jumla bor edi — bu, ehtimol, boshqa
mavzudagi matndan nusxa ko'chirish xatosi. `oshqozon.js` faylida bu joy
to'g'ri holatda — "ошқозон саратонини" деб қолдирилди.
