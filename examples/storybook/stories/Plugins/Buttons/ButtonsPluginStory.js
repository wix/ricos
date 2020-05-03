import React from 'react';
import {
  RichContentEditorBox,
  RichContentViewerBox,
  Section,
  Page,
} from '../../Components/StoryParts';

import { convertFromRaw, createWithContent } from 'wix-rich-content-editor';

import ButtonsContentState from '../../../../../e2e/tests/fixtures/buttons.json';
import ButtonsEditor from './ButtonsEditor';
import editorSourcecode from '!!raw-loader!./ButtonsEditor.js';
import ButtonsViewer from './ButtonsViewer';
import viewerSourcecode from '!!raw-loader!./ButtonsViewer.js';

const editorState = createWithContent(convertFromRaw(ButtonsContentState));
export default () => {
  return (
    <Page title="Buttons Plugin">
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox sourcecode={editorSourcecode} contentState={ButtonsContentState}>
          <ButtonsEditor editorState={editorState} />
        </RichContentEditorBox>
        <RichContentViewerBox sourcecode={viewerSourcecode}>
          <ButtonsViewer initialState={ButtonsContentState} />
        </RichContentViewerBox>
      </Section>
    </Page>
  );
};
