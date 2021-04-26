import React from 'react';

import { RichContentEditorBox, Page } from '../Components/StoryParts';
import EditorWrapper from '../Components/EditorWrapper';
import fixture from '../../../../e2e/tests/fixtures/very-big-post.json';

export default () => {
  return (
    <Page title="Very Big Post">
      <RichContentEditorBox preset="blog-preset">
        <EditorWrapper content={fixture} />
      </RichContentEditorBox>
    </Page>
  );
};
