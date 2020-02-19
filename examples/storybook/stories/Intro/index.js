import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  RichContentEditorBox,
  RichContentViewerBox,
  Section,
  Page,
} from '../Components/StoryParts';

import EditorWrapper from '../Components/EditorWrapper';
import ViewerWrapper from '../Components/ViewerWrapper';
import introState from '../../../../e2e/tests/fixtures/intro.json';
import { wixPalettes } from '../palettesExample';

storiesOf('Intro', module).add('Hello!', () => {
  return (
    <Page title="Wix Rich Content">
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox>
          <EditorWrapper contentState={introState} palette={wixPalettes.site1} />
        </RichContentEditorBox>
        <RichContentViewerBox>
          <ViewerWrapper contentState={introState} palette={wixPalettes.site1} />
        </RichContentViewerBox>
      </Section>
    </Page>
  );
});
