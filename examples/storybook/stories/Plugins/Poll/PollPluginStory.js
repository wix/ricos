import React from 'react';
import {
  RichContentEditorBox,
  RichContentViewerBox,
  Section,
  Page,
} from '../../Components/StoryParts';

import pollContentState from '../../../../../e2e/tests/fixtures/poll.json';
import PollEditor from './PollEditor';
import editorSourcecode from '!!raw-loader!./PollEditor.js';
import PollViewer from './PollViewer';
import viewerSourcecode from '!!raw-loader!./PollViewer.js';

export default () => {
  return (
    <Page title="Poll Plugin">
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox sourcecode={editorSourcecode} content={pollContentState}>
          <PollEditor content={pollContentState} />
        </RichContentEditorBox>
        <RichContentViewerBox sourcecode={viewerSourcecode}>
          <PollViewer content={pollContentState} />
        </RichContentViewerBox>
      </Section>
    </Page>
  );
};
