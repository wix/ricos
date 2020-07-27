import React, { useState } from 'react';
import { RichContentEditorBox, RichContentViewerBox, Section } from './StoryParts';
import PropTypes from 'prop-types';

import EditorWrapper from './EditorWrapper';
import ViewerWrapper from './ViewerWrapper';
import editorSourceCode from '!!raw-loader!../Components/EditorWrapper';
import viewerSourceCode from '!!raw-loader!../Components/ViewerWrapper';

export default function ExampleApplication({ initialState, palette }) {
  const [content, setContent] = useState(initialState);
  return (
    <Section type={Section.Types.COMPARISON} palette={palette}>
      <RichContentEditorBox sourcecode={editorSourceCode}>
        <EditorWrapper content={content} onChange={setContent} palette={palette} />
      </RichContentEditorBox>
      <RichContentViewerBox sourcecode={viewerSourceCode}>
        <ViewerWrapper content={content} palette={palette} />
      </RichContentViewerBox>
    </Section>
  );
}

ExampleApplication.propTypes = {
  initialState: PropTypes.object,
  palette: PropTypes.arrayOf(PropTypes.object),
};
