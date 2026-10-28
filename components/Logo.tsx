import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span dir="ltr" className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image src="/logo-mark.webp" alt="" width={100} height={72} className="h-8 w-auto rounded-md" />
      <span className="text-[1.05rem] font-semibold text-white">
        NAHOUI <span className="font-normal text-glow">TECH</span>
      </span>
    </span>
  );
}
