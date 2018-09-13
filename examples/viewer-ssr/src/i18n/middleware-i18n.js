export default i18n => (req, res, next) => {
  const { language } = req.aspects['web-context'];

  req.i18n = i18n.cloneInstance();
  req.i18n.changeLanguage(language || i18n.options.fallbackLng[0], () =>
    next(),
  );
};
