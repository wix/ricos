import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import ToolbarButton from '../../Components/ToolbarButton';

export default ({ alignment, size, Icon, tooltipTextKey }) =>
  class BlockAlignmentAndSizeButton extends Component {
    static propTypes = {
      size: PropTypes.string,
      alignment: PropTypes.string,
      setLayoutProps: PropTypes.func.isRequired,
      disabled: PropTypes.bool,
      theme: PropTypes.object.isRequired,
      isMobile: PropTypes.bool,
      tooltipText: PropTypes.string,
      t: PropTypes.func,
      tabIndex: PropTypes.number,
    };

    isActive = () => this.props.alignment === alignment && this.props.size === size;

    handleClick = event => {
      event.preventDefault();
      if (this.props.disabled) {
        return;
      }
      this.props.setLayoutProps({ alignment, size });
    };

    preventBubblingUp = event => {
      event.preventDefault();
    };

    render() {
      const { disabled, theme, isMobile, t, tabIndex } = this.props;
      const className = classNames({
        [theme.button]: true,
        [theme.active]: this.isActive(),
        [theme.disabled]: disabled,
      });
      const tooltipText = t(tooltipTextKey);
      const showTooltip = !isMobile && !isEmpty(tooltipText);
      const textForHooks = tooltipText.replace(/\s+/, '');
      const dataHookText = `blockAlignmentAndSizeButton_${textForHooks}`;

      /* eslint-disable jsx-a11y/no-static-element-interactions */
      const blockButton = (
        <div className={theme.buttonWrapper} onMouseDown={this.preventBubblingUp}>
          <button tabIndex={tabIndex} className={className} data-hook={dataHookText} onClick={this.handleClick}>
            <div className={theme.icon}>
              <Icon />
            </div>
          </button>
        </div>
      );
      /* eslint-enable jsx-a11y/no-static-element-interactions */

      return <ToolbarButton theme={theme} showTooltip={showTooltip} tooltipText={tooltipText} button={blockButton} />;
    }
  };
