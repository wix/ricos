import React from 'react';
import PropTypes from 'prop-types';
import { TooltipGenerator } from 'wix-rich-content-common';

const ToolbarButton = ({ tooltipText, button, tooltipOffset, isMobile }) => {
  return (
    <TooltipGenerator
      content={tooltipText}
      parent={button}
      tooltipOffset={tooltipOffset}
      isMobile={isMobile}
    />
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
