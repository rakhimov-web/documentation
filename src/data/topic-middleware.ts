import { Workflow } from "lucide-react";
import type { Topic } from "./types";

export const middlewareTopic: Topic = {
  id: "middleware",
  title: "Middleware",
  shortDesc:
    "Pre va post hook'lar orqali save, query, aggregate va model amallariga o'zingizning mantiqingizni ulash.",
  icon: Workflow,
  readTime: "14 daqiqa",
  status: "ready",
  sections: [
    {
      id: "nima",
      heading: "Middleware nima?",
      blocks: [
        {
          type: "paragraph",
          text: "Middleware (boshqacha aytganda, pre va post hook'lar) — bu asinxron funksiyalar bajarilishi jarayonida boshqaruvni vaqtincha o'z qo'liga oladigan funksiyalardir. Middleware sxema (schema) darajasida belgilanadi va ko'pincha plaginlar yozishda ishlatiladi.",
        },
        {
          type: "paragraph",
          text: "Oddiy tilda aytganda: siz \"hujjat saqlanishidan oldin\" yoki \"so'rov bajarilib bo'lgandan keyin\" kabi aniq nuqtalarda o'z kodingizni avtomatik ishga tushira olasiz — masalan, parolni xeshlash, harakatlarni loglash, bog'liq hujjatlarni tozalash yoki ma'lumotlarni normalizatsiya qilish uchun.",
        },
      ],
    },
    {
      id: "turlari",
      heading: "Middleware'ning 4 turi",
      blocks: [
        {
          type: "paragraph",
          text: "Mongoose'da middleware 4 xil bo'ladi va har birida this kalit so'zi turlicha narsani anglatadi:",
        },
        {
          type: "table",
          headers: ["Turi", "this nimani anglatadi", "Qaysi funksiyalarda ishlaydi"],
          rows: [
            [
              "Document middleware",
              "Hujjatning o'zi (modelga this.constructor orqali kirish mumkin)",
              "validate, save, updateOne, deleteOne, init",
            ],
            [
              "Query middleware",
              "Query obyekti",
              "find, findOne, findOneAndUpdate, updateOne, deleteOne, countDocuments va boshqalar",
            ],
            [
              "Aggregate middleware",
              "Aggregate obyekti — this.pipeline()",
              "aggregate()",
            ],
            [
              "Model middleware",
              "Modelning o'zi (statik funksiyalar)",
              "insertMany, bulkWrite, createCollection",
            ],
          ],
        },
        {
          type: "note",
          variant: "info",
          text: "Query middleware'lar sub-hujjatlar (subdocuments) ichida ishlamaydi — ular faqat asosiy hujjat sxemasiga tegishli.",
        },
        {
          type: "paragraph",
          text: "Muhim nuqta: updateOne va deleteOne standart holatda Query middleware sifatida ro'yxatdan o'tadi. Ya'ni doc.updateOne() ham, Model.updateOne() ham updateOne hook'ini ishga tushiradi, ammo ikkala holatda ham this — hujjat emas, balki Query bo'ladi. Buni document middleware sifatida ro'yxatdan o'tkazish uchun maxsus optiondan foydalanish kerak bo'ladi (pastroqda ko'ramiz).",
        },
      ],
    },
    {
      id: "doc-middleware-methods",
      heading: "Document middleware: metodlar",
      blocks: [
        {
          type: "paragraph",
          text: "Document middleware — hujjatning o'zi ustida ishlaydigan 5 ta metodga ulanadi: validate, save, updateOne, deleteOne va init. Har birini oching va to'liq tavsif, parametrlar hamda kod misolini ko'ring.",
        },
        {
          type: "methodGroup",
          methods: [
            {
              id: "doc-validate",
              name: "validate",
              signature: "document.validate([pathsToValidate], [options])",
              summary:
                "Hujjat uchun ro'yxatdan o'tgan barcha validatsiya qoidalarini ishga tushiradi.",
              detail:
                "Bu metod sxemada belgilangan validatsiya qoidalarini bajaradi. Muhim jihati: save() chaqirilganda Mongoose bu metodni ICHKI ravishda avtomatik chaqiradi — agar biror qoida buzilsa, save() to'xtatiladi va xato tashlanadi. validate() Promise qaytaradi.",
              params: [
                {
                  name: "pathsToValidate",
                  desc: "Array yoki string — faqat shu yo'llar (path) bo'yicha o'zgargan maydonlarni tekshirish uchun ro'yxat.",
                },
                {
                  name: "options.validateModifiedOnly",
                  desc: "true bo'lsa, faqat o'zgargan maydonlar tekshiriladi (barcha required maydonlar emas).",
                },
                {
                  name: "options.pathsToSkip",
                  desc: "Tekshiruvdan chetlab o'tiladigan yo'llar ro'yxati.",
                },
                {
                  name: "options.middleware",
                  desc: "false bo'lsa, foydalanuvchi qo'shgan pre/post validate hook'lari o'tkazib yuboriladi.",
                },
              ],
              returns: "Promise — validatsiya muvaffaqiyatli bo'lsa resolve, aks holda ValidationError bilan reject bo'ladi.",
              example: {
                language: "javascript",
                code: `await hujjat.validate({
  validateModifiedOnly: false,
  pathsToSkip: ['name', 'email'],
});`,
              },
              hasFullDoc: true,
            },
            {
              id: "doc-save",
              name: "save",
              signature: "document.save([options])",
              summary:
                "Hujjatni bazaga saqlaydi: yangi bo'lsa insertOne, mavjud bo'lsa faqat o'zgargan maydonlar bilan updateOne yuboradi.",
              detail:
                "save() ichida avtomatik validate() ham chaqiriladi (shuning uchun pre('validate') hook'lari pre('save')dan oldin ishlaydi). Agar hujjat $isNew === true bo'lsa, Mongoose insertOne buyrug'ini, aks holda faqat o'zgargan maydonlar bilan updateOne buyrug'ini yuboradi (butun hujjatni qayta yozmaydi).",
              params: [
                { name: "options.session", desc: "Tranzaksiya uchun ClientSession." },
                {
                  name: "options.validateBeforeSave",
                  desc: "false qilib qo'yilsa, saqlashdan oldin validatsiya bajarilmaydi.",
                },
                {
                  name: "options.validateModifiedOnly",
                  desc: "true bo'lsa, faqat o'zgargan maydonlar validatsiya qilinadi.",
                },
                { name: "options.timestamps", desc: "false bo'lsa, shu save() chaqiruvi uchun timestamp maydonlari yangilanmaydi." },
                {
                  name: "options.middleware",
                  desc: "false yoki { pre: false } / { post: false } — foydalanuvchi hook'larini butunlay yoki qisman o'tkazib yuborish.",
                },
              ],
              returns: "Promise — saqlangan hujjat bilan resolve bo'ladi.",
              example: {
                language: "javascript",
                code: `product.sold = Date.now();
product = await product.save();
// Agar hujjat yangi bo'lmasa, faqat "sold" maydoni uchun
// updateOne buyrug'i MongoDB'ga yuboriladi.`,
              },
              hasFullDoc: true,
            },
            {
              id: "doc-updateone",
              name: "updateOne",
              signature: "document.updateOne(update, [options])",
              summary:
                "Ushbu hujjatning _id'sini filtr sifatida ishlatib updateOne buyrug'ini yuboradi.",
              detail:
                "Bu — Model.updateOne({ _id: hujjat._id }, update)ga qulay qisqartma. Yuqoridagi \"Nomlanish to'qnashuvlari\" bo'limida ko'rilganidek, bu metodni document middleware sifatida ushlash uchun schema.pre('updateOne', { document: true, query: false }, fn) shaklida ro'yxatdan o'tkazish kerak — aks holda hook Query obyektiga ulanadi.",
              params: [
                { name: "update", desc: "Yangilash operatsiyasi (masalan, $set, $inc).", },
                { name: "options", desc: "Query.prototype.setOptions() bilan bir xil optionlar (lean, strict, timestamps va h.k.)." },
              ],
              returns: "Query — natijada UpdateResult (matchedCount, modifiedCount va h.k.) qaytaradi.",
              example: {
                language: "javascript",
                code: `weirdCar.updateOne({ $inc: { wheels: 1 } }, { w: 1 });`,
              },
              hasFullDoc: true,
            },
            {
              id: "doc-deleteone",
              name: "deleteOne",
              signature: "document.deleteOne()",
              summary:
                "Hujjatning o'zini o'chiradi — lekin standart holatda deleteOne middleware'ini ISHGA TUSHIRMAYDI.",
              detail:
                "Diqqat: legacy sabablarga ko'ra doc.deleteOne() chaqirilganda query middleware ishlamaydi (Model.deleteOne() esa ishlaydi). Buni document middleware sifatida ushlash uchun schema.pre('deleteOne', { document: true, query: false }, fn) kabi aniq belgilash kerak — bu \"Nomlanish to'qnashuvlari\" bo'limida kod misoli bilan ko'rsatilgan.",
              hasFullDoc: false,
            },
            {
              id: "doc-init",
              name: "init",
              signature: "document.init(doc, [opts], [fn])",
              summary:
                "MongoDB'dan qaytgan xom (raw) obyektni to'liq Mongoose hujjatiga aylantiradi (hidratsiya).",
              detail:
                "Bu funksiya odatda avtomatik chaqiriladi — MongoDB'dan hujjat qaytarilgach, Mongoose uni ichki ravishda chaqiradi. init() setter'larni ishga tushirmaydi va hech qanday yo'lni o'zgargan (modified) deb belgilamaydi. Bu — middleware'lar orasida yagona SINXRON ishlaydigan turi, shu sababli uning pre/post hook'lari ham sinxron bo'lishi shart.",
              params: [
                { name: "doc", desc: "MongoDB'dan qaytgan xom (plain) obyekt." },
                {
                  name: "opts.hydratedPopulatedDocs",
                  desc: "true bo'lsa, xom obyektdagi populate qilingan yo'llar ham to'liq hujjat sifatida belgilanadi.",
                },
              ],
              example: {
                language: "javascript",
                code: `schema.pre('init', (pojo) => {
  console.log(pojo.constructor.name); // 'Object' — hali init bo'lmagan holat
});

schema.post('init', (doc) => {
  doc.loadedAt = new Date(); // endi to'liq Mongoose hujjati
});`,
              },
              hasFullDoc: true,
            },
          ],
        },
      ],
    },
    {
      id: "query-middleware-methods",
      heading: "Query middleware: metodlar",
      blocks: [
        {
          type: "paragraph",
          text: "Query middleware eng ko'p metodga ulanadigan tur. Bu yerda this har doim Query obyekti bo'ladi. Quyida har bir metodning to'liq tavsifi keltirilgan.",
        },
        {
          type: "methodGroup",
          methods: [
            {
              id: "q-find",
              name: "find",
              signature: "Model.find([filter])",
              summary: "Filtrga mos keluvchi barcha hujjatlarni massiv shaklida qaytaradi.",
              detail:
                "Agar filter berilmasa, kolleksiyadagi barcha hujjatlar qaytariladi. Natija juda katta bo'lishi mumkin bo'lgan hollarda, barchasini xotiraga yuklash o'rniga Query.prototype.cursor() ishlatish tavsiya etiladi.",
              returns: "Query — bajarilganda hujjatlar massivini qaytaradi.",
              example: {
                language: "javascript",
                code: `const filmlar = await Film.find({ yil: { $gte: 1980, $lte: 1989 } });`,
              },
              hasFullDoc: true,
            },
            {
              id: "q-findone",
              name: "findOne",
              signature: "Model.findOne([filter], [projection], [options])",
              summary: "Filtrga mos birinchi hujjatni qaytaradi yoki topilmasa null.",
              detail:
                "Agar filter berilmasa, Mongoose bo'sh findOne buyrug'ini yuboradi va MongoDB ixtiyoriy bitta hujjatni qaytaradi. _id bo'yicha qidirish uchun findById() dan foydalanish tavsiya etiladi.",
              returns: "Query — bitta hujjat yoki null bilan bajariladi.",
              example: {
                language: "javascript",
                code: `const mushuk = await Mushuk.where({ rang: 'oq' }).findOne();`,
              },
              hasFullDoc: true,
            },
            {
              id: "q-findoneandupdate",
              name: "findOneAndUpdate",
              signature: "Model.findOneAndUpdate([filter], [update], [options])",
              summary: "Mos hujjatni topib, uni yangilaydi va (odatda eski holatini) qaytaradi.",
              detail:
                "options.new: true qilib berilsa, funksiya yangilashdan KEYINGI holatni qaytaradi (standart holatda — yangilashdan oldingi holat qaytariladi). options.upsert: true bo'lsa, hujjat topilmasa yangisi yaratiladi.",
              params: [
                { name: "options.new", desc: "true bo'lsa, yangilangan (yangi) hujjatni qaytaradi. Standart: false." },
                { name: "options.upsert", desc: "true bo'lsa, mos hujjat topilmasa, yangisini yaratadi." },
                { name: "options.runValidators", desc: "true bo'lsa, yangilash operatsiyasi sxema validatorlariga qarshi tekshiriladi." },
              ],
              returns: "Query — topilgan (yoki yangilangan) hujjat bilan bajariladi.",
              example: {
                language: "javascript",
                code: `const yangilangan = await Foydalanuvchi.findOneAndUpdate(
  { email: 'aziz@mail.com' },
  { $set: { yosh: 27 } },
  { new: true },
);`,
              },
              hasFullDoc: true,
            },
            {
              id: "q-findoneanddelete",
              name: "findOneAndDelete",
              signature: "Model.findOneAndDelete([filter], [options])",
              summary: "Mos hujjatni topib, uni o'chiradi va o'chirilgan hujjatni qaytaradi.",
              detail:
                "options.sort orqali bir nechta hujjat mos kelganda qaysi biri o'chirilishini belgilash mumkin. options.requireFilter: true bo'lsa, bo'sh filtr ({}) bilan chaqirilganda xato tashlanadi — bu butun kolleksiyani tasodifan tozalab yuborishdan himoya qiladi.",
              returns: "Query — o'chirilgan hujjat (yoki topilmasa null) bilan bajariladi.",
              example: {
                language: "javascript",
                code: `const ochirilgan = await Buyurtma.findOneAndDelete({ holat: 'bekor qilingan' });`,
              },
              hasFullDoc: true,
            },
            {
              id: "q-findoneandreplace",
              name: "findOneAndReplace",
              signature: "Model.findOneAndReplace([filter], [replacement], [options])",
              summary: "Mos hujjatni topib, uni butunlay YANGI hujjat bilan almashtiradi.",
              detail:
                "findOneAndUpdate'dan farqli o'laroq, bu yerda $set kabi atomik operatorlar emas, hujjatning to'liq yangi ko'rinishi beriladi — eski maydonlar (yangi obyektda yo'q bo'lsa) olib tashlanadi.",
              returns: "Query — almashtirilgan hujjat (options.new ga qarab, eski yoki yangi holatda) bilan bajariladi.",
              example: {
                language: "javascript",
                code: `await Profil.findOneAndReplace(
  { userId: 42 },
  { userId: 42, ism: 'Ali', yosh: 30 },
);`,
              },
              hasFullDoc: true,
            },
            {
              id: "q-updateone",
              name: "updateOne",
              signature: "Model.updateOne([filter], [update], [options])",
              summary: "Filtrga mos birinchi hujjatni yangilaydi.",
              detail:
                "replaceOne'dan farqli o'laroq, $set kabi atomik operatorlar bilan ishlaydi. Diqqat: bu metod save() hook'larini ISHGA TUSHIRMAYDI — buning o'rniga pre('updateOne') / post('updateOne') ishlatiladi.",
              returns:
                "Query — UpdateResult (acknowledged, matchedCount, modifiedCount, upsertedCount, upsertedId) bilan bajariladi.",
              example: {
                language: "javascript",
                code: `const natija = await Foydalanuvchi.updateOne(
  { ism: 'Jean-Luc' },
  { kema: 'Enterprise' },
);
natija.modifiedCount;`,
              },
              hasFullDoc: true,
            },
            {
              id: "q-updatemany",
              name: "updateMany",
              signature: "Model.updateMany([filter], [update], [options])",
              summary: "Filtrga mos BARCHA hujjatlarni yangilaydi (faqat birinchisini emas).",
              detail:
                "updateOne bilan bir xil mantiqqa ega, farqi shundaki — mos keluvchi barcha hujjatlar yangilanadi. Bu metod ham save() hook'larini emas, balki alohida updateMany hook'larini ishga tushiradi.",
              returns: "Query — UpdateResult bilan bajariladi (necha hujjat mos kelgani va o'zgartirilgani ko'rsatiladi).",
              example: {
                language: "javascript",
                code: `await Foydalanuvchi.updateMany(
  { faol: false },
  { $set: { arxivlangan: true } },
);`,
              },
              hasFullDoc: true,
            },
            {
              id: "q-replaceone",
              name: "replaceOne",
              signature: "Model.replaceOne([filter], [doc], [options])",
              summary: "Mos kelgan hujjatni butunlay yangi hujjat bilan almashtiradi.",
              detail:
                "MongoDB bu buyruqda atomik operatorlarni ($set va h.k.) qabul qilmaydi — butun hujjat almashtiriladi. Diqqat: replaceOne update middleware'ini ishga tushirmaydi, buning o'rniga alohida pre('replaceOne') / post('replaceOne') mavjud.",
              returns: "Query — UpdateResult bilan bajariladi.",
              example: {
                language: "javascript",
                code: `const natija = await Odam.replaceOne({ _id: 24601 }, { ism: 'Jan Valjan' });`,
              },
              hasFullDoc: true,
            },
            {
              id: "q-deleteone",
              name: "deleteOne",
              signature: "Model.deleteOne([filter], [options])",
              summary: "Filtrga mos birinchi hujjatni o'chiradi.",
              detail:
                "single flagidan qat'i nazar, faqat bitta hujjat o'chiriladi. options.requireFilter: true bo'lsa, bo'sh filtr bilan chaqirish xato tashlaydi.",
              returns: "Query — DeleteResult (acknowledged, deletedCount) bilan bajariladi.",
              example: {
                language: "javascript",
                code: `const natija = await Personaj.deleteOne({ ism: 'Ned Stark' });
natija.deletedCount; // 1 yoki 0`,
              },
              hasFullDoc: true,
            },
            {
              id: "q-deletemany",
              name: "deleteMany",
              signature: "Model.deleteMany([filter], [options])",
              summary: "Filtrga mos BARCHA hujjatlarni o'chiradi.",
              detail:
                "deleteOne'dan farqi — kolleksiyadagi mos keluvchi barcha hujjatlar o'chiriladi, faqat bittasi emas.",
              returns: "Query — DeleteResult (deletedCount — nechta hujjat o'chirilgani) bilan bajariladi.",
              example: {
                language: "javascript",
                code: `const natija = await Personaj.deleteMany({ yosh: { $gte: 18 } });
natija.deletedCount;`,
              },
              hasFullDoc: true,
            },
            {
              id: "q-countdocuments",
              name: "countDocuments",
              signature: "Model.countDocuments([filter], [options])",
              summary: "Filtrga mos hujjatlar sonini hisoblaydi — bo'sh filtr bilan ham to'liq skanerlaydi.",
              detail:
                "count()ning zamonaviy o'rnini bosuvchi funksiyasi. count()dan farqli o'laroq $where, $near va $nearSphere operatorlarini to'liq qo'llab-quvvatlamaydi — ularning o'rniga $expr yoki $geoWithin ishlatiladi.",
              returns: "Query — mos hujjatlar soni (number) bilan bajariladi.",
              example: {
                language: "javascript",
                code: `const soni = await Mahsulot.countDocuments({ rang: 'qora' });`,
              },
              hasFullDoc: true,
            },
            {
              id: "q-estimateddocumentcount",
              name: "estimatedDocumentCount",
              signature: "Model.estimatedDocumentCount([options])",
              summary: "Kolleksiya metama'lumotlariga asoslangan tezkor, taxminiy hujjatlar soni.",
              detail:
                "Filtr qabul qilmaydi — Model.find({...}).estimatedDocumentCount() aslida Model.find().estimatedDocumentCount() bilan bir xil natija beradi. Katta kolleksiyalarda countDocuments()ga qaraganda ancha tezroq ishlaydi, chunki to'liq skanerlash o'rniga metama'lumotdan foydalanadi.",
              returns: "Query — taxminiy son (number) bilan bajariladi.",
              example: {
                language: "javascript",
                code: `const taxminiySon = await Mahsulot.find().estimatedDocumentCount();`,
              },
              hasFullDoc: true,
            },
            {
              id: "q-distinct",
              name: "distinct",
              signature: "Model.distinct(field, [filter], [options])",
              summary: "Berilgan maydon bo'yicha barcha noyob (takrorlanmas) qiymatlarni qaytaradi.",
              detail:
                "Qiziq jihati: rasmiy hujjatga ko'ra distinct() aslida hech qanday middleware'ni ishga tushirmaydi, garchi u \"query middleware\" ro'yxatida ko'rsatilgan bo'lsa ham — shuning uchun unga pre/post hook qo'shsangiz ham, u chaqirilmasligi mumkinligini yodda tuting.",
              returns: "Query — noyob qiymatlar massivi bilan bajariladi.",
              example: {
                language: "javascript",
                code: `const shaharlar = await Foydalanuvchi.distinct('shahar');`,
              },
              hasFullDoc: true,
            },
            {
              id: "q-validate",
              name: "validate",
              signature: "Query#validate (update validators)",
              summary: "Yangilash (update) operatsiyalari uchun sxema validatorlarini ishga tushirish.",
              detail:
                "Bu alohida Query.prototype metodi emas — balki updateOne/findOneAndUpdate kabi so'rovlarga { runValidators: true } optioni berilganda ishga tushadigan \"update validators\" mexanizmi. Batafsil ma'lumot Mongoose'ning validatsiya bo'limida (validation.html#update-validators) keltirilgan.",
              hasFullDoc: false,
            },
          ],
        },
      ],
    },
    {
      id: "aggregate-middleware-methods",
      heading: "Aggregate middleware",
      blocks: [
        {
          type: "paragraph",
          text: "Bu turda bitta metod bor — aggregate(). U Model.aggregate() chaqirilib, natijada .exec() ishga tushganda faollashadi. this — Mongoose'ning Aggregate obyekti bo'lib, this.pipeline() orqali MongoDB'ga yuboriladigan bosqichlar massiviga bevosita kirish mumkin.",
        },
        {
          type: "methodGroup",
          methods: [
            {
              id: "agg-aggregate",
              name: "aggregate",
              signature: "Model.aggregate(pipeline)",
              summary: "Aggregatsiya so'rovlari uchun hook — pipeline bosqichlarini dasturiy ravishda o'zgartirish imkonini beradi.",
              detail:
                "To'liq amaliy misol va kod pastroqdagi \"Aggregatsiya hook'lari\" bo'limida keltirilgan — u yerda soft-delete qilingan hujjatlarni barcha aggregate so'rovlaridan avtomatik chetlashtirish namunasi ko'rsatilgan.",
              hasFullDoc: false,
            },
          ],
        },
      ],
    },
    {
      id: "model-middleware-methods",
      heading: "Model middleware",
      blocks: [
        {
          type: "paragraph",
          text: "Model middleware — Model klassining statik funksiyalariga ulanadi, this esa modelning o'zini anglatadi. Bu yerga 3 ta metod kiradi. Ularning to'liq API tafsilotlari (parametrlar, kod misollari) keyingi yangilanishlarda alohida qo'shiladi.",
        },
        {
          type: "methodGroup",
          methods: [
            {
              id: "model-insertmany",
              name: "insertMany",
              signature: "Model.insertMany(docs, [options])",
              summary: "Bir nechta hujjatni bitta buyruq bilan bazaga qo'shadi.",
              hasFullDoc: false,
            },
            {
              id: "model-bulkwrite",
              name: "bulkWrite",
              signature: "Model.bulkWrite(operations, [options])",
              summary: "Insert, update, delete kabi bir nechta amalni bitta so'rovda, bulk tarzda bajaradi.",
              hasFullDoc: false,
            },
            {
              id: "model-createcollection",
              name: "createCollection",
              signature: "Model.createCollection([options])",
              summary: "MongoDB'da modelga mos kolleksiyani (agar mavjud bo'lmasa) yaratadi.",
              hasFullDoc: false,
            },
          ],
        },
      ],
    },
    {
      id: "pre",
      heading: "Pre middleware",
      blocks: [
        {
          type: "paragraph",
          text: "Pre middleware'lar ro'yxatdan o'tkazilgan tartibda, biri tugagach ikkinchisi ishga tushadigan tarzda bajariladi. Ular sinxron funksiya, Promise qaytaruvchi funksiya yoki async funksiya bo'lishi mumkin.",
        },
        {
          type: "code",
          example: {
            caption: "Uchta xil pre('save') hook varianti",
            language: "javascript",
            code: `const schema = new mongoose.Schema({ /* ... */ });

// 1) Oddiy sinxron pre hook
schema.pre('save', function () {
  console.log('Hujjat saqlanishidan oldin ishga tushdi');
});

// 2) Promise qaytaruvchi pre hook — Mongoose uni kutib turadi
schema.pre('save', function () {
  return tekshirish().then(() => qoshimchaIsh());
});

// 3) async/await bilan yozilgan pre hook
schema.pre('save', async function () {
  await tekshirish();
  await qoshimchaIsh();
  // Shu qatorgacha kutib turiladi, keyin navbatdagi middleware ishga tushadi
});`,
          },
        },
        {
          type: "list",
          items: [
            "Murakkab validatsiya qoidalarini tekshirish",
            "Bog'liq hujjatlarni o'chirish (masalan, foydalanuvchi o'chirilsa, uning barcha postlari ham o'chiriladi)",
            "Asinxron manbadan olingan standart (default) qiymatlarni belgilash",
            "Boshqa hujjatlardagi normalizatsiya qilingan ma'lumotni yangilash",
            "O'zgarishlar tarixini (audit log) alohida saqlash",
          ],
        },
      ],
    },
    {
      id: "pre-error",
      heading: "Pre hook'da xatolik yuzaga kelsa",
      blocks: [
        {
          type: "paragraph",
          text: "Agar biror pre hook xatolik bersa, Mongoose undan keyingi middleware'larni ham, asosiy funksiyaning o'zini ham bajarmaydi — xatolik to'g'ridan-to'g'ri chaqiruvchi kodga (caller) uzatiladi.",
        },
        {
          type: "code",
          example: {
            caption: "Xatoni uch xil usulda bildirish",
            language: "javascript",
            code: `schema.pre('save', function () {
  throw new Error("Nimadir noto'g'ri ketdi");
});

// yoki Promise'ni rad etish orqali
schema.pre('save', function () {
  return Promise.reject(new Error("Nimadir noto'g'ri ketdi"));
});

// yoki async funksiya ichida
schema.pre('save', async function () {
  await Promise.resolve();
  throw new Error("Nimadir noto'g'ri ketdi");
});

// ... keyinroq
try {
  await hujjat.save();
} catch (err) {
  console.log(err.message); // "Nimadir noto'g'ri ketdi"
  // Diqqat: o'zgarishlar MongoDB'ga yozilmaydi
}`,
          },
        },
      ],
    },
    {
      id: "post",
      heading: "Post middleware",
      blocks: [
        {
          type: "paragraph",
          text: "Post middleware'lar asosiy funksiya va uning barcha pre hook'lari muvaffaqiyatli tugagandan KEYIN ishga tushadi. Ularga birinchi argument sifatida natija (masalan, saqlangan yoki topilgan hujjat) uzatiladi.",
        },
        {
          type: "code",
          example: {
            language: "javascript",
            code: `schema.post('save', function (doc) {
  console.log(doc._id + ' muvaffaqiyatli saqlandi');
});

schema.post('deleteOne', function (doc) {
  console.log(doc._id + " o'chirildi");
});`,
          },
        },
      ],
    },
    {
      id: "post-async",
      heading: "Asinxron post hook'lar",
      blocks: [
        {
          type: "paragraph",
          text: "Agar post hook funksiyasi kamida 2 ta parametr qabul qilsa, Mongoose ikkinchi parametrni next() funksiyasi deb hisoblaydi — navbatdagi middleware'ni ishga tushirish uchun uni albatta chaqirish kerak bo'ladi.",
        },
        {
          type: "code",
          example: {
            caption: "next() bilan zanjirlangan ikkita post hook",
            language: "javascript",
            code: `schema.post('save', function (doc, next) {
  setTimeout(() => {
    console.log('birinchi post hook');
    next(); // navbatdagisini ishga tushiradi
  }, 10);
});

schema.post('save', function (doc, next) {
  console.log('ikkinchi post hook');
  next();
});`,
          },
        },
        {
          type: "paragraph",
          text: "Agar async funksiya 2 tadan kam parametr qabul qilsa, next()ni chaqirish shart emas — Mongoose uning Promise'i tugashini o'zi kutadi:",
        },
        {
          type: "code",
          example: {
            language: "javascript",
            code: `schema.post('save', async function (doc) {
  await qandaydirIsh();
  // faqat 1 ta parametr bor, shuning uchun next() shart emas
});`,
          },
        },
      ],
    },
    {
      id: "compile",
      heading: "Middleware'ni modelni compile qilishdan OLDIN belgilang",
      blocks: [
        {
          type: "paragraph",
          text: "Bu — eng ko'p uchraydigan xatolardan biri. mongoose.model() chaqirilgandan KEYIN qo'shilgan pre()/post() hook'lar umuman ishlamaydi.",
        },
        {
          type: "code",
          example: {
            caption: "Noto'g'ri va to'g'ri tartib",
            language: "javascript",
            code: `// ❌ NOTO'G'RI
const schema = new mongoose.Schema({ name: String });
const User = mongoose.model('User', schema); // model bu yerda compile bo'ldi

schema.pre('save', () => console.log('Bu hech qachon chiqmaydi'));

// ✅ TO'G'RI
const schema2 = new mongoose.Schema({ name: String });
schema2.pre('save', () => console.log('Bu chiqadi!'));
const User2 = mongoose.model('User2', schema2); // avval hook qo'shildi, keyin compile qilindi`,
          },
        },
        {
          type: "note",
          variant: "warning",
          text: "Shu sababli sxema va uni ishlatuvchi model bir xil faylda eksport qilinsa, ehtiyot bo'ling: mongoose.model() chaqirilgan zahoti sxema \"yopiladi\". Global plaginlarni ham shu fayl require() qilinishidan oldin qo'shish kerak.",
        },
      ],
    },
    {
      id: "order",
      heading: "Save va Validate hook'larining ishlash tartibi",
      blocks: [
        {
          type: "paragraph",
          text: "save() funksiyasi ichida Mongoose avtomatik ravishda validate()'ni ham chaqiradi. Shu sababli barcha pre('validate') va post('validate') hook'lari, pre('save') hook'laridan OLDIN ishga tushadi.",
        },
        {
          type: "code",
          example: {
            language: "javascript",
            code: `schema.pre('validate', () => console.log('1-chi bo\\'lib chiqadi'));
schema.post('validate', () => console.log('2-chi bo\\'lib chiqadi'));
schema.pre('save', () => console.log('3-chi bo\\'lib chiqadi'));
schema.post('save', () => console.log('4-chi bo\\'lib chiqadi'));

await hujjat.save();
// Konsolda ketma-ketlik aynan shu tartibda chiqadi: 1, 2, 3, 4`,
          },
        },
      ],
    },
    {
      id: "params",
      heading: "Middleware ichida parametrlarga kirish",
      blocks: [
        {
          type: "paragraph",
          text: "Query middleware ichida so'rov haqidagi ma'lumotga this orqali kirish tavsiya etiladi — u Query obyektining o'zi:",
        },
        {
          type: "code",
          example: {
            language: "javascript",
            code: `userSchema.pre('findOneAndUpdate', function () {
  console.log(this.getFilter()); // { name: 'Aziz' }
  console.log(this.getUpdate());  // { $set: { age: 30 } }
});

await User.findOneAndUpdate({ name: 'Aziz' }, { $set: { age: 30 } });`,
          },
        },
        {
          type: "paragraph",
          text: "save() uchun esa Mongoose birinchi argument sifatida save()ga uzatilgan optionlarni to'g'ridan-to'g'ri pre('save') funksiyasiga beradi — chunki bu optionlar hujjatning o'zida saqlanmaydi:",
        },
        {
          type: "code",
          example: {
            language: "javascript",
            code: `userSchema.pre('save', function (options) {
  console.log(options.validateModifiedOnly); // true
});

await user.save({ validateModifiedOnly: true });`,
          },
        },
      ],
    },
    {
      id: "naming",
      heading: "Nomlanish to'qnashuvlari: deleteOne va validate",
      blocks: [
        {
          type: "paragraph",
          text: "deleteOne uchun Mongoose'da ham document, ham query middleware mavjud, lekin standart holatda faqat query middleware ro'yxatdan o'tadi:",
        },
        {
          type: "code",
          example: {
            language: "javascript",
            code: `schema.pre('deleteOne', function () {
  console.log("O'chirilyapti!");
});

await hujjat.deleteOne();   // Hech narsa chop etilmaydi (legacy sabablarga ko'ra)
await Model.deleteOne({});  // "O'chirilyapti!" chop etiladi`,
          },
        },
        {
          type: "paragraph",
          text: "Buni o'zgartirish uchun ikkinchi argument sifatida { document, query } obyektini bering — ikkalasini ham aniq ko'rsatish shart:",
        },
        {
          type: "code",
          example: {
            language: "javascript",
            code: `schema.pre('deleteOne', { document: true, query: false }, function () {
  console.log("Faqat hujjat middleware'i");
});

schema.pre('deleteOne', { document: false, query: true }, function () {
  console.log("Faqat query middleware'i");
});`,
          },
        },
        {
          type: "paragraph",
          text: "validate() esa buning aksi — standart holatda Document middleware sifatida ishlaydi:",
        },
        {
          type: "code",
          example: {
            language: "javascript",
            code: `schema.pre('validate', function () {
  console.log('Hujjat validatsiyasi');
});
schema.pre('validate', { query: true, document: false }, function () {
  console.log('Query validatsiyasi');
});

await hujjat.validate();        // "Hujjat validatsiyasi"
await Model.find().validate();  // "Query validatsiyasi"`,
          },
        },
      ],
    },
    {
      id: "find-update",
      heading: "findOneAndUpdate() va query middleware haqida muhim eslatma",
      blocks: [
        {
          type: "paragraph",
          text: "save()ga tegishli pre/post hook'lar update(), findOneAndUpdate() kabi funksiyalarda ISHLAMAYDI — bular uchun Mongoose alohida, mustaqil hook'lar taqdim etadi.",
        },
        {
          type: "code",
          example: {
            caption: "find() so'rovi qancha vaqt olganini o'lchash",
            language: "javascript",
            code: `schema.pre('find', function () {
  this.start = Date.now();
});

schema.post('find', function (result) {
  console.log('find() ' + result.length + " ta hujjat qaytardi");
  console.log((Date.now() - this.start) + ' ms sarflandi');
});`,
          },
        },
        {
          type: "paragraph",
          text: "Query middleware'da this — Query obyekti, shuning uchun yangilanayotgan hujjatning o'ziga to'g'ridan-to'g'ri kira olmaysiz. Masalan, updateOne uchun updatedAt maydonini avtomatik qo'shish mumkin:",
        },
        {
          type: "code",
          example: {
            language: "javascript",
            code: `schema.pre('updateOne', function () {
  this.set({ updatedAt: new Date() });
});`,
          },
        },
        {
          type: "paragraph",
          text: "Agar yangilanayotgan hujjatning o'zini ko'rish zarur bo'lsa, uni alohida so'rov orqali qo'lda olib kelish kerak:",
        },
        {
          type: "code",
          example: {
            language: "javascript",
            code: `schema.pre('findOneAndUpdate', async function () {
  const eskiHujjat = await this.model.findOne(this.getQuery());
  console.log(eskiHujjat); // findOneAndUpdate o'zgartirmoqchi bo'lgan hujjat
});`,
          },
        },
        {
          type: "paragraph",
          text: "Agar updateOne document middleware sifatida ({ document: true, query: false }) belgilansa, this — endi hujjatning o'zi bo'ladi:",
        },
        {
          type: "code",
          example: {
            language: "javascript",
            code: `schema.pre('updateOne', { document: true, query: false }, function () {
  console.log('Yangilanmoqda: ' + this.name);
});

const hujjat = new Model();
await hujjat.updateOne({ $set: { name: 'test' } }); // "Yangilanmoqda: ..." chop etiladi

await Model.updateOne({}, { $set: { name: 'test' } }); // Hech narsa chop etilmaydi`,
          },
        },
      ],
    },
    {
      id: "error-mw",
      heading: "Xatoliklarni qayta ishlovchi maxsus middleware",
      blocks: [
        {
          type: "paragraph",
          text: "Odatda biror middleware xatolik bersa, keyingi barcha middleware'lar to'xtaydi. Ammo Mongoose'da alohida tur mavjud — error handling middleware — u faqat xatolik yuz berganda ishga tushadi va xato xabarini o'qishga qulayroq shaklga keltirishga xizmat qiladi.",
        },
        {
          type: "paragraph",
          text: "Bu middleware'ni ajratish oson: u qo'shimcha bitta parametr — yuz bergan xatoning o'zini — birinchi argument sifatida qabul qiladi.",
        },
        {
          type: "code",
          example: {
            caption: "Takroriy kalit xatosini (E11000) o'qishli xabarga aylantirish",
            language: "javascript",
            code: `const schema = new mongoose.Schema({
  name: {
    type: String,
    unique: true // Takrorlansa, MongoServerError (kod 11000) qaytaradi
  }
});

// Bu funksiya 3 ta parametrni SHART qabul qiladi: xato, hujjat, next
schema.post('save', function (error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error('Bunday nom allaqachon mavjud'));
  } else {
    next();
  }
});

await Foydalanuvchi.create([{ name: 'Ali' }, { name: 'Ali' }]);
// -> post('save') error handler ishga tushadi`,
          },
        },
        {
          type: "paragraph",
          text: "Xuddi shu tarzda query middleware uchun ham ishlaydi — masalan, updateOne'dagi takroriy kalit xatosini ushlab olish:",
        },
        {
          type: "code",
          example: {
            language: "javascript",
            code: `schema.post('updateOne', function (error, res, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    throw new Error('Takroriy kalit xatosi yuz berdi');
  } else {
    next();
  }
});`,
          },
        },
        {
          type: "note",
          variant: "warning",
          text: "Xatoni qayta ishlovchi middleware xatoni faqat o'zgartira oladi, lekin uni butunlay yo'q qila olmaydi — funksiya chaqiruvi baribir xatolik bilan yakunlanadi.",
        },
      ],
    },
    {
      id: "aggregate",
      heading: "Aggregatsiya hook'lari",
      blocks: [
        {
          type: "paragraph",
          text: "Model.aggregate() funksiyasi uchun ham hook belgilash mumkin. Bunda this — Mongoose'ning Aggregate obyekti.",
        },
        {
          type: "paragraph",
          text: "Amaliy misol: \"soft delete\" (hujjatni butunlay o'chirmasdan, isDeleted: true belgisini qo'yish) qo'llanilganda, har bir aggregate so'rovi avtomatik ravishda faqat o'chirilmagan mijozlarni ko'rishi uchun pipeline boshiga $match bosqichini qo'shish mumkin:",
        },
        {
          type: "code",
          example: {
            language: "javascript",
            code: `customerSchema.pre('aggregate', function () {
  // Har bir pipeline'ning boshiga $match bosqichini qo'shadi
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
});`,
          },
        },
        {
          type: "paragraph",
          text: "pipeline() funksiyasi Mongoose MongoDB serveriga jo'natadigan aggregation bosqichlari massiviga bevosita kirish imkonini beradi — shu orqali boshiga yangi bosqich qo'shish mumkin bo'ladi.",
        },
      ],
    },
    {
      id: "sync",
      heading: "Sinxron hook'lar: init",
      blocks: [
        {
          type: "paragraph",
          text: "Deyarli barcha hook'lar Promise qaytarishi mumkin, biroq bitta istisno bor — init hook'lari, chunki init() funksiyasining o'zi sinxron ishlaydi (u MongoDB'dan qaytgan xom obyektni to'liq Mongoose hujjatiga aylantiradi).",
        },
        {
          type: "code",
          example: {
            language: "javascript",
            code: `schema.pre('init', (pojo) => {
  console.log(pojo.constructor.name); // 'Object' — hali init bo'lmagan holat
});

schema.post('init', (doc) => {
  doc.loadedAt = new Date(); // endi to'liq Mongoose hujjati
});`,
          },
        },
        {
          type: "note",
          variant: "warning",
          text: "init hook'ida xato bildirish uchun faqat SINXRON throw ishlatilishi kerak — Promise.reject() yoki async funksiya orqali qaytarilgan xato e'tiborga olinmaydi.",
        },
      ],
    },
    {
      id: "skip",
      heading: "Middleware'ni o'tkazib yuborish",
      blocks: [
        {
          type: "paragraph",
          text: "Ba'zan unumdorlik muhim bo'lgan amallarda yoki vaqtincha barcha maxsus middleware'larni chetlab o'tish kerak bo'ladi. Buning uchun middleware optioni ishlatiladi.",
        },
        {
          type: "code",
          example: {
            caption: "Barcha yoki faqat pre/post middleware'larni o'chirish",
            language: "javascript",
            code: `// Barcha foydalanuvchi middleware'larini o'tkazib yuborish
await hujjat.save({ middleware: false });
await Model.find({}, null, { middleware: false });
await Model.updateOne({}, { name: 'test' }, { middleware: false });

// Faqat pre yoki faqat post hook'larni o'tkazib yuborish
await hujjat.save({ middleware: { pre: false } });
await Model.find({}, null, { middleware: { post: false } });`,
          },
        },
        {
          type: "note",
          variant: "info",
          text: "Diqqat: bu faqat schema.pre() / schema.post() orqali qo'shilgan FOYDALANUVCHI middleware'lariga tegishli. Mongoose'ning ichki mexanizmlari (masalan, timestamps yoki asosiy validatsiya) middleware: false bo'lsa ham har doim ishlayveradi.",
        },
      ],
    },
    {
      id: "mongodb-bog",
      heading: "Mongoose va MongoDB: bog'liqlik haqida",
      blocks: [
        {
          type: "paragraph",
          text: "Mongoose mustaqil ma'lumotlar bazasi emas — u MongoDB ustida ishlaydigan qatlam (ODM). Yuqorida ko'rilgan barcha middleware, sxema va validatsiya imkoniyatlari faqat MongoDB kolleksiyalari bilan ishlaganda ma'no kasb etadi, chunki Mongoose orqada barcha amallarni MongoDB'ning rasmiy Node.js drayveri buyruqlariga (insertOne, updateOne, aggregate va h.k.) aylantirib yuboradi.",
        },
        {
          type: "note",
          variant: "success",
          text: "Xulosa: agar loyihangizda MongoDB ishlatilayotgan bo'lsa, Mongoose to'g'ri tanlov — u sizga tuzilma, ichki validatsiya va middleware orqali qo'shimcha nazorat beradi. Relatsion (PostgreSQL, MySQL kabi) bazalar bilan Mongoose ishlamaydi — u faqat MongoDB uchun mo'ljallangan.",
        },
      ],
    },
  ],
  quiz: [
    {
      id: "q1",
      question: "Mongoose'da nechta asosiy middleware turi mavjud?",
      options: ["2 ta", "3 ta", "4 ta", "5 ta"],
      correctIndex: 2,
      explanation:
        "Mongoose'da 4 turi mavjud: document, query, aggregate va model middleware.",
    },
    {
      id: "q2",
      question: "schema.pre('save', fn) hook'i qachon ishlamay qoladi?",
      options: [
        "Agar fn async funksiya bo'lsa",
        "Agar u mongoose.model() chaqirilgandan KEYIN qo'shilsa",
        "Agar hujjatda validatsiya xatosi bo'lsa",
        "Agar fn Promise qaytarsa",
      ],
      correctIndex: 1,
      explanation:
        "Middleware faqat model compile qilinishidan (mongoose.model() chaqirilishidan) OLDIN qo'shilgan bo'lsa ishlaydi.",
    },
    {
      id: "q3",
      question: "hujjat.save() chaqirilganda hook'lar qaysi tartibda ishga tushadi?",
      options: [
        "pre save → post save → pre validate → post validate",
        "pre validate → post validate → pre save → post save",
        "post validate → pre validate → post save → pre save",
        "Tartib mavjud emas, tasodifiy ishga tushadi",
      ],
      correctIndex: 1,
      explanation:
        "save() ichida avtomatik validate() chaqiriladi, shu sababli validate hook'lari save hook'laridan oldin ishga tushadi.",
    },
    {
      id: "q4",
      question:
        "Faqat schema.pre('deleteOne', fn) (standart, query middleware sifatida) ro'yxatdan o'tkazilgan bo'lsa, hujjat.deleteOne() chaqirilganda nima sodir bo'ladi?",
      options: [
        "Document middleware ishga tushadi",
        "Query middleware ishga tushadi",
        "Hech qanday deleteOne middleware ishlamaydi",
        "Ham document, ham query middleware ishga tushadi",
      ],
      correctIndex: 2,
      explanation:
        "doc.deleteOne() legacy sabablarga ko'ra standart (query) deleteOne middleware'ni ishga tushirmaydi — Model.deleteOne() esa ishga tushiradi.",
    },
    {
      id: "q5",
      question:
        "Post hook funksiyasi ikkinchi parametr (masalan, next) qabul qilsa, nima talab qilinadi?",
      options: [
        "next() avtomatik chaqiriladi",
        "Dasturchi next()ni albatta o'zi chaqirishi kerak",
        "next parametri e'tiborga olinmaydi",
        "Bu holatda xatolik yuz beradi",
      ],
      correctIndex: 1,
      explanation:
        "2 yoki undan ortiq parametr qabul qiluvchi post hook asinxron deb hisoblanadi, shuning uchun navbatdagi middleware ishga tushishi uchun next() albatta chaqirilishi shart.",
    },
    {
      id: "q6",
      question:
        "Error handling middleware oddiy post middleware'dan nimasi bilan farqlanadi?",
      options: [
        "U schema.post() emas, alohida usul orqali qo'shiladi",
        "U qo'shimcha, birinchi argument sifatida yuz bergan xatoni qabul qiladi",
        "U faqat aggregate() uchun ishlaydi",
        "U hech qachon xatoni o'zgartira olmaydi",
      ],
      correctIndex: 1,
      explanation:
        "Error handling middleware qo'shimcha parametr — yuz bergan xatoning o'zini — birinchi argument sifatida oladi, shu bilan oddiy post hook'lardan ajralib turadi.",
    },
    {
      id: "q7",
      question: "pre('findOneAndUpdate') query middleware ichida this nimani anglatadi?",
      options: [
        "Yangilanayotgan hujjatning o'zi",
        "Model klassi",
        "Query obyekti",
        "undefined",
      ],
      correctIndex: 2,
      explanation:
        "Query middleware'da this har doim Query obyektiga ishora qiladi — yangilanayotgan hujjatning o'ziga to'g'ridan-to'g'ri kirish uchun alohida so'rov yuborish kerak.",
    },
    {
      id: "q8",
      question: "init hook'ida xato qanday to'g'ri bildiriladi?",
      options: [
        "Sinxron throw yordamida",
        "Promise.reject() qaytarib",
        "async funksiyada await bilan xato tashlab",
        "next(xato) chaqirib",
      ],
      correctIndex: 0,
      explanation:
        "init() funksiyasi sinxron ishlagani uchun faqat sinxron throw orqali tashlangan xatolar ushlanadi; Promise asosidagi xatolar e'tiborga olinmaydi.",
    },
    {
      id: "q9",
      question: "middleware: false optioni aniq nimani anglatadi?",
      options: [
        "Barcha validatsiyani butunlay o'chiradi",
        "Faqat schema.pre()/post() orqali qo'shilgan foydalanuvchi middleware'larini o'tkazib yuboradi",
        "MongoDB'ga ulanishni to'xtatadi",
        "Faqat post hook'larni butunlay o'chiradi",
      ],
      correctIndex: 1,
      explanation:
        "middleware: false faqat foydalanuvchi qo'shgan pre/post hook'larni o'tkazib yuboradi; Mongoose'ning ichki mexanizmlari (masalan, timestamps) baribir ishlayveradi.",
    },
    {
      id: "q10",
      question: "Mongoose asosan qaysi ma'lumotlar bazasi bilan ishlashga mo'ljallangan?",
      options: [
        "Har qanday relatsion baza bilan",
        "Faqat MongoDB bilan",
        "MySQL va PostgreSQL bilan",
        "Redis bilan",
      ],
      correctIndex: 1,
      explanation:
        "Mongoose — MongoDB uchun maxsus yaratilgan ODM kutubxonasi bo'lib, faqat MongoDB kolleksiyalari bilan ishlashga mo'ljallangan.",
    },
  ],
};
