import React from 'react';
import {
  RichContentEditorBox,
  RichContentViewerBox,
  Section,
  Page,
} from '../../Components/StoryParts';

import collapsibleListContentState from '../../../../../e2e/tests/fixtures/collapsible-list-rich-text.json';
import CollapsibleListEditor from './CollapsibleListEditor';
import editorSourcecode from '!!raw-loader!./CollapsibleListEditor.tsx';
import CollapsibleListViewer from './CollapsibleListViewer';
import viewerSourcecode from '!!raw-loader!./CollapsibleListViewer.tsx';

export default () => {
  return (
    <Page title="Collapsible List Plugin">
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox sourcecode={editorSourcecode} content={collapsibleListContentState}>
          <CollapsibleListEditor content={collapsibleListContentState} />
        </RichContentEditorBox>
        <RichContentViewerBox sourcecode={viewerSourcecode}>
          <CollapsibleListViewer content={collapsibleListContentState} />
        </RichContentViewerBox>
      </Section>
    </Page>
  );
};
