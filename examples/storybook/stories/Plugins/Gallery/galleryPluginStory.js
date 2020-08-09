import React, { Component } from 'react';
import {
  RichContentEditorBox,
  RichContentViewerBox,
  ContentState,
  Section,
  Page,
} from '../../Components/StoryParts';

import GalleryEditor from './galleryEditor';
import editorSourcecode from '!!raw-loader!./galleryEditor.js';
import GalleryViewer from './galleryViewer';
import viewerSourcecode from '!!raw-loader!./galleryViewer.js';
import SyntaxHighlighter from '../../Components/SyntaxHighlighter';
import fixtrue from '../../../../../e2e/tests/fixtures/gallery-with-title-and-link.json';

const fixtrueV5 = { ...fixtrue, VERSION: '5.9.9' };
const fixtrueV6 = { ...fixtrue, VERSION: '6.0.1' };

const mockData = {
  id: '8b72558253b2502b401bb46e5599f22a',
  original_file_name: '8bb438_1b73a6b067b24175bd087e86613bd00c.jpg', //eslint-disable-line
  file_name: '8bb438_1b73a6b067b24175bd087e86613bd00c.jpg', //eslint-disable-line
  width: 1920,
  height: 1000,
};

const mockErrorMsg = 'file too large';

const onFilesChange = (files, updateEntity) => {
  setTimeout(() => {
    updateEntity({ data: mockData, error: { msg: mockErrorMsg } });
  }, 2000);
};

export default () => {
  class GalleryPluginStory extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      return (
        <Page title="Gallery Plugin">
          <h3>With v6 content</h3>

          <Section type={Section.Types.COMPARISON}>
            <RichContentEditorBox preset="blog-preset" sourcecode={editorSourcecode}>
              <GalleryEditor content={fixtrueV6} />
            </RichContentEditorBox>
            <RichContentViewerBox preset="blog-preset" sourcecode={viewerSourcecode}>
              <GalleryViewer content={fixtrueV6} />
            </RichContentViewerBox>
          </Section>

          <Section title="Content State">
            <ContentState json={fixtrueV6} />
          </Section>

          <h3>With v5 content:</h3>
          <Section type={Section.Types.COMPARISON}>
            <RichContentEditorBox preset="blog-preset" sourcecode={editorSourcecode}>
              <GalleryEditor content={fixtrueV5} />
            </RichContentEditorBox>
            <RichContentViewerBox preset="blog-preset" sourcecode={viewerSourcecode}>
              <GalleryViewer content={fixtrueV5} />
            </RichContentViewerBox>
          </Section>
          <Section title="Content State">
            <ContentState json={fixtrueV5} />
          </Section>

          <Section title="onFilesChange Error (with UI)">
            <div>With Error Message:</div>
            <SyntaxHighlighter
              code={`onFilesChange = (files, updateEntity) => updateEntity({ data: [], error: { msg: ${mockErrorMsg} } });`}
            />
            <RichContentEditorBox>
              <GalleryEditor onFilesChange={onFilesChange} />
            </RichContentEditorBox>
          </Section>
        </Page>
      );
    }
  }
  return <GalleryPluginStory />;
};
