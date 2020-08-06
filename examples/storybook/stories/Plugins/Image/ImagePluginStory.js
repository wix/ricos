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
import { mockImageNativeUploadFunc } from '../../../../main/shared/utils/fileUploadUtil';

const mockErrorMsg = 'file too large';
const handleFileUploadMockError = (files, updateEntity) => {
  setTimeout(() => {
    updateEntity({ error: { msg: mockErrorMsg } });
  }, 2000);
};

const ImagePluginStory = () => (
  <Page title="Image Plugin">
    <Section type={Section.Types.COMPARISON}>
      <RichContentEditorBox sourcecode={editorSourcecode} content={imageContentState}>
        <ImageEditor content={imageContentState} handleFileUpload={mockImageNativeUploadFunc} />
      </RichContentEditorBox>
      <RichContentViewerBox sourcecode={viewerSourcecode}>
        <ImageViewer content={imageContentState} />
      </RichContentViewerBox>
    </Section>

    <Section title="handleFileUpload Error (with UI)">
      <div>With Error Message:</div>
      <SyntaxHighlighter
        code={`handleFileUpload = (files, updateEntity) => updateEntity({ data: [], error: { msg: ${mockErrorMsg} } });`}
      />
      <RichContentEditorBox>
        <ImageEditor handleFileUpload={handleFileUploadMockError} />
      </RichContentEditorBox>
    </Section>
  </Page>
);

export default ImagePluginStory;
