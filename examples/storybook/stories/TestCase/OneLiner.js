import React from 'react';

import { RichContentEditorBox, Page } from '../Components/StoryParts';
import { RicosEditor } from 'wix-rich-content-wrapper';

export default () => {
  return (
    <Page title="One Liner">
      <RichContentEditorBox preset="blog-preset">
        <RicosEditor />
      </RichContentEditorBox>
    </Page>
  );
};
