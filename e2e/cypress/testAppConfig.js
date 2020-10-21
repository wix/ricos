export const defaultConfig = {
  plugins: ['partialPreset'],
  toolbarConfig: {},
  pluginsConfig: {
    'wix-draft-plugin-html': {
      exposeButtons: ['html'],
    },
  },
};

export const getPluginMenuConfig = (addPluginMenuConfig = {}) => {
  return {
    toolbarConfig: { addPluginMenuConfig },
  };
};

export const getFooterToolbarConfig = (footerToolbarConfig = {}) => {
  return {
    toolbarConfig: { footerToolbarConfig },
  };
};

export const useTheming = ({ paletteType, skipCssOverride }) => {
  return {
    theme: { paletteType, skipCssOverride },
  };
};

export const useConsumerTheming = consumer => {
  return {
    consumer,
  };
};

export const usePlugins = plugin => {
  return { plugins: [plugin] };
};

export const usePluginsConfig = pluginsConfig => {
  return {
    pluginsConfig,
  };
};

export const plugins = {
  embedsPreset: 'embedsPreset',
  spoilerPreset: 'spoilerPreset',
  linkPreview: 'linkPreview',
  verticalEmbed: 'verticalEmbed',
  actionButton: 'actionButton',
  html: 'html',
  headings: 'headings',
  textPlugins: 'textPlugins',
  all: 'all',
  giphy: 'giphy',
  emoji: 'emoji',
  accordion: 'accordion',
  table: 'table',
};

export const pluginsType = {
  linkPreview: 'wix-draft-plugin-link-preview',
};
