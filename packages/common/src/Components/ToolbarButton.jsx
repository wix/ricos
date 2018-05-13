import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tooltip from './Tooltip';

class ToolbarButton extends Component {
  static propTypes = {
    theme: PropTypes.object,
    showTooltip: PropTypes.bool,
    tooltipText: PropTypes.string,
    button: PropTypes.element,
  };


  render() {
    const { theme, showTooltip, tooltipText, button } = this.props;

    if (showTooltip) {
      return (
        <Tooltip
          content={tooltipText}
          moveBy={{ x: 10, y: 5 }}
          theme={theme}
        >
          {button}
        </Tooltip>
      );
    } else {
      return button;
    }
  }
}

export default ToolbarButton;

