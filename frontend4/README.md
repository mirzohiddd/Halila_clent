# frontend4 — Мия саратони landing (Халила)

Bu mustaqil Vue 3 + Vite loyihasi (frontend2/frontend3 bilan bir xil
qobiq/uslubda), lekin МИЯ САРАТОНИ mavzusida — 4-босқич ташхисidan keyin
ham izlanishni to'xtatmagan oila hikoyasi.

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

Natija `dist/` papkasida bo'ladi.

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
  assets/
    hero-miya.jpg              — sizdan kelgan 1-rasm (oila MRT suratlarini ko'rib o'tirishi), hero sifatida
    inline-miya-1.jpg          — sizdan kelgan 2-rasm (oila telefon/daftar bilan muhokama qilishi), maqola ichida
  content/
    common.js                 — umumiy matnlar (sayt nomi, forma, disclaimer, footer)
    miya.js                    — МИЯ САРАТОНИ maqolasi (to'liq matn + ikkala rasm shu yerda)
  components/
    ArticlePage.vue           — maqolani render qiluvchi umumiy komponent
    LeadForm.vue                — ism/telefon/"kim uchun" forma + backendga yuborish
    ReadingProgress.vue         — sahifa tepasidagi o'qish progress chizig'i
  composables/useReadingProgress.js
  directives/reveal.js         — bloklarning skroll paytida yumshoq chiqishi
```

## Rasmlar haqida

Siz yuborgan ikkita rasm PNG formatida edi (~1–1.2 MB har biri). Sahifa
tezroq yuklanishi uchun ularni JPEG'ga (sifat 82%) siqib qo'ydim:
- `hero-miya.jpg` — maqola boshidagi katta hero rasm
- `inline-miya-1.jpg` — "Баъзан оила яна битта маҳсулотни эмас..." bo'limi ichida

## Kontentni tahrirlash

Butun sahifa matni `src/content/miya.js` faylida — sarlavha, rasm
joylashuvi, maqola bloklari (`blocks`), va forma sarlavhasi/CTA matni
(`formHeading`, `formIntro`, `formSubmitLabel`) shu yerda. "Kim uchun
murojaat qilyapsiz" variantlari standart (Ўзим/Онам/Отам/Турмуш
ўртоғим/Яқин инсоним) — `common.js` dagi umumiy variantlar ishlatiladi.

Umumiy matnlar (sayt nomi, telefon raqami, standart forma matnlari,
disclaimer, footer) — `src/content/common.js` faylida.
