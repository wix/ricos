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
import { fromProseMirror } from 'ricos-content/libs/converters';
// import Divider from './extensions/extension-divider';

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
  // Divider,
  Text,
];

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
