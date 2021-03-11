import React, { FunctionComponent } from 'react';
import { DraftContent, RicosEditor } from 'ricos-editor';
import { pluginAccordion } from 'wix-rich-content-plugin-accordion';
import { pluginLink } from 'wix-rich-content-plugin-link';
import { pluginIndent } from 'wix-rich-content-plugin-indent';
import { pluginLineSpacing } from 'wix-rich-content-plugin-line-spacing';
import { pluginTextColor, pluginTextHighlight } from 'wix-rich-content-plugin-text-color';
import { pluginCodeBlock } from 'wix-rich-content-plugin-code-block';

const AccordionEditor: FunctionComponent<{ content?: DraftContent }> = ({ content }) => (
  <RicosEditor
    plugins={[
      pluginTextColor(),
      pluginTextHighlight(),
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

export default AccordionEditor;
