/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-new */
import React, { useEffect } from 'react';
import { defaultExtensions } from '@tiptap/starter-kit';
import { Editor } from '@tiptap/core';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Bold from '@tiptap/extension-bold';
// import Heading from '@tiptap/extension-heading'
import Underline from '@tiptap/extension-underline';
import LineHeight from './extensions/extension-line-height';

const content = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: '1',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: '2',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: '3',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: '4',
        },
      ],
    },
  ],
};


const TipTapEditor = () => {
  console.log({ LineHeight })
  useEffect(() => {
    const editor = new Editor({
      //@ts-ignore
      element: document.querySelector('#tip-tap-editor'),
      extensions: [Document, Text, Paragraph, Underline, Bold, LineHeight],
      injectCSS: false,
      content,
    });

    //@ts-ignore
    window.editor = editor;
  }, []);
  return <div id="tip-tap-editor" />;
};
export default TipTapEditor;

