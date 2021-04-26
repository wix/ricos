import React, { FunctionComponent } from 'react';
import { DraftContent, RicosViewer } from 'ricos-viewer';
import { pluginActionButton } from 'wix-rich-content-plugin-button/dist/module.viewer';

const buttonConfig = {
  onClick: () => {
    // eslint-disable-next-line no-alert
    window.alert('pass `onClick` prop callback to customize action');
  },
};

const plugins = [pluginActionButton(buttonConfig)];

const ButtonsViewer: FunctionComponent<{ content?: DraftContent }> = ({ content }) => (
  <RicosViewer content={content} plugins={plugins} />
);

export default ButtonsViewer;
