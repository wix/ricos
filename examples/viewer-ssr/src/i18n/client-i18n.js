import i18next from 'i18next';

export default function i18n({ locale, resources }) {
  return i18next.init({
    keySeparator: '$',
    lng: locale,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      [locale]: {
        translation: resources,
      },
    },
  });
}
