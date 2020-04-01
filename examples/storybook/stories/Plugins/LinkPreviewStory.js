import React from 'react';
import { convertFromRaw, createWithContent } from 'wix-rich-content-editor';
import fixtrue from '../../../../e2e/tests/fixtures/linkPreview.json';
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
} from '../Components/StoryParts';

const editorState = createWithContent(convertFromRaw(fixtrue));

export default () => {
  return (
    <Page title="Link Preview">
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox
          sourcecode={editorSourcecode}
          contentState={fixtrue}
          preset="blog-preset"
        >
          <LinkPreviewEditor editorState={editorState} />
        </RichContentEditorBox>
        <RichContentViewerBox preset="blog-preset" sourcecode={viewerSourcecode}>
          <LinkPreviewViewer initialState={fixtrue} />
        </RichContentViewerBox>
      </Section>

      <Section title="Content State">
        <ContentState json={fixtrue} />
      </Section>
    </Page>
  );
};
