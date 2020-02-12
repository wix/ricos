import React from 'react';
import { storiesOf } from '@storybook/react';

import { RichContentEditor, convertFromRaw, createWithContent } from 'wix-rich-content-editor';
import { RichContentViewer } from 'wix-rich-content-viewer';
import {
  RichContentEditorBox,
  RichContentViewerBox,
  Section,
  Page,
} from '../Components/StoryParts';
import { createDividerPlugin } from 'wix-rich-content-plugin-divider';
import { dividerTypeMapper } from 'wix-rich-content-plugin-divider/dist/module.viewer';

import { createHashtagPlugin, HASHTAG_TYPE } from 'wix-rich-content-plugin-hashtag';
import introState from './introEditorState';

const editorState = createWithContent(convertFromRaw(introState));

const PLUGINS = [createDividerPlugin, createHashtagPlugin];

const config = {
  [HASHTAG_TYPE]: {
    createHref: decoratedText => `/search/posts?query=${encodeURIComponent('#')}${decoratedText}`,
    onClick: event => {
      event.preventDefault();
    },
  },
};

storiesOf('Intro', module).add('Hello!', () => {
  return (
    <Page title="Wix Rich Content">
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox>
          <RichContentEditor config={config} plugins={PLUGINS} editorState={editorState} />
        </RichContentEditorBox>
        <RichContentViewerBox>
          <RichContentViewer initialState={introState} typeMappers={[dividerTypeMapper]} />
        </RichContentViewerBox>
      </Section>
    </Page>
  );
});
