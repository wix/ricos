import React from 'react';
import fixtrue from '../../../../../e2e/tests/fixtures/empty.json';
import VerticalEmbedEditor from './VerticalEmbedEditor';
import editorSourcecode from '!!raw-loader!./VerticalEmbedEditor.js';
import TabsWrapper from '../../Components/TabsWrapper';
import { RichContentEditorBox, ContentState, Section, Page } from '../../Components/StoryParts';
import apiData from '../apiData';

export default () => {
  return (
    <TabsWrapper apiData={apiData.VERTICAL_EMBED}>
      <Page title="Vertical Embed">
        <Section>
          <RichContentEditorBox sourcecode={editorSourcecode} contentState={fixtrue}>
            <VerticalEmbedEditor content={fixtrue} />
          </RichContentEditorBox>
        </Section>
        <Section title="Content State">
          <ContentState json={fixtrue} />
        </Section>
      </Page>
    </TabsWrapper>
  );
};
