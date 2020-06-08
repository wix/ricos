import React from 'react';

import { RichContentEditorBox, Page } from '../Components/StoryParts';
import { RicosEditor } from 'ricos-editor';

export default () => {
  return (
    <Page title="One Liner">
      <RichContentEditorBox preset="blog-preset">
        <RicosEditor />
      </RichContentEditorBox>
    </Page>
  );
};
