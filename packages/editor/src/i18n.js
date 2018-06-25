import i18next from 'i18next';
import english from '../statics/locale/messages_en.json';

const fallbackLng = 'en';
const namespace = 'translation';

export const i18n = () => {
  return i18next
    .init({
      lng: fallbackLng,
      fallbackLng,
      ns: [namespace],
      defaultNS: namespace,
      keySeparator: '$',
      interpolation: {
        escapeValue: false
      },
      react: {
        wait: true,
      },
      resources: { [fallbackLng]: { [namespace]: english } },
    });
};

export const changeLocale = async locale => {
  const resource = await import(`../statics/locale/messages_${locale}.json`);
  i18next.addResourceBundle(locale, namespace, resource);
  i18next.changeLanguage(locale);
};
