/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-new */
import React, { useEffect } from 'react';
import { defaultExtensions } from '@tiptap/starter-kit';
import { Editor } from '@tiptap/core';
// import Document from '@tiptap/extension-document'
// import Paragraph from '@tiptap/extension-paragraph'
// import Text from '@tiptap/extension-text'
// import Heading from '@tiptap/extension-heading'

const TipTapEditor = () => {
  useEffect(() => {
    new Editor({
      //@ts-ignore
      element: document.querySelector('#tip-tap-editor'),
      extensions: defaultExtensions(),
    });
  }, []);
  return <div id="tip-tap-editor" />;
};
export default TipTapEditor;
