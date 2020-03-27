import React from 'react';

import { RichContentEditorBox, Page } from '../Components/StoryParts';
import { RichContentEditor, convertFromRaw, createWithContent } from 'wix-rich-content-editor';
import { createImagePlugin } from 'wix-rich-content-plugin-image';
import { pluginLink } from 'wix-rich-content-plugin-link';
import { pluginDivider } from 'wix-rich-content-plugin-divider';
import fixture from '../../../../e2e/tests/fixtures/very-big-post.json';

const config = {};

const plugins = [createImagePlugin, pluginLink, pluginDivider];
const editorState = createWithContent(convertFromRaw(fixture));
export default () => {
  return (
    <Page title="Very Big Post">
      <RichContentEditorBox preset="blog-preset">
        <RichContentEditor config={config} plugins={plugins} editorState={editorState} />
      </RichContentEditorBox>
    </Page>
  );
};
