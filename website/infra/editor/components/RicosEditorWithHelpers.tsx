import React from 'react';
import { RicosEditor } from 'ricos/editor';
import { RichContentEditor } from 'ricos/editor';
import isMobile from '../../mobileDetection';

export const RicosEditorWithHelpers = ({ plugins, content, handleFileUpload, placeholder }) => (
  <RicosEditor plugins={plugins} content={content} placeholder={placeholder} isMobile={isMobile}>
    <RichContentEditor helpers={{ handleFileUpload }} />
  </RicosEditor>
);
