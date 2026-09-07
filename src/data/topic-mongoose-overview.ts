import { BookOpen } from "lucide-react";
import type { Topic } from "./types";

export const mongooseOverviewTopic: Topic = {
  id: "umumiy",
  title: "Umumiy ma'lumot",
  shortDesc:
    "Mongoose nima, u nega kerak va MongoDB bilan qanday ishlashini boshlang'ich darajada tushunib oling.",
  icon: BookOpen,
  readTime: "4 daqiqa",
  status: "ready",
  sections: [
    {
      id: "nima",
      heading: "Mongoose nima?",
      blocks: [
        {
          type: "paragraph",
          text: "Mongoose — Node.js muhitida MongoDB bilan ishlash uchun yaratilgan ODM (Object Data Modeling) kutubxonasi. U MongoDB'ning rasmiy drayveri ustiga qurilgan bo'lib, ma'lumotlarni sxema (schema) orqali tavsiflash, ularni avtomatik tekshirish (validatsiya), turlarga moslashtirish (type casting) va o'qilishi qulay so'rovlar yozish imkonini beradi.",
        },
        {
          type: "note",
          variant: "info",
          text: "Mongoose faqat MongoDB bilan ishlaydi. Bu uning ODM ekanligining aynan o'zi: u document-based MongoDB kolleksiyalarini JavaScript obyektlariga (model va document'larga) moslashtiradi. Agar loyihada PostgreSQL yoki MySQL kabi relatsion baza ishlatilsa, Mongoose emas, Sequelize yoki Prisma kabi ORM'lardan foydalaniladi.",
        },
      ],
    },
    {
      id: "nega",
      heading: "Nega aynan Mongoose?",
      blocks: [
        {
          type: "list",
          items: [
            "Sxema asosida modellashtirish — har bir maydonning turi, standart qiymati va cheklovlari oldindan aniq belgilanadi",
            "Ichki validatsiya — noto'g'ri ma'lumot bazaga yozilishidan oldin ushlab qolinadi",
            "Middleware (hook) tizimi — save, update, delete kabi amallardan oldin yoki keyin o'z mantig'ingizni qo'shish imkoniyati",
            "Populate — boshqa kolleksiyalardagi hujjatlarga JOIN'ga o'xshash tarzda bog'lanish",
            "O'qilishi qulay, zanjirlanadigan (chainable) query builder",
          ],
        },
      ],
    },
    {
      id: "sozlash",
      heading: "Boshlang'ich sozlash",
      blocks: [
        {
          type: "paragraph",
          text: "Quyida MongoDB'ga ulanish, sxema va model yaratish hamda oddiy CRUD amallarining minimal namunasi keltirilgan:",
        },
        {
          type: "code",
          example: {
            language: "javascript",
            code: `import mongoose from 'mongoose';

// MongoDB bazasiga ulanish
await mongoose.connect('mongodb://127.0.0.1:27017/mydb');

// Sxema — hujjat qanday ko'rinishda bo'lishini belgilaydi
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, default: 18 }
}, { timestamps: true });

// Model — sxema asosida yaratilgan "klass", bazaga shu orqali murojaat qilinadi
const User = mongoose.model('User', userSchema);

// Yangi hujjat yaratish
const user = await User.create({ name: 'Aziz', email: 'aziz@mail.com' });

// Hujjatlarni qidirish
const users = await User.find({ age: { $gte: 18 } });`,
          },
        },
      ],
    },
    {
      id: "keyingi",
      heading: "Keyingi qadam",
      blocks: [
        {
          type: "note",
          variant: "success",
          text: "Mongoose'ning eng kuchli imkoniyatlaridan biri — middleware (hook) tizimi. Chap paneldagi Middleware bo'limida bu mavzu to'liq yoritilgan: 4 xil middleware turi (document, query, aggregate, model) va har biriga tegishli metodlar amaliy kod misollari bilan. Pre/post hook'larning umumiy mexanikasi keyingi yangilanishlarda alohida qo'shiladi.",
        },
      ],
    },
  ],
};
