import React from 'react';
import { storiesOf } from '@storybook/react';

import { RichContentViewer } from 'wix-rich-content-viewer';
import {
  RichContentEditorBox,
  RichContentViewerBox,
  Section,
  Page,
} from '../Components/StoryParts';
import { dividerTypeMapper } from 'wix-rich-content-plugin-divider/dist/module.viewer';

import EditorWrapper from '../Components/EditorWrapper';
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
          <RichContentViewer initialState={introState} typeMappers={[dividerTypeMapper]} />
        </RichContentViewerBox>
      </Section>
    </Page>
  );
});
