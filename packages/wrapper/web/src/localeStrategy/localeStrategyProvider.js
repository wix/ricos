export default ({ locale = 'en' } = { locale: 'en' }) => async (innerProps = {}) => {
  const mergedLocale = innerProps.locale || locale;
  if (mergedLocale === 'en') {
    return innerProps;
  }
  try {
    const localeResource = await import(
      `wix-rich-content-common/dist/statics/locale/messages_${mergedLocale}.json`
    ).then(res => res.default);
    return { locale: mergedLocale, localeResource, ...innerProps };
  } catch (err) {
    throw new Error(`error while loading locale ${locale}`, err);
  }
};
