import { getButtonProps } from './getTextColorButtonProps';
import TextColorButton from './TextColorButton';
import TextHighlightButton from './TextHighlightButton';
import { TEXT_COLOR_TYPE, TEXT_HIGHLIGHT_TYPE } from '../types';
import { CreatePluginToolbar } from 'wix-rich-content-common';
import { FORMATTING_BUTTONS } from 'wix-rich-content-editor-common';

export const createTextColorToolbar: CreatePluginToolbar = config => ({
  TextButtonMapper: () => ({
    [FORMATTING_BUTTONS.TEXT_COLOR]: {
      component: TextColorButton,
      externalizedButtonProps: getButtonProps({ config, type: TEXT_COLOR_TYPE }),
    },
  }),
  name: 'text-color',
});

export const createTextHighlightToolbar: CreatePluginToolbar = config => ({
  TextButtonMapper: () => ({
    [FORMATTING_BUTTONS.TEXT_HIGHLIGHT]: {
      component: TextHighlightButton,
      externalizedButtonProps: getButtonProps({ config, type: TEXT_HIGHLIGHT_TYPE }),
    },
  }),
  name: 'text-highlight',
});
