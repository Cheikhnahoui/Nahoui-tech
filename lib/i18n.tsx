"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { CONTENT, type Dict, type Lang } from "./content";

type Ctx = { lang: Lang; t: Dict; toggle: () => void };
const LangContext = createContext<Ctx>({ lang: "ar", t: CONTENT.ar, toggle: () => {} });
export const useLang = () => useContext(LangContext);

// Arabic is the official (default) language; the visitor's choice is remembered.
export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang");
      if (saved === "en" || saved === "ar") setLang(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  function toggle() {
    const next: Lang = lang === "ar" ? "en" : "ar";
    setLang(next);
    try { localStorage.setItem("lang", next); } catch {}
  }

  return <LangContext.Provider value={{ lang, t: CONTENT[lang], toggle }}>{children}</LangContext.Provider>;
}
