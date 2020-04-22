import React from 'react';
import { RichContentEditor, convertFromRaw, createWithContent } from 'wix-rich-content-editor';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { createImagePlugin } from 'wix-rich-content-plugin-image';
import { imageTypeMapper } from 'wix-rich-content-plugin-image/dist/module.viewer';
import imageFloatWithSpace from '../../../../e2e/tests/fixtures/image-float-with-spacing.json';
import {
  RichContentEditorBox,
  RichContentViewerBox,
  ContentState,
  Section,
  Page,
} from '../Components/StoryParts';

const PLUGINS = [createImagePlugin];
const helpers = {
  onFilesChange: (files, updateEntity) => console.log('on file change', { files, updateEntity }), //eslint-disable-line
};

const typeMappers = [imageTypeMapper];

const editorState = createWithContent(convertFromRaw(imageFloatWithSpace));
export default () => {
  const config = {};
  return (
    <Page title="Weird Spacing Bug">
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox preset="blog-preset">
          <RichContentEditor
            config={config}
            helpers={helpers}
            plugins={PLUGINS}
            editorState={editorState}
          />
        </RichContentEditorBox>
        <RichContentViewerBox preset="blog-preset">
          <RichContentViewer initialState={imageFloatWithSpace} typeMappers={typeMappers} />
        </RichContentViewerBox>
      </Section>

      <Section title="Content State">
        <ContentState json={imageFloatWithSpace} />
      </Section>
    </Page>
  );
};
