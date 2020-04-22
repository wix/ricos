import React from 'react';
import { htmlTypeMapper } from 'wix-rich-content-plugin-html/dist/module.viewer';
import { RichContentViewerBox, ContentState, Section, Page } from '../Components/StoryParts';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { imageTypeMapper } from 'wix-rich-content-plugin-image/dist/module.viewer';
import { linkTypeMapper } from 'wix-rich-content-plugin-link/dist/module.viewer';
import fixture from '../../../../e2e/tests/fixtures/plugin-left-alignment.json';

import viewerTheme from './viewer.scss';

const typeMappers = [imageTypeMapper, linkTypeMapper, htmlTypeMapper];
const theme = {
  ...viewerTheme,
};

export default () => {
  return (
    <Page title="HTML Height">
      <Section title={'Height check'}>
        <RichContentViewerBox preset="blog-preset">
          <RichContentViewer initialState={fixture} typeMappers={typeMappers} theme={theme} />
        </RichContentViewerBox>
      </Section>

      <Section title="Content State">
        <ContentState json={fixture} />
      </Section>
    </Page>
  );
};
