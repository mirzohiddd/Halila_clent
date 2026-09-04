# frontend5 — Бачадон саратони landing (Халила)

Mustaqil Vue 3 + Vite loyihasi (frontend2/3/4 bilan bir xil qobiqda),
БАЧАДОН САРАТОНИ mavzusida.

## O'rnatish va ishga tushirish

```bash
npm install
npm run dev        # local
npm run build       # production build (dist/)
```

Backend manzili — `.env.example`dan `.env` yarating:
```
VITE_API_BASE_URL=https://halila-backend.onrender.com
```

## Rasmlar

- `hero-miya... yo'q, bu yerda: hero-bachadon.jpg` — sizdan kelgan 1-rasm (ayol eshik oshasidan oilasini kuzatib turgani), hero sifatida
- `inline-bachadon-1.jpg` — sizdan kelgan 2-rasm (oila telefon/daftar bilan muhokama qilishi), "Халила ҳақидаги тарқоқ маълумотларни бирма-бир излашингиз шарт эмас" bo'limidan oldin
- Ikkalasi ham PNG (~1.1–1.3 MB) edi, JPEG 82% sifatga siqildi (~107–120 KB)

## Tuzilma

```
src/
  App.vue, main.js, style.css, theme.js, progress.js
  assets/hero-bachadon.jpg, inline-bachadon-1.jpg
  content/
    common.js     — umumiy matnlar
    bachadon.js    — БАЧАДОН САРАТОНИ maqolasi (to'liq matn + rasmlar)
  components/ArticlePage.vue, LeadForm.vue, ReadingProgress.vue
  composables/useReadingProgress.js
  directives/reveal.js
```

## Forma haqida eslatma

Bu mahsulot ayollarga xos kasallik bo'lgani uchun "kim uchun murojaat
qilyapsiz" variantlaridan "Отам учун" olib tashlandi, o'rniga sizning
matningizga mos "Опам ёки синглим учун" qo'shildi (`bachadon.js`dagi
`formRelations`da). Bu faqat shu sahifaga tegishli — boshqa
landinglarga ta'sir qilmaydi.
