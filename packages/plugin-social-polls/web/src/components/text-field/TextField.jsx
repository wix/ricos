import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { clamp } from 'lodash';

import { RCEHelpersPropTypes, withRCEHelpers } from '../rce-helpers-context';
import { LoaderIcon } from 'wix-rich-content-plugin-commons';

import styles from './text-field.scss';

class TextFieldComponent extends React.PureComponent {
  $el = React.createRef();

  state = {
    placeholder: this.props.placeholder,
    rows: 1,
    syncing: false,
  };

  componentDidMount() {
    if (!this.props.rce.isViewMode) {
      this.resize();
    }

    window?.addEventListener('resize', this.handleWindowResizeEvent);
  }

  componentWillUnmount() {
    window?.removeEventListener('resize', this.handleWindowResizeEvent);
  }

  handleWindowResizeEvent = () => setTimeout(() => this.resize());

  hidePlaceholder() {
    this.setState({ placeholder: '' });
  }

  showPlaceholder() {
    this.setState({ placeholder: this.props.placeholder });
  }

  handleFocus = e => {
    e.stopPropagation();
    setTimeout(() => this.resize());
    this.hidePlaceholder();
    this.props.rce.setInPluginEditingMode(true);
  };

  handleKeyDown(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  }

  handleBlur = () => {
    setTimeout(() => this.resize());
    this.showPlaceholder();
    this.props.rce.setInPluginEditingMode(false);
  };

  handleChange = event => {
    this.props.onChange(event.target.value);

    this.resize();
  };

  resize() {
    if (!this.$el.current) {
      return;
    }

    const computedStyles = getComputedStyle(this.$el.current);

    const lineHeight = parseInt(computedStyles.lineHeight);
    const paddingTop = parseInt(computedStyles.paddingTop);
    const paddingBottom = parseInt(computedStyles.paddingBottom);

    this.$el.current.rows = 1;

    const { scrollHeight } = this.$el.current;

    this.$el.current.rows = this.state.rows;

    const contentHeight = scrollHeight - (paddingTop + paddingBottom);
    const rows = Math.ceil(clamp(contentHeight / lineHeight, 1, Infinity));

    this.setState({ rows });
  }

  render() {
    const {
      textAutoResize,
      className,
      rce,
      endAdornment,
      style,
      children,
      startAdornment,
      maxLength,
      disabled,
      value,
    } = this.props;

    const { placeholder, rows, syncing } = this.state;

    if (rce.isViewMode || rce.isPreview) {
      return (
        <>
          <p
            style={style}
            className={cls(
              styles.text,
              className,
              textAutoResize && {
                [styles.small]: value.length > 120,
                [styles.medium]: value.length <= 120,
                [styles.large]: value.length <= 80,
              },
              {
                [styles.webview]: rce.isWebView,
              }
            )}
          >
            {startAdornment}
            {children}
            <span className={styles.value}>{this.props.value || this.props.placeholder}</span>
          </p>
        </>
      );
    }

    return (
      <div className={styles.root}>
        {startAdornment}
        <textarea
          disabled={disabled}
          maxLength={maxLength}
          style={style}
          ref={this.$el}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          placeholder={placeholder}
          value={value}
          rows={rows}
          onKeyDown={this.handleKeyDown}
          className={cls(
            styles.input,
            className,
            textAutoResize && {
              [styles.small]: value.length > 120,
              [styles.medium]: value.length <= 120,
              [styles.large]: value.length <= 80,
            }
          )}
          onClick={undefined}
        />
        <span
          className={cls(styles.endAdornment, {
            [styles.shown]: syncing,
          })}
        >
          {syncing ? <LoaderIcon className={styles.spinner} /> : endAdornment}
        </span>
      </div>
    );
  }
}

export const TextField = withRCEHelpers(TextFieldComponent);

TextFieldComponent.defaultProps = {
  maxLength: 500,
  disabled: false,
};

TextFieldComponent.propTypes = {
  maxLength: PropTypes.number,
  value: PropTypes.string,
  disabled: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  textAutoResize: PropTypes.bool,
  startAdornment: PropTypes.node,
  endAdornment: PropTypes.node,
  ...RCEHelpersPropTypes,
};
