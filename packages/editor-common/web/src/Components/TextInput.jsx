import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { mergeStyles } from 'wix-rich-content-common';
import { ErrorIcon } from '../Icons';
import Tooltip from './Tooltip';
import textInputStyles from '../../statics/styles/text-input.scss';
import { omit } from 'lodash';

export default class TextInput extends React.Component {
  static propTypes = {
    inputRef: PropTypes.func,
    theme: PropTypes.object.isRequired,
    error: PropTypes.string,
    showTooltip: PropTypes.bool,
    onChange: PropTypes.func,
    getTarget: PropTypes.bool,
  };

  static defaultProps = {
    showTooltip: true,
  };

  handleOnChange = event => {
    const { onChange, getTarget } = this.props;
    onChange(getTarget ? event.target : event.target.value);
  };

  render() {
    const { inputRef, error, theme, showTooltip, ...otherProps } = this.props;
    const inputProps = omit(otherProps, ['onChange']);
    const styles = mergeStyles({ styles: textInputStyles, theme });
    return (
      <div className={styles.textInput}>
        <input
          ref={inputRef}
          className={classNames(styles.textInput_input, {
            [styles.textInput_input_invalid]: error,
          })}
          onChange={this.handleOnChange}
          {...inputProps}
        />
        {error &&
          (showTooltip ? (
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
          ))}
      </div>
    );
  }
}
