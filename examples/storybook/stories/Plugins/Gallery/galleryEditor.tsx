import React, { FunctionComponent } from 'react';
import { DraftContent, RicosEditor } from 'ricos-editor';
import { RichContentEditor } from 'wix-rich-content-editor';
import { pluginGallery } from 'wix-rich-content-plugin-gallery';
import { Helpers } from 'wix-rich-content-common';

const GalleryEditor: FunctionComponent<{
  content?: DraftContent;
  handleFileUpload?: Helpers['handleFileUpload'];
}> = ({ content, handleFileUpload }) => (
  <RicosEditor plugins={[pluginGallery()]} content={content}>
    <RichContentEditor helpers={{ handleFileUpload }} />
  </RicosEditor>
);

export default GalleryEditor;
