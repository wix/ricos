import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ClickOutside from 'react-click-outside';
import styles from './Toolbar.scss';
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
      <ClickOutside className={styles.buttonWrapper} onClickOutside={this.closeModal}>
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
};

export default ModalButton;
