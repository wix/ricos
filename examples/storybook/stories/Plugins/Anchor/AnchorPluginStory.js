import React from 'react';
import {
  RichContentEditorBox,
  RichContentViewerBox,
  Section,
  Page,
} from '../../Components/StoryParts';

import AnchorContentState from '../../../../../e2e/tests/fixtures/anchorable-plugins.json';
import EditorWrapper from '../../Components/EditorWrapper';
import ViewerWrapper from '../../Components/ViewerWrapper';

export default () => {
  return (
    <Page title="Anchor Plugin">
      <h4>enable anchors from editor plugins configuration </h4>
      <h4>
        add to link config{' '}
        <code style={{ backgroundColor: 'lightgray' }}>linkTypes: {'{ anchor: true }'}</code>
      </h4>
      <h5>As of today, anchor can be linked to one of the following:</h5>
      <h5>
        regular text (paragraphs), headers, code blocks, quotes, images, galleries, videos, maps,
        buttons, gifs and files
      </h5>
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox content={AnchorContentState}>
          <EditorWrapper content={AnchorContentState} />
        </RichContentEditorBox>
        <RichContentViewerBox>
          <ViewerWrapper content={AnchorContentState} />
        </RichContentViewerBox>
      </Section>
    </Page>
  );
};
