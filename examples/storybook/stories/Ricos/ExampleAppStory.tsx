import React from 'react';
import { Page } from '../Components/StoryParts';
import ExampleApplication from '../Components/ExampleApplication';
import exampleAppContent from '../../../../e2e/tests/fixtures/storybook-example-app.json';

export default () => {
  return (
    <Page title="Example App">
      <ExampleApplication initialState={exampleAppContent} />
    </Page>
  );
};
