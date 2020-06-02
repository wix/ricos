import { getButtonProps } from './getTextColorButtonProps';
import TextColorButton from './TextColorButton';
import TextHighlightButton from './TextHighlightButton';
import { TEXT_COLOR_TYPE, TEXT_HIGHLIGHT_TYPE } from '../types';

export const createTextColorToolbar = config => {
  return {
    TextButtonMapper: () => ({
      TextColor: {
        component: TextColorButton,
        isMobile: true,
        position: { desktop: 2.1, mobile: 2.1 },
        group: { desktop: 1, mobile: 1 },
        externalizedButtonProps: getButtonProps({ config, type: TEXT_COLOR_TYPE }),
      },
    }),
  };
};

export const createTextHighlightToolbar = config => ({
  TextButtonMapper: () => ({
    TextHighlight: {
      component: TextHighlightButton,
      isMobile: true,
      position: { desktop: 2.2, mobile: 2.2 },
      group: { desktop: 1, mobile: 1 },
      externalizedButtonProps: getButtonProps({ config, type: TEXT_HIGHLIGHT_TYPE }),
    },
  }),
});
