import { Command, Extension } from '@tiptap/core';

type LineHeightOptions = {
  types: string[];
  defaultLineHeight: string;
};

declare module '@tiptap/core' {
  interface Commands {
    lineHeight: {
      /**
       * Set the text align attribute
       */
      setLineHeight: (lineHeight: string) => Command;
      /**
       * Unset the text align attribute
       */
      unsetLineHeight: () => Command;
    };
  }
}

export const LineHeight = Extension.create<LineHeightOptions>({
  name: 'lineHeight',

  defaultOptions: {
    types: ['paragraph'],
    defaultLineHeight: 'normal',
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: this.options.defaultLineHeight,
            renderHTML: attributes => {
              return {
                style: `line-height: ${attributes.lineHeight}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setLineHeight: (lineHeight: string) => ({ commands }) => {
        return this.options.types.every(type => commands.updateAttributes(type, { lineHeight }));
      },
      unsetLineHeight: () => ({ commands }) => {
        return this.options.types.every(type => commands.resetAttributes(type, 'lineHeight'));
      },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Shift-l': () => this.editor.commands.setLineHeight('20px'),
      'Mod-Shift-m': () => this.editor.commands.unsetLineHeight(),
    };
  },
});
