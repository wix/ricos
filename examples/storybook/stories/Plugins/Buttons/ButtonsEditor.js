import React from 'react';
import { RicosEditor } from 'wix-rich-content-wrapper';
import { pluginLinkButton, pluginActionButton } from 'wix-rich-content-plugin-button';
import PropTypes from 'prop-types';

const config = {
  insertButtonTooltip: 'Custom action tooltip',
};

const plugins = [pluginActionButton(config), pluginLinkButton()];

const ButtonsEditor = ({ contentState }) => (
  <RicosEditor plugins={plugins} contentState={contentState} />
);

ButtonsEditor.propTypes = {
  contentState: PropTypes.object,
};

export default ButtonsEditor;
