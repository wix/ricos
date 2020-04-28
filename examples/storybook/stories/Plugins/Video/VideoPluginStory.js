import React from 'react';
import {
  RichContentEditorBox,
  RichContentViewerBox,
  Section,
  Page,
} from '../../Components/StoryParts';

import { convertFromRaw, createWithContent } from 'wix-rich-content-editor';

import videoContentState from '../../../../../e2e/tests/fixtures/facebook-video.json';
import VideoEditor from './VideoEditor';
import editorSourcecode from '!!raw-loader!./VideoEditor.js';
import VideoViewer from './VideoViewer';
import viewerSourcecode from '!!raw-loader!./VideoViewer.js';
import SyntaxHighlighter from '../../Components/SyntaxHighlighter';
import { createEmpty } from 'wix-rich-content-editor/dist/lib/editorStateConversion';

const editorState = createWithContent(convertFromRaw(videoContentState));

const mockData = {
  config: {
    size: 'content',
    alignment: 'center',
  },
  src: {
    pathname: 'video/11062b_a552731f40854d16a91627687fb8d1a6/1080p/mp4/file.mp4',
    thumbnail: {
      pathname: 'media/11062b_a552731f40854d16a91627687fb8d1a6f000.jpg',
      height: 1080,
      width: 1920,
    },
  },
};
const handleFileUpload = {
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
      updateEntity({ error: { msg: 'file too large' } });
    }, 2000);
  },
};

const VideoPluginStory = () => (
  <Page title="Video Plugin">
    <Section type={Section.Types.COMPARISON}>
      <RichContentEditorBox sourcecode={editorSourcecode} contentState={videoContentState}>
        <VideoEditor editorState={editorState} handleFileUpload={handleFileUpload.mock} />
      </RichContentEditorBox>
      <RichContentViewerBox sourcecode={viewerSourcecode}>
        <VideoViewer initialState={videoContentState} />
      </RichContentViewerBox>
    </Section>

    <Section title="onFilesChange Error (with UI)">
      <div>With Error Message:</div>
      <SyntaxHighlighter
        code={`handleFileUpload = (files, updateEntity) => updateEntity({ data: [], error: { msg: 'file too large' } });`}
      />
      <RichContentEditorBox>
        <VideoEditor editorState={createEmpty()} handleFileUpload={handleFileUpload.error} />
      </RichContentEditorBox>
    </Section>
  </Page>
);

export default VideoPluginStory;
