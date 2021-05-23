import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClickOutside from 'react-click-outsider';
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
    setKeepOpen: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.isDropDownOpen = false;
  }

  handleDropDownClick = onClick => () => {
    if (this.buttonRef) {
      this.props.setKeepOpen?.(true);
      onClick({ ref: this.buttonRef });
      this.isDropDownOpen = true;
    }
  };

  onDropDownClose = onClose => () => {
    if (this.isDropDownOpen) {
      this.props.setKeepOpen?.(false);
      onClose();
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
      getLabel,
    } = this.props;
    const disabledState = isDisabled() || disabled;
    const buttonProps = arrow && getLabel ? { buttonContent: getLabel() } : { icon: getIcon() };
    return (
      <div>
        <ClickOutside onClickOutside={this.onDropDownClose(onClose)}>
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
            theme={theme}
            {...buttonProps}
          />
        </ClickOutside>
      </div>
    );
  }
}
export default DropdownButton;
