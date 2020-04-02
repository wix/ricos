import React from 'react';
import {
  RichContentEditorBox,
  RichContentViewerBox,
  Section,
  Page,
} from '../../Components/StoryParts';

import { convertFromRaw, createWithContent } from 'wix-rich-content-editor';

import dividerContentState from '../../../../../e2e/tests/fixtures/divider.json';
import DividerEditor from './DividerEditor';
import editorSourcecode from './node_modules/!!raw-loader!./DividerEditor.js.js';
import DividerViewer from './DividerViewer';
import viewerSourcecode from './node_modules/!!raw-loader!./DividerViewer.js.js';

const editorState = createWithContent(convertFromRaw(dividerContentState));
export default () => {
  return (
    <Page title="Divider Plugin">
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox sourcecode={editorSourcecode} contentState={dividerContentState}>
          <DividerEditor editorState={editorState} />
        </RichContentEditorBox>
        <RichContentViewerBox sourcecode={viewerSourcecode}>
          <DividerViewer initialState={dividerContentState} />
        </RichContentViewerBox>
      </Section>
    </Page>
  );
};
