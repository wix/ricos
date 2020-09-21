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
export const theme = (colors: PaletteColors, utils: ThemeUtils) => {
  const { textColor, bgColor } = colors;
  return {
    pluginContainerWrapper: {
      '& $linkPreview': {
        borderColor: utils.hexToRgbA(textColor, 0.6),
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
      color: utils.hexToRgbA(textColor, 0.6),
    },
  };
};
