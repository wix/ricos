import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ToolbarButton } from 'wix-rich-content-editor-common';

export default ({ Icon, tooltipTextKey }) =>
  class BlockButton extends Component {
    static propTypes = {
      onClick: PropTypes.func,
      disabled: PropTypes.bool,
      theme: PropTypes.object.isRequired,
      keyName: PropTypes.string.isRequired,
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
      const { theme, t, tabIndex, keyName } = this.props;
      const tooltipText = t(tooltipTextKey);
      const dataHookText = `blockButton_${keyName}`;

      const blockButton = (
        /* eslint-disable jsx-a11y/no-static-element-interactions */
        <div className={theme.buttonWrapper} onMouseDown={this.preventBubblingUp}>
          <button
            aria-label={tooltipText}
            tabIndex={tabIndex}
            className={theme.button}
            data-hook={dataHookText}
            onClick={this.handleClick}
          >
            <div className={theme.icon}>
              <Icon />
            </div>
          </button>
        </div>
        /* eslint-enable jsx-a11y/no-static-element-interactions */
      );

      return <ToolbarButton theme={theme} tooltipText={tooltipText} button={blockButton} />;
    }
  };
