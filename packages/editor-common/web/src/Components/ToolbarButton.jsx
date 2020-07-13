import React from 'react';
import PropTypes from 'prop-types';
import { TooltipGenerator } from 'wix-rich-content-common';

const ToolbarButton = ({ tooltipText, button, tooltipOffset }) => {
  return <TooltipGenerator content={tooltipText} parent={button} tooltipOffset={tooltipOffset} />;
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
    x: 0,
    y: -20,
  },
};

export default ToolbarButton;
