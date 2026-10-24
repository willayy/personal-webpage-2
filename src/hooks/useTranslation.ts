'use client';

import { useLanguageContext } from '@/context/LanguageContext';

export function useTranslation() {
  const context = useLanguageContext();
  return context;
}
