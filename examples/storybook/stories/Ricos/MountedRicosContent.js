import React, { useState } from 'react';
import { Page } from '../Components/StoryParts';
import DividerEditor from './RicosBasicUsage';
import exampleAppContent from '../../../../e2e/tests/fixtures/storybook-example-app.json';
import longPostContent from '../../../../e2e/tests/fixtures/very-big-post.json';
export default () => {
  const [toggled, setToggled] = useState(false);
  const toggle = () => setToggled(toggled => !toggled);
  return (
    <Page title="Change Content to Mounted Ricos">
      <button onClick={toggle}>{'Switch Content'}</button>
      <DividerEditor content={toggled ? exampleAppContent : longPostContent} />
    </Page>
  );
};
