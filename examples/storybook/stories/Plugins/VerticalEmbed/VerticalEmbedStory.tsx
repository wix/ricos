import React from 'react';
import fixtrue from '../../../../../e2e/tests/fixtures/empty.json';
import VerticalEmbedEditor from './VerticalEmbedEditor';
import VerticalEmbedSlimEditor from './VerticalEmbedSlimEditor';
import editorSourcecode from '!!raw-loader!./VerticalEmbedEditor.tsx';
import slimEditorSourcecode from '!!raw-loader!./VerticalEmbedSlimEditor.tsx';
import TabsWrapper from '../../Components/TabsWrapper';
import { RichContentEditorBox, ContentState, Section, Page } from '../../Components/StoryParts';
import apiData from '../apiData';

export default () => {
  return (
    <TabsWrapper apiData={apiData.VERTICAL_EMBED}>
      <Page title="Vertical Embed">
        <Section title="Basic Layout">
          <RichContentEditorBox sourcecode={editorSourcecode} content={fixtrue}>
            <VerticalEmbedEditor content={fixtrue} />
          </RichContentEditorBox>
        </Section>
        <Section title="Slim Layout">
          <RichContentEditorBox sourcecode={slimEditorSourcecode} content={fixtrue}>
            <VerticalEmbedSlimEditor content={fixtrue} />
          </RichContentEditorBox>
        </Section>
        <Section title="Content State">
          <ContentState json={fixtrue} />
        </Section>
      </Page>
    </TabsWrapper>
  );
};
