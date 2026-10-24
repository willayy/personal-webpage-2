'use client';

import { createContext, useContext, useState, useMemo } from 'react';
import { Language, translateByKey } from '@/utils/localization';

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (keyPath: string, params: Record<string, string | number> | null) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [language, setLanguage] = useState<Language>('en');

  const value = useMemo<LanguageContextValue>(() => {
    function toggleLanguage() {
      const isEnglish = language === 'en';
      const nextLanguage: Language = isEnglish ? 'sv' : 'en';
      setLanguage(nextLanguage);
    }

    function t(
      keyPath: string,
      params: Record<string, string | number> | null
    ): string {
      return translateByKey(language, keyPath, params);
    }

    return {
      language,
      setLanguage,
      toggleLanguage,
      t,
    };
  }, [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguageContext(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    function fallbackTranslate(
      keyPath: string,
      params: Record<string, string | number> | null
    ): string {
      return translateByKey('en', keyPath, params);
    }
    return {
      language: 'en',
      setLanguage: () => {},
      toggleLanguage: () => {},
      t: fallbackTranslate,
    };
  }
  return context;
}
