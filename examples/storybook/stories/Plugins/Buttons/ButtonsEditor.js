import React from 'react';
import { RichContentWrapper } from 'wix-rich-content-wrapper';
import { RichContentEditor } from 'wix-rich-content-editor';
import { pluginLinkButton, pluginActionButton } from 'wix-rich-content-plugin-button';
import PropTypes from 'prop-types';

const config = {
  onClick: true,
  insertButtonTooltip: 'Custom action tooltip',
};

const ButtonsEditor = ({ editorState }) => (
  <RichContentWrapper plugins={[pluginActionButton(config), pluginLinkButton()]} isEditor>
    <RichContentEditor editorState={editorState} />
  </RichContentWrapper>
);

ButtonsEditor.propTypes = {
  editorState: PropTypes.object,
};

export default ButtonsEditor;
