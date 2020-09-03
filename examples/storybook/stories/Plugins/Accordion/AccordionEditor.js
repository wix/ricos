import React from 'react';
import { RicosEditor } from 'ricos-editor';
import { pluginAccordion } from 'wix-rich-content-plugin-accordion';
import { pluginLink } from 'wix-rich-content-plugin-link';
import { pluginTextColor, pluginTextHighlight } from 'wix-rich-content-plugin-text-color';
import PropTypes from 'prop-types';

const AccordionEditor = ({ content }) => (
  <RicosEditor
    plugins={[pluginAccordion(), pluginLink(), pluginTextColor(), pluginTextHighlight()]}
    content={content}
  />
);

AccordionEditor.propTypes = {
  content: PropTypes.object,
};

export default AccordionEditor;
