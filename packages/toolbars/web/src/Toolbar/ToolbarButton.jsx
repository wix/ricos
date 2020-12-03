import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DropdownArrowIcon from '../icons/DropdownArrowIcon';
import Styles from './ToolbarButton.scss';
import { mergeStyles } from 'wix-rich-content-common';
import Tooltip from 'wix-rich-content-common/dist/lib/Tooltip.cjs.jsx';

class ToolbarButton extends Component {
  constructor(props) {
    super(props);
    // const { buttonStyles = {} } = props.theme || {};
    const styles = mergeStyles({ styles: Styles, theme: props.theme });

    this.styles = {
      button: classNames(
        styles.toolbarButton
        // buttonStyles.inlineToolbarButton,
        // buttonStyles.pluginToolbarButton
      ),
      buttonWrapper: classNames(
        styles.toolbarButton_wrapper
        // buttonStyles.inlineToolbarButton_wrapper,
        // buttonStyles.pluginToolbarButton_wrapper
      ),
      icon: classNames(
        styles.toolbarButton_icon
        // buttonStyles.inlineToolbarButton_icon,
        // buttonStyles.pluginToolbarButton_icon
      ),
      active: classNames(
        styles.toolbarButton_active
        // buttonStyles.inlineToolbarButton_active,
        // buttonStyles.pluginToolbarButton_active
      ),
      menuButton: classNames(
        styles.toolbarButton_menuButton,
        styles.toolbarButton_icon
        // buttonStyles.inlineToolbarButton_icon,
        // buttonStyles.inlineToolbarButton_menuButton,
        // buttonStyles.pluginToolbarButton_icon
      ),
      arrowIcon: classNames(
        styles.toolbarButton_icon,
        styles.toolbarDropdownButton_arrowIcon
        // buttonStyles.inlineToolbarButton_icon,
        // buttonStyles.pluginToolbarButton_icon
      ),
    };
  }

  static propTypes = {
    onClick: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
    theme: PropTypes.object.isRequired,
    dataHook: PropTypes.string.isRequired,
    isMobile: PropTypes.bool,
    tooltipText: PropTypes.string,
    tabIndex: PropTypes.number,
    icon: PropTypes.func.isRequired,
    children: PropTypes.node,
    forwardRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.func })]),
    disabled: PropTypes.bool,
    buttonContent: PropTypes.string,
    showArrowIcon: PropTypes.bool,
    asGroupButton: PropTypes.bool,
    asContextButton: PropTypes.bool,
  };

  preventDefault = event => event.preventDefault();

  render() {
    const {
      isActive,
      tooltipText,
      dataHook,
      tabIndex,
      icon: Icon,
      forwardRef,
      disabled,
      buttonContent,
      showArrowIcon,
      onClick,
      asGroupButton,
      asContextButton,
    } = this.props;
    const { styles } = this;
    const arrowIcon = (
      <span
        className={classNames(styles.arrowIcon, {
          [styles.active]: isActive,
        })}
      >
        <DropdownArrowIcon />
      </span>
    );
    const iconClassNames = classNames(styles.icon, {
      [styles.active]: isActive,
    });
    const buttonTextContent = buttonContent || (
      <div className={iconClassNames}>
        <Icon />
      </div>
    );
    const menuButtonClassNames = classNames(styles.menuButton, {
      [styles.active]: isActive,
    });

    const wrapperClassNames = classNames(styles.buttonWrapper, {
      [styles.active]: isActive,
      [Styles.renderAsGroupButton]: asGroupButton || asContextButton,
    });

    const isMenu = !!showArrowIcon;
    return (
      <Tooltip key={tooltipText} content={tooltipText} tooltipOffset={{ y: -20 }}>
        <div className={wrapperClassNames}>
          <button
            disabled={disabled}
            tabIndex={tabIndex}
            aria-label={tooltipText}
            aria-pressed={isActive}
            data-hook={dataHook}
            onClick={onClick}
            className={classNames(styles.button, {
              [Styles.renderAsContextButton]: asContextButton,
            })}
            ref={forwardRef}
            onMouseDown={this.preventDefault}
          >
            {isMenu ? (
              <div className={menuButtonClassNames}>
                {buttonTextContent}
                {arrowIcon}
              </div>
            ) : (
              buttonTextContent
            )}
          </button>
          {this.props.children}
        </div>
      </Tooltip>
    );
  }
}

export default React.forwardRef((props, ref) => <ToolbarButton forwardRef={ref} {...props} />);
