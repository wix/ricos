import React from 'react';
import {
  RichContentEditorBox,
  RichContentViewerBox,
  Section,
  Page,
} from '../../Components/StoryParts';

import spoilerContentState from '../../../../../e2e/tests/fixtures/spoiler.json';
import SpoilerEditor from './SpoilerEditor';
import editorSourcecode from '!!raw-loader!./SpoilerEditor.js';
import SpoilerViewer from './SpoilerViewer';
import viewerSourcecode from '!!raw-loader!./SpoilerViewer.js';

export default () => {
  return (
    <Page title="Spoiler Plugin">
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox sourcecode={editorSourcecode} content={spoilerContentState}>
          <SpoilerEditor content={spoilerContentState} />
        </RichContentEditorBox>
        <RichContentViewerBox sourcecode={viewerSourcecode}>
          <SpoilerViewer content={spoilerContentState} />
        </RichContentViewerBox>
      </Section>
    </Page>
  );
};
