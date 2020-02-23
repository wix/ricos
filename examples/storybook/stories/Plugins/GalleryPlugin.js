import React, { Component } from 'react';
import { RichContentEditor, convertFromRaw, createWithContent } from 'wix-rich-content-editor';
import { RichContentViewer } from 'wix-rich-content-viewer';

import { galleryTypeMapper } from 'wix-rich-content-plugin-gallery/dist/module.viewer';
import { pluginGallery as pluginGalleryEditor } from 'wix-rich-content-plugin-gallery';
import { RichContentWrapper } from 'wix-rich-content-wrapper';

import fixtrue from '../../../../e2e/tests/fixtures/gallery-with-title-and-link.json';

import {
  RichContentEditorBox,
  RichContentViewerBox,
  ContentState,
  Section,
  Page,
} from '../Components/StoryParts';
import Fullscreen from 'wix-rich-content-fullscreen';
import getImagesData from 'wix-rich-content-fullscreen/src/lib/getImagesData';

const fixtrueV5 = { ...fixtrue, VERSION: '5.9.9' };
const fixtrueV6 = { ...fixtrue, VERSION: '6.0.1' };

const typeMappers = [galleryTypeMapper];
const editorStateV5 = createWithContent(convertFromRaw(fixtrueV5));
const editorStateV6 = createWithContent(convertFromRaw(fixtrueV6));
const expandModeData = getImagesData(fixtrueV5);
const editorPlugins = [pluginGalleryEditor()];

export default () => {
  class GalleryPlugin extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      const { expendModeIsOpen, expandModeIndex } = this.state;
      const helpers = {
        onExpand: (entityIndex, innerIndex = 0) => {
          //galleries have an innerIndex (i.e. second image will have innerIndex=1)
          this.setState({
            expendModeIsOpen: true,
            expandModeIndex: expandModeData.imageMap[entityIndex] + innerIndex,
          });
        },
      };
      return (
        <Page title="Gallery Plugin">
          <h3>With v6 contentState</h3>

          <Section type={Section.Types.COMPARISON}>
            <RichContentEditorBox preset="blog-preset">
              <RichContentWrapper plugins={editorPlugins}>
                <RichContentEditor editorState={editorStateV6} />
              </RichContentWrapper>
            </RichContentEditorBox>
            <RichContentViewerBox preset="blog-preset">
              {/* <RichContentWrapper plugins={[pluginGalleryViewer()]}> */}
              <RichContentViewer
                initialState={fixtrueV6}
                helpers={helpers}
                typeMappers={typeMappers}
              />
            </RichContentViewerBox>
          </Section>

          <Section title="Content State">
            <ContentState json={fixtrueV6} />
          </Section>

          <h3>With v5 contentState:</h3>
          <Section type={Section.Types.COMPARISON}>
            <RichContentEditorBox preset="blog-preset">
              <RichContentWrapper plugins={editorPlugins}>
                <RichContentEditor editorState={editorStateV5} />
              </RichContentWrapper>
            </RichContentEditorBox>
            <RichContentViewerBox preset="blog-preset">
              {/* <RichContentWrapper plugins={[pluginGalleryViewer()]}> */}
              <RichContentViewer
                initialState={fixtrueV5}
                helpers={helpers}
                typeMappers={typeMappers}
              />
            </RichContentViewerBox>
          </Section>
          <Fullscreen
            isOpen={expendModeIsOpen}
            images={expandModeData.images}
            onClose={() => this.setState({ expendModeIsOpen: false })}
            index={expandModeIndex}
          />
          <Section title="Content State">
            <ContentState json={fixtrueV5} />
          </Section>
        </Page>
      );
    }
  }
  return <GalleryPlugin />;
};
