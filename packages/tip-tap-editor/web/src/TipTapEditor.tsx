/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-new */
import React from 'react';

// import LineHeight from './extensions/extension-line-height';
// import Image from './extensions/extension-image';
import { convertProsMirrorContentToRicosContent } from './convertor';
import { useEditor, EditorContent } from '@tiptap/react';
import { EditorPropsContext } from './context';
import Dropcursor from '@tiptap/extension-dropcursor';
import Gapcursor from '@tiptap/extension-gapcursor';
import Document from '@tiptap/extension-document';

import Text from '@tiptap/extension-text';
import History from '@tiptap/extension-history';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Code from '@tiptap/extension-code';
import CodeBlock from '@tiptap/extension-code-block';
import Heading from '@tiptap/extension-heading';
import HardBreak from '@tiptap/extension-hard-break';
import Strike from '@tiptap/extension-strike';
import Blockquote from '@tiptap/extension-blockquote';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Paragraph from './extensions/extension-paragraph';
import Divider from './extensions/extension-divider';

const starterKitExtensions = [
  Blockquote,
  Bold,
  BulletList,
  Code,
  CodeBlock,
  Document,
  Dropcursor,
  Gapcursor,
  HardBreak,
  Heading,
  History,
  HorizontalRule,
  Italic,
  ListItem,
  OrderedList,
  Paragraph,
  Strike,
  Divider,
  Text,
];
import {
  // createDividerPlugin,
  // DIVIDER_TYPE,
  pluginDivider,
  createDividerPlugin2,
} from 'wix-rich-content-plugin-divider';

type TipTapEditorProps = {
  onUpdate: ({ content }) => void;
  plugins: Record<string, unknown>[];
  editorProps: unknown & Record<string, unknown>[];
};

const content = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      attrs: {},
      content: [
        {
          type: 'text',
          text: 'yaron',
        },
      ],
    },

    {
      type: 'divider',
      attrs: {
        dividerData: {
          type: 'SINGLE',
          config: {
            width: 'SMALL',
            alignment: 'CENTER',
            containerData: {
              alignment: 'CENTER',
              width: {
                type: 'CONTENT',
              },
            },
          },
        },
      },
    },
    {
      type: 'paragraph',
      attrs: {},
      content: [
        {
          type: 'text',
          text: 'nachshon',
        },
      ],
    },
  ],
};

const TipTapEditor = ({ editorProps, onUpdate }) => {
  // console.log({ Paragraph, Document });
  // const divider = pluginDivider({});

  const editor = useEditor({
    content,
    extensions: [...starterKitExtensions],
    injectCSS: true,
    onUpdate: ({ editor }) => {
      // const newContent = editor.getJSON();
      // console.log({ newContent, content });
      // const convertedContent = convertProsMirrorContentToRicosContent(newContent);
      // //@ts-ignore
      // window.editor = editor;
      // onUpdate({ content: convertedContent });
    },
  });

  // console.log({ editorProps });
  // const dividerPlugin = createDividerPlugin2(editorProps);
  // const Divider = dividerPlugin.component;
  // const dividerProps = dividerPlugin.props;
  // const blockProps = {
  //   getData: () => {
  //     return null;
  //   },
  //   block: {
  //     getKey: () => {
  //       return '1234324';
  //     },
  //   },
  // };
  // const changeImage = () =>
  //   editor
  //     ?.chain()
  //     .focus()
  //     .setImageSrc()
  //     .run();
  return (
    <div>
      <EditorPropsContext.Provider value={editorProps}>
        <EditorContent editor={editor} />
      </EditorPropsContext.Provider>
    </div>
  );
};
export default TipTapEditor;
