import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClickOutside from 'react-click-outside';
import styles from './ModalButton.scss';
import InlineToolbarButton from './InlineToolbarButton';

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
    const { modal, dropDownProps, onSelect } = this.props;
    const { isActive, tooltip, dataHook, getIcon, isDisabled, tabIndex, isMobile } = dropDownProps;
    const { isModalOpen } = this.state;
    return (
      <ClickOutside className={styles.moreToolbar} onClickOutside={this.closeModal}>
        <InlineToolbarButton
          isActive={isActive()}
          onClick={this.toggleModal}
          tooltipText={tooltip}
          dataHook={dataHook}
          tabIndex={tabIndex}
          isMobile={isMobile}
          disabled={isDisabled()}
          icon={getIcon()}
          theme={{}}
        />
        {isModalOpen && (
          <div data-id="table-formatting-toolbar-modal" className={styles.moreMenu}>
            {modal({ closeCustomModal: this.closeModal, onSelect })}
          </div>
        )}
      </ClickOutside>
    );
  }
}

ModalButton.propTypes = {
  modal: PropTypes.object,
  dropDownProps: PropTypes.object,
  onSelect: PropTypes.func,
};

export default ModalButton;
