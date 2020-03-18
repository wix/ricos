import React from 'react';

import { RichContentViewer } from 'wix-rich-content-viewer';
import {
  RichContentEditorBox,
  RichContentViewerBox,
  Section,
  Page,
} from '../Components/StoryParts';

import { dividerTypeMapper } from 'wix-rich-content-plugin-divider/dist/module.viewer';
import { convertFromRaw, createWithContent } from 'wix-rich-content-editor';

import dividerContentState from '../../../../e2e/tests/fixtures/divider.json';
import DividerEditor from './WrapperBaiscUsage';
import sourcecode from '!!raw-loader!./WrapperBaiscUsage.js';

const editorState = createWithContent(convertFromRaw(dividerContentState));
export default () => {
  return (
    <Page title="Wrapper Basic Usage">
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox sourcecode={sourcecode} contentState={dividerContentState}>
          <DividerEditor editorState={editorState} />
        </RichContentEditorBox>
        <RichContentViewerBox>
          <RichContentViewer initialState={dividerContentState} typeMappers={[dividerTypeMapper]} />
        </RichContentViewerBox>
      </Section>
    </Page>
  );
};
