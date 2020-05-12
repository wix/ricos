import React from 'react';
import {
  RichContentEditorBox,
  RichContentViewerBox,
  Section,
  Page,
} from '../../Components/StoryParts';

import dividerContentState from '../../../../../e2e/tests/fixtures/divider.json';
import DividerEditor from './DividerEditor';
import editorSourcecode from '!!raw-loader!./DividerEditor.js';
import DividerViewer from './DividerViewer';
import viewerSourcecode from '!!raw-loader!./DividerViewer.js';

export default () => {
  return (
    <Page title="Divider Plugin">
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox sourcecode={editorSourcecode} content={dividerContentState}>
          <DividerEditor content={dividerContentState} />
        </RichContentEditorBox>
        <RichContentViewerBox sourcecode={viewerSourcecode}>
          <DividerViewer content={dividerContentState} />
        </RichContentViewerBox>
      </Section>
    </Page>
  );
};
