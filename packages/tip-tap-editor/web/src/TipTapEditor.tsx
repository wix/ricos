/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-new */
import React, { useEffect } from 'react';
import { defaultExtensions } from '@tiptap/starter-kit';
import { Editor } from '@tiptap/core';
import LineHeight from './extensions/extension-line-height';
import { convertProsMirrorContentToRicosContent } from './convertor';

type TipTapEditorProps = {
  onUpdate: ({ content }) => void;
};

const TipTapEditor = ({ onUpdate }: TipTapEditorProps) => {
  useEffect(() => {
    const editor = new Editor({
      //@ts-ignore
      element: document.querySelector('#tip-tap-editor'),
      //@ts-ignore
      extensions: [...defaultExtensions(), LineHeight],
      injectCSS: false,
      onUpdate: ({ editor }) => {
        const newContent = editor.getJSON();
        const convertedContent = convertProsMirrorContentToRicosContent(newContent);
        onUpdate({ content: convertedContent });
      },
    });

    //@ts-ignore
    window.editor = editor;
  }, []);
  return <div id="tip-tap-editor" />;
};
export default TipTapEditor;
