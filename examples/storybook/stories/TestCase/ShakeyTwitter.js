import React from 'react';
import fixture from '../../../../e2e/tests/fixtures/shakey-embed.json';
import { pluginHtml } from 'wix-rich-content-plugin-html/dist/module.viewer';
import { RicosViewer } from 'ricos-viewer';

import { RichContentViewerBox, ContentState, Section, Page } from '../Components/StoryParts';

const plugins = [pluginHtml()];
export default () => {
  return (
    <Page title="Instagram Embed">
      <Section title={'Height check'}>
        <RichContentViewerBox preset="blog-preset">
          <RicosViewer content={fixture} plugins={plugins} />
        </RichContentViewerBox>
      </Section>

      <Section title="Content State">
        <ContentState json={fixture} />
      </Section>
    </Page>
  );
};
