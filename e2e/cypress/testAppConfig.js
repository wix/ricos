export const pluginsType = {
  linkPreview: 'wix-draft-plugin-link-preview',
  html: 'wix-draft-plugin-html',
  video: 'wix-draft-plugin-video',
};

export const defaultConfig = {
  plugins: ['partialPreset'],
  toolbarConfig: {},
  pluginsConfig: {
    [pluginsType.html]: {
      exposeButtons: ['html'],
    },
    [pluginsType.video]: {
      exposeButtons: ['video', 'soundCloud'],
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

export const useTheming = ({
  paletteType,
  skipCssOverride,
  useCustomStyles,
  fallbackColor,
  disableContainer,
  contentBgColor,
  settingsActionColor,
  focusActionColor,
}) => {
  return {
    theme: {
      paletteType,
      skipCssOverride,
      useCustomStyles,
      fallbackColor,
      disableContainer,
      contentBgColor,
      settingsActionColor,
      focusActionColor,
    },
  };
};

export const useConsumerTheming = (consumer, applyOuterStyle) => {
  return {
    consumer,
    applyOuterStyle,
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

export const useUploadConfig = {
  isNativeUpload: true,
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
  video: 'video',
};

export const useExperiments = experiment => {
  return { experiments: experiment };
};
