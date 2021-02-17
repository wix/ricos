import React from 'react';

import { RichContentViewerBox, ContentState, Section, Page } from '../Components/StoryParts';

import fixture from '../../../../e2e/tests/fixtures/oembeds.json';
import ViewerWrapper from '../Components/ViewerWrapper';

export default () => {
  return (
    <Page title="Videos And Oembeds">
      <Section title={'Test Content'}>
        <RichContentViewerBox preset="blog-preset">
          <ViewerWrapper content={fixture} />
        </RichContentViewerBox>
      </Section>

      <Section title="Content State">
        <ContentState json={fixture} />
      </Section>
    </Page>
  );
};
