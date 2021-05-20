import { Node, mergeAttributes, Command } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import Component from './Component';
export default Node.create({
  name: 'divider',

  group: 'block',

  atom: true,
  selectable: true,

  content: 'inline*',
  draggable: true,
  addAttributes() {
    return {
      dividerData: {},
    };
  },

  parseHTML() {
    return [
      {
        tag: 'divider-component',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['divider-component', mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    // eslint-disable-next-line new-cap
    return ReactNodeViewRenderer(Component);
  },
});
