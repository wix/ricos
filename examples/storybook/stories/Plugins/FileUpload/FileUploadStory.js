import React from 'react';
import {
  RichContentEditorBox,
  RichContentViewerBox,
  Section,
  Page,
} from '../../Components/StoryParts';

import fileUploadContentState from '../../../../../e2e/tests/fixtures/file-upload.json';
import FileUploadEditor from './FileUploadEditor';
import editorSourcecode from '!!raw-loader!./FileUploadEditor.js';
import FileUploadViewer from './FileUploadViewer';
import viewerSourcecode from '!!raw-loader!./FileUploadViewer.js';
import SyntaxHighlighter from '../../Components/SyntaxHighlighter';

const mockData = () => {
  const filenames = ['image.jpg', 'document.pdf', 'music.mp3'];
  const name = filenames[Math.floor(Math.random() * filenames.length)];
  const filenameParts = name.split('.');
  const type = filenameParts[filenameParts.length - 1];
  return {
    name,
    type,
    url: 'http://file-examples.com/wp-content/uploads/2017/10/file-sample_150kB.pdf',
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
      updateEntity({ error: { msg: 'Error' } });
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
