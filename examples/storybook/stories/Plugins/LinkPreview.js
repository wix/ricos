import React from 'react';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { RichContentEditor, convertFromRaw, createWithContent } from 'wix-rich-content-editor';
import {
  linkPreviewTypeMapper,
  LINK_PREVIEW_TYPE,
} from 'wix-rich-content-plugin-link-preview/dist/module.viewer';
import { linkTypeMapper } from 'wix-rich-content-plugin-link/dist/module.viewer';
import { pluginLinkPreview } from 'wix-rich-content-plugin-link-preview';
import { pluginLink } from 'wix-rich-content-plugin-link';
import LinkPreview from '../../../../e2e/tests/fixtures/linkPreview.json';
import { RichContentWrapper } from 'wix-rich-content-wrapper';

import {
  RichContentEditorBox,
  RichContentViewerBox,
  ContentState,
  Section,
  Page,
} from '../Components/StoryParts';

const typeMappers = [linkPreviewTypeMapper, linkTypeMapper];
export default () => {
  const config = {
    [LINK_PREVIEW_TYPE]: {},
  };
  const plugins = [pluginLink(), pluginLinkPreview()];

  return (
    <Page title="Link Preview">
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox preset="blog-preset">
          <RichContentWrapper plugins={plugins}>
            <RichContentEditor
              editorState={createWithContent(convertFromRaw(LinkPreview))}
              config={config}
            />
          </RichContentWrapper>
        </RichContentEditorBox>
        <RichContentViewerBox preset="blog-preset">
          <RichContentViewer initialState={LinkPreview} typeMappers={typeMappers} />
        </RichContentViewerBox>
      </Section>

      <Section title="Content State">
        <ContentState json={LinkPreview} />
      </Section>
    </Page>
  );
};
