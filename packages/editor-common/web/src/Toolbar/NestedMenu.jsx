import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClickOutside from 'react-click-outside';
import styles from './button-group.scss';
import Toolbar from './Toolbar';
import InlineToolbarButton from './InlineToolbarButton';

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
    const { dropDownProps } = this.props;
    const { tooltip, dataHook, getIcon, isMobile, t, buttonList, isActive } = dropDownProps;
    const { isModalOpen } = this.state;
    return (
      <ClickOutside className={styles.button_group} onClickOutside={this.closeModal}>
        <InlineToolbarButton
          isActive={isActive()}
          onClick={this.toggleModal}
          tooltipText={tooltip}
          dataHook={dataHook}
          isMobile={isMobile}
          icon={getIcon()}
          theme={{}}
          showArrowIcon
        />
        {isModalOpen && (
          <div className={styles.moreMenu}>
            <Toolbar theme={{}} isMobile={isMobile} t={t} buttons={buttonList} vertical />
          </div>
        )}
      </ClickOutside>
    );
  }
}

NestedMenu.propTypes = {
  dropDownProps: PropTypes.object,
};

export default NestedMenu;
