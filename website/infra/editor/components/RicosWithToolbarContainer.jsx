import React, { useEffect } from 'react';
import { RicosEditor } from 'ricos-editor';
import 'ricos-editor/dist/styles.min.css';
import content from '../content/intro.json';

const RicosWithToolbarContainer = () => {
  const bottomToolbar = document.createElement('div');

  useEffect(() => {
    const wrappingDiv = document.getElementById('editor-static-toolbar-wrapper');
    wrappingDiv && wrappingDiv.appendChild(bottomToolbar);
  }, []);

  return (
    <div className="card" id="editor-static-toolbar-wrapper">
      <RicosEditor toolbarSettings={{ textToolbarContainer: bottomToolbar }} content={content} />
    </div>
  );
};

export default RicosWithToolbarContainer;
