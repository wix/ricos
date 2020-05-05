module.exports = {
  sidebar: {
    'Getting Started': ['intro'],
  },
  api: {
    'API Reference': [
      {
        type: 'category',
        label: 'Rich Content Editor',
        items: [
          'rce_api/RichContentEditorAPI',
          'rce_api/ToolbarCustomization',
          'rce_api/UiSettings',
        ],
      },
      {
        type: 'category',
        label: 'Rich Content Viewer',
        items: [
          'rcv_api/initialState',
          'rcv_api/typeMappers_config',
          'rcv_api/anchorTarget_relValue',
          'rcv_api/helpers',
          'rcv_api/locale_resource',
          'rcv_api/theme',
          'rcv_api/decorators_inlineStyleMappers',
          'rcv_api/seoMode',
          'rcv_api/siteDomain',
          'rcv_api/onError',
          'rcv_api/fullscreen',
          'rcv_api/isMobile',
          'rcv_api/textDirection',
          'rcv_api/addAnchors',
        ],
      },
      {
        type: 'category',
        label: 'Plugin API',
        items: ['plugins_api/PluginCustomization'],
      },
    ],
  },
  devs: {
    'Plugin Development Guidelines': [
      'plugin-development-guidelines/general',
      'plugin-development-guidelines/modals',
      'plugin-development-guidelines/theming',
    ],
  },
};
