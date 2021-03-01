import React, { FunctionComponent } from 'react';
import { RicosContent, RicosEditor } from 'ricos/editor';
import { pluginAccordion } from 'ricos/accordion/editor';
import { pluginLink } from 'ricos/link/editor';
import { pluginIndent } from 'ricos/indent/editor';
import { pluginLineSpacing } from 'ricos/line-spacing/editor';
import { pluginTextColor, pluginTextHighlight } from 'ricos/text-color/editor';
import { pluginCodeBlock } from 'ricos/code-block/editor';

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
