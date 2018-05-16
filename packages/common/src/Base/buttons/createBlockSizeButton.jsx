import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import ToolbarButton from '../../Components/ToolbarButton';

export default ({ size, Icon, tooltipTextKey }) =>
  class BlockSizeButton extends Component {
    static propTypes = {
      setSize: PropTypes.func.isRequired,
      size: PropTypes.string,
      theme: PropTypes.object.isRequired,
      isMobile: PropTypes.bool,
      tooltipText: PropTypes.string,
      t: PropTypes.func,
      tabIndex: PropTypes.number,
    };

    isActive = () => this.props.size === size;

    handleClick = () => this.props.setSize(size);

    preventBubblingUp = event => {
      event.preventDefault();
    };

    render() {
      const { theme, isMobile, t, tabIndex } = this.props;
      const className = this.isActive() ? classNames(theme.button, theme.active) : theme.button;
      const tooltipText = t(tooltipTextKey);
      const showTooltip = !isMobile && !isEmpty(tooltipText);
      const textForHooks = tooltipText.replace(/\s+/, '');
      const dataHookText = `blockSizeButton_${textForHooks}`;

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
