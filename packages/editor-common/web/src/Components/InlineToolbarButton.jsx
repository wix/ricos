import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isEmpty } from 'lodash';
import ToolbarButton from './ToolbarButton';
import styles from '../../statics/styles/inline-toolbar-button.scss';

class InlineToolbarButton extends Component {
  constructor(props) {
    super(props);
    const { buttonStyles } = props.theme || {};

    this.styles = {
      button: classNames(styles.inlineToolbarButton, {
        [buttonStyles.inlineToolbarButton]: !!buttonStyles.inlineToolbarButton,
        [buttonStyles.pluginToolbarButton]: !!buttonStyles.pluginToolbarButton,
      }),
      buttonWrapper: classNames(styles.inlineToolbarButton_wrapper, {
        [buttonStyles.inlineToolbarButton_wrapper]: !!buttonStyles.inlineToolbarButton_wrapper,
        [buttonStyles.pluginToolbarButton_wrapper]: !!buttonStyles.pluginToolbarButton_wrapper,
      }),
      icon: classNames(styles.inlineToolbarButton_icon, {
        [buttonStyles.inlineToolbarButton_icon]: !!buttonStyles.inlineToolbarButton_icon,
        [buttonStyles.pluginToolbarButton_icon]: !!buttonStyles.pluginToolbarButton_icon,
      }),
      active: classNames(styles.inlineToolbarButton_active, {
        [buttonStyles.inlineToolbarButton_active]: !!buttonStyles.inlineToolbarButton_active,
        [buttonStyles.pluginToolbarButton_active]: !!buttonStyles.pluginToolbarButton_active,
      }),
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
  };

  preventDefault = event => event.preventDefault();

  render() {
    const {
      isActive,
      theme,
      isMobile,
      tooltipText,
      dataHook,
      tabIndex,
      icon: Icon,
      forwardRef,
      disabled,
    } = this.props;
    const { styles } = this;
    const showTooltip = !isMobile && !isEmpty(tooltipText);

    const iconClassNames = classNames(styles.icon, {
      [styles.active]: isActive,
    });

    const codeBlockButton = (
      /* eslint-disable jsx-a11y/no-static-element-interactions */
      <div className={styles.buttonWrapper}>
        <button
          disabled={disabled}
          tabIndex={tabIndex}
          aria-label={tooltipText}
          aria-pressed={isActive}
          data-hook={dataHook}
          onClick={this.props.onClick}
          className={styles.button}
          ref={forwardRef}
          onMouseDown={this.preventDefault}
        >
          <div className={iconClassNames}>
            <Icon />
          </div>
        </button>
        {this.props.children}
      </div>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */

    return (
      <ToolbarButton
        theme={theme}
        showTooltip={showTooltip}
        tooltipText={tooltipText}
        button={codeBlockButton}
      />
    );
  }
}

export default React.forwardRef((props, ref) => (
  <InlineToolbarButton forwardRef={ref} {...props} />
));
