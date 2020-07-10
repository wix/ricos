import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from './Tooltip';

const ToolbarButton = ({ theme, tooltipText, button, tooltipOffset, shouldRefreshTooltips }) => {
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
