export function LogoMark({ size = 32 }: { size?: number }) {
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
        d="M12.5 9L7 16L12.5 23"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M19.5 9L25 16L19.5 23"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 7.5L14.5 24.5"
        stroke="#ffffff"
        strokeWidth="1.6"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function Logo({ size = 32 }: { size?: number }) {
  return (
    <div className="flex items-center gap-3 select-none">
      <LogoMark size={size} />
      <span
        className="text-[17px] leading-none text-ink"
        style={{ fontWeight: 400, letterSpacing: 0 }}
      >
        My <span className="font-semibold">Documentation</span>
      </span>
    </div>
  );
}
