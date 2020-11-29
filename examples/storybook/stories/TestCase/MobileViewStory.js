import React, { useState } from 'react';
import { convertToRaw } from 'wix-rich-content-editor-common';

import ViewerWrapper from '../Components/ViewerWrapper';
import EditorWrapper from '../Components/EditorWrapper';

import { wixPalettes } from '../../../../e2e/tests/resources/palettesExample';

import { createEmpty } from 'wix-rich-content-editor/libs/editorStateConversion';

import {
  RichContentEditorBox,
  RichContentViewerBox,
  Section,
  Page,
} from '../Components/StoryParts';

export default () => {
  const [editorState, setEditorState] = useState(createEmpty());
  const content = convertToRaw(editorState.getCurrentContent());
  return (
    <Page title="Mobile Playground">
      <Section title="Editor">
        <RichContentEditorBox preset="blog-preset">
          <EditorWrapper onChange={setEditorState} content={content} palette={wixPalettes.site1} />
        </RichContentEditorBox>
      </Section>
      <Section title="Viewer Mobile">
        <RichContentViewerBox preset="mobile">
          <ViewerWrapper isMobile content={content} palette={wixPalettes.site1} />
        </RichContentViewerBox>
      </Section>
    </Page>
  );
};
