/* eslint-disable camelcase */
import { LinkPreviewProviders } from './consts';
const { Instagram, Twitter, YouTube, TikTok } = LinkPreviewProviders;

export const DEFAULTS = {
  config: {
    enableEmbed: true,
    enableLinkPreview: true,
    exposeEmbedButtons: [Instagram, Twitter, YouTube, TikTok],
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
