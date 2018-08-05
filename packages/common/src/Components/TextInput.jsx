import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from '../Utils/mergeStyles';
import { ErrorIcon } from '../Icons';
import Tooltip from './Tooltip';
import textInputStyles from '../../statics/styles/text-input.scss';

const TextInput = ({ inputRef, error, theme, ...otherProps }) => {
  const styles = mergeStyles({ styles: textInputStyles, theme });
  return (
    <div className={styles.textInput}>
      <input
        ref={inputRef}
        className={classNames(styles.textInput_input, { [styles.textInput_input_invalid]: error })}
        {...otherProps}
      />
      {error ? (
        <Tooltip
          content={error}
          moveBy={{ x: -23, y: -5 }}
          theme={theme}
        >
          <span><ErrorIcon className={styles.textInput_errorIcon} /></span>
        </Tooltip>
      ) : null}
    </div>
  );
};

TextInput.propTypes = {
  inputRef: PropTypes.func,
  theme: PropTypes.object.isRequired,
  error: PropTypes.string,
};

export default TextInput;
