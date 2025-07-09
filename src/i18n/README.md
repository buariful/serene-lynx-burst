# Internationalization (i18n) Setup

This project uses i18next for internationalization with English as the primary language and French as the secondary language.

## Structure

```
src/i18n/
├── index.ts              # Main i18next configuration
├── types.d.ts            # TypeScript declarations for JSON imports
├── locales/
│   ├── en.json          # English translations
│   └── fr.json          # French translations
└── README.md            # This file
```

## Usage

### Basic Translation

```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  
  return <h1>{t('header.medicalSchools')}</h1>;
};
```

### Using the Language Hook

```tsx
import { useLanguage } from '@/hooks/useLanguage';

const MyComponent = () => {
  const { t, currentLanguage, changeLanguage } = useLanguage();
  
  return (
    <div>
      <p>Current language: {currentLanguage}</p>
      <button onClick={() => changeLanguage('fr')}>
        Switch to French
      </button>
      <h1>{t('header.medicalSchools')}</h1>
    </div>
  );
};
```

### Using the Language Context

```tsx
import { useLanguageContext } from '@/components/LanguageProvider';

const MyComponent = () => {
  const { t, currentLanguage, changeLanguage } = useLanguageContext();
  
  return (
    <div>
      <p>Current language: {currentLanguage}</p>
      <button onClick={() => changeLanguage('fr')}>
        Switch to French
      </button>
      <h1>{t('header.medicalSchools')}</h1>
    </div>
  );
};
```

## Adding New Translations

1. Add the English translation to `src/i18n/locales/en.json`
2. Add the corresponding French translation to `src/i18n/locales/fr.json`
3. Use the translation key in your components

### Example

**en.json:**
```json
{
  "header": {
    "newFeature": "New Feature"
  }
}
```

**fr.json:**
```json
{
  "header": {
    "newFeature": "Nouvelle Fonctionnalité"
  }
}
```

**Component:**
```tsx
const { t } = useTranslation();
return <h1>{t('header.newFeature')}</h1>;
```

## Language Switching

The language can be switched using the dropdown in the header or programmatically:

```tsx
const { changeLanguage } = useLanguage();
changeLanguage('fr'); // Switch to French
changeLanguage('en'); // Switch to English
```

## Features

- **Automatic Language Detection**: Detects user's browser language
- **Local Storage Persistence**: Remembers user's language preference
- **Fallback Language**: English is used as fallback if translation is missing
- **Type Safety**: TypeScript support for translation keys
- **Context Provider**: Global language state management

## Configuration

The i18next configuration is in `src/i18n/index.ts` and includes:

- Language detection from browser, localStorage, and HTML tag
- Fallback to English
- Debug mode in development
- React integration 