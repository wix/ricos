import React from 'react';
import InstagramEmbedState from '../../../../e2e/tests/fixtures/embed-plugin.json';
import { pluginHtml } from 'wix-rich-content-plugin-html/dist/module.viewer';
import { RicosViewer } from 'ricos-viewer';

import { RichContentViewerBox, ContentState, Section, Page } from '../Components/StoryParts';

const plugins = [pluginHtml()];
export default () => {
  return (
    <Page title="Instagram Embed">
      <Section title={'Height check'}>
        <RichContentViewerBox preset="blog-preset">
          <RicosViewer content={InstagramEmbedState} plugins={plugins} />
        </RichContentViewerBox>
      </Section>

      <Section title="Content State">
        <ContentState json={InstagramEmbedState} />
      </Section>
    </Page>
  );
};
