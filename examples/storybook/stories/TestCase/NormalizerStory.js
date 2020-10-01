import React from 'react';

import { Page, RichContentViewerBox, Section, ContentState } from '../Components/StoryParts';
import { wixPalettes } from '../../../../e2e/tests/resources/palettesExample';
import content from '../../../../e2e/tests/fixtures/legacy/inline-image.json';
import ViewerWrapper from '../Components/ViewerWrapper';

export default () => {
  return (
    <Page title="Content State Normalizer ">
      <p>Fixes legacy saved content states, working in viewer/editor on initialState prop</p>
      <p>
        Removal of invlaid inline pluggins is opt-in with removeInvalidInlinePlugins boolean on
        normalize config
      </p>
      <Section type={Section.Types.COMPARISON}>
        <div>
          <h2>Default Preset</h2>
          <RichContentViewerBox
            preset="blog-preset"
            sourcecode={'<RichContentViewer initialState={initialState} />'}
          >
            <ViewerWrapper content={content} palette={wixPalettes.site1} />
          </RichContentViewerBox>
        </div>

        <div>
          <h2>With `removeInvalidInlinePlugins`</h2>
          <RichContentViewerBox
            preset="blog-preset"
            sourcecode={
              '<RichContentViewer initialState={initialState} normalize={{ removeInvalidInlinePlugins: true }} />'
            }
          >
            <ViewerWrapper
              content={content}
              palette={wixPalettes.site1}
              normalize={{ removeInvalidInlinePlugins: true }}
            />
          </RichContentViewerBox>
        </div>
      </Section>

      <ContentState json={content} collapsed={2} />
    </Page>
  );
};
