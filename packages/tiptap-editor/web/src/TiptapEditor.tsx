import React from 'react';
import Toolbar from './components/Toolbar';
import { JSONContent } from '@tiptap/core';
import { useEditor, EditorContent } from '@tiptap/react';
import { EditorPropsContext } from './context';
import Dropcursor from '@tiptap/extension-dropcursor';
import Gapcursor from '@tiptap/extension-gapcursor';
import Document from '@tiptap/extension-document';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
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

import { draftToTiptap, tiptapToDraft } from 'ricos-content/libs/converters';
import { createDivider } from './extensions/extension-divider';

const starterKitExtensions = [
  Blockquote,
  Bold,
  Underline,
  Highlight,
  BulletList,
  Code,
  CodeBlock,
  Document.extend({
    addAttributes() {
      return {
        metadata: {},
      };
    },
  }),
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
const TipTapEditor = ({ editorProps, onUpdate }) => {
  // draft to Prose

  const content = draftToTiptap(editorProps.initialState);
  const editor = useEditor({
    content,
    extensions: [...starterKitExtensions],
    injectCSS: true,
    onUpdate: ({ editor }) => {
      const newContent = editor.getJSON();
      // this is a workaround because some paragraph doesn't have content property (empty)
      const newContent2 = newContent.content.map(node => {
        if (node.type === 'paragraph') {
          return {
            content: [],
            ...node,
          };
        } else {
          return node;
        }
      });
      const convertedContent = tiptapToDraft(newContent2 as JSONContent);
      onUpdate && onUpdate(convertedContent);
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
