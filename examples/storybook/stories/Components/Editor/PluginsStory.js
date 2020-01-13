import React from 'react';
import { Page, RichContentExamples } from '../StoryParts';
import { RichContentEditor } from 'wix-rich-content-editor';
import { createDividerPlugin } from 'wix-rich-content-plugin-divider';
import { createHashtagPlugin, HASHTAG_TYPE } from 'wix-rich-content-plugin-hashtag';

const config = {
  [HASHTAG_TYPE]: {
    createHref: decoratedText => `/search/posts?query=${encodeURIComponent('#')}${decoratedText}`,
    onClick: (event, text) => {
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
];

export default () => (
  <Page title={'Plugins'}>
    <RichContentExamples examples={examples} comp={RichContentEditor} />
  </Page>
);
