import { Node, mergeAttributes, Command } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import Component from './Component';

declare module '@tiptap/core' {
  interface Commands {
    reactComponent: {
      /**
       * Toggle a paragraph
       */
      setImageSrc: () => Command;
    };
  }
}

export default Node.create({
  name: 'imageComponent',

  group: 'block',

  atom: true,

  content: 'inline*',

  addAttributes() {
    return {
      imageData: {},
    };
  },

  addCommands() {
    return {
      setImageSrc: () => ({ commands }) => {
        const cmd = commands.updateAttributes('imageComponent', {
          imageData: {
            image: {
              src: {
                custom: 'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png',
              },
            },
          },
        });
        console.log({ commands, cmd });

        return cmd;
      },
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
