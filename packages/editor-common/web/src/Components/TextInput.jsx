import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { mergeStyles } from 'wix-rich-content-common';
import { ErrorIcon } from '../Icons';
import Tooltip from './Tooltip';
import textInputStyles from '../../statics/styles/text-input.scss';

export default class TextInput extends React.Component {
  static propTypes = {
    inputRef: PropTypes.func,
    theme: PropTypes.object.isRequired,
    error: PropTypes.string,
    showTooltip: PropTypes.bool,
    suffixIcon: PropTypes.object,
    prefixIcon: PropTypes.object,
  };

  static defaultProps = {
    showTooltip: true,
  };

  sideIconRenderer = (iconObj, style) => {
    const { Icon, onClick } = iconObj;
    return <Icon onClick={onClick} className={style} />;
  };

  render() {
    const {
      inputRef,
      error,
      theme,
      showTooltip,
      suffixIcon,
      prefixIcon,
      ...otherProps
    } = this.props;

    const styles = mergeStyles({ styles: textInputStyles, theme });
    return (
      <div className={styles.textInput}>
        {prefixIcon && this.sideIconRenderer(prefixIcon, styles.textInput_prefixIcon)}
        <input
          ref={inputRef}
          className={classNames(styles.textInput_input, {
            [styles.textInput_input_invalid]: error,
            [styles.textInput_input_with_prefix]: prefixIcon,
            [styles.textInput_input_without_prefix]: !prefixIcon,
          })}
          {...otherProps}
        />
        {error ? (
          showTooltip ? (
            <Tooltip
              shouldRebuildOnUpdate={() => !!error}
              content={error}
              theme={theme}
              moveBy={{ y: 0 }}
              type={'error'}
            >
              <ErrorIcon className={styles.textInput_errorIcon} />
            </Tooltip>
          ) : (
            <ErrorIcon className={styles.textInput_errorIcon} />
          )
        ) : (
          suffixIcon && this.sideIconRenderer(suffixIcon, styles.textInput_suffixIcon)
        )}
      </div>
    );
  }
}
