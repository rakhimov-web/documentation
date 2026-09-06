# My Documentation

Shaxsiy dasturlash bilimlar bazasi — Node.js ekotizimidagi kutubxonalar bo'yicha
o'zbek tilida, kod misollari va testlar bilan boyitilgan qo'llanmalar.

Dizayn tizimi IBM Carbon uslubiga asoslangan (flat, hairline chegaralar,
IBM Plex Sans/Mono). Frontend — React + TypeScript + Vite + React Router +
Tailwind CSS v4, ikonalar uchun `lucide-react`.

## Hozircha mavjud bo'limlar

- **Node.js → Mongoose**
  - Umumiy ma'lumot (Mongoose nima, MongoDB bilan bog'liqligi, boshlang'ich sozlash)
  - Middleware (4 turi, pre/post hook'lar, xatoliklarni boshqarish, aggregate/sync
    hook'lar, middleware'ni o'tkazib yuborish) + 10 savolli interaktiv test

Yangi kutubxona yoki mavzu qo'shish uchun `src/data/` papkasidagi struktura
(`types.ts`, `groups.ts`, `topic-*.ts`) kengaytiriladi — sidebar va dashboard
avtomatik yangilanadi.

## Ishga tushirish

```bash
npm install
npm run dev      # lokal server
npm run build    # production build (dist/ papkasiga)
npm run preview  # build natijasini ko'rish
```
