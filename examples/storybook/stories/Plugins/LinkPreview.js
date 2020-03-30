import React from 'react';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { RichContentEditor, convertFromRaw, createWithContent } from 'wix-rich-content-editor';
import { linkPreviewTypeMapper } from 'wix-rich-content-plugin-link-preview/dist/module.viewer';
import { linkTypeMapper } from 'wix-rich-content-plugin-link/dist/module.viewer';
import { pluginLinkPreview } from 'wix-rich-content-plugin-link-preview';
import { pluginLink } from 'wix-rich-content-plugin-link';
import fixtrue from '../../../../e2e/tests/fixtures/linkPreview.json';
import { RichContentWrapper } from 'wix-rich-content-wrapper';
import { mockFetchUrlPreviewData } from '../../../main/shared/utils/linkPreviewUtil';

import {
  RichContentEditorBox,
  RichContentViewerBox,
  ContentState,
  Section,
  Page,
} from '../Components/StoryParts';

const typeMappers = [linkPreviewTypeMapper, linkTypeMapper];
const editorState = createWithContent(convertFromRaw(fixtrue));

export default () => {
  const plugins = [pluginLink(), pluginLinkPreview({ fetchData: mockFetchUrlPreviewData() })];

  return (
    <Page title="Link Preview">
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox preset="blog-preset">
          <RichContentWrapper plugins={plugins} editor>
            <RichContentEditor editorState={editorState} />
          </RichContentWrapper>
        </RichContentEditorBox>
        <RichContentViewerBox preset="blog-preset">
          <RichContentViewer initialState={fixtrue} typeMappers={typeMappers} />
        </RichContentViewerBox>
      </Section>

      <Section title="Content State">
        <ContentState json={fixtrue} />
      </Section>
    </Page>
  );
};
