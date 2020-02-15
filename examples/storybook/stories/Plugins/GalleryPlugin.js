import React from 'react';
import { RichContentEditor, convertFromRaw, createWithContent } from 'wix-rich-content-editor';
import { RichContentViewer } from 'wix-rich-content-viewer';

import {
  galleryTypeMapper,
  GALLERY_TYPE,
} from 'wix-rich-content-plugin-gallery/dist/module.viewer';
import { pluginGallery as pluginGalleryEditor } from 'wix-rich-content-plugin-gallery';
import { RichContentWrapper } from 'wix-rich-content-wrapper';

import fixtrue from '../../../../e2e/tests/fixtures/blog-v5-gallery.json';
import {
  RichContentEditorBox,
  RichContentViewerBox,
  ContentState,
  Section,
  Page,
} from '../Components/StoryParts';

const helpers = {
  onExpand: (entityIndex, innerIndex = 0) => {
    //galleries have an innerIndex (i.e. second image will have innerIndex=1)
    console.log('on exapnd', entityIndex, innerIndex); //eslint-disable-line
  },
};
const typeMappers = [galleryTypeMapper];
const editorState = createWithContent(convertFromRaw(fixtrue));
const displayTitleConfig = {
  [GALLERY_TYPE]: {
    displayTitleDefault: false,
  },
};
export default () => {
  const editorPlugins = [pluginGalleryEditor()];
  return (
    <Page title="Gallery Plugin">
      <h3>Default Behvaior</h3>

      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox preset="blog-preset">
          <RichContentWrapper plugins={editorPlugins}>
            <RichContentEditor editorState={editorState} />
          </RichContentWrapper>
        </RichContentEditorBox>
        <RichContentViewerBox preset="blog-preset">
          {/* <RichContentWrapper plugins={[pluginGalleryViewer()]}> */}
          <RichContentViewer initialState={fixtrue} helpers={helpers} typeMappers={typeMappers} />
        </RichContentViewerBox>
      </Section>

      <h3>With displayTitle:false config (Blog V5.x.x fix)</h3>
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox preset="blog-preset">
          <RichContentWrapper plugins={editorPlugins}>
            <RichContentEditor editorState={editorState} config={displayTitleConfig} />
          </RichContentWrapper>
        </RichContentEditorBox>
        <RichContentViewerBox preset="blog-preset">
          {/* <RichContentWrapper plugins={[pluginGalleryViewer()]}> */}
          <RichContentViewer
            initialState={fixtrue}
            helpers={helpers}
            typeMappers={typeMappers}
            config={displayTitleConfig}
          />
        </RichContentViewerBox>
      </Section>

      <Section title="Content State">
        <ContentState json={fixtrue} />
      </Section>
    </Page>
  );
};
