import React, { FunctionComponent } from 'react';
import { RicosContent, RicosEditor } from 'ricos/editor';
import { pluginLinkButton, pluginActionButton } from 'ricos/button/editor';

const config = {
  insertButtonTooltip: 'Custom action tooltip',
};

const plugins = [pluginActionButton(config), pluginLinkButton()];

const ButtonsEditor: FunctionComponent<{ content?: RicosContent }> = ({ content }) => (
  <RicosEditor plugins={plugins} content={content} />
);

export default ButtonsEditor;
