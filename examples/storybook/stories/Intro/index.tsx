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

storiesOf('Intro', module).add('Hello!', () => {
  return (
    <Page title="Wix Rich Content">
      <Section>
        <RichContentEditorBox>
          <EditorWrapper content={introState} />
        </RichContentEditorBox>
      </Section>
      <Section title="Wix Rich Content Viewer">
        <RichContentViewerBox>
          <ViewerWrapper content={introState} />
        </RichContentViewerBox>
      </Section>
    </Page>
  );
});
