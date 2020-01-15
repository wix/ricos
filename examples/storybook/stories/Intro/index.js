import React from 'react';
import { storiesOf } from '@storybook/react';

import 'wix-rich-content-common/dist/styles.min.css';
import 'wix-rich-content-editor-common/dist/styles.min.css';
import 'wix-rich-content-editor/dist/styles.min.css';
import 'wix-rich-content-plugin-divider/dist/styles.min.css';

import { RichContentEditor, convertFromRaw, createWithContent } from 'wix-rich-content-editor';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { RichContentEditorBox, Section, Page } from '../Components/StoryParts';
import { createDividerPlugin } from 'wix-rich-content-plugin-divider';
import { dividerTypeMapper } from 'wix-rich-content-plugin-divider/dist/module.viewer';

import { createHashtagPlugin, HASHTAG_TYPE } from 'wix-rich-content-plugin-hashtag';
import { introState } from '../../fixtures/editorStates';

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
      <Section title="Editor">
        <RichContentEditorBox>
          <RichContentEditor config={config} plugins={PLUGINS} editorState={editorState} />
        </RichContentEditorBox>
      </Section>
      <Section title="Viewer">
        <RichContentEditorBox>
          <RichContentViewer initialState={introState} typeMappers={[dividerTypeMapper]} />
        </RichContentEditorBox>
      </Section>
    </Page>
  );
});
