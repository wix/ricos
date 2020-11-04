import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClickOutside from 'react-click-outside';
import styles from './ContextMenu.scss';
import Tooltip from 'wix-rich-content-common/dist/lib/Tooltip.cjs.jsx';
import Toolbar from './Toolbar';

class ContextMenu extends Component {
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
    const { dropDownProps } = this.props;
    const { tooltip, dataHook, getIcon, isMobile, t, buttonList } = dropDownProps;
    const { isModalOpen } = this.state;
    const Icon = getIcon();
    return (
      <ClickOutside className={styles.moreToolbar} onClickOutside={this.closeModal}>
        <Tooltip content={tooltip} place="bottom" moveBy={{ y: -20 }}>
          <button data-hook={dataHook} onClick={this.toggleModal} onMouseDown={this.onMouseDown}>
            <Icon />
          </button>
        </Tooltip>
        {isModalOpen && (
          <div className={styles.moreMenu}>
            <Toolbar theme={{}} isMobile={isMobile} t={t} buttons={buttonList} vertical />
          </div>
        )}
      </ClickOutside>
    );
  }
}

ContextMenu.propTypes = {
  dropDownProps: PropTypes.object,
};

export default ContextMenu;
