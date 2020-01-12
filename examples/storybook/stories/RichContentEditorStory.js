import React from 'react';
import { storiesOf } from '@storybook/react';
import 'wix-rich-content-common/dist/styles.min.css';
import 'wix-rich-content-editor-common/dist/styles.min.css';
import 'wix-rich-content-editor/dist/styles.min.css';
import 'wix-rich-content-plugin-divider/dist/styles.min.css';
// import hashtagTheme from './hashtag.css';

import './App.css';

import { createDividerPlugin } from 'wix-rich-content-plugin-divider';
import {
  createHashtagPlugin,
  HASHTAG_TYPE,
} from 'wix-rich-content-plugin-hashtag';
import {
  RichContentEditor,
  convertFromRaw,
  createWithContent,
} from 'wix-rich-content-editor';

import Palette from './Components/Palette';
import { wixPalettes } from './palettesExample';

import RceTheme, { Themes } from '../src/RceTheme';
import ThemeWrapper from '../src/ThemeWrapper';
import { exapmleState } from '../fixtures/editorStates';

const PLUGINS = [createDividerPlugin, createHashtagPlugin];

const editorState = createWithContent(convertFromRaw(exapmleState));

const config = {
  [HASHTAG_TYPE]: {
    createHref: decoratedText =>
      `/search/posts?query=${encodeURIComponent('#')}${decoratedText}`,
    onClick: (event, text) => {
      event.preventDefault();
      console.log(`'${text}' hashtag clicked!`);
    },
  },
};
storiesOf('Rich Content Editor', module)
  .add('Basic Usage', () => {
    return (
      <div className="root">
        <h2>Default</h2>
        <div className="rce-wrapper">
          <RichContentEditor />
        </div>
        <h2>With place holder</h2>
        <div className="rce-wrapper">
          <RichContentEditor placeholder="Add some text..." />
        </div>
      </div>
    );
  })
  .add('Plugins', () => {
    return (
      <div className="root">
        <h1>Plugins</h1>
        <h2>No plugins</h2>
        <div className="rce-wrapper">
          <RichContentEditor placeholder="Add some text..." />
        </div>
        <h2>Divider Plugin</h2>
        <div className="rce-wrapper">
          <RichContentEditor plugins={[createDividerPlugin]} />
        </div>

        <h2>Hashtag Plugin</h2>
        <div className="rce-wrapper">
          <RichContentEditor config={config} plugins={[createHashtagPlugin]} />
        </div>
      </div>
    );
  })
  .add('Themes', () => {
    return (
      <div className="root">
        <h2>Default Theme</h2>
        <div className="rce-wrapper">
          <RichContentEditor
            config={config}
            plugins={PLUGINS}
            editorState={editorState}
          />
        </div>

        <h2>Live Site Theme</h2>
        <h5>
          <Palette palette={wixPalettes.site1} />
        </h5>
        <div className="rce-wrapper">
          <ThemeWrapper theme={Themes.PALETTE} palette={wixPalettes.site1}>
            <RichContentEditor
              config={config}
              plugins={PLUGINS}
              editorState={editorState}
            />
          </ThemeWrapper>
        </div>

        <h5>
          <Palette palette={wixPalettes.site2} />
        </h5>
        <div className="rce-wrapper">
          <ThemeWrapper theme={Themes.PALETTE} palette={wixPalettes.site2}>
            <RichContentEditor
              config={config}
              plugins={PLUGINS}
              editorState={editorState}
            />
          </ThemeWrapper>
        </div>

        <h5>
          <Palette palette={wixPalettes.site3} />
        </h5>
        <div className="rce-wrapper">
          <ThemeWrapper theme={Themes.PALETTE} palette={wixPalettes.site3}>
            <RichContentEditor
              config={config}
              plugins={PLUGINS}
              editorState={editorState}
            />
          </ThemeWrapper>
        </div>
      </div>
    );
  });
