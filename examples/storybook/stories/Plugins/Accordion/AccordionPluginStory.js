import React from 'react';
import {
  RichContentEditorBox,
  RichContentViewerBox,
  Section,
  Page,
} from '../../Components/StoryParts';

import accordionContentState from '../../../../../e2e/tests/fixtures/accordion-rich-text.json';
import AccordionEditor from './AccordionEditor';
import editorSourcecode from '!!raw-loader!./AccordionEditor.js';
import AccordionViewer from './AccordionViewer';
import viewerSourcecode from '!!raw-loader!./AccordionViewer.js';

export default () => {
  return (
    <Page title="Accordion Plugin">
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox sourcecode={editorSourcecode} content={accordionContentState}>
          <AccordionEditor content={accordionContentState} />
        </RichContentEditorBox>
        <RichContentViewerBox sourcecode={viewerSourcecode}>
          <AccordionViewer content={accordionContentState} />
        </RichContentViewerBox>
      </Section>
    </Page>
  );
};
