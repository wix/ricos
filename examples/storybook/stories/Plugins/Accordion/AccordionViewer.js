import React from 'react';
import { RicosViewer } from 'ricos-viewer';
import { pluginAccordion } from 'wix-rich-content-plugin-accordion/dist/module.viewer';
import { pluginLink } from 'wix-rich-content-plugin-link/dist/module.viewer';
import {
  pluginTextColor,
  pluginTextHighlight,
} from 'wix-rich-content-plugin-text-color/dist/module.viewer';
import PropTypes from 'prop-types';

const AccordionViewer = ({ content }) => (
  <RicosViewer
    content={content}
    plugins={[pluginAccordion(), pluginLink(), pluginTextColor(), pluginTextHighlight()]}
  />
);

AccordionViewer.propTypes = {
  content: PropTypes.object,
};

export default AccordionViewer;
