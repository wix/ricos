import React, { FunctionComponent } from 'react';
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

import { draftToTiptap, fromTiptap, tiptapToDraft, toDraft } from 'ricos-content/libs/converters';
import { createDivider } from './extensions/extension-divider';
import { DraftContent } from 'ricos-content';

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
  onUpdate?: ({ content }: { content: DraftContent }) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  editorProps: Record<string, any>;
};
const TipTapEditor: FunctionComponent<TipTapEditorProps> = ({ editorProps, onUpdate }) => {
  const { initialState } = editorProps;
  const content = initialState && draftToTiptap(initialState);
  const editor = useEditor({
    content,
    extensions: [...starterKitExtensions],
    injectCSS: true,
    onUpdate: ({ editor }) => {
      const newContent = editor.getJSON();
      console.log({ newContent });
      const convertedContent = tiptapToDraft(newContent as JSONContent);
      onUpdate?.({ content: convertedContent });
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
