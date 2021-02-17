import React, { FunctionComponent } from 'react';
import { RicosContent, RicosEditor } from 'ricos/editor';
import { pluginVideo } from 'ricos/video/editor';

const Editor: FunctionComponent<{
  content?: RicosContent;
  handleFileUpload?: (files, updateEntity) => void;
}> = ({ content, handleFileUpload }) => (
  <RicosEditor plugins={[pluginVideo({ handleFileUpload })]} content={content} />
);

export default Editor;
