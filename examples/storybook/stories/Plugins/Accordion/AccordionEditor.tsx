import React, { FunctionComponent } from 'react';
import { RicosContent, RicosEditor } from 'ricos/editor';
import { pluginAccordion } from 'ricos/accordion';
import { pluginLink } from 'ricos/link';
import { pluginIndent } from 'ricos/indent';
import { pluginLineSpacing } from 'ricos/line-spacing';
import { pluginTextColor, pluginTextHighlight } from 'ricos/text-color';
import { pluginCodeBlock } from 'ricos/code-block';

const AccordionEditor: FunctionComponent<{ content?: RicosContent }> = ({ content }) => (
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
