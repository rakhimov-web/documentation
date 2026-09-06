import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

export function Header({
  onToggleSidebar,
  sidebarOpen,
}: {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}) {
  return (
    <header className="sticky top-0 z-30 h-14 flex items-center justify-between px-4 md:px-6 bg-canvas border-b border-hairline">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden flex items-center justify-center w-9 h-9 text-ink hover:bg-surface-1 cursor-pointer"
          aria-label="Menyuni ochish"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <Logo size={28} />
      </div>

      <div className="hidden md:flex items-center gap-2 text-xs text-ink-subtle">
        <span className="border border-hairline px-2 py-1">Uz</span>
        <span>Shaxsiy dasturlash bilimlar bazasi</span>
      </div>
    </header>
  );
}
