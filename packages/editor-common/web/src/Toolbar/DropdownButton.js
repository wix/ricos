import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClickOutside from 'react-click-outside';
import InlineToolbarButton from './InlineToolbarButton.jsx';

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
      // getLabel,
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
    } = this.props;
    const disabledState = isDisabled() || disabled;
    // const buttonProps = arrow ? { buttonContent: getLabel() } : { icon: getIcon() };
    return (
      // <div style={{ display: 'inline-block' }}>
      <div>
        <ClickOutside onClickOutside={onClose}>
          <InlineToolbarButton
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
          />
        </ClickOutside>
      </div>
    );
  }
}
export default DropdownButton;
