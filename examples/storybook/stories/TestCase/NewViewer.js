import React from 'react';
import RicosFixture from '../../../../packages/ricos-content/web/src/migrateSchema/migratedFixtures/intro.json';
import { RichContentViewerBox, ContentState, Section, Page } from '../Components/StoryParts';
import { RicosViewer } from 'ricos-viewer';
import RicosContentViewer from 'ricos-viewer/libs/RicosContentViewer';
import { pluginDivider } from 'wix-rich-content-plugin-divider/viewer';
export default () => {
  return (
    <Page title="New Viewer">
      <Section title={'Viewer check'}>
        <RichContentViewerBox preset="blog-preset">
          <RicosViewer content={RicosFixture} plugins={[pluginDivider()]}>
            <RicosContentViewer />
          </RicosViewer>
        </RichContentViewerBox>
      </Section>

      <Section title="Content State">
        <ContentState json={RicosFixture} />
      </Section>
    </Page>
  );
};
