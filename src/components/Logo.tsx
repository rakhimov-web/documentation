export function LogoMark({ size = 32 }: { size?: number }) {
  // Ochiq kitob / hujjat shakli — bilimlar bazasi mavzusiga mos, sodda
  // va istalgan o'lchamda tiniq ko'rinadigan monogram.
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="32" height="32" fill="#0f62fe" />
      <path
        d="M16 10.5C14.7 9.4 12.6 8.7 9.5 8.7V21.3C12.6 21.3 14.7 22 16 23.1"
        stroke="#ffffff"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 10.5C17.3 9.4 19.4 8.7 22.5 8.7V21.3C19.4 21.3 17.3 22 16 23.1"
        stroke="#ffffff"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M16 10.5V23.1" stroke="#ffffff" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ size = 32 }: { size?: number }) {
  return (
    <div className="flex items-center gap-3 select-none">
      <LogoMark size={size} />
      <span
        className="text-[18px] leading-none text-ink"
        style={{
          fontFamily: '"IBM Plex Sans", "Helvetica Neue", Arial, sans-serif',
          fontWeight: 500,
          letterSpacing: 0,
        }}
      >
        My <span>Documentation</span>
      </span>
    </div>
  );
}
