/* eslint-disable camelcase */
export const DEFAULTS = {
  config: {
    alignment: 'center',
    size: 'content',
    link: {
      target: '_blank',
      rel: 'noopener',
    },
  },
};

export const THEME = colors => {
  const { textColor, bgColor, secondaryColor } = colors;
  return {
    pluginContainerWrapper: {
      '& $linkPreview': {
        borderColor: secondaryColor,
        backgroundColor: bgColor,
      },
    },
    linkPreview: {},
    linkPreviewTitle: {
      color: textColor,
    },
    linkPreviewImage: {
      borderColor: textColor,
    },
    linkPreviewDescription: {
      color: textColor,
    },
    linkPreviewUrl: {
      color: secondaryColor,
    },
  };
};
