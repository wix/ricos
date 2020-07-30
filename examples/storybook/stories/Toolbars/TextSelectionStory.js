import React from 'react';
import { Page } from '../Components/StoryParts';

import ExampleApplication from '../Components/ExampleApplication';
import contentState from '../../../../e2e/tests/fixtures/content.json';

export default () => {
  return (
    <Page title="Click To Tweet">
      <ExampleApplication initialState={contentState} />
    </Page>
  );
};
