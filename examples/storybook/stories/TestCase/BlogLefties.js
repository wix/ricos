import React from 'react';
import { pluginHtml } from 'wix-rich-content-plugin-html/viewer';
import { RichContentViewerBox, ContentState, Section, Page } from '../Components/StoryParts';
import { RicosViewer } from 'ricos-viewer';
import { pluginImage } from 'wix-rich-content-plugin-image/viewer';
import { pluginGallery } from 'wix-rich-content-plugin-gallery/viewer';
import { pluginVideo } from 'wix-rich-content-plugin-video/viewer';
import { pluginDivider } from 'wix-rich-content-plugin-divider/viewer';
import fixture from '../../../../e2e/tests/fixtures/plugin-left-alignment.json';

import viewerTheme from './viewer.scss';

const plugins = [pluginImage(), pluginHtml(), pluginGallery(), pluginVideo(), pluginDivider()];
const theme = {
  ...viewerTheme,
};

export default () => {
  return (
    <Page title="HTML Height">
      <Section title={'Height check'}>
        <RichContentViewerBox preset="blog-preset">
          <RicosViewer content={fixture} plugins={plugins} theme={theme} />
        </RichContentViewerBox>
      </Section>

      <Section title="Content State">
        <ContentState json={fixture} />
      </Section>
    </Page>
  );
};
