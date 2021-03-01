import React from 'react';
import { RicosEditor } from 'ricos-editor';
import 'ricos-editor/dist/styles.min.css';
import { withEditorContext } from 'wix-rich-content-editor-common';

const Component = () => {
  return <RicosEditor />;
};

export default withEditorContext(Component);
