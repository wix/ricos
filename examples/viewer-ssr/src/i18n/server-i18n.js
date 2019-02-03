import path from 'path';
import i18next from 'i18next';
import i18nextFSBackend from 'i18next-node-fs-backend';

export default i18next.use(i18nextFSBackend).init({
  keySeparator: '$',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  backend: {
    loadPath: path.resolve('src/assets/locale/messages_{{lng}}.json'),
    jsonIndent: 2,
  },
});
