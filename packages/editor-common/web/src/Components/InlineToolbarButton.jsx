/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ToolbarButton from './ToolbarButton';
import DropdownArrowIcon from '../Icons/DropdownArrowIcon';
import Styles from '../../statics/styles/inline-toolbar-button.scss';
import { mergeStyles } from 'wix-rich-content-common';

class InlineToolbarButton extends Component {
  constructor(props) {
    super(props);
    const { buttonStyles = {} } = props.theme || {};
    const styles = mergeStyles({ styles: Styles, theme: props.theme });

    this.styles = {
      button: classNames(
        styles.inlineToolbarButton,
        buttonStyles.inlineToolbarButton,
        buttonStyles.pluginToolbarButton
      ),
      buttonWrapper: classNames(
        styles.inlineToolbarButton_wrapper,
        buttonStyles.inlineToolbarButton_wrapper,
        buttonStyles.pluginToolbarButton_wrapper
      ),
      icon: classNames(
        styles.inlineToolbarButton_icon,
        buttonStyles.inlineToolbarButton_icon,
        buttonStyles.pluginToolbarButton_icon
      ),
      active: classNames(
        styles.inlineToolbarButton_active,
        buttonStyles.inlineToolbarButton_active,
        buttonStyles.pluginToolbarButton_active
      ),
      menuButton: classNames(
        styles.inlineToolbarButton_menuButton,
        styles.inlineToolbarButton_icon,
        buttonStyles.inlineToolbarButton_icon,
        buttonStyles.inlineToolbarButton_menuButton,
        buttonStyles.pluginToolbarButton_icon
      ),
      arrowIcon: classNames(
        styles.inlineToolbarButton_icon,
        styles.inlineToolbarDropdownButton_arrowIcon,
        buttonStyles.inlineToolbarButton_icon,
        buttonStyles.pluginToolbarButton_icon
      ),
      arrowIconOpen: styles.inlineToolbarDropdownButton_arrowIcon_isOpen,
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
    forwardRef: ([PropTypes.func, ({ current: PropTypes.func })]),
    disabled: PropTypes.bool,
    buttonContent: PropTypes.string,
    showArrowIcon: PropTypes.bool,
  };

  preventDefault = event => event.preventDefault();

  render() {
    const {
      isActive,
      theme,
      tooltipText,
      dataHook,
      tabIndex,
      icon: Icon,
      forwardRef,
      disabled,
      buttonContent,
      showArrowIcon,
      onClick,
    } = this.props;
    const { styles } = this;
    const arrowIcon = (
      <span
        className={classNames(styles.arrowIcon, {
          [styles.arrowIconOpen]: isActive,
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

    const wrapperClassNames = classNames(styles.buttonWrapper, { [styles.active]: isActive });

    const isMenu = !!showArrowIcon;
    const codeBlockButton = (
      /* eslint-disable jsx-a11y/no-static-element-interactions */
      <div className={wrapperClassNames}>
        <button
          disabled={disabled}
          tabIndex={tabIndex}
          aria-label={tooltipText}
          aria-pressed={isActive}
          data-hook={dataHook}
          onClick={onClick}
          className={styles.button}
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
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
    return <ToolbarButton theme={theme} tooltipText={tooltipText} button={codeBlockButton} />;
  }
}

export default React.forwardRef((props, ref) => (
  <InlineToolbarButton forwardRef={ref} {...props} />
));
