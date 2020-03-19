export default ({ locale = 'en' } = { locale: 'en' }) => (innerProps = {}) => {
  const mergedLocale = innerProps.locale || locale;
  if (mergedLocale === 'en') {
    return { locale: mergedLocale, ...innerProps };
  }
  try {
    const localeResource = require(`wix-rich-content-common/dist/statics/locale/messages_${mergedLocale}.json`); // eslint-disable-line max-len
    return { locale: mergedLocale, localeResource, ...innerProps };
  } catch (err) {
    throw new Error(`error while loading locale ${locale}`, err);
  }
};
