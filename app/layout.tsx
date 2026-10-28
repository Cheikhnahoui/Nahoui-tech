import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE } from "@/lib/config";
import { LangProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.descriptionAr,
  applicationName: SITE.name,
  openGraph: { type: "website", locale: "ar_AR", alternateLocale: ["en_US"], siteName: SITE.name, title: SITE.title, description: SITE.descriptionAr, url: "/" },
  twitter: { card: "summary_large_image", title: SITE.title, description: SITE.descriptionAr },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#050A16", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body><LangProvider>{children}</LangProvider></body>
    </html>
  );
}
