import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

// Mavzu doim qurilma (OS) sozlamasidan boshlanadi (index.html'dagi inline
// skript orqali <html> ga "dark" klassi refresh bo'lishidan oldin qo'yiladi).
// Tugma orqali almashtirish faqat joriy sessiya davomida amal qiladi —
// hech narsa saqlanmaydi, shuning uchun sahifa yangilanganda (refresh)
// mavzu yana qurilma holatiga qaytadi.
export function ThemeToggle() {
  const [isDark, setIsDark] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark"),
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark((d) => !d)}
      className="flex items-center justify-center w-9 h-9 text-ink hover:bg-surface-1 cursor-pointer transition-colors"
      aria-label={isDark ? "Yorug' rejimga o'tish" : "Qorong'i rejimga o'tish"}
      title={isDark ? "Yorug' rejim" : "Qorong'i rejim"}
    >
      {isDark ? <Sun size={18} strokeWidth={1.75} /> : <Moon size={18} strokeWidth={1.75} />}
    </button>
  );
}
