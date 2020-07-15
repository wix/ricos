import React from 'react';
import { RicosEditor } from 'ricos-editor';
import { pluginLinkButton, pluginActionButton } from 'wix-rich-content-plugin-button';
import PropTypes from 'prop-types';

const config = {
  insertButtonTooltip: 'Custom action tooltip',
};

const plugins = [pluginActionButton(config), pluginLinkButton()];

const ButtonsEditor = ({ content }) => <RicosEditor plugins={plugins} content={content} />;

ButtonsEditor.propTypes = {
  content: PropTypes.object,
};

export default ButtonsEditor;
