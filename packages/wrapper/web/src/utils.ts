import { convertToRaw } from 'wix-rich-content-editor-common';
import { createEmpty } from 'wix-rich-content-editor/dist/lib/editorStateConversion';
import { EditorState } from 'draft-js';
import { debounce } from 'lodash';
import { Children, ReactElement, ComponentClass } from 'react';

/* eslint-disable no-console */
export const assert = (predicate, message) => console.assert(predicate, message);
export const emptyState: ContentState = { blocks: [], entityMap: {} };

export function createDataConverter(): EditorDataInstance {
  let currState: ContentState = emptyState;
  let currEditorState: EditorState = createEmpty();
  let isUpdated = false;
  const getContentState = () => {
    if (!isUpdated) {
      currState = convertToRaw(currEditorState.getCurrentContent());
      isUpdated = true;
    }
    return currState;
  };
  const debounceUpdate = debounce(getContentState, 200);
  return {
    getContentState,
    refresh: (editorState: EditorState) => {
      isUpdated = false;
      currEditorState = editorState;
      debounceUpdate();
    },
  };
}

export const shouldRenderChild = (isViewer: boolean, children: RichContentChild): boolean => {
  const expectedChildName = isViewer ? 'RichContentViewer' : 'RichContentEditor';
  const child = Children.only(children) as ReactElement<ExportedRichContentProps, ComponentClass>; // RichContentChild with type ComponentClass has a displayName
  const childName = child?.type.displayName;
  return !!children && childName === expectedChildName;
};
