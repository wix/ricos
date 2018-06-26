import i18next from 'i18next';
import fallbackResource from '../statics/locale/messages_en.json';

const fallbackLng = 'en';
const namespace = 'translation';

const loadResource = async locale => {
  if (locale === fallbackLng) {
    return fallbackResource;
  }
  return await import(/* webpackChunkName: "i18n/[request]" */ `../statics/locale/messages_${locale}.json`);
};

export const i18n = async locale => {
  const resource = await loadResource(locale);

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
      resources: { [fallbackLng]: { [namespace]: resource } },
    });
};

export const changeLocale = async locale => {
  const resource = await loadResource(locale);
  i18next.addResourceBundle(locale, namespace, resource);
  i18next.changeLanguage(locale);
};
