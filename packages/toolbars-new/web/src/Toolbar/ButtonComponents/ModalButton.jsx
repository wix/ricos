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
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { modal, dropDownProps, onSelect, theme, t, onSave } = this.props;
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
    const buttonProps = arrow ? { buttonContent: getLabel() } : { icon: getIcon() };
    return (
      <ClickOutside className={styles.buttonWrapper} onClickOutside={this.closeModal}>
        <ToolbarButton
          isActive={isActive()}
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
          >
            {modal({ closeCustomModal: this.closeModal, onSelect, t, onSave })}
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
};

export default ModalButton;
