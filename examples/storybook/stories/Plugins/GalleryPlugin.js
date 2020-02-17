import React from 'react';
import { RichContentEditor, convertFromRaw, createWithContent } from 'wix-rich-content-editor';
import { RichContentViewer } from 'wix-rich-content-viewer';

import { galleryTypeMapper } from 'wix-rich-content-plugin-gallery/dist/module.viewer';
import { pluginGallery as pluginGalleryEditor } from 'wix-rich-content-plugin-gallery';
import { RichContentWrapper } from 'wix-rich-content-wrapper';

import fixtrueV5 from '../../../../e2e/tests/fixtures/blog-v5-gallery.json';
import fixtrueV6 from '../../../../e2e/tests/fixtures/blog-v6-gallery.json';
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
const editorStateV5 = createWithContent(convertFromRaw(fixtrueV5));
const editorStateV6 = createWithContent(convertFromRaw(fixtrueV6));
export default () => {
  const editorPlugins = [pluginGalleryEditor()];
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
          <RichContentViewer initialState={fixtrueV6} helpers={helpers} typeMappers={typeMappers} />
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
          <RichContentViewer initialState={fixtrueV5} helpers={helpers} typeMappers={typeMappers} />
        </RichContentViewerBox>
      </Section>

      <Section title="Content State">
        <ContentState json={fixtrueV5} />
      </Section>
    </Page>
  );
};
