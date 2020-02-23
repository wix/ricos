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
import DividerEditor from './DividerEditor';

// eslint-disable-next-line no-undef
// const sourcecode = preval`
//   const fs = require('fs')
//   module.exports = fs.readFileSync(__dirname + '/DividerEditor.js', 'utf8')
//   `;

const sourcecode = '<p>demo source code</p>';

const editorState = createWithContent(convertFromRaw(dividerContentState));
export default () => {
  return (
    <Page title="Divider Plugin">
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox sourcecode={sourcecode}>
          <DividerEditor editorState={editorState} />
        </RichContentEditorBox>
        <RichContentViewerBox>
          <RichContentViewer initialState={dividerContentState} typeMappers={[dividerTypeMapper]} />
        </RichContentViewerBox>
      </Section>
    </Page>
  );
};
