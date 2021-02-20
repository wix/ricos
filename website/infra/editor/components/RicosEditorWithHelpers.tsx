import React from 'react';
import { RicosEditor } from 'ricos-editor';
import { RichContentEditor } from 'wix-rich-content-editor';
import isMobile from '../../mobileDetection';

export const RicosEditorWithHelpers = ({ plugins, content, handleFileUpload, placeholder }) => (
  <RicosEditor plugins={plugins} content={content} placeholder={placeholder} isMobile={isMobile}>
    <RichContentEditor helpers={{ handleFileUpload }} />
  </RicosEditor>
);
