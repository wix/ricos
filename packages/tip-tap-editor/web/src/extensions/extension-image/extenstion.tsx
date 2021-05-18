import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import Component from './Component';

export default Node.create({
  name: 'reactComponent',

  group: 'block',

  atom: true,

  content: 'inline*',

  addAttributes() {
    return {
      imageData: {},
    };
  },

  parseHTML() {
    return [
      {
        tag: 'react-component',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['react-component', mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    // eslint-disable-next-line new-cap
    return ReactNodeViewRenderer(Component());
  },
});
