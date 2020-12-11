import React, { useState } from 'react';

import { RichContentViewerBox, ContentState, Section, Page } from '../Components/StoryParts';
import { Button } from 'wix-style-react';
import ViewerWrapper from '../Components/ViewerWrapper';
import { pluginHtml } from 'wix-rich-content-plugin-html/viewer';
import { pluginImage } from 'wix-rich-content-plugin-image/viewer';
import { pluginGallery } from 'wix-rich-content-plugin-gallery/viewer';
import { pluginVideo } from 'wix-rich-content-plugin-video/viewer';
import { pluginDivider } from 'wix-rich-content-plugin-divider/viewer';
import fixture from '../../../../e2e/tests/fixtures/duplicated-content.json';

import viewerTheme from './viewer.scss';

const plugins = [pluginImage(), pluginHtml(), pluginGallery(), pluginVideo(), pluginDivider()];

const theme = {
  ...viewerTheme,
};

export default () => {
  const [counter, setCounter] = useState(1);
  return (
    <Page title="Duplicate Content">
      <Section title={'Viewer'}>
        <RichContentViewerBox preset="blog-preset">
          <ViewerWrapper content={fixture} theme={theme} />
        </RichContentViewerBox>
      </Section>

      <Button onClick={() => setCounter(counter + 1)}>Re-render ({counter})</Button>

      <Section title="Content State">
        <ContentState json={fixture} />
      </Section>
    </Page>
  );
};
