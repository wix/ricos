export default async ({ locale = 'en' } = { locale: 'en' }) => {
  try {
    const localeResource = await import(
      `wix-rich-content-common/dist/statics/locale/messages_${locale}.json`
    ).then(res => res.default);
    return (innerProps = {}) => {
      const mergedLocale = innerProps.locale || locale;
      if (mergedLocale === 'en') return innerProps;
      return { locale: mergedLocale, localeResource };
    };
  } catch (err) {
    throw new Error(`error while loading locale ${locale}`, err);
  }
};
