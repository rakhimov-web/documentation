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
                "Bu — Model.updateOne({ _id: hujjat._id }, update)ga qulay qisqartma. Diqqat: standart holatda updateOne Query middleware sifatida ro'yxatdan o'tadi — ya'ni doc.updateOne() chaqirilsa ham, hook ichida this Query obyekti bo'ladi, hujjatning o'zi emas. Buni document middleware sifatida ushlash uchun schema.pre('updateOne', { document: true, query: false }, fn) shaklida aniq belgilash kerak.",
              params: [
                { name: "update", desc: "Yangilash operatsiyasi (masalan, $set, $inc).", },
                { name: "options", desc: "Query.prototype.setOptions() bilan bir xil optionlar (lean, strict, timestamps va h.k.)." },
              ],
              returns: "Query — natijada UpdateResult (matchedCount, modifiedCount va h.k.) qaytaradi.",
              example: {
                language: "javascript",
                code: `weirdCar.updateOne({ $inc: { wheels: 1 } }, { w: 1 });

// document middleware sifatida ushlash uchun:
schema.pre('updateOne', { document: true, query: false }, function () {
  console.log('Yangilanmoqda: ' + this.name);
});`,
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
                "Diqqat: legacy sabablarga ko'ra doc.deleteOne() chaqirilganda query middleware ishlamaydi (Model.deleteOne() esa ishlaydi). Buni document middleware sifatida ushlash uchun schema.pre('deleteOne', { document: true, query: false }, fn) kabi aniq belgilash kerak.",
              example: {
                language: "javascript",
                code: `schema.pre('deleteOne', function () {
  console.log("O'chirilyapti!");
});

await hujjat.deleteOne();   // Hech narsa chop etilmaydi (legacy sabab)
await Model.deleteOne({});  // "O'chirilyapti!" chop etiladi

// Faqat document middleware sifatida ushlash uchun:
schema.pre('deleteOne', { document: true, query: false }, function () {
  console.log("Faqat hujjat middleware'i ishladi");
});`,
              },
              hasFullDoc: true,
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
                "Model.aggregate() chaqirilib, natijada .exec() ishga tushganda bu hook faollashadi. this — Mongoose'ning Aggregate obyekti bo'lib, this.pipeline() funksiyasi orqali MongoDB'ga yuboriladigan aggregation bosqichlari massiviga bevosita kirish mumkin — shu orqali boshiga (yoki istalgan joyiga) yangi bosqich qo'shsa bo'ladi. Amaliy misol: \"soft delete\" (hujjatni butunlay o'chirmasdan, isDeleted: true belgisini qo'yish) qo'llanilganda, har bir aggregate so'rovi avtomatik ravishda faqat o'chirilmagan hujjatlarni ko'rishi uchun pipeline boshiga $match bosqichini qo'shish mumkin.",
              returns: "Aggregate — .exec() chaqirilganda natijalar massivi (oddiy JS obyektlari, Mongoose hujjatlari emas) bilan bajariladi.",
              example: {
                language: "javascript",
                code: `customerSchema.pre('aggregate', function () {
  // Har bir pipeline'ning boshiga $match bosqichini qo'shadi
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
});

// Endi har qanday aggregate chaqiruvi avtomatik ravishda
// faqat o'chirilmagan mijozlarni hisobga oladi:
const natija = await Customer.aggregate([
  { $group: { _id: '$shahar', soni: { $sum: 1 } } },
]);`,
              },
              hasFullDoc: true,
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
          text: "Model middleware — Model klassining statik funksiyalariga ulanadi, this esa modelning o'zini anglatadi (hujjat emas). Bu turga 3 ta metod kiradi: insertMany, bulkWrite va createCollection.",
        },
        {
          type: "methodGroup",
          methods: [
            {
              id: "model-insertmany",
              name: "insertMany",
              signature: "Model.insertMany(docs, [options])",
              summary:
                "Bir nechta hujjatni validatsiyadan o'tkazib, BITTA buyruq bilan bazaga qo'shadi.",
              detail:
                "create() dan tezroq ishlaydi, chunki har bir hujjat uchun alohida emas, serverga faqat bitta so'rov yuboradi. Mongoose insertMany() chaqirishdan oldin har doim barcha hujjatlarni validatsiya qiladi — agar ulardan bittasida xatolik bo'lsa, options.ordered false qilib berilmagan bo'lsa, HECH BIRI saqlanmaydi. Diqqat: bu funksiya save() hook'larini ishga TUSHIRMAYDI — buning o'rniga alohida insertMany middleware'i mavjud.",
              params: [
                {
                  name: "options.ordered",
                  desc: "true (standart) bo'lsa, birinchi xatoda to'xtaydi. false bo'lsa, saqlanishi mumkin bo'lgan barcha hujjatlarni saqlaydi va xatolarni keyinroq qaytaradi (\"unordered\" insertMany).",
                },
                {
                  name: "options.rawResult",
                  desc: "true bo'lsa, validatsiyadan o'tgan hujjatlar o'rniga MongoDB drayverining xom natijasini qaytaradi.",
                },
                {
                  name: "options.lean",
                  desc: "true bo'lsa, hujjatlarni hidratsiya qilmaydi (cast, validatsiya va standart qiymatlar qo'llanilmaydi) — tezroq, lekin ma'lumot yaxlitligi xavfi bilan.",
                },
                {
                  name: "options.limit",
                  desc: "Mongoose bir vaqtning o'zida parallel qayta ishlaydigan (validatsiya/cast) hujjatlar sonini cheklaydi — bu MongoDB'ga yuboriladigan partiyalar sonini emas, xotira sarfini nazorat qilish uchun foydali.",
                },
                {
                  name: "options.middleware",
                  desc: "false qilib berilsa, foydalanuvchi qo'shgan barcha insertMany hook'lari o'tkazib yuboriladi.",
                },
              ],
              returns:
                "Promise — options.rawResult true bo'lsa MongoDB drayverining xom natijasi bilan, aks holda validatsiyadan o'tgan hujjatlar massivi bilan bajariladi.",
              example: {
                language: "javascript",
                code: `const filmlar = await Film.insertMany([
  { nomi: 'Yulduzli urushlar' },
  { nomi: 'Imperiya qaytishi' },
]);
filmlar[0].nomi; // 'Yulduzli urushlar'

// Faqat MongoDB drayverining xom natijasini olish:
const natija = await Film.insertMany(
  [{ nomi: 'Yulduzli urushlar' }],
  { rawResult: true },
);`,
              },
              hasFullDoc: true,
            },
            {
              id: "model-bulkwrite",
              name: "bulkWrite",
              signature: "Model.bulkWrite(operations, [options])",
              summary:
                "insertOne, updateOne, updateMany, replaceOne, deleteOne va deleteMany amallarini BITTA buyruqda, MongoDB serveriga bitta murojaat bilan bajaradi.",
              detail:
                "create() yoki alohida-alohida chaqirilgan updateOne()/deleteOne()larga qaraganda ancha tezroq, chunki serverga faqat bitta round-trip bo'ladi. Mongoose barcha operatsiyalarni sxemaga mos ravishda cast qiladi — bundan yagona istisno: agar updateOne/updateMany'ning update qismi massiv (pipeline) sifatida berilsa, u cast qilinmaydi. ENG MUHIMI: bulkWrite() HECH QANDAY middleware'ni (na save(), na update()) ishga TUSHIRMAYDI. Agar har bir hujjat uchun save() hook'lari ishlashi kerak bo'lsa, buning o'rniga create() dan foydalaning.",
              params: [
                {
                  name: "operations",
                  desc: "{ insertOne }, { updateOne }, { updateMany }, { deleteOne }, { deleteMany }, { replaceOne } shaklidagi obyektlar massivi.",
                },
                {
                  name: "options.ordered",
                  desc: "true (standart) bo'lsa, amallar ketma-ket bajariladi va birinchi xatoda to'xtaydi. false bo'lsa, parallel bajariladi va barcha amallar tugaguncha davom etadi.",
                },
                {
                  name: "options.skipValidation",
                  desc: "true bo'lsa, bulk yozish amallarida Mongoose sxema validatsiyasi o'tkazib yuboriladi (standart holatda insertOne va replaceOne uchun validatsiya ishlaydi).",
                },
                {
                  name: "options.middleware",
                  desc: "Boshqa metodlardagi kabi — pre/post hook'larni to'liq yoki qisman o'tkazib yuborish imkonini beradi (bu yerda amal qilishi uchun avval alohida bulkWrite hook ro'yxatdan o'tgan bo'lishi kerak).",
                },
              ],
              returns:
                "Promise — bulkWrite() muvaffaqiyatli bo'lsa BulkWriteResult (insertedCount, modifiedCount, deletedCount va h.k.) bilan bajariladi.",
              example: {
                language: "javascript",
                code: `Personaj.bulkWrite([
  {
    insertOne: {
      document: { ism: 'Ned Stark', unvon: 'Shimol qo\\'riqchisi' },
    },
  },
  {
    updateOne: {
      filter: { ism: 'Ned Stark' },
      // Mongoose avtomatik $set qo'shadi
      update: { unvon: 'Qirol qo\\'li' },
    },
  },
  {
    deleteOne: {
      filter: { ism: 'Ned Stark' },
    },
  },
]).then((natija) => {
  console.log(natija.insertedCount, natija.modifiedCount, natija.deletedCount);
});`,
              },
              hasFullDoc: true,
            },
            {
              id: "model-createcollection",
              name: "createCollection",
              signature: "Model.createCollection([options])",
              summary:
                "MongoDB'da modelga mos kolleksiyani (agar u hali mavjud bo'lmasa) aniq (explicit) tarzda yaratadi.",
              detail:
                "Standart holatda, agar sxemada indeks belgilanmagan bo'lsa, Mongoose kolleksiyani birinchi hujjat yaratilgunga qadar yaratmaydi. Bu metod kolleksiyani oldindan, aniq chaqiruv orqali yaratish imkonini beradi. Eslatma: agar sxemangizda unique yoki boshqa indeks bo'lsa, createCollection() ni qo'lda chaqirish shart emas — buning o'rniga Model.init() yetarli. Tranzaksiya boshlashdan oldin kolleksiyani oldindan yaratib qo'yish tavsiya etiladi, chunki MongoDB tranzaksiya ichida yangi kolleksiya yaratishga cheklov qo'yadi.",
              params: [
                {
                  name: "options",
                  desc: "MongoDB drayverining createCollection() buyrug'iga to'g'ridan-to'g'ri uzatiladigan optionlar (masalan, capped, size va h.k.).",
                },
              ],
              returns: "Promise — yaratilgan kolleksiya obyekti bilan bajariladi.",
              example: {
                language: "javascript",
                code: `const userSchema = new mongoose.Schema({ ism: String });
const User = mongoose.model('User', userSchema);

User.createCollection().then(function (kolleksiya) {
  console.log('Kolleksiya yaratildi!');
});`,
              },
              hasFullDoc: true,
            },
          ],
        },
      ],
    },
    {
      id: "yakun",
      heading: "Xulosa",
      blocks: [
        {
          type: "note",
          variant: "success",
          text: "Shu bilan Mongoose middleware tizimining 4 turi va ularning barcha asosiy metodlari ko'rib chiqildi: Document (validate, save, updateOne, deleteOne, init), Query (find, findOne, findOneAndUpdate va h.k.), Aggregate (aggregate) va Model (insertMany, bulkWrite, createCollection). Pre/post hook'larning umumiy mexanikasi, xatoliklarni boshqarish va boshqa chuqurroq mavzular keyingi yangilanishlarda alohida qo'shiladi.",
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
      question: "Document middleware'da this kalit so'zi nimani anglatadi?",
      options: [
        "Query obyektini",
        "Hujjatning o'zini",
        "Modelning statik klassini",
        "Aggregate obyektini",
      ],
      correctIndex: 1,
      explanation:
        "Document middleware hujjat metodlariga (save, validate, updateOne, deleteOne, init) ulanadi va this — hujjatning o'zi bo'ladi. Modelga this.constructor orqali kirish mumkin.",
    },
    {
      id: "q3",
      question: "hujjat.save() chaqirilganda ichki hook'lar qaysi tartibda ishga tushadi?",
      options: [
        "pre save → post save → pre validate → post validate",
        "pre validate → post validate → pre save → post save",
        "post validate → pre validate → post save → pre save",
        "Tartib mavjud emas, tasodifiy ishga tushadi",
      ],
      correctIndex: 1,
      explanation:
        "save() ichida avtomatik validate() ham chaqiriladi, shu sababli validate hook'lari save hook'laridan OLDIN ishga tushadi.",
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
        "document.updateOne() metodini DOCUMENT middleware sifatida (this — hujjatning o'zi bo'lishi uchun) ro'yxatdan o'tkazish uchun nima qilish kerak?",
      options: [
        "Hech narsa, u standart holatda shunday ishlaydi",
        "schema.pre('updateOne', { document: true, query: false }, fn) shaklida aniq belgilash",
        "Faqat async funksiya ishlatish",
        "Buni umuman document middleware sifatida ro'yxatdan o'tkazib bo'lmaydi",
      ],
      correctIndex: 1,
      explanation:
        "Standart holatda updateOne Query middleware sifatida ro'yxatdan o'tadi. Uni document middleware qilish uchun { document: true, query: false } optioni aniq ko'rsatilishi shart.",
    },
    {
      id: "q6",
      question: "Query middleware ichida this odatda nimani anglatadi?",
      options: [
        "Yangilanayotgan yoki qidirilayotgan hujjatning o'zini",
        "Query obyektini",
        "Model klassini",
        "Aggregate obyektini",
      ],
      correctIndex: 1,
      explanation:
        "Query middleware'da this har doim Query obyektiga ishora qiladi — hujjatning o'ziga to'g'ridan-to'g'ri kirib bo'lmaydi, buning uchun alohida so'rov yuborish kerak.",
    },
    {
      id: "q7",
      question:
        "Model.replaceOne() bilan Model.updateOne() o'rtasidagi asosiy farq nimada?",
      options: [
        "replaceOne bir nechta hujjatni, updateOne esa faqat bittasini yangilaydi",
        "replaceOne butun hujjatni almashtiradi, updateOne esa $set kabi atomik operatorlar bilan ishlaydi",
        "Ular butunlay bir xil ishlaydi",
        "updateOne faqat aggregate so'rovlarda ishlatiladi",
      ],
      correctIndex: 1,
      explanation:
        "replaceOne() hujjatni to'liq yangi hujjat bilan almashtiradi (atomik operatorlarsiz), updateOne() esa $set, $inc kabi operatorlar bilan faqat ko'rsatilgan maydonlarni yangilaydi.",
    },
    {
      id: "q8",
      question:
        "Mongoose'ning rasmiy hujjatiga ko'ra, distinct() metodining qiziq jihati nimada?",
      options: [
        "U query middleware ro'yxatida ko'rsatilgan bo'lsa-da, aslida hech qanday middleware'ni ishga tushirmaydi",
        "U faqat aggregate() bilan birga ishlaydi",
        "U hech qachon Promise qaytarmaydi",
        "U faqat Model darajasida emas, faqat Document darajasida ishlaydi",
      ],
      correctIndex: 0,
      explanation:
        "distinct() query middleware turlari orasida sanalgan bo'lsa-da, u hech qanday pre/post hook'ni ishga tushirmaydi — bu Mongoose hujjatida alohida ta'kidlangan nuance.",
    },
    {
      id: "q9",
      question: "Aggregate middleware'da this nimaga ishora qiladi va uni qanday o'zgartirish mumkin?",
      options: [
        "Query obyektiga; this.getFilter() orqali",
        "Aggregate obyektiga; this.pipeline() orqali bosqichlar qo'shish mumkin",
        "Hujjatning o'ziga; this.set() orqali",
        "Modelning o'ziga; this.create() orqali",
      ],
      correctIndex: 1,
      explanation:
        "Aggregate middleware'da this — Mongoose'ning Aggregate obyekti, this.pipeline() esa MongoDB'ga yuboriladigan bosqichlar massiviga bevosita kirish va uni o'zgartirish imkonini beradi (masalan, $match bosqichini qo'shish).",
    },
    {
      id: "q10",
      question:
        "Model middleware turiga oid quyidagi fikrlardan qaysi biri TO'G'RI?",
      options: [
        "insertMany() va bulkWrite() ikkalasi ham save() hook'larini ishga tushiradi",
        "bulkWrite() hech qanday middleware'ni (na save, na update) ishga tushirmaydi",
        "createCollection() har doim majburiy chaqirilishi kerak, aks holda hujjat saqlanmaydi",
        "Model middleware'da this — hujjatning o'zi bo'ladi",
      ],
      correctIndex: 1,
      explanation:
        "bulkWrite() serverga to'g'ridan-to'g'ri buyruq yuboradi va hech qanday save()/update() middleware'ini ishga tushirmaydi. insertMany() esa save() emas, balki o'zining alohida insertMany hook'ini ishga tushiradi. Model middleware'da this — modelning o'zi (statik kontekst).",
    },
  ],
};

