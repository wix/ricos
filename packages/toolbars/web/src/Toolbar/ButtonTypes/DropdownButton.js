import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClickOutside from 'react-click-outside';
import ToolbarButton from '../ToolbarButton.jsx';

class DropdownButton extends Component {
  static propTypes = {
    isMobile: PropTypes.bool,
    tabIndex: PropTypes.number,
    getLabel: PropTypes.func,
    getIcon: PropTypes.func,
    onClick: PropTypes.func,
    tooltip: PropTypes.string,
    dataHook: PropTypes.string,
    isActive: PropTypes.func,
    isDisabled: PropTypes.func,
    arrow: PropTypes.bool,
    onClose: PropTypes.func,
    theme: PropTypes.object,
    getButtonStyles: PropTypes.func,
    disabled: PropTypes.bool,
  };

  handleDropDownClick = onClick => () => {
    if (this.buttonRef) {
      onClick({ ref: this.buttonRef });
    }
  };

  render() {
    const {
      isMobile,
      tabIndex,
      getIcon,
      onClick,
      tooltip,
      dataHook,
      isActive,
      arrow = false,
      onClose = () => {},
      getButtonStyles,
      disabled,
      isDisabled,
      theme,
    } = this.props;
    const disabledState = isDisabled() || disabled;
    return (
      <div>
        <ClickOutside onClickOutside={onClose}>
          <ToolbarButton
            isActive={isActive()}
            onClick={this.handleDropDownClick(onClick)}
            showArrowIcon={arrow}
            getButtonStyles={getButtonStyles}
            tooltipText={tooltip}
            dataHook={dataHook}
            tabIndex={tabIndex}
            isMobile={isMobile}
            disabled={disabledState}
            ref={ref => (this.buttonRef = ref)}
            icon={getIcon()}
            theme={theme}
          />
        </ClickOutside>
      </div>
    );
  }
}
export default DropdownButton;
