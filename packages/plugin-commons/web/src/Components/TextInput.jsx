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
  };

  static defaultProps = {
    showTooltip: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      focusSearchIcon: true,
      hoverSearchIcon: false,
    };
  }

  handleOnChange = event => {
    const { onChange, getTarget } = this.props;
    onChange(getTarget ? event.target : event.target.value);
  };

  focusSearchIcon = () => {
    this.setState({ focusSearchIcon: true, hoverSearchIcon: false });
  };

  unfocusSearchIcon = () => {
    this.setState({ focusSearchIcon: false, hoverSearchIcon: false });
  };

  hoverSearchIcon = () => {
    this.setState({ hoverSearchIcon: true });
  };

  unhoverSearchIcon = () => {
    !this.state.focusSearchIcon && this.setState({ hoverSearchIcon: false });
  };

  render() {
    const { inputRef, error, theme, showTooltip, searchIcon = false, ...otherProps } = this.props;
    const inputProps = omit(otherProps, ['onChange']);
    const styles = mergeStyles({ styles: textInputStyles, theme });
    const { focusSearchIcon, hoverSearchIcon } = this.state;
    return (
      <div className={styles.textInput}>
        {searchIcon && (
          <SearchIcon
            className={classNames(styles.prefixIcon, {
              [styles.unfocusFill]: !focusSearchIcon && !hoverSearchIcon,
              [styles.focusFill]: focusSearchIcon || hoverSearchIcon,
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
          onMouseEnter={this.hoverSearchIcon}
          onMouseLeave={this.unhoverSearchIcon}
          onFocus={this.focusSearchIcon}
          onBlur={this.unfocusSearchIcon}
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
