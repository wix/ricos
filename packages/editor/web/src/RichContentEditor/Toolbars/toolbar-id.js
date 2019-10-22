const TOOLBAR_ID_PREFIX = {
  SIDE: 'side_toolbar_',
  STATIC_TEXT: 'static_text_toolbar_',
  INLINE_TEXT: 'inline_text_toolbar_',
  FOOTER: 'footer_toolbar_',
  MOBILE: 'mobile_toolbar_',
};

export const getStaticTextToolbarId = refId => TOOLBAR_ID_PREFIX.STATIC_TEXT + refId;
