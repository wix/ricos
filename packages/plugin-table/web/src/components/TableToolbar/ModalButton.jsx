import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClickOutside from 'react-click-outside';
import styles from './ModalButton.scss';
import FormattingDropdownButton from 'wix-rich-content-editor-common/dist/lib/FormattingDropdownButton.cjs.js';

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
    const { isModalOpen } = this.state;
    return (
      <ClickOutside className={styles.moreToolbar} onClickOutside={this.closeModal}>
        <FormattingDropdownButton {...dropDownProps} onClick={this.toggleModal} />
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
  modal: PropTypes.func,
  dropDownProps: PropTypes.object,
  onSelect: PropTypes.func,
};

export default ModalButton;
