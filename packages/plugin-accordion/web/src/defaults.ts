import { EditorState, convertToRaw } from 'wix-rich-content-editor';
import { PaletteColors, ThemeUtils } from 'wix-rich-content-common';
export { ACCORDION_TYPE } from './types';
export const COMPONENT_DATA = 'componentData';
import { ArrowIcon } from './icons';

export const directions = {
  LTR: 'ltr',
  RTL: 'rtl',
};

export const EXPANDED = 'expanded';
export const COLLAPSED = 'collapsed';
export const FIRST_EXPANDED = 'first_expanded';

export const generateKey = () =>
  Math.random()
    .toString(36)
    .substr(2, 9);

export const DEFAULTS = Object.freeze({
  config: {
    expandState: FIRST_EXPANDED,
    iconStyle: ArrowIcon,
    direction: directions.LTR,
    expandOnlyOne: false,
  },
  pairs: [
    {
      key: generateKey(),
      title: convertToRaw(EditorState.createEmpty().getCurrentContent()),
      content: convertToRaw(EditorState.createEmpty().getCurrentContent()),
    },
  ],
});

//@colors is defined in 'ThemeGenerator.js'
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export const theme = (colors: PaletteColors, utils: ThemeUtils) => {
  return {
    new_pair_container: {
      '& $new_pair_button': {
        color: colors.actionColor,
      },
      '& svg': {
        color: colors.actionColor,
        fill: colors.actionColor,
      },
    },
    new_pair_button: {},
    direction_selector_option: {
      '& svg': {
        color: colors.actionColor,
        fill: colors.actionColor,
      },
      '& p': {
        color: colors.actionColor,
        fill: colors.actionColor,
      },
    },
  };
};
