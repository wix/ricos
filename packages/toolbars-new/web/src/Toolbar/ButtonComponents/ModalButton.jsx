/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ClickOutside from 'react-click-outsider';
import styles from '../Toolbar.scss';
import ToolbarButton from '../ToolbarButton';

class ModalButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
  }

  toggleModal = () => {
    const { isModalOpen } = this.state;
    const {
      dropDownProps: { saveState, saveSelection },
      setKeepOpen,
    } = this.props;
    this.setState({ isModalOpen: !isModalOpen });
    if (!isModalOpen) {
      saveSelection?.();
      saveState?.();
      setKeepOpen?.(true);
    } else {
      setKeepOpen?.(false);
    }
  };

  closeModal = () => {
    if (this.state.isModalOpen) {
      const { setKeepOpen } = this.props;
      this.setState({ isModalOpen: false });
      setKeepOpen?.(false);
    }
  };

  onSave = (...args) => {
    this.props.onSave(...args);
    this.closeModal();
  };

  onCancel = () => {
    const {
      dropDownProps: { onCancel },
    } = this.props;
    onCancel?.();
    this.closeModal(false);
  };

  onChange = (...args) => {
    const {
      dropDownProps: { onChange },
    } = this.props;
    onChange?.(...args);
  };

  render() {
    const { modal, dropDownProps, onSelect, theme, t } = this.props;
    const {
      isActive,
      tooltip,
      dataHook,
      getIcon,
      isDisabled,
      tabIndex,
      isMobile,
      arrow = false,
      getLabel,
    } = dropDownProps;
    const { isModalOpen } = this.state;
    const buttonProps = arrow && getLabel ? { buttonContent: getLabel() } : { icon: getIcon() };
    return (
      <ClickOutside className={styles.buttonWrapper} onClickOutside={this.closeModal}>
        <ToolbarButton
          isActive={isModalOpen || isActive()}
          onClick={this.toggleModal}
          showArrowIcon={arrow}
          tooltipText={tooltip}
          dataHook={dataHook}
          tabIndex={tabIndex}
          isMobile={isMobile}
          disabled={isDisabled()}
          icon={getIcon()}
          theme={theme}
          {...buttonProps}
        />
        {isModalOpen && (
          <div
            data-id="table-formatting-toolbar-modal"
            className={classNames(styles.modal, styles.withoutPadding)}
            onMouseDown={event => event.preventDefault()}
          >
            {modal({
              closeCustomModal: this.closeModal,
              onSelect,
              t,
              onSave: this.onSave,
              theme,
              isMobile,
              onCancel: this.onCancel,
              onChange: this.onChange,
            })}
          </div>
        )}
      </ClickOutside>
    );
  }
}

ModalButton.propTypes = {
  modal: PropTypes.func,
  dropDownProps: PropTypes.object,
  onSelect: PropTypes.func,
  onSave: PropTypes.func,
  theme: PropTypes.object,
  t: PropTypes.func,
  setKeepOpen: PropTypes.func,
};

export default ModalButton;
