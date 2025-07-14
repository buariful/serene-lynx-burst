import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslations from './locales/en.json';
import frTranslations from './locales/fr.json';

const resources = {
  en: {
    translation: enTranslations,
  },
  fr: {
    translation: frTranslations,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: true, // Enable debug to see what's happening
    lng: 'en', // Set default language explicitly
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    
    // Add better error handling
    saveMissing: true,
    missingKeyHandler: (lng, ns, key, fallbackValue) => {
      console.warn(`Missing translation key: ${key} for language: ${lng}`);
    },
    
    // Add better debugging
    react: {
      useSuspense: false, // This helps with debugging
    },
  }).then(() => {
    console.log('i18n initialized successfully');
    console.log('Available languages:', i18n.languages);
    console.log('Current language:', i18n.language);
    console.log('Available namespaces:', i18n.reportNamespaces.getUsedNamespaces());
  });

// Add event listeners for language changes
i18n.on('languageChanged', (lng) => {
  console.log('Language changed to:', lng);
});

i18n.on('loaded', (loaded) => {
  console.log('i18n loaded:', loaded);
});

i18n.on('failedLoading', (lng, ns, msg) => {
  console.error('Failed to load translation:', { lng, ns, msg });
});

export default i18n; 