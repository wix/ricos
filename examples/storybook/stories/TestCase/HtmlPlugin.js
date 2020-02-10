import React from 'react';
import InstagramEmbedState from '../../../../e2e/tests/fixtures/embed-plugin.json';
import { htmlTypeMapper, HTML_TYPE } from 'wix-rich-content-plugin-html/dist/module.viewer';
import { RichContentViewer } from 'wix-rich-content-viewer';

import { RichContentViewerBox, ContentState, Section, Page } from '../Components/StoryParts';

const typeMappers = [htmlTypeMapper];
export default () => {
  const config = {
    [HTML_TYPE]: {
      htmlIframeSrc: `/static/html-plugin-embed.html`,
    },
  };
  return (
    <Page title="Instagram Embed">
      <Section title={'Height check'}>
        <RichContentViewerBox preset="blog-preset">
          <RichContentViewer
            initialState={InstagramEmbedState}
            typeMappers={typeMappers}
            config={config}
          />
        </RichContentViewerBox>
      </Section>

      <Section title="Content State">
        <ContentState json={InstagramEmbedState} />
      </Section>
    </Page>
  );
};
