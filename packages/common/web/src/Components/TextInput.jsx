import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { mergeStyles } from '../Utils/mergeStyles';
import { ErrorIcon } from '../Icons';
import Tooltip from './Tooltip';
import textInputStyles from '../../statics/styles/text-input.scss';

export default class TextInput extends React.Component {
  static propTypes = {
    inputRef: PropTypes.func,
    theme: PropTypes.object.isRequired,
    error: PropTypes.string,
    showTooltip: PropTypes.bool,
  };

  static defaultProps = {
    showTooltip: true,
  };

  render() {
    const { inputRef, error, theme, showTooltip, ...otherProps } = this.props;
    const styles = mergeStyles({ styles: textInputStyles, theme });
    return (
      <div className={styles.textInput}>
        <input
          ref={inputRef}
          className={classNames(styles.textInput_input, {
            [styles.textInput_input_invalid]: error,
          })}
          {...otherProps}
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
