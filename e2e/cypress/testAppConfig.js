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
  linkPreview: 'linkPreview',
  verticalEmbed: 'verticalEmbed',
  actionButton: 'actionButton',
  html: 'html',
  headings: 'headings',
  textPlugins: 'textPlugins',
  all: 'all',
};

export const pluginsType = {
  linkPreview: 'wix-draft-plugin-link-preview',
};
