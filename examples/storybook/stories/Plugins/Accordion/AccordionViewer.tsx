import React, { FunctionComponent } from 'react';
import { RicosContent, RicosViewer } from 'ricos/viewer';
import { pluginAccordion } from 'ricos/accordion/viewer';
import { pluginLink } from 'ricos/link/viewer';
import { pluginTextColor, pluginTextHighlight } from 'ricos/text-color/viewer';

const AccordionViewer: FunctionComponent<{ content?: RicosContent }> = ({ content }) => (
  <RicosViewer
    content={content}
    plugins={[pluginAccordion(), pluginLink(), pluginTextColor(), pluginTextHighlight()]}
  />
);

export default AccordionViewer;
