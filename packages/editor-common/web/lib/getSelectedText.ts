import { EditorState, ContentBlock } from '@wix/draft-js';

import getFragmentFromSelection from '@wix/draft-js/lib/getFragmentFromSelection';

// TODO: use getFragmentFromSelection for all selection-related utils
export const getSelectedText = (editorState: EditorState) => {
  const selectedFragment = getFragmentFromSelection(editorState) || [];
  return selectedFragment.map((block: ContentBlock) => block.getText()).join('\n');
};
