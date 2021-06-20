import React, { FC } from 'react';
import { curry } from 'lodash/fp';
import { pipe } from 'fp-ts/lib/function';
import { EditorPropsContext } from './context';
import Toolbar from './components/Toolbar';
import { JSONContent, Command } from '@tiptap/core';
import { Editor, EditorContent } from '@tiptap/react';
import { draftToTiptap, tiptapToDraft } from 'ricos-content/libs/converters';
import { createDivider } from './extensions/extension-divider';
import { tiptapExtensions } from './tiptap-extensions';
import { DraftContent } from 'ricos-content';
import { RicosEditorProps } from 'ricos-common';

type TiptapConfig = {
  onUpdate?: ({ content }: { content: DraftContent }) => void;
  initialContent: DraftContent;
  _rcProps: RicosEditorProps['_rcProps']; // eslint-disable-line
};

export type TiptapAPI = {
  Editor: FC;
  blur: () => void;
  focus: () => void;
  // eslint-disable-next-line
  getEditorCommands: () => Record<string, any>; // EditorCommands;
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

const toTiptapAPI = curry(
  (props, editor: Editor): TiptapAPI => ({
    Editor: () => (
      <EditorPropsContext.Provider value={props}>
        <EditorContent editor={editor} />
      </EditorPropsContext.Provider>
    ),
    blur: () => editor.commands.blur(),
    focus: () => editor.commands.focus(true),
    getEditorCommands: () => ({}),
    getToolbars: () => ({
      MobileToolbar: () => <Toolbar editor={editor} />,
      TextToolbar: () => <Toolbar editor={editor} />,
    }),
    getToolbarProps: () => ({}),
    destroy: editor.destroy,
  })
);

export const initTiptapEditor = ({ initialContent, onUpdate, _rcProps }: TiptapConfig): TiptapAPI =>
  pipe(initialContent, draftToTiptap, getEditorInstance(onUpdate), toTiptapAPI(_rcProps));
