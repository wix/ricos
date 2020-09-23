import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextButton from '../TextButton';
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
      const { theme, isMobile, tabIndex } = this.props;
      return (
        <TextButton
          icon={getIcon()}
          theme={theme}
          isMobile={isMobile}
          isActive={isActive}
          onClick={onClick}
          tooltipText={tooltip}
          dataHook={dataHook}
          disabled={isDisabled()}
          tabIndex={tabIndex}
          shouldRefreshTooltips={this.props.shouldRefreshTooltips}
        />
      );
    }
  };
