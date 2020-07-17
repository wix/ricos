import React from 'react';
import fixture from '../../../../e2e/tests/fixtures/gallery-rtl.json';

import { RichContentViewerBox, Page } from '../Components/StoryParts';
import ViewerWrapper from '../Components/ViewerWrapper';

export default () => {
  return (
    <div dir="ltr">
      <Page title="Gallery RTL Demo">
        <RichContentViewerBox preset="blog-preset">
          <ViewerWrapper content={fixture} />
        </RichContentViewerBox>
      </Page>
    </div>
  );
};
