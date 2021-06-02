import React from 'react';
import Toolbar from './components/Toolbar';
import { JSONContent } from '@tiptap/core';
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
import { RichContent } from 'ricos-schema';

import { fromProseMirror, toProseMirror } from 'ricos-content/libs/converters';
import { createDivider } from './extensions/extension-divider';

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
  createDivider(),
  Text,
];

type TipTapEditorProps = {
  onUpdate: ({ content }) => void;
  plugins: Record<string, unknown>[];
  editorProps: unknown & Record<string, unknown>[];
};

const dataJSON = {
  nodes: [
    {
      type: 'PARAGRAPH',
      key: '81ob3',
      nodes: [
        {
          type: 'TEXT',
          key: '6hb3g',
          nodes: [],
          textData: {
            text: 'yaron 321',
            decorations: [],
          },
        },
      ],
      paragraphData: {
        textStyle: {
          textAlignment: 'AUTO',
          lineHeight: '20px',
        },
        indentation: 0,
      },
    },
    {
      type: 'DIVIDER',
      key: '7619f',
      nodes: [],
      dividerData: {
        type: 'DOUBLE',
        width: 'LARGE',
        alignment: 'LEFT',
        containerData: {
          alignment: 'CENTER',
          width: {
            type: 'CONTENT',
          },
        },
      },
    },
    {
      type: 'PARAGRAPH',
      key: 'd9j2a',
      nodes: [],
      paragraphData: {
        textStyle: {
          textAlignment: 'AUTO',
        },
        indentation: 0,
      },
    },
  ],
  metadata: {
    version: 1,
    createdTimestamp: '2021-05-26T22:48:09.161Z',
    updatedTimestamp: '2021-05-26T22:48:09.161Z',
  },
};
//@ts-ignore
const content = toProseMirror(RichContent.fromJSON(dataJSON));
// eslint-disable-next-line fp/no-delete
delete content.metadata;
// eslint-disable-next-line no-console
console.log('yaron123', { content });
const TipTapEditor = ({ editorProps, onUpdate }) => {
  const editor = useEditor({
    content,
    extensions: [...starterKitExtensions],
    injectCSS: true,
    onUpdate: ({ editor }) => {
      const newContent = editor.getJSON();
      const convertedContent = fromProseMirror(newContent as JSONContent);
      onUpdate({ content: convertedContent });
    },
  });

  return (
    <div>
      <Toolbar editor={editor} />
      <EditorPropsContext.Provider value={editorProps}>
        <EditorContent editor={editor} />
      </EditorPropsContext.Provider>
    </div>
  );
};
export default TipTapEditor;
