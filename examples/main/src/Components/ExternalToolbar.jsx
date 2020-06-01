import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FileInput, Tooltip, BUTTON_TYPES } from 'wix-rich-content-editor-common';
import { RichContentEditorModal, withPluginButtons } from 'wix-rich-content-editor';
import ReactModal from 'react-modal';
import ModalsMap from '../../shared/editor/ModalsMap';
import styles from './ExternalToolbar.scss';

class ExternalToolbar extends Component {
  static propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.object).isRequired,
    t: PropTypes.func.isRequired,
    theme: PropTypes.object,
    isMobile: PropTypes.bool.isRequired,
    locale: PropTypes.string,
  };

  state = {};

  renderButton = buttonProps => {
    const { getIcon, dataHook, isDisabled, isActive, tooltip } = buttonProps;
    const Icon = getIcon();
    const style = isActive() ? { background: 'lightslategray' } : {};
    return (
      <Tooltip content={tooltip} place="right">
        <button
          disabled={isDisabled()}
          data-hook={dataHook}
          onClick={this.handleClick(buttonProps)}
          style={style}
        >
          <Icon />
        </button>
      </Tooltip>
    );
  };

  renderFileUploadButton = ({
    getIcon,
    label,
    onChange,
    accept,
    multiple,
    dataHook,
    isDisabled,
    name,
    tooltip
  }) => {
    const Icon = getIcon();
    return (
      <FileInput
        disabled={isDisabled()}
        dataHook={dataHook}
        onChange={onChange}
        accept={accept}
        multiple={multiple}
        key={name}
      >
        <Tooltip content={tooltip} place="right">
          <Icon />
        </Tooltip>
      </FileInput>
    );
  };

toggleButtonModal(
  event,
  {
    modalElement,
    modalName,
    modalStyles,
    onConfirm,
    componentData,
  }) {
    const { t, isMobile, theme } = this.props;
    this.openModal({
      modalElement,
      modalStyles,
      componentData,
      t,
      theme,
      isMobile,
      onConfirm,
    });
  };


  openModal = data => {
    const { modalStyles, ...modalProps } = data;
    try {
      document.documentElement.style.height = '100%';
      document.documentElement.style.position = 'relative';
    } catch (e) {
      console.warn('Cannot change document styles', e);
    }
    this.setState({
      showModal: true,
      modalProps,
      modalStyles,
    });
  };

  closeModal = () => {
    try {
      document.documentElement.style.height = 'initial';
      document.documentElement.style.position = 'initial';
    } catch (e) {
      console.warn('Cannot change document styles', e);
    }
    this.setState({
      showModal: false,
      modalProps: null,
      modalStyles: null,
      modalContent: null,
    });
  };

  handleClick = ({ onClick, ...modalProps }) => event => {
    if (onClick) {
      onClick(event);
    } else {
      this.toggleButtonModal(event, modalProps);
    }
  };

  render() {
    const { buttons } = this.props;
    return (
      <div className={styles.toolbar}>
        {
          Object.values(buttons).map(
            buttonProps => buttonProps.type === BUTTON_TYPES.FILE
            ? this.renderFileUploadButton(buttonProps)
            : this.renderButton(buttonProps))
        }
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="External Modal Example"
          style={this.state.modalStyles}
          role="dialog"
          onRequestClose={this.closeModal}
        >
          <RichContentEditorModal
            modalsMap={ModalsMap}
            locale={this.props.locale}
            {...this.state.modalProps}
          />
        </ReactModal>
      </div>
    );
  }
}

export default withPluginButtons(ExternalToolbar);
