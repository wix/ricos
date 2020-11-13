import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'wix-rich-content-common/dist/lib/Tooltip.jsx';

const TextToolbarButton = ({ getIcon, isActive, isDisabled, dataHook, tooltip, onClick }) => {
  const Icon = getIcon();
  const style = isActive() ? { background: 'lightslategray' } : {};
  return (
    <Tooltip content={tooltip} place="bottom" moveBy={{ y: -20 }}>
      <button disabled={isDisabled()} data-hook={dataHook} onClick={onClick} style={style}>
        <Icon />
      </button>
    </Tooltip>
  );
};

TextToolbarButton.propTypes = {
  isMobile: PropTypes.bool,
  tabIndex: PropTypes.number,
  shouldRefreshTooltips: PropTypes.bool,
  getIcon: PropTypes.function,
  onClick: PropTypes.function,
  isActive: PropTypes.function,
  isDisabled: PropTypes.function,
  tooltip: PropTypes.string,
  dataHook: PropTypes.string,
};

TextToolbarButton.defaultProps = {
  isDisabled: () => false,
};

export default TextToolbarButton;
