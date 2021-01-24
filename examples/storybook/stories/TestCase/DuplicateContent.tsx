import React, { useState } from 'react';

import { RichContentViewerBox, ContentState, Section, Page } from '../Components/StoryParts';
import { pluginLink } from 'wix-rich-content-plugin-link/viewer';
import { RicosViewer } from 'ricos-viewer';

import { Button } from 'wix-style-react';
import fixture from '../../../../e2e/tests/fixtures/duplicated-content.json';
import viewerTheme from './viewer.scss';

export default () => {
  const [counter, setCounter] = useState(1);
  return (
    <Page title="Duplicate Content">
      <Section title={'Viewer'}>
        <RichContentViewerBox preset="blog-preset">
          <RicosViewer content={fixture} plugins={[pluginLink()]} theme={viewerTheme} />
        </RichContentViewerBox>
      </Section>

      <Button onClick={() => setCounter(counter + 1)}>Re-render ({counter})</Button>

      <Section title="Content State">
        <ContentState json={fixture} />
      </Section>
    </Page>
  );
};
