import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import { ToolbarButton } from 'wix-rich-content-editor-common';

import styles from '../../../../statics/styles/text-label-button.scss';

export default class TextLabelButton extends Component {
  constructor(props) {
    super(props);
    const { buttonStyles } = props.theme || {};
    this.styles = mergeStyles({ styles, theme: buttonStyles });
  }

  static propTypes = {
    icon: PropTypes.func,
    onClick: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    isMobile: PropTypes.bool,
    tooltipText: PropTypes.string,
    dataHook: PropTypes.string,
    tabIndex: PropTypes.number,
    label: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps = {
    tabIndex: 0,
  };

  handleClick = event => {
    const { onClick } = this.props;
    onClick && onClick(event);
  };

  preventBubblingUp = event => event.preventDefault();

  render() {
    const { styles } = this;
    const {
      icon: Icon,
      theme,
      isMobile,
      tooltipText,
      dataHook,
      tabIndex,
      label,
      className,
    } = this.props;
    const showTooltip = !isMobile && !isEmpty(tooltipText);

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    const textButton = (
      <div className={styles.textLabelButton_wrapper} onMouseDown={this.preventBubblingUp}>
        <button
          tabIndex={tabIndex}
          aria-label={tooltipText}
          className={classNames(styles.textLabelButton, className)}
          data-hook={dataHook}
          onClick={this.handleClick}
        >
          {Icon && (
            <div className={styles.textLabelButton_icon}>
              <Icon />
            </div>
          )}
          <span className={styles.textLabelButton_label}>{label}</span>
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
      />
    );
  }
}
