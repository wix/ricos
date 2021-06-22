import React, { FC } from 'react';
import { compose, curry } from 'lodash/fp';
import { EditorPropsContext } from './context';
import Toolbar from './components/Toolbar';
import { JSONContent } from '@tiptap/core';
import { Editor, EditorContent } from '@tiptap/react';
import { draftToTiptap, tiptapToDraft } from 'ricos-content/libs/converters';
import { createDivider } from './extensions/extension-divider';
import { tiptapExtensions } from './tiptap-extensions';
import { DraftContent } from 'ricos-content';

type TiptapConfig = {
  onUpdate?: ({ content }: { content: DraftContent }) => void;
  initialContent: DraftContent;
};

export type TiptapAPI = {
  Editor: FC;
  blur: () => void;
  focus: () => void;
  // eslint-disable-next-line
  getEditorCommands: () => Editor['commands']; // EditorCommands;
  getToolbars: () => Record<string, FC>;
  // eslint-disable-next-line
  getToolbarProps: () => Record<string, any>; // to be deprecated
  destroy: Editor['destroy'];
};

const getEditorInstance = curry(
  (onUpdate, content: JSONContent) =>
    new Editor({
      content,
      extensions: [...tiptapExtensions, createDivider()],
      injectCSS: true,
      onUpdate: ({ editor }) => {
        const newContent = editor.getJSON();
        const convertedContent = tiptapToDraft(newContent as JSONContent);
        onUpdate?.({ content: convertedContent });
      },
    })
);

const toTiptapAPI = (editor: Editor): TiptapAPI => ({
  Editor: props => (
    <EditorPropsContext.Provider value={props}>
      <EditorContent editor={editor} />
    </EditorPropsContext.Provider>
  ),
  blur: () => editor.commands.blur(),
  focus: () => editor.commands.focus(true),
  getEditorCommands: () => editor.commands,
  getToolbars: () => ({
    MobileToolbar: () => <Toolbar editor={editor} />,
    TextToolbar: () => <Toolbar editor={editor} />,
  }),
  getToolbarProps: () => ({}),
  destroy: editor.destroy.bind(editor),
});

export const initTiptapEditor = ({ initialContent, onUpdate }: TiptapConfig): TiptapAPI =>
  compose(toTiptapAPI, getEditorInstance(onUpdate), draftToTiptap)(initialContent);
