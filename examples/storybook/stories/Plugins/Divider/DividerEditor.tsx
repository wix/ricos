import React, { FunctionComponent, useRef } from 'react';
import { RicosContent, RicosEditor } from 'ricos-editor';
import { pluginDivider } from 'wix-rich-content-plugin-divider';

const DividerEditor: FunctionComponent<{ content?: RicosContent }> = ({ content }) => {
  const editorRef = useRef();
  const logTraits = () => {
    console.log(editorRef.current?.getContentTraits());
  };
  return (
    <RicosEditor
      plugins={[pluginDivider()]}
      onChange={logTraits}
      content={content}
      ref={editorRef}
    />
  );
};

export default DividerEditor;
