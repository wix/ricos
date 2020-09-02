import React, { useState } from 'react';
import { RichContentEditorBox, RichContentViewerBox, Section } from './StoryParts';
import PropTypes from 'prop-types';

import EditorWrapper from './EditorWrapper';
import ViewerWrapper from './ViewerWrapper';
import editorSourceCode from '!!raw-loader!../Components/EditorWrapper';
import viewerSourceCode from '!!raw-loader!../Components/ViewerWrapper';
import createThemeStrategy from 'ricos-theme';

export default function ExampleApplication({ initialState, palette }) {
  const [content, setContent] = useState(initialState);
  const theme = { palette, createThemeStrategy };
  return (
    <Section type={Section.Types.COMPARISON}>
      <RichContentEditorBox sourcecode={editorSourceCode}>
        <EditorWrapper content={content} theme={theme} onChange={setContent} />
      </RichContentEditorBox>
      <RichContentViewerBox sourcecode={viewerSourceCode}>
        <ViewerWrapper content={content} theme={theme} />
      </RichContentViewerBox>
    </Section>
  );
}

ExampleApplication.propTypes = {
  initialState: PropTypes.object,
  palette: PropTypes.arrayOf(PropTypes.object),
};
