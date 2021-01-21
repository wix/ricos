import React, { FunctionComponent } from 'react';
import { RicosContent, RicosEditor } from 'ricos-editor';
import { pluginLinkButton, pluginActionButton } from 'wix-rich-content-plugin-button';

const config = {
  insertButtonTooltip: 'Custom action tooltip',
};

const plugins = [pluginActionButton(config), pluginLinkButton()];

const ButtonsEditor: FunctionComponent<{ content?: RicosContent }> = ({ content }) => (
  <RicosEditor plugins={plugins} content={content} />
);

export default ButtonsEditor;
