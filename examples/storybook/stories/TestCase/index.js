import React from 'react';
import { storiesOf } from '@storybook/react';

import 'wix-rich-content-common/dist/styles.min.css';
import 'wix-rich-content-editor-common/dist/styles.min.css';
import 'wix-rich-content-viewer/dist/styles.min.css';
import 'wix-rich-content-editor/dist/styles.min.css';
import 'wix-rich-content-plugin-divider/dist/styles.min.css';
import 'wix-rich-content-plugin-link/dist/styles.min.css';

import { RichContentEditor, convertFromRaw, createWithContent } from 'wix-rich-content-editor';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { createImagePlugin } from 'wix-rich-content-plugin-image';
import { linkTypeMapper } from 'wix-rich-content-plugin-link/dist/module.viewer';
import { imageTypeMapper } from 'wix-rich-content-plugin-image/dist/module.viewer';
import {
  RichContentEditorBox,
  RichContentViewerBox,
  ContentState,
  Section,
  Page,
} from '../Components/StoryParts';

import imageFloatWithSpace from '../../fixtures/imageFloatWithSpace';

console.log('content state', imageFloatWithSpace); //eslint-disable-line
const editorState = createWithContent(convertFromRaw(imageFloatWithSpace));

const PLUGINS = [createImagePlugin];

const helpers = {
  onFilesChange: (files, updateEntity) => console.log('on file change', { files, updateEntity }), //eslint-disable-line
};
const config = {};

const typeMappers = [imageTypeMapper, linkTypeMapper];

storiesOf('Test Cases', module).add('Weird Spacing', () => {
  return (
    <Page title="Wix Rich Content">
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
});
