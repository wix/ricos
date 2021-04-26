import React from 'react';
import fixtrue from '../../../../../e2e/tests/fixtures/tablesExamples.json';
import TableViewer from './TableViewer';
import TableEditor from './TableEditor';
import viewerSourcecode from '!!raw-loader!./TableViewer.tsx';
import editorSourcecode from '!!raw-loader!./TableEditor.tsx';
import {
  RichContentEditorBox,
  RichContentViewerBox,
  ContentState,
  Section,
  Page,
} from '../../Components/StoryParts';

export default () => {
  return (
    <Page title="Table">
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox sourcecode={editorSourcecode} content={fixtrue}>
          <TableEditor content={fixtrue} />
        </RichContentEditorBox>
        <RichContentViewerBox sourcecode={viewerSourcecode}>
          <TableViewer content={fixtrue} />
        </RichContentViewerBox>
      </Section>

      <Section title="Content State">
        <ContentState json={fixtrue} />
      </Section>
    </Page>
  );
};
