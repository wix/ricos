import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { mergeStyles } from '../Utils/mergeStyles';
import { CheckIcon } from '../Icons';
import styles from '../../statics/styles/checkbox.scss';
import generalStyles from '../../statics/styles/general.scss';

export default class Checkbox extends React.Component {
  static propTypes = {
    theme: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    dataHook: PropTypes.string,
  };

  static defaultProps = {
    checked: false,
  };

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.generalStyles = mergeStyles({ styles: generalStyles, theme: props.theme });
    this.state = { focused: false };
    this.id = `chk_${Math.floor(Math.random() * 9999)}`;
  }

  onFocus() {
    this.setState({ focused: true });
  }

  onBlur() {
    this.setState({ focused: false });
  }

  render() {
    const { styles, generalStyles } = this;
    const { onChange, label, checked, dataHook } = this.props;
    const isChecked = checked ? { defaultChecked: 'checked' } : {};
    const a11yProps = {
      'aria-label': label,
      'aria-checked': checked,
      role: 'checkbox',
    };

    return (
      <label
        htmlFor={this.id}
        className={classnames({
          [styles.checkbox]: true,
          [generalStyles.focused]: this.state.focused,
        })}
      >
        <input
          id={this.id}
          onFocus={() => this.onFocus()}
          onBlur={() => this.onBlur()}
          tabIndex="0"
          {...a11yProps}
          className={styles.checkbox_input}
          type={'checkbox'}
          data-hook={dataHook}
          onChange={onChange}
          {...isChecked}
        />
        <i
          className={classnames(
            styles.checkbox_icon,
            checked ? styles.checkbox_icon_checked : styles.checkbox_icon_unchecked
          )}
        >
          {checked && <CheckIcon className={styles.checkbox_check} />}
        </i>
        <span className={styles.checkbox_label}>{label}</span>
      </label>
    );
  }
}
