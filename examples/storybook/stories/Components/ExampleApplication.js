import React, { useState } from 'react';
import { RichContentEditorBox, RichContentViewerBox, Section } from './StoryParts';
import PropTypes from 'prop-types';

import EditorWrapper from './EditorWrapper';
import ViewerWrapper from './ViewerWrapper';
import editorSourceCode from '!!raw-loader!../Components/EditorWrapper';
import viewerSourceCode from '!!raw-loader!../Components/ViewerWrapper';
import styles from '../Components/styles.scss';
import { createTheme } from 'ricos-theme';

export default function ExampleApplication({ initialState, palette }) {
  const [content, setContent] = useState(initialState);

  return (
    <Section type={Section.Types.COMPARISON}>
      <RichContentEditorBox sourcecode={editorSourceCode}>
        <EditorWrapper
          content={content}
          theme={createTheme({ palette, parentClass: styles['rce-wrapper'] })}
          onChange={setContent}
        />
      </RichContentEditorBox>
      <RichContentViewerBox sourcecode={viewerSourceCode}>
        <ViewerWrapper
          content={content}
          theme={createTheme({ palette, parentClass: styles['rcv-wrapper'] })}
        />
      </RichContentViewerBox>
    </Section>
  );
}

ExampleApplication.propTypes = {
  initialState: PropTypes.object,
  palette: PropTypes.arrayOf(PropTypes.object),
};
