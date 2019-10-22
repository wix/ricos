import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isEmpty } from 'lodash';

import { mergeStyles, ToolbarButton } from 'wix-rich-content-common';
import styles from 'wix-rich-content-common/dist/statics/styles/inline-toolbar-button.scss';

export default class TextButton extends Component {
  constructor(props) {
    super(props);
    const { buttonStyles } = props.theme || {};
    this.styles = mergeStyles({ styles, theme: buttonStyles });
  }

  static propTypes = {
    icon: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    isActive: PropTypes.func,
    theme: PropTypes.object.isRequired,
    isMobile: PropTypes.bool,
    tooltipText: PropTypes.string,
    dataHook: PropTypes.string,
    tabIndex: PropTypes.number,
  };

  static defaultProps = {
    tabIndex: 0,
  };

  isActive = () => {
    const { isActive } = this.props;
    return isActive ? isActive() : false;
  };

  handleClick = event => {
    const { onClick } = this.props;
    onClick && onClick(event);
  };

  preventBubblingUp = event => event.preventDefault();

  render() {
    const { styles } = this;
    const { icon: Icon, theme, isMobile, tooltipText, dataHook, tabIndex } = this.props;
    const showTooltip = !isMobile && !isEmpty(tooltipText);
    const iconClassNames = classNames(styles.inlineToolbarButton_icon, {
      [styles.inlineToolbarButton_active]: this.isActive(),
    });

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    const textButton = (
      <div className={styles.inlineToolbarButton_wrapper} onMouseDown={this.preventBubblingUp}>
        <button
          tabIndex={tabIndex}
          aria-label={tooltipText}
          aria-pressed={this.isActive()}
          className={styles.inlineToolbarButton}
          data-hook={dataHook}
          onClick={this.handleClick}
        >
          <div className={iconClassNames}>
            <Icon />
          </div>
        </button>
      </div>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */

    return (
      <ToolbarButton
        theme={theme}
        showTooltip={showTooltip}
        tooltipText={tooltipText}
        button={textButton}
        tooltipOffset={{ y: -20 }}
      />
    );
  }
}
