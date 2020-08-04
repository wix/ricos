import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'wix-rich-content-common/dist/lib/Tooltip.cjs.jsx';
/*
  createTextToolbarButton
*/
export default ({ getIcon, onClick, isActive, isDisabled = () => false, tooltip, dataHook }) =>
  class TextToolbarButton extends Component {
    static propTypes = {
      theme: PropTypes.object.isRequired,
      isMobile: PropTypes.bool,
      tabIndex: PropTypes.number,
      shouldRefreshTooltips: PropTypes.bool,
    };

    render() {
      const Icon = getIcon();
      const style = isActive() ? { background: 'lightslategray' } : {};
      return (
        <Tooltip content={tooltip} place="bottom" moveBy={{ y: -20 }}>
          <button disabled={isDisabled()} data-hook={dataHook} onClick={onClick} style={style}>
            <Icon />
          </button>
        </Tooltip>
      );
    }
  };
