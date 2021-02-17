import React, { FunctionComponent } from 'react';
import { RicosContent, RicosViewer } from 'ricos/viewer';
import { pluginAccordion } from 'ricos/accordion/dist/module.viewer';
import { pluginLink } from 'ricos/link/dist/module.viewer';
import { pluginTextColor, pluginTextHighlight } from 'ricos/text-color/dist/module.viewer';

const AccordionViewer: FunctionComponent<{ content?: RicosContent }> = ({ content }) => (
  <RicosViewer
    content={content}
    plugins={[pluginAccordion(), pluginLink(), pluginTextColor(), pluginTextHighlight()]}
  />
);

export default AccordionViewer;
