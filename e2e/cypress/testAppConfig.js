export const defaultConfig = {
  plugins: ['partialPreset'],
  toolbarConfig: {},
};

export const getPluginMenuConfig = (addPluginMenuConfig = {}) => {
  return {
    toolbarConfig: { addPluginMenuConfig },
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
  all: 'all',
};

export const pluginsType = {
  linkPreview: 'LINK_PREVIEW',
};
