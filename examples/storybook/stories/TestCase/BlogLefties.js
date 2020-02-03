import React from 'react';
import { htmlTypeMapper, HTML_TYPE } from 'wix-rich-content-plugin-html/dist/module.viewer';
import { RichContentViewerBox, ContentState, Section, Page } from '../Components/StoryParts';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { imageTypeMapper } from 'wix-rich-content-plugin-image/dist/module.viewer';
import { linkTypeMapper } from 'wix-rich-content-plugin-link/dist/module.viewer';
import AlignLeftiesState from '../../fixtures/AlignLefties';
import viewerTheme from './viewer.scss';

const typeMappers = [imageTypeMapper, linkTypeMapper, htmlTypeMapper];
const theme = {
  ...viewerTheme,
};

export default () => {
  const config = {
    [HTML_TYPE]: {
      htmlIframeSrc: `/static/html-plugin-embed.html`,
    },
  };
  return (
    <Page title="HTML Height">
      <Section title={'Height check'}>
        <RichContentViewerBox preset="blog-preset">
          <RichContentViewer
            initialState={AlignLeftiesState}
            typeMappers={typeMappers}
            config={config}
            theme={theme}
          />
        </RichContentViewerBox>
      </Section>

      <Section title="Content State">
        <ContentState json={AlignLeftiesState} />
      </Section>
    </Page>
  );
};
