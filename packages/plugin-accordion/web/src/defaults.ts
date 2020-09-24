import { EditorState, convertToRaw } from 'wix-rich-content-editor';
import { ArrowIcon } from './icons';
export { ACCORDION_TYPE } from './types';
export const COMPONENT_DATA = 'componentData';

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
