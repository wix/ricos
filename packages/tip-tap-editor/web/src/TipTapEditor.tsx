/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-new */
import React, { useEffect } from 'react';
import StarterKit from '@tiptap/starter-kit';
import LineHeight from './extensions/extension-line-height';
import Image from './extensions/extension-image';
import { convertProsMirrorContentToRicosContent } from './convertor';
import { useEditor, EditorContent } from '@tiptap/react';
import { Paragraph } from '@tiptap/extension-paragraph';
import { Document } from '@tiptap/extension-document';

type TipTapEditorProps = {
  onUpdate: ({ content }) => void;
};

const content = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      attrs: {
        lineHeight: 'normal',
      },
      content: [
        {
          type: 'text',
          text: 'yaron',
        },
      ],
    },

    {
      type: 'reactComponent',
      attrs: {
        imageData: {
          containerData: {
            alignment: 'LEFT',
            width: {
              type: 'SMALL',
            },
          },

          image: {
            src: {
              custom:
                'https://static.wixstatic.com/media/8bb438_53cc82c7bc8a4b41baf4db640e8b5641.jpg/v1/fill/w_700,h_467,al_c,q_90,usm_0.66_1.00_0.01/8bb438_53cc82c7bc8a4b41baf4db640e8b5641.webp',
            },
            width: 1621,
            height: 1081,
          },
          disableExpand: false,
        },
      },
    },
    {
      type: 'paragraph',
    },
  ],
};
const TipTapEditor = ({ onUpdate }: TipTapEditorProps) => {
  console.log({ Paragraph, Document });
  const editor = useEditor({
    content,
    extensions: [StarterKit, LineHeight, Image],
    injectCSS: false,
    onUpdate: ({ editor }) => {
      const newContent = editor.getJSON();
      console.log({ newContent });
      const convertedContent = convertProsMirrorContentToRicosContent(newContent);
      //@ts-ignore
      window.editor = editor;
      onUpdate({ content: convertedContent });
    },
  });
  return <EditorContent editor={editor} />;
};
export default TipTapEditor;
