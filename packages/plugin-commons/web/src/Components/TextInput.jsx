import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import Tooltip from 'wix-rich-content-common/dist/lib/Tooltip.cjs.jsx';
import { ErrorIcon, SearchIcon } from 'wix-rich-content-editor-common';

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
    searchIcon: PropTypes.bool,
    focusSearchIcon: PropTypes.bool,
  };

  static defaultProps = {
    showTooltip: true,
  };

  handleOnChange = event => {
    const { onChange, getTarget } = this.props;
    onChange(getTarget ? event.target : event.target.value);
  };

  render() {
    const {
      inputRef,
      error,
      theme,
      showTooltip,
      searchIcon = false,
      focusSearchIcon,
      ...otherProps
    } = this.props;
    const inputProps = omit(otherProps, ['onChange']);
    const styles = mergeStyles({ styles: textInputStyles, theme });

    return (
      <div className={styles.textInput}>
        {searchIcon && (
          <SearchIcon
            className={classNames(styles.prefixIcon, {
              [styles.unfocusFill]: !focusSearchIcon,
              [styles.focusFill]: focusSearchIcon,
            })}
          />
        )}
        <input
          ref={inputRef}
          className={classNames(styles.textInput_input, {
            [styles.textInput_input_invalid]: error,
            [styles.searchIcon]: searchIcon,
          })}
          onChange={this.handleOnChange}
          {...inputProps}
        />
        {error &&
          (showTooltip ? (
            <Tooltip isError content={error}>
              <ErrorIcon className={styles.textInput_errorIcon} />
            </Tooltip>
          ) : (
            <ErrorIcon className={styles.textInput_errorIcon} />
          ))}
      </div>
    );
  }
}
