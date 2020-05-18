import React from 'react';
import { RicosViewer } from 'ricos-viewer';
import { pluginActionButton } from 'wix-rich-content-plugin-button/dist/module.viewer';
import PropTypes from 'prop-types';

const buttonConfig = {
  onClick: () => {
    // eslint-disable-next-line no-alert
    window.alert('pass `onClick` prop callback to customize action');
  },
};

const plugins = [pluginActionButton(buttonConfig)];

const ButtonsViewer = ({ content }) => <RicosViewer content={content} plugins={plugins} />;

ButtonsViewer.propTypes = {
  content: PropTypes.object,
};

export default ButtonsViewer;
