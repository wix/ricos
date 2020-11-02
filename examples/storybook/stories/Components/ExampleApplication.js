import React, { useState } from 'react';
import { RichContentEditorBox, RichContentViewerBox, Section } from './StoryParts';
import PropTypes from 'prop-types';

import EditorWrapper from './EditorWrapper';
import ViewerWrapper from './ViewerWrapper';
import editorSourceCode from '!!raw-loader!../Components/EditorWrapper';
import viewerSourceCode from '!!raw-loader!../Components/ViewerWrapper';
import styles from '../Components/styles.scss';

export default function ExampleApplication({ initialState, theme }) {
  const [content, setContent] = useState(initialState);

  return (
    <Section type={Section.Types.COMPARISON}>
      <RichContentEditorBox sourcecode={editorSourceCode}>
        <EditorWrapper
          content={content}
          theme={{ ...theme, parentClass: styles['rce-wrapper'] }}
          onChange={setContent}
        />
      </RichContentEditorBox>
      <RichContentViewerBox sourcecode={viewerSourceCode}>
        <ViewerWrapper content={content} theme={{ ...theme, parentClass: styles['rcv-wrapper'] }} />
      </RichContentViewerBox>
    </Section>
  );
}

ExampleApplication.propTypes = {
  initialState: PropTypes.object,
  theme: PropTypes.object,
};
