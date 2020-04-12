/* eslint-disable camelcase */
export const DEFAULTS = {
  config: {
    enableEmbed: true,
  },
};

export const THEME = colors => {
  const { textColor, bgColor, secondaryColor } = colors;
  return {
    linkPreview: {
      borderColor: `${secondaryColor} !important`,
      backgroundColor: bgColor,
    },
    linkPreview_title: {
      color: textColor,
    },
    linkPreview_image: {
      borderColor: textColor,
    },
    linkPreview_description: {
      color: textColor,
    },
    linkPreview_url: {
      color: secondaryColor,
    },
  };
};
