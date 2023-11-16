// LanguageContext.tsx
"use client";

import { createContext, useState, useContext, ReactNode } from 'react';

export type Language = 'en' | 'jp' | 'zh' | 'ko'; // Define your supported languages here

interface LanguageContextType {
  selectedLanguage: Language;
  switchLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en');

  const switchLanguage = (language: Language) => {
    setSelectedLanguage(language);
  };

  return (
    <LanguageContext.Provider value={{ selectedLanguage, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
