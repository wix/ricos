import i18next from 'i18next';

export default function i18n({ localeName, localeResource }) {
  return i18next
    .init({
      lng: localeName,
      keySeparator: '$',
      interpolation: {
        escapeValue: false
      },
      react: {
        wait: true,
      },
      resources: {
        [localeName]: { translation: localeResource }
      },
    });
}
