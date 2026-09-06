import { Link } from "react-router-dom";
import { CompassIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-[600px] mx-auto px-6 py-24 flex flex-col items-center text-center gap-5">
      <CompassIcon size={40} strokeWidth={1.5} className="text-ink-subtle" />
      <h1 className="text-[28px] font-light text-ink">Sahifa topilmadi</h1>
      <p className="text-[15px] text-ink-muted">
        Siz izlagan sahifa mavjud emas yoki ko'chirilgan bo'lishi mumkin.
      </p>
      <Link
        to="/"
        className="px-5 py-3 bg-primary text-on-primary text-sm hover:bg-primary-hover transition-colors"
      >
        Bosh sahifaga qaytish
      </Link>
    </div>
  );
}
