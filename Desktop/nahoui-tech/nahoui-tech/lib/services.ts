import {
  AppWindow, BadgeCheck, Clapperboard, Cpu, FileText, Fingerprint, Globe, Layers, LayoutDashboard,
  Megaphone, Palette, Share2, type LucideIcon,
} from "lucide-react";

export type Service = { title: string; description: string; icon: LucideIcon };

export const SERVICES: Service[] = [
  { title: "Website Development", icon: Globe, description: "Modern, responsive, and professional websites tailored to businesses, individuals, and organizations." },
  { title: "Web Applications", icon: AppWindow, description: "Interactive web applications designed to automate workflows and solve real-world problems." },
  { title: "Custom Software & Digital Systems", icon: Layers, description: "Tailored digital platforms and management systems that improve efficiency and simplify business operations." },
  { title: "UI/UX Design", icon: LayoutDashboard, description: "User-friendly, modern, and visually appealing interfaces designed to provide excellent user experiences." },
  { title: "Graphic Design", icon: Palette, description: "Professional visual designs for brands, advertisements, social media posts, and promotional materials." },
  { title: "Social Media Account Management", icon: Share2, description: "Professional management of social media accounts, including Facebook, Instagram, and other platforms." },
  { title: "Content Creation & Management", icon: FileText, description: "Content planning, content writing, publishing, and management to help brands maintain a consistent online presence." },
  { title: "Video Editing", icon: Clapperboard, description: "Professional video editing for promotional videos, social media reels, advertisements, and other digital content." },
  { title: "Digital Marketing", icon: Megaphone, description: "Digital promotional strategies and campaigns designed to increase brand visibility and attract potential customers." },
  { title: "Brand Identity", icon: Fingerprint, description: "Logo design, visual identity development, and branding materials that help businesses establish a recognizable identity." },
  { title: "AI & Digital Innovation", icon: Cpu, description: "Modern AI-powered solutions and digital innovations that help businesses improve productivity and explore new opportunities." },
];

export { BadgeCheck };
