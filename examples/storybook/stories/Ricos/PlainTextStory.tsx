import React from 'react';
import { Page } from '../Components/StoryParts';
import PlainTextConverter from '../Components/PlainTextConverter';
import migrationContent from '../../../../e2e/tests/fixtures/plain-text-content.json';

export default () => {
  return (
    <Page title="Plain Text Converter">
      <PlainTextConverter content={migrationContent} />
    </Page>
  );
};
