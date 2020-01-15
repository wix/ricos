import React from 'react';

import { storiesOf } from '@storybook/react';
import '../Global.css';
import { Page, RichContentExamples } from '../Components/StoryParts';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { exapmleState } from '../../fixtures/editorStates';
import { dividerTypeMapper } from 'wix-rich-content-plugin-divider/dist/module.viewer';

const BasicUsagePage = () => {
  const examples = [
    {
      title: 'Viewer with Initial State',
      props: {
        initialState: exapmleState,
      },
    },
    {
      title: 'Viewer with Initial State & divider',
      props: {
        initialState: exapmleState,
        typeMappers: [dividerTypeMapper],
      },
    },
  ];

  return (
    <Page title={'Basic Usage'}>
      <RichContentExamples examples={examples} comp={RichContentViewer} />
    </Page>
  );
};

storiesOf('Rich Content Viewer', module).add('Basic Usage', BasicUsagePage);
