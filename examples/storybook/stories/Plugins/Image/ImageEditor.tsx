import React, { FunctionComponent } from 'react';
import { RicosContent, RicosEditor } from 'ricos/editor';
import { Helpers } from 'ricos/common';
import { RichContentEditor } from 'ricos/editor';
import { pluginImage } from 'ricos/image';

const ImageEditor: FunctionComponent<{
  content?: RicosContent;
  handleFileUpload?: Helpers['handleFileUpload'];
}> = ({ content, handleFileUpload }) => (
  <RicosEditor plugins={[pluginImage()]} content={content}>
    <RichContentEditor helpers={{ handleFileUpload }} />
  </RicosEditor>
);

export default ImageEditor;
