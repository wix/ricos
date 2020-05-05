import React from 'react';
import { RicosEditor } from 'wix-rich-content-wrapper';
import { RichContentEditor } from 'wix-rich-content-editor';
import { pluginLinkButton, pluginActionButton } from 'wix-rich-content-plugin-button';
import PropTypes from 'prop-types';

const config = {
  insertButtonTooltip: 'Custom action tooltip',
};

const ButtonsEditor = ({ editorState }) => (
  <RicosEditor plugins={[pluginActionButton(config), pluginLinkButton()]}>
    <RichContentEditor editorState={editorState} />
  </RicosEditor>
);

ButtonsEditor.propTypes = {
  editorState: PropTypes.object,
};

export default ButtonsEditor;
