module.exports = {
  sidebar: {
    'Getting Started': ['intro'],
  },
  api: {
    'API Reference': [
      {
        type: 'category',
        label: 'Ricos',
        items: ['ricos/ricos-api'],
      },
      {
        type: 'category',
        label: 'Plugins',
        items: [
          'plugins_api/PluginCustomization',
          'plugins_api/GiphyPlugin',
          'plugins_api/HashtagPlugin',
          'plugins_api/LinkPlugin',
          'plugins_api/VideoPlugin',
          'plugins_api/GalleryPlugin',
          'plugins_api/ImagePlugin',
          'plugins_api/FileUploadPlugin',
          'plugins_api/MediaPlugins',
          'plugins_api/EmojiPlugin',
          'plugins_api/CodeBlockPlugin',
          'plugins_api/MapPlugin',
          'plugins_api/ButtonPlugin',
          'plugins_api/DividerPlugin',
          'plugins_api/TextColorAndHighlightPlugins',
          'plugins_api/HtmlPlugin',
          'plugins_api/LinkPreviewPlugin',
        ],
      },
      {
        type: 'category',
        label: 'Rich Content Preview [legacy]',
        items: ['rcp_api/RichContentPreviewAPI'],
      },
    ],
  },
  ricos: {
    'Getting Started': ['ricos/ricos-intro', 'ricos/quick-start', 'ricos/adding-a-viewer'],
    Features: ['ricos/theming', 'ricos/preview'],
    'Migration Guides': [
      'ricos/migrations/v7-to-v8',
      'ricos/migrations/v6-to-v7',
      'ricos/migrations/migrating-from-rich-content',
    ],
  },
};
