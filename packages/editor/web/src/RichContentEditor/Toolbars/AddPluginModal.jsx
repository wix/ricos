import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SideToolbarPanelContent from './SideToolbar/SideToolbarPanelContent';

export default class AddPluginModal extends Component {
  hidePopup = () => this.props.hidePopup();

  render() {
    const { getEditorState, setEditorState, structure, theme, hidePopup, t, isMobile } = this.props;
    return (
      <SideToolbarPanelContent
        theme={theme}
        getEditorState={getEditorState}
        setEditorState={setEditorState}
        structure={structure}
        t={t}
        hidePopup={hidePopup}
        isMobile={isMobile}
      />
    );
  }
}

AddPluginModal.propTypes = {
  pubsub: PropTypes.object.isRequired,
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  structure: PropTypes.array.isRequired,
  hidePopup: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  isMobile: PropTypes.bool,
};
