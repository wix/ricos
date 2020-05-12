import React from 'react';
import fixture from '../../../../e2e/tests/fixtures/shakey-embed.json';
import { htmlTypeMapper } from 'wix-rich-content-plugin-html/dist/module.viewer';
import { RichContentViewer } from 'wix-rich-content-viewer';

import { RichContentViewerBox, ContentState, Section, Page } from '../Components/StoryParts';

const typeMappers = [htmlTypeMapper];
export default () => {
  return (
    <Page title="Shakey Twitter Embed">
      <Section title={'RCV'}>
        <RichContentViewerBox preset="blog-preset">
          <RichContentViewer initialState={fixture} typeMappers={typeMappers} />
        </RichContentViewerBox>
      </Section>

      <Section title="Content State">
        <ContentState json={fixture} />
      </Section>
    </Page>
  );
};
