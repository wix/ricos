import React from 'react';
import { RicosViewer } from 'wix-rich-content-wrapper/dist/es/viewer';
import { pluginActionButton } from 'wix-rich-content-plugin-button/dist/module.viewer';
import PropTypes from 'prop-types';

const buttonConfig = {
  onClick: () => {
    // eslint-disable-next-line no-alert
    window.alert('pass `onClick` prop callback to customize action');
  },
};

const plugins = [pluginActionButton(buttonConfig)];

const ButtonsViewer = ({ contentState }) => (
  <RicosViewer contentState={contentState} plugins={plugins} />
);

ButtonsViewer.propTypes = {
  contentState: PropTypes.object,
};

export default ButtonsViewer;
