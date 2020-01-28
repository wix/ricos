import React from 'react';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { RichContentEditor, convertFromRaw, createWithContent } from 'wix-rich-content-editor';
import { createImagePlugin } from 'wix-rich-content-plugin-image';
import { linkTypeMapper } from 'wix-rich-content-plugin-link/dist/module.viewer';
import { imageTypeMapper } from 'wix-rich-content-plugin-image/dist/module.viewer';
import ImageFixture from '../../fixtures/imagesFixture';

import {
  RichContentEditorBox,
  RichContentViewerBox,
  ContentState,
  Section,
  Page,
} from '../Components/StoryParts';

const PLUGINS = [createImagePlugin];
const typeMappers = [imageTypeMapper, linkTypeMapper];
export default () => {
  const config = {};
  return (
    <Page title="Images Story">
      <Section type={Section.Types.COMPARISON}>
        <RichContentViewerBox>
          <RichContentViewer initialState={ImageFixture} typeMappers={typeMappers} />
        </RichContentViewerBox>
        <RichContentEditorBox>
          <RichContentEditor
            config={config}
            plugins={PLUGINS}
            editorState={createWithContent(convertFromRaw(ImageFixture))}
          />
        </RichContentEditorBox>
      </Section>

      <Section title="Content State">
        <ContentState json={ImageFixture} />
      </Section>
    </Page>
  );
};
