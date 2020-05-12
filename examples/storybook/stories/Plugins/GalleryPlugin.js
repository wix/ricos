import React, { Component } from 'react';
import { pluginGallery as pluginGalleryViewer } from 'wix-rich-content-plugin-gallery/dist/module.viewer';
import { pluginGallery as pluginGalleryEditor } from 'wix-rich-content-plugin-gallery';
import { RicosEditor } from 'ricos-editor';
import { RicosViewer } from 'ricos-viewer';

import fixtrue from '../../../../e2e/tests/fixtures/gallery-with-title-and-link.json';

import {
  RichContentEditorBox,
  RichContentViewerBox,
  ContentState,
  Section,
  Page,
} from '../Components/StoryParts';

const fixtrueV5 = { ...fixtrue, VERSION: '5.9.9' };
const fixtrueV6 = { ...fixtrue, VERSION: '6.0.1' };

const editorPlugins = [pluginGalleryEditor()];
const viewerPlugins = [pluginGalleryViewer()];

export default () => {
  class GalleryPlugin extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      return (
        <Page title="Gallery Plugin">
          <h3>With v6 content</h3>

          <Section type={Section.Types.COMPARISON}>
            <RichContentEditorBox preset="blog-preset">
              <RicosEditor plugins={editorPlugins} content={fixtrueV6} />
            </RichContentEditorBox>
            <RichContentViewerBox preset="blog-preset">
              <RicosViewer plugins={viewerPlugins} content={fixtrueV6} />
            </RichContentViewerBox>
          </Section>

          <Section title="Content State">
            <ContentState json={fixtrueV6} />
          </Section>

          <h3>With v5 content:</h3>
          <Section type={Section.Types.COMPARISON}>
            <RichContentEditorBox preset="blog-preset">
              <RicosEditor plugins={editorPlugins} content={fixtrueV5} />
            </RichContentEditorBox>
            <RichContentViewerBox preset="blog-preset">
              <RicosViewer plugins={viewerPlugins} content={fixtrueV5} />
            </RichContentViewerBox>
          </Section>
          <Section title="Content State">
            <ContentState json={fixtrueV5} />
          </Section>
        </Page>
      );
    }
  }
  return <GalleryPlugin />;
};
