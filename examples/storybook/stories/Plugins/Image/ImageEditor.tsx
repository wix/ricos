import React, { FunctionComponent } from 'react';
import { DraftContent, RicosEditor } from 'ricos-editor';
import { Helpers } from 'wix-rich-content-common';
import { RichContentEditor } from 'wix-rich-content-editor';
import { pluginImage } from 'wix-rich-content-plugin-image';

const ImageEditor: FunctionComponent<{
  content?: DraftContent;
  handleFileUpload?: Helpers['handleFileUpload'];
}> = ({ content, handleFileUpload }) => (
  <RicosEditor plugins={[pluginImage()]} content={content}>
    <RichContentEditor helpers={{ handleFileUpload }} />
  </RicosEditor>
);

export default ImageEditor;
