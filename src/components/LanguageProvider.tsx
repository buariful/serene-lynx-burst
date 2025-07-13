import React, { createContext, useContext, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (language: string) => void;
  t: (key: string, options?: any) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    console.log('Changing language to:', language);
    i18n.changeLanguage(language);
  };

  const value: LanguageContextType = {
    currentLanguage: i18n.language || 'en',
    changeLanguage,
    t,
  };

  console.log('LanguageProvider - Current language:', i18n.language);
  console.log('LanguageProvider - Available languages:', i18n.languages);
  console.log('LanguageProvider - Test translation:', t('header.medicalSchools'));

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}; 