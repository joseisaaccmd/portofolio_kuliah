"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { dictionaries, Lang, Dict } from "@/lib/i18n";

interface LanguageContextValue {
  lang: Lang;
  dict: Dict;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "id",
  dict: dictionaries.id,
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("id");

  useEffect(() => {
    const applySaved = () => {
      let next: Lang = "id";
      const saved = localStorage.getItem("lang");
      if (saved === "id" || saved === "en") {
        next = saved;
      } else {
        const nav = (navigator.language || "").toLowerCase();
        next = nav.startsWith("id") ? "id" : "en";
      }
      setLangState(next);
    };
    const id = requestAnimationFrame(applySaved);
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem("lang", next);
    } catch {
      /* ignore storage errors */
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, dict: dictionaries[lang], setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
