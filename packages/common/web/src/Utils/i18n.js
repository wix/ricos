import i18next from 'i18next';

export default function i18n({ locale, localeResource }) {
  return i18next.init({
    lng: locale,
    keySeparator: '$',
    interpolation: {
      escapeValue: false,
    },
    react: {
      wait: true,
    },
    resources: {
      [locale]: { translation: localeResource },
    },
  });
}
