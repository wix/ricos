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

export const plugins = {
  embedsPreset: 'embedsPreset',
  linkPreview: 'linkPreview',
  verticalEmbed: 'verticalEmbed',
  actionButton: 'actionButton',
  all: 'all',
};
