import React from 'react';
import { Page, RichContentExamples } from '../Components/StoryParts';
import { RichContentEditor } from 'wix-rich-content-editor';

const examples = [
  {
    title: 'Default',
  },
  {
    title: 'With Placeholder',
    props: {
      placeholder: 'Add some text...',
    },
  },
];

const EditorBasicUsage = () => (
  <Page title={'Basic Usage'}>
    <RichContentExamples examples={examples} comp={RichContentEditor} />
  </Page>
);

export default EditorBasicUsage;
