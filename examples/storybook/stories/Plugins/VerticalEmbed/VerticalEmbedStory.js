import React from 'react';
import { convertFromRaw, createWithContent } from 'wix-rich-content-editor';
import fixtrue from '../../../../../e2e/tests/fixtures/empty.json';
import VerticalEmbedEditor from './VerticalEmbedEditor';
import editorSourcecode from '!!raw-loader!./VerticalEmbedEditor.js';
import TabsWrapper from '../../Components/TabsWrapper';
import { RichContentEditorBox, ContentState, Section, Page } from '../../Components/StoryParts';
import apiData from '../apiData';

const editorState = createWithContent(convertFromRaw(fixtrue));

export default () => {
  return (
    <TabsWrapper apiData={apiData.VERTICAL_EMBED}>
      <Page title="Vertical Embed">
        <Section>
          <RichContentEditorBox sourcecode={editorSourcecode} contentState={fixtrue}>
            <VerticalEmbedEditor editorState={editorState} />
          </RichContentEditorBox>
        </Section>
        <Section title="Content State">
          <ContentState json={fixtrue} />
        </Section>
      </Page>
    </TabsWrapper>
  );
};
