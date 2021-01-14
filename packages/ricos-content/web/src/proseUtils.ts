/* eslint-disable fp/no-delete */
import { cloneDeepWith } from 'lodash';
import { RicosContent } from 'ricos-schema';
import { EditorState } from 'prosemirror-state';

/**
  This is still WIP
 */

export const convertToProse = (content: RicosContent): EditorState => {
  content.doc.type = 'doc';
  content.selection.head = content.selection.focus;
  delete content.selection.focus;
  content.selection.type = 'text';
  return cloneDeepWith(content, value => {
    if (value.nodes) {
      value.content = value.nodes;
      delete value.nodes;
    }
    if (value.data) {
      value.attrs = value.data;
      delete value.data;
    }
  });
};

export const convertFromProse = (proseState: EditorState): RicosContent => {
  delete proseState.doc.type;
  proseState.selection.focus = proseState.selection.head;
  delete proseState.selection.head;
  delete proseState.selection.type;
  return cloneDeepWith(proseState, value => {
    if (value.content) {
      value.nodes = value.content;
      delete value.content;
    }
    if (value.attrs) {
      value.data = value.attrs;
      delete value.attrs;
    }
  });
};
