import React from 'react';

import { Page, RichContentViewerBox, Section, ContentState } from '../Components/StoryParts';
import { wixPalettes } from '../palettesExample';
import contentState from '../../../../e2e/tests/fixtures/legacy/inline-image.json';
import ViewerWrapper from '../Components/ViewerWrapper';

export default () => {
  return (
    <Page title="Content State Normalizer ">
      <p>Fixes legacy saved content states, working in viewer/editor on initialState prop</p>
      <p>
        Removal of inline images (legacy buggy content state) is opt-in with disableInlineImages
        boolean on normalize config
      </p>
      <Section type={Section.Types.COMPARISON}>
        <div>
          <h2>Default Preset</h2>
          <RichContentViewerBox
            preset="blog-preset"
            sourcecode={'<RichContentViewer initialState={initialState} />'}
          >
            <ViewerWrapper contentState={contentState} palette={wixPalettes.site1} />
          </RichContentViewerBox>
        </div>

        <div>
          <h2>With `disableInlineImages`</h2>
          <RichContentViewerBox
            preset="blog-preset"
            sourcecode={
              '<RichContentViewer initialState={initialState} normalize={{ disableInlineImages: true }} />'
            }
          >
            <ViewerWrapper
              contentState={contentState}
              palette={wixPalettes.site1}
              normalize={{ disableInlineImages: true }}
            />
          </RichContentViewerBox>
        </div>
      </Section>

      <ContentState json={contentState} collapsed={2} />
    </Page>
  );
};
