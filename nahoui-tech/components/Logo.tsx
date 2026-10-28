export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="30" height="30" viewBox="0 0 64 64" aria-hidden="true">
        <rect width="64" height="64" rx="14" fill="#0E1830" stroke="#3B82F6" strokeOpacity=".5" />
        <path d="M18 46V18l28 28V18" fill="none" stroke="#3B82F6" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-[1.05rem] font-semibold tracking-wide text-white">
        NAHOUI <span className="font-normal text-glow">TECH</span>
      </span>
    </span>
  );
}
