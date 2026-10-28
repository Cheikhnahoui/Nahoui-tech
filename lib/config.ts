// ─── Site configuration: edit contact details here ───────────────────────────

/**
 * FACEBOOK_PAGE_URL — paste the official NAHOUI TECH Facebook page URL here
 * (e.g. "https://www.facebook.com/your-page"), or set NEXT_PUBLIC_FACEBOOK_PAGE_URL
 * in .env.local. While empty, the Facebook button is shown as "not set yet"
 * and the footer link is hidden, so there is never a broken link.
 */
export const FACEBOOK_PAGE_URL: string = process.env.NEXT_PUBLIC_FACEBOOK_PAGE_URL ?? "";

export const SITE = {
  name: "NAHOUI TECH",
  slogan: "Engineering the Future.",
  sloganAr: "نُهندس المستقبل",
  title: "NAHOUI TECH | Web Development & Digital Solutions",
  description:
    "NAHOUI TECH delivers modern websites, web applications, software solutions, graphic design, video editing, social media management, and digital services.",
  descriptionAr:
    "تقدم NAHOUI TECH مواقع إلكترونية حديثة وتطبيقات ويب وحلولاً برمجية وتصميماً جرافيكياً ومونتاج فيديو وإدارة حسابات التواصل الاجتماعي وخدمات رقمية.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

export const WHATSAPP_DISPLAY = "+222 49 71 75 04";
export const WHATSAPP_URL = "https://wa.me/22249717504"; // +222 = Mauritania
export const EMAIL = "cheikhnahoui4@gmail.com";

export const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About Us" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

export function whatsappLink(text?: string) {
  return text ? `${WHATSAPP_URL}?text=${encodeURIComponent(text)}` : WHATSAPP_URL;
}
