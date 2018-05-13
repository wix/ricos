import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import ToolbarButton from '../../Components/ToolbarButton';

export default ({ Icon, tooltipTextKey }) =>
  class BlockButton extends Component {
    static propTypes = {
      onClick: PropTypes.func,
      theme: PropTypes.object.isRequired,
      isMobile: PropTypes.bool,
      tooltipText: PropTypes.string,
      t: PropTypes.func,
      tabIndex: PropTypes.number,
    };

    handleClick = () => {
      const { onClick } = this.props;
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
