import React, { FunctionComponent } from 'react';
import { RicosContent, RicosEditor } from 'ricos/editor';
import { RichContentEditor } from 'ricos/editor';
import { pluginGallery } from 'ricos/gallery';
import { Helpers } from 'ricos/common';

const GalleryEditor: FunctionComponent<{
  content?: RicosContent;
  handleFileUpload?: Helpers['handleFileUpload'];
}> = ({ content, handleFileUpload }) => (
  <RicosEditor plugins={[pluginGallery()]} content={content}>
    <RichContentEditor helpers={{ handleFileUpload }} />
  </RicosEditor>
);

export default GalleryEditor;
