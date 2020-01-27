import React from 'react';
import { storiesOf } from '@storybook/react';

import { RichContentEditor, convertFromRaw, createWithContent } from 'wix-rich-content-editor';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { createImagePlugin } from 'wix-rich-content-plugin-image';
import { linkTypeMapper } from 'wix-rich-content-plugin-link/dist/module.viewer';
import { imageTypeMapper } from 'wix-rich-content-plugin-image/dist/module.viewer';
import { htmlTypeMapper, HTML_TYPE } from 'wix-rich-content-plugin-html/dist/module.viewer';

import {
  RichContentEditorBox,
  RichContentViewerBox,
  ContentState,
  Section,
  Page,
} from '../Components/StoryParts';

import imageFloatWithSpace from '../../fixtures/imageFloatWithSpace';
import AlignLeftiesState from '../../fixtures/AlignLefties';
import InstagramEmbedState from '../../fixtures/InstagramEmbedState';

import viewerTheme from './viewer.scss';

const editorState = createWithContent(convertFromRaw(imageFloatWithSpace));

const PLUGINS = [createImagePlugin];

const helpers = {
  onFilesChange: (files, updateEntity) => console.log('on file change', { files, updateEntity }), //eslint-disable-line
};

const typeMappers = [imageTypeMapper, linkTypeMapper, htmlTypeMapper];

const theme = {
  ...viewerTheme,
};
storiesOf('Test Cases', module)
  .add('Weird Spacing', () => {
    const config = {};
    return (
      <Page title="Weird Spacing Bug">
        <Section type={Section.Types.COMPARISON}>
          <RichContentEditorBox preset="blog-preset">
            <RichContentEditor
              config={config}
              helpers={helpers}
              plugins={PLUGINS}
              editorState={editorState}
            />
          </RichContentEditorBox>
          <RichContentViewerBox preset="blog-preset">
            <RichContentViewer initialState={imageFloatWithSpace} typeMappers={typeMappers} />
          </RichContentViewerBox>
        </Section>

        <Section title="Content State">
          <ContentState json={imageFloatWithSpace} />
        </Section>
      </Page>
    );
  })
  .add('HTML Height', () => {
    const config = {
      [HTML_TYPE]: {
        htmlIframeSrc: `/static/html-plugin-embed.html`,
      },
    };
    return (
      <Page title="HTML Height">
        <Section title={'Height check'}>
          <RichContentViewerBox preset="blog-preset">
            <RichContentViewer
              initialState={AlignLeftiesState}
              typeMappers={typeMappers}
              config={config}
              theme={theme}
            />
          </RichContentViewerBox>
        </Section>

        <Section title="Content State">
          <ContentState json={AlignLeftiesState} />
        </Section>
      </Page>
    );
  })
  .add('HTML Instagram Height', () => {
    const config = {
      [HTML_TYPE]: {
        htmlIframeSrc: `/static/html-plugin-embed.html`,
      },
    };
    return (
      <Page title="HTML Height">
        <Section title={'Height check'}>
          <RichContentViewerBox preset="blog-preset">
            <RichContentViewer
              initialState={InstagramEmbedState}
              typeMappers={typeMappers}
              config={config}
              theme={theme}
            />
          </RichContentViewerBox>
        </Section>

        <Section title="Content State">
          <ContentState json={InstagramEmbedState} />
        </Section>
      </Page>
    );
  });
