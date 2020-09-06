import React from 'react';
import { RicosEditor } from 'ricos-editor';
import { pluginAccordion } from 'wix-rich-content-plugin-accordion';
import { pluginLink } from 'wix-rich-content-plugin-link';
import { pluginIndent } from 'wix-rich-content-plugin-indent';
import { pluginLineSpacing } from 'wix-rich-content-plugin-line-spacing';
import { pluginTextColor, pluginTextHighlight } from 'wix-rich-content-plugin-text-color';
import { pluginCodeBlock } from 'wix-rich-content-plugin-code-block';
import PropTypes from 'prop-types';

const AccordionEditor = ({ content }) => (
  <RicosEditor
    plugins={[
      pluginAccordion({
        innerRCEPlugins: [
          pluginTextColor().createPlugin,
          pluginTextHighlight().createPlugin,
          pluginIndent().createPlugin,
          pluginLineSpacing().createPlugin,
          pluginLink().createPlugin,
          pluginCodeBlock().createPlugin,
        ],
      }),
    ]}
    content={content}
  />
);

AccordionEditor.propTypes = {
  content: PropTypes.object,
};

export default AccordionEditor;
