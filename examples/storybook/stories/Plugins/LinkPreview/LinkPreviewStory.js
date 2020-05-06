import React from 'react';
import fixtrue from '../../../../../e2e/tests/fixtures/linkPreview.json';
import LinkPreviewEditor from './LinkPreviewEditor';
import LinkPreviewViewer from './LinkPreviewViewer';
import editorSourcecode from '!!raw-loader!./LinkPreviewEditor.js';
import viewerSourcecode from '!!raw-loader!./LinkPreviewViewer.js';

import {
  RichContentEditorBox,
  RichContentViewerBox,
  ContentState,
  Section,
  Page,
} from '../../Components/StoryParts';

export default () => {
  return (
    <Page title="Link Preview">
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox
          sourcecode={editorSourcecode}
          contentState={fixtrue}
          preset="blog-preset"
        >
          <LinkPreviewEditor contentState={fixtrue} />
        </RichContentEditorBox>
        <RichContentViewerBox preset="blog-preset" sourcecode={viewerSourcecode}>
          <LinkPreviewViewer contentState={fixtrue} />
        </RichContentViewerBox>
      </Section>

      <Section title="Content State">
        <ContentState json={fixtrue} />
      </Section>
    </Page>
  );
};
