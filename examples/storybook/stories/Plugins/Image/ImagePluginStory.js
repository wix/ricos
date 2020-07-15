import React from 'react';
import {
  RichContentEditorBox,
  RichContentViewerBox,
  Section,
  Page,
} from '../../Components/StoryParts';

import imageContentState from '../../../../../e2e/tests/fixtures/images.json';
import ImageEditor from './ImageEditor';
import editorSourcecode from '!!raw-loader!./ImageEditor.js';
import ImageViewer from './ImageViewer';
import viewerSourcecode from '!!raw-loader!./ImageViewer.js';
import SyntaxHighlighter from '../../Components/SyntaxHighlighter';

const mockData = {
  id: '8b72558253b2502b401bb46e5599f22a',
  original_file_name: '8bb438_1b73a6b067b24175bd087e86613bd00c.jpg', //eslint-disable-line
  file_name: '8bb438_1b73a6b067b24175bd087e86613bd00c.jpg', //eslint-disable-line
  width: 1920,
  height: 1000,
};

const mockErrorMsg = 'file too large';
const onFilesChangeMap = {
  mock: (files, updateEntity) => {
    setTimeout(() => {
      updateEntity({
        data: mockData,
        files,
      });
    }, 2000);
  },
  error: (files, updateEntity) => {
    setTimeout(() => {
      updateEntity({ error: { msg: mockErrorMsg } });
    }, 2000);
  },
};

const ImagePluginStory = () => (
  <Page title="Image Plugin">
    <Section type={Section.Types.COMPARISON}>
      <RichContentEditorBox sourcecode={editorSourcecode} content={imageContentState}>
        <ImageEditor content={imageContentState} onFilesChange={onFilesChangeMap.mock} />
      </RichContentEditorBox>
      <RichContentViewerBox sourcecode={viewerSourcecode}>
        <ImageViewer content={imageContentState} />
      </RichContentViewerBox>
    </Section>

    <Section title="onFilesChange Error (with UI)">
      <div>With Error Message:</div>
      <SyntaxHighlighter
        code={`onFilesChange = (files, updateEntity) => updateEntity({ data: [], error: { msg: ${mockErrorMsg} } });`}
      />
      <RichContentEditorBox>
        <ImageEditor onFilesChange={onFilesChangeMap.error} />
      </RichContentEditorBox>
    </Section>
  </Page>
);

export default ImagePluginStory;
