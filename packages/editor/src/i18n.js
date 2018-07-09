import i18next from 'i18next';

const fallbackLng = 'en';

export default function i18n({ locale, translations }) {
  return i18next
    .init({
      lng: locale || fallbackLng,
      fallbackLng,
      keySeparator: '$',
      interpolation: {
        escapeValue: false
      },
      react: {
        wait: true,
      },
      resources: translations,
    });
}
