/* eslint-disable camelcase */
export const DEFAULTS = {
  config: {
    enableEmbed: false,
  },
};

export const THEME = colors => {
  const { textColor, bgColor, secondaryColor } = colors;
  return {
    linkPreview: {
      borderColor: textColor,
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
