import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextButton from './TextButton';
import { EditorModals, getModalStyles } from 'wix-rich-content-editor-common';
import { PlusIcon } from '../../icon';

export default class AddPluginButton extends Component {
  handleClick = () => this.openAddPluginModal();

  openAddPluginModal = () => {
    const {
      getEditorState,
      setEditorState,
      structure,
      pubsub,
      theme,
      t,
      isMobile,
      addPluginMenuConfig,
    } = this.props;
    this.props.openModal({
      modalName: EditorModals.MOBILE_ADD_PLUGIN,
      modalStyles: getModalStyles({ fullScreen: false, isMobile: true, stickyButtomMobile: true }),
      plugins: structure.map(({ component, buttonSettings: { name, section } }) => ({
        component,
        name,
        section: section || 'BlockToolbar_Section_Basic',
      })),
      theme,
      hidePopup: this.props.closeModal,
      getEditorState,
      setEditorState,
      pubsub,
      t,
      isMobile,
      addPluginMenuConfig,
    });
  };

  render() {
    const { theme } = this.props;
    return (
      <TextButton
        icon={PlusIcon}
        theme={theme}
        dataHook="addPluginButton"
        onClick={this.handleClick}
      />
    );
  }
}

AddPluginButton.propTypes = {
  pubsub: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  structure: PropTypes.array,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  isMobile: PropTypes.bool,
  addPluginMenuConfig: PropTypes.object,
};
