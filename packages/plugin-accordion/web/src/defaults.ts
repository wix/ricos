import {
  EditorState,
  __convertToRawWithoutVersion,
} from 'wix-rich-content-editor/dist/lib/editorStateConversion';
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
    direction: directions.LTR,
    expandOnlyOne: false,
  },
  pairs: [
    {
      key: generateKey(),
      title: __convertToRawWithoutVersion(EditorState.createEmpty().getCurrentContent()),
      content: __convertToRawWithoutVersion(EditorState.createEmpty().getCurrentContent()),
    },
  ],
});
