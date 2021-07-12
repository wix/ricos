import React, { FunctionComponent } from 'react';
import { DraftContent, RicosEditor } from 'ricos-editor';
import { pluginCollapsibleList } from 'wix-rich-content-plugin-collapsible-list';
import { pluginLink } from 'wix-rich-content-plugin-link';
import { pluginIndent } from 'wix-rich-content-plugin-indent';
import { pluginLineSpacing } from 'wix-rich-content-plugin-line-spacing';
import { pluginTextColor, pluginTextHighlight } from 'wix-rich-content-plugin-text-color';
import { pluginCodeBlock } from 'wix-rich-content-plugin-code-block';

const CollapsibleListEditor: FunctionComponent<{ content?: DraftContent }> = ({ content }) => (
  <RicosEditor
    plugins={[
      pluginTextColor(),
      pluginTextHighlight(),
      pluginCollapsibleList({
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

export default CollapsibleListEditor;
