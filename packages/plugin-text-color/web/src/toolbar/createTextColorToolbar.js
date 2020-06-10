import { getButtonProps } from './getTextColorButtonProps';
import TextColorButton from './TextColorButton';
import TextHighlightButton from './TextHighlightButton';
import { TEXT_COLOR_TYPE, TEXT_HIGHLIGHT_TYPE } from '../types';

export const createTextColorToolbar = config => {
  return {
    TextButtonMapper: () => ({
      TextColor: {
        component: TextColorButton,
        externalizedButtonProps: getButtonProps({ config, type: TEXT_COLOR_TYPE }),
      },
    }),
  };
};

export const createTextHighlightToolbar = config => ({
  TextButtonMapper: () => ({
    TextHighlight: {
      component: TextHighlightButton,
      externalizedButtonProps: getButtonProps({ config, type: TEXT_HIGHLIGHT_TYPE }),
    },
  }),
});
