import { PaletteColors, ThemeUtils } from 'wix-rich-content-common';

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export const THEME = (colors: PaletteColors, utils: ThemeUtils) => {
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
