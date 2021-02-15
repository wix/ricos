import React, { FunctionComponent, useRef } from 'react';
import { RicosContent, RicosEditor } from 'ricos-editor';
import { pluginDivider } from 'wix-rich-content-plugin-divider';

const DividerEditor: FunctionComponent<{
  content?: RicosContent;
  injectedContent?: RicosContent;
  maxTextLength?: number;
}> = ({ content, injectedContent, maxTextLength }) => {
  const editorRef = useRef();
  const logTraits = () => {
    const traits = editorRef.current?.getContentTraits();
    console.debug(traits); // eslint-disable-line
  };
  return (
    <RicosEditor
      plugins={[pluginDivider()]}
      maxTextLength={maxTextLength}
      injectedContent={injectedContent}
      onChange={logTraits}
      content={content}
      ref={editorRef}
    />
  );
};

export default DividerEditor;
