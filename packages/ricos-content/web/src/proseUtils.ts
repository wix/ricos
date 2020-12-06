import { cloneDeepWith } from 'lodash';

export const convertToProse = content => {
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

export const convertFromProse = proseState => {
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
