import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ClickOutside from 'react-click-outside';
import styles from './Toolbar.scss';
import ToolbarButton from './ToolbarButton';

class ModalButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
  }
  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };
  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { modal, dropDownProps, onSelect, theme } = this.props;
    const { isActive, tooltip, dataHook, getIcon, isDisabled, tabIndex, isMobile } = dropDownProps;
    const { isModalOpen } = this.state;
    return (
      <ClickOutside className={styles.buttonWrapper} onClickOutside={this.closeModal}>
        <ToolbarButton
          isActive={isActive()}
          onClick={this.toggleModal}
          tooltipText={tooltip}
          dataHook={dataHook}
          tabIndex={tabIndex}
          isMobile={isMobile}
          disabled={isDisabled()}
          icon={getIcon()}
          theme={theme}
        />
        {isModalOpen && (
          <div
            data-id="table-formatting-toolbar-modal"
            className={classNames(styles.modal, styles.withoutPadding)}
          >
            {modal({ closeCustomModal: this.closeModal, onSelect })}
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
  theme: PropTypes.object,
};

export default ModalButton;
