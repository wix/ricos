/* eslint-disable camelcase */
export const DEFAULTS = {
  config: {
    enableEmbed: true,
    enableLinkPreview: true,
  },
};

export const THEME = colors => {
  const { textColor, bgColor, secondaryColor } = colors;
  return {
    linkPreview: {
      borderColor: `${secondaryColor} !important`,
      backgroundColor: bgColor,
    },
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
