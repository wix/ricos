import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClickOutside from 'react-click-outside';
import styles from './Toolbar.scss';
import Toolbar from './Toolbar';
import ToolbarButton from './ToolbarButton';

class NestedMenu extends Component {
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
  onMouseDown = event => {
    event.preventDefault();
  };

  render() {
    const { dropDownProps, theme } = this.props;
    const { tooltip, dataHook, getIcon, isMobile, t, buttonList, isActive } = dropDownProps;
    const { isModalOpen } = this.state;
    return (
      <ClickOutside className={styles.buttonWrapper} onClickOutside={this.closeModal}>
        <ToolbarButton
          isActive={isActive()}
          onClick={this.toggleModal}
          tooltipText={tooltip}
          dataHook={dataHook}
          isMobile={isMobile}
          icon={getIcon()}
          theme={theme}
          showArrowIcon
        />
        {isModalOpen && (
          <div className={styles.modal}>
            <Toolbar theme={theme} isMobile={isMobile} t={t} buttons={buttonList} vertical />
          </div>
        )}
      </ClickOutside>
    );
  }
}

NestedMenu.propTypes = {
  dropDownProps: PropTypes.object,
  theme: PropTypes.object,
};

export default NestedMenu;
