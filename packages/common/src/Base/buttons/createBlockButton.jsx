import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import ToolbarButton from '../../Components/ToolbarButton';

export default ({ Icon, tooltipTextKey }) =>
  class BlockButton extends Component {
    static propTypes = {
      onClick: PropTypes.func,
      disabled: PropTypes.bool,
      theme: PropTypes.object.isRequired,
      isMobile: PropTypes.bool,
      tooltipText: PropTypes.string,
      t: PropTypes.func,
      tabIndex: PropTypes.number,
    };

    handleClick = event => {
      event.preventDefault();
      const { onClick, disabled } = this.props;
      if (disabled) {
        return;
      }
      onClick && onClick();
    };

    preventBubblingUp = event => {
      event.preventDefault();
    };

    render() {
      const { theme, isMobile, t, tabIndex } = this.props;
      const tooltipText = t(tooltipTextKey);
      const showTooltip = !isMobile && !isEmpty(tooltipText);
      const textForHooks = tooltipText.replace(/\s+/, '');
      const dataHookText = `blockButton_${textForHooks}`;

      const blockButton = (
        /* eslint-disable jsx-a11y/no-static-element-interactions */
        <div className={theme.buttonWrapper} onMouseDown={this.preventBubblingUp}>
          <button aria-label={tooltipText} tabIndex={tabIndex} className={theme.button} data-hook={dataHookText} onClick={this.handleClick}>
            <div className={theme.icon}>
              <Icon />
            </div>
          </button>
        </div>
        /* eslint-enable jsx-a11y/no-static-element-interactions */
      );

      return <ToolbarButton theme={theme} showTooltip={showTooltip} tooltipText={tooltipText} button={blockButton} />;
    }
  };
