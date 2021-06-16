import React, { FunctionComponent } from 'react';
import Toolbar from './components/Toolbar';
import { JSONContent } from '@tiptap/core';
import { useEditor, EditorContent } from '@tiptap/react';
import { EditorPropsContext } from './context';
import { draftToTiptap, fromTiptap, tiptapToDraft } from 'ricos-content/libs/converters';
import { createDivider } from './extensions/extension-divider';
import { tiptapExtensions } from './tiptap-extensions';
import { DraftContent } from 'ricos-content';

type TipTapEditorProps = {
  onUpdate?: ({ content }: { content: DraftContent }) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  editorProps: Record<string, any>;
};

const getEditorInstance = (content: JSONContent, onUpdate) =>
  useEditor({
    content,
    extensions: [...tiptapExtensions, createDivider()],
    injectCSS: true,
    onUpdate: ({ editor }) => {
      const newContent = editor.getJSON();
      const convertedContent = tiptapToDraft(newContent as JSONContent);
      onUpdate?.({ content: convertedContent });
    },
  });

export const initTipTapEditor = ({ editorProps, onUpdate }) => {
  const { initialState } = editorProps;
  const content = initialState && draftToTiptap(initialState);
  const editor = getEditorInstance(content, onUpdate);
  console.assert(!editor, 'error tiptap initialization'); // eslint-disable-line no-console
  return {
    Editor: () => (
      <div>
        <EditorPropsContext.Provider value={editorProps}>
          <EditorContent editor={editor} />
        </EditorPropsContext.Provider>
      </div>
    ),
    Toolbar: () => <Toolbar editor={editor} />,
    focus: editor?.commands.focus,
    blur: editor?.commands.blur,
  };
};
