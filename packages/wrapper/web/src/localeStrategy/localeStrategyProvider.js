export default ({ locale = 'en' } = { locale: 'en' }) => (innerProps = {}) => {
  if (locale === 'en') {
    return innerProps;
  }
  const localeResource = require(`wix-rich-content-common/dist/statics/locale/messages_${locale}.json`); // eslint-disable-line
  return { ...innerProps, localeResource };
};
