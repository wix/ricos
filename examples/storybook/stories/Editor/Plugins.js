import React from 'react';
import { Page, RichContentExamples } from '../Components/StoryParts';
import { RichContentEditor } from 'wix-rich-content-editor';
import { createDividerPlugin } from 'wix-rich-content-plugin-divider';
import { createHashtagPlugin, HASHTAG_TYPE } from 'wix-rich-content-plugin-hashtag';
import { createImagePlugin } from 'wix-rich-content-plugin-image';
import 'wix-rich-content-plugin-image/dist/styles.min.css';

const config = {
  [HASHTAG_TYPE]: {
    createHref: decoratedText => `/search/posts?query=${encodeURIComponent('#')}${decoratedText}`,
    //onClick: (event, text) => {
    onClick: event => {
      event.preventDefault();
    },
  },
};

const examples = [
  {
    title: 'No plugins',
    props: {
      placeholder: 'Add some text...',
    },
  },
  {
    title: 'Divider Plugin',
    props: {
      plugins: [createDividerPlugin],
    },
  },
  {
    title: 'Hashtag Plugin',
    props: {
      plugins: [createHashtagPlugin],
      config,
    },
  },
  {
    title: 'Image Plugin',
    props: {
      plugins: [createImagePlugin],
      config,
      helpers: {
        onFilesChange: (files, updateEntity) =>
          console.log('on files change', { files, updateEntity }), //eslint-disable-line
      },
    },
  },
];

export default () => (
  <Page title={'Plugins'}>
    <RichContentExamples examples={examples} comp={RichContentEditor} />
  </Page>
);
