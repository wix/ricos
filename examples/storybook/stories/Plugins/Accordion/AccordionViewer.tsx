import React, { FunctionComponent } from 'react';
import { DraftContent, RicosViewer } from 'ricos-viewer';
import { pluginAccordion } from 'wix-rich-content-plugin-accordion/dist/module.viewer';
import { pluginLink } from 'wix-rich-content-plugin-link/dist/module.viewer';
import {
  pluginTextColor,
  pluginTextHighlight,
} from 'wix-rich-content-plugin-text-color/dist/module.viewer';

const AccordionViewer: FunctionComponent<{ content?: DraftContent }> = ({ content }) => (
  <RicosViewer
    content={content}
    plugins={[pluginAccordion(), pluginLink(), pluginTextColor(), pluginTextHighlight()]}
  />
);

export default AccordionViewer;
