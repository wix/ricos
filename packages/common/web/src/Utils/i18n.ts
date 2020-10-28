import { init } from 'i18next';
import { LocaleResource } from '../types';

export default function i18n({
  locale,
  localeResource,
}: {
  locale: string;
  localeResource: LocaleResource;
}) {
  return init({
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
