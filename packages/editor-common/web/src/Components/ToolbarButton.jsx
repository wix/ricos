import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from './Tooltip';

const ToolbarButton = ({
  theme,
  showTooltip,
  tooltipText,
  button,
  tooltipOffset,
  shouldRefreshTooltips,
}) => {
  if (!showTooltip) {
    return button;
  }
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
};

ToolbarButton.propTypes = {
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

ToolbarButton.defaultProps = {
  tooltipOffset: {
    y: -20,
  },
};

export default ToolbarButton;
