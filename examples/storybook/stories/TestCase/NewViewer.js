import React from 'react';
import RicosFixture from '../../../../packages/ricos-content/web/src/migrateSchema/migratedFixtures/intro.json';
import { RichContentViewerBox, ContentState, Section, Page } from '../Components/StoryParts';
import RicosViewer from 'ricos-viewer/libs/RicosViewer';
import dividerRenderer from 'wix-rich-content-plugin-divider/dist/module.viewer.ricos';
export default () => {
  return (
    <Page title="New Viewer">
      <Section title={'Viewer check'}>
        <RichContentViewerBox preset="blog-preset">
          <RicosViewer content={RicosFixture} plugins={[dividerRenderer]} />
        </RichContentViewerBox>
      </Section>
      <ReactAndStaticHtmlPOC />

      <Section title="Content State">
        <ContentState json={RicosFixture} />
      </Section>
    </Page>
  );
};
