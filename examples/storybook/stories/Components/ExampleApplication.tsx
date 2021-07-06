import React, { FunctionComponent, useMemo, useState } from 'react';
import { RichContentEditorBox, RichContentViewerBox, Section } from './StoryParts';
import EditorWrapper from './EditorWrapper';
import ViewerWrapper from './ViewerWrapper';
import editorSourceCode from '!!raw-loader!../Components/EditorWrapper';
import viewerSourceCode from '!!raw-loader!../Components/ViewerWrapper';
import styles from './styles.scss';
import { DraftContent, RicosTheme } from 'ricos-editor';

const ExampleApplication: FunctionComponent<{
  initialState?: DraftContent;
  theme?: RicosTheme;
  display?: 'Editor' | 'Viewer' | 'Both';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  editorProps?: Record<string, any>;
}> = ({ initialState, theme, display = 'Both', editorProps = {} }) => {
  const [content, setContent] = useState(initialState);
  const showEditor = useMemo(() => display === 'Both' || display === 'Editor', [display]);
  const showViewer = useMemo(() => display === 'Both' || display === 'Viewer', [display]);

  return (
    <Section type={Section.Types.COMPARISON}>
      {showEditor && (
        <RichContentEditorBox sourcecode={editorSourceCode}>
          <EditorWrapper
            content={content}
            theme={{ ...theme, parentClass: styles['rce-wrapper'] }}
            onChange={setContent}
            {...editorProps}
          />
        </RichContentEditorBox>
      )}
      {showViewer && (
        <RichContentViewerBox sourcecode={viewerSourceCode}>
          <ViewerWrapper
            content={content}
            theme={{ ...theme, parentClass: styles['rcv-wrapper'] }}
          />
        </RichContentViewerBox>
      )}
    </Section>
  );
};

export default ExampleApplication;
