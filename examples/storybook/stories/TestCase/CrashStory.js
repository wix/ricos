import React from 'react';
import { RichContentEditor, convertFromRaw, createWithContent } from 'wix-rich-content-editor';
import { RichContentViewer } from 'wix-rich-content-viewer';

import CrashFixture from '../../fixtures/CrashFixture';
import {
  RichContentEditorBox,
  RichContentViewerBox,
  ContentState,
  Section,
  Page,
} from '../Components/StoryParts';

const editorState = createWithContent(convertFromRaw(CrashFixture));
export default () => {
  const config = {};
  return (
    <Page title="Crash example">
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox>
          <RichContentEditor
            config={config}
            editorState={editorState}
            fallbackComponent={() => <h1>Hi!</h1>}
          />
        </RichContentEditorBox>
        <RichContentViewerBox>
          <RichContentViewer
            initialState={CrashFixture}
            fallbackComponent={() => <h1>My custom crash component!</h1>}
          />
        </RichContentViewerBox>
      </Section>

      <Section title="Content State">
        <ContentState json={CrashFixture} />
      </Section>
    </Page>
  );
};
