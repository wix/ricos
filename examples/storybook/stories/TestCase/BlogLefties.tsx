import React from 'react';
import { pluginHtml } from 'ricos/html/viewer';
import { RichContentViewerBox, ContentState, Section, Page } from '../Components/StoryParts';
import { RicosViewer } from 'ricos/viewer';
import { pluginImage } from 'ricos/image/viewer';
import { pluginGallery } from 'ricos/gallery/viewer';
import { pluginVideo } from 'ricos/video/viewer';
import { pluginDivider } from 'ricos/divider/viewer';
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
