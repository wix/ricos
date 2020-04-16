import React from 'react';

import { RichContentEditorBox, Page } from '../Components/StoryParts';
import { RichContentEditor } from 'wix-rich-content-editor';
import { createEmpty } from 'wix-rich-content-editor/dist/lib/editorStateConversion';

const config = {};

export default () => {
  return (
    <Page title="One Liner">
      <RichContentEditorBox preset="blog-preset">
        <RichContentEditor config={config} editorState={createEmpty()} />
      </RichContentEditorBox>
    </Page>
  );
};
