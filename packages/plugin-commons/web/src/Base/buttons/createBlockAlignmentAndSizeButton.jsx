import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ToolbarButton } from 'wix-rich-content-editor-common';

export default ({ alignment, size, Icon, tooltipTextKey }) =>
  class BlockAlignmentAndSizeButton extends Component {
    static propTypes = {
      size: PropTypes.string,
      alignment: PropTypes.string,
      setLayoutProps: PropTypes.func.isRequired,
      keyName: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
      theme: PropTypes.object.isRequired,
      isMobile: PropTypes.bool,
      tooltipText: PropTypes.string,
      t: PropTypes.func,
      tabIndex: PropTypes.number,
      helpers: PropTypes.object,
      pluginType: PropTypes.string,
    };

    isActive = () => this.props.alignment === alignment && this.props.size === size;

    handleClick = event => {
      event.preventDefault();
      const { keyName, pluginType, helpers, setLayoutProps, disabled } = this.props;
      if (disabled) {
        return;
      }
      helpers?.onToolbarButtonClick?.({
        buttonName: 'AlignmentAndSize',
        pluginId: pluginType,
        value: `${alignment}|${size}`,
      });
      // aligning a custom size block (inline) should not change size
      if (keyName.includes('align') && this.props.size === 'inline') {
        setLayoutProps({ alignment });
      } else {
        setLayoutProps({ alignment, size });
      }
    };

    preventBubblingUp = event => {
      event.preventDefault();
    };

    render() {
      const { disabled, theme, t, tabIndex, keyName } = this.props;
      const className = classNames({
        [theme.button]: true,
        [theme.active]: this.isActive(),
        [theme.disabled]: disabled,
      });
      const tooltipText = t(tooltipTextKey);
      const dataHookText = `blockAlignmentAndSizeButton_${keyName}`;

      /* eslint-disable jsx-a11y/no-static-element-interactions */
      const blockButton = (
        <div className={theme.buttonWrapper} onMouseDown={this.preventBubblingUp}>
          <button
            tabIndex={tabIndex}
            className={className}
            data-hook={dataHookText}
            onClick={this.handleClick}
          >
            <div className={theme.icon}>
              <Icon />
            </div>
          </button>
        </div>
      );
      /* eslint-enable jsx-a11y/no-static-element-interactions */

      return <ToolbarButton theme={theme} tooltipText={tooltipText} button={blockButton} />;
    }
  };
