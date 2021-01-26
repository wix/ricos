import React from 'react';
import { Page } from '../Components/StoryParts';
import DividerEditor from './RicosBasicUsage';

export default () => {
  return (
    <Page title="maxTextLength prop demo">
      <p>{`In this editor example, the text length won't exceed 10 symbols`}</p>
      <DividerEditor maxTextLength={10} />
    </Page>
  );
};
