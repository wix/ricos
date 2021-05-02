import React from 'react';
import {
  RichContentEditorBox,
  RichContentViewerBox,
  Section,
  Page,
} from '../../Components/StoryParts';

import fileUploadContentState from '../../../../../e2e/tests/fixtures/file-upload.json';
import FileUploadEditor from './FileUploadEditor';
import editorSourcecode from '!!raw-loader!./FileUploadEditor.tsx';
import FileUploadViewer from './FileUploadViewer';
import viewerSourcecode from '!!raw-loader!./FileUploadViewer.tsx';
import SyntaxHighlighter from '../../Components/SyntaxHighlighter';

const mockData = () => {
  const filenames = ['image.jpg', 'document.pdf', 'music.mp3'];
  const name = filenames[Math.floor(Math.random() * filenames.length)];
  const filenameParts = name.split('.');
  const type = filenameParts[filenameParts.length - 1];
  return {
    name,
    type,
    url: 'https://www.w3.org/wai/er/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  };
};
const onFilesChangeMap = {
  mock: (files, updateEntity) => {
    setTimeout(() => {
      updateEntity({
        data: mockData(),
        files,
      });
    }, 2000);
  },
  error: (files, updateEntity) => {
    setTimeout(() => {
      updateEntity({ data: mockData(), error: { msg: 'file too large' } });
    }, 2000);
  },
};

const FileUploadStory = () => (
  <Page title="FileUpload Plugin">
    <Section type={Section.Types.COMPARISON}>
      <RichContentEditorBox sourcecode={editorSourcecode} content={fileUploadContentState}>
        <FileUploadEditor content={fileUploadContentState} onFilesChange={onFilesChangeMap.mock} />
      </RichContentEditorBox>
      <RichContentViewerBox sourcecode={viewerSourcecode}>
        <FileUploadViewer content={fileUploadContentState} />
      </RichContentViewerBox>
    </Section>

    <Section title="onFileSelected Error (with UI)">
      <div>With Error Message:</div>
      <SyntaxHighlighter
        code={`onFileSelected = (files, updateEntity) => updateEntity({ data: [], error: { msg: 'file too large' } });`}
      />
      <RichContentEditorBox>
        <FileUploadEditor onFilesChange={onFilesChangeMap.error} />
      </RichContentEditorBox>
    </Section>
  </Page>
);

export default FileUploadStory;
