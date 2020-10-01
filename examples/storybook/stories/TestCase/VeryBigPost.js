import React from 'react';

import { RichContentEditorBox, Page } from '../Components/StoryParts';
import EditorWrapper from '../Components/EditorWrapper';
import fixture from '../../../../e2e/tests/fixtures/very-big-post.json';
import { wixPalettes } from '../../../../e2e/tests/resources/palettesExample';

export default () => {
  return (
    <Page title="Very Big Post">
      <RichContentEditorBox preset="blog-preset">
        <EditorWrapper content={fixture} palette={wixPalettes.site1} />
      </RichContentEditorBox>
    </Page>
  );
};
