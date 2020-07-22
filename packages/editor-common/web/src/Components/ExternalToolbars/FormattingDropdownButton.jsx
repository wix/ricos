import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClickOutside from 'react-click-outside';

import InlineToolbarButton from '../InlineToolbarButton.jsx';

class FormattingDropdownButton extends Component {
  static propTypes = {
    isMobile: PropTypes.bool,
    tabIndex: PropTypes.number,
    getLabel: PropTypes.func,
    getIcon: PropTypes.func,
    onClick: PropTypes.func,
    tooltip: PropTypes.string,
    dataHook: PropTypes.string,
    isActive: PropTypes.func,
    arrow: PropTypes.bool,
    onClose: PropTypes.func,
    theme: PropTypes.object,
  };

  handleDropDownClick = onClick => () => {
    if (this.buttonRef) {
      onClick(this.buttonRef);
    }
  };

  render() {
    const {
      isMobile,
      tabIndex,
      getLabel,
      getIcon,
      onClick,
      tooltip,
      dataHook,
      isActive,
      theme,
      arrow = false,
      onClose = () => {},
    } = this.props;
    const buttonProps = arrow ? { buttonContent: getLabel() } : { icon: getIcon() };
    return (
      <ClickOutside onClickOutside={onClose}>
        <InlineToolbarButton
          isActive={isActive()}
          onClick={this.handleDropDownClick(onClick)}
          showArrowIcon={arrow}
          theme={theme}
          tooltipText={tooltip}
          dataHook={dataHook}
          tabIndex={tabIndex}
          isMobile={isMobile}
          ref={ref => (this.buttonRef = ref)}
          {...buttonProps}
        />
      </ClickOutside>
    );
  }
}
export default FormattingDropdownButton;
