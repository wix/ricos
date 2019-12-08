import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tooltip from './Tooltip';

class ToolbarButton extends Component {
  static propTypes = {
    theme: PropTypes.object,
    showTooltip: PropTypes.bool,
    tooltipText: PropTypes.string,
    button: PropTypes.element,
    tooltipOffset: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
    shouldRefreshTooltips: PropTypes.func,
  };

  render() {
    const {
      theme,
      showTooltip,
      tooltipText,
      button,
      tooltipOffset,
      shouldRefreshTooltips,
    } = this.props;
    if (showTooltip) {
      return (
        <Tooltip
          content={tooltipText}
          moveBy={tooltipOffset}
          theme={theme}
          shouldRebuildOnUpdate={shouldRefreshTooltips}
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
