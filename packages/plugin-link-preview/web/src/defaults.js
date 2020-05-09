/* eslint-disable camelcase */
export const DEFAULTS = {
  config: {
    enableEmbed: true,
  },
};

export const THEME = colors => {
  const { textColor, bgColor, secondaryColor } = colors;
  return {
    linkPreviewWrapper: {
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
