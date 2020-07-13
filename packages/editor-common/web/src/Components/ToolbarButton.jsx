import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'wix-rich-content-common';

const ToolbarButton = ({ tooltipText, button, tooltipOffset, isMobile }) => {
  return (
    <Tooltip content={tooltipText} tooltipOffset={tooltipOffset} isMobile={isMobile}>
      {button}
    </Tooltip>
  );
};

ToolbarButton.propTypes = {
  theme: PropTypes.object,
  isMobile: PropTypes.bool,
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
    x: 0,
    y: -20,
  },
};

export default ToolbarButton;
