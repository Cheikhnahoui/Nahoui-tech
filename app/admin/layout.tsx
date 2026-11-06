import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin | NAHOUI TECH", robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div dir="rtl" lang="ar" className="min-h-screen bg-ink font-arabic">{children}</div>;
}
