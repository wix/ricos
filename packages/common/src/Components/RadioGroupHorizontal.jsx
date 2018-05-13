import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RadioGroup from './RadioGroup';
import { mergeStyles } from '../Utils/mergeStyles';
import styles from '../Styles/radio-group-horizontal.scss';

class RadioGroupHorizontal extends Component {

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.id = `h_group_${Math.floor(Math.random() * 9999)}`;
  }

  render() {
    const { label, readOnly, ...props } = this.props;
    return (
      <div className={readOnly ? this.styles.radioGroupHorizontal_readOnly : ''}>
        {label ? <span id={`${this.id}_label`} className={this.styles.radioGroupHorizontal_title}>{label}</span> : null}
        <RadioGroup ariaLabelledBy={`${this.id}_label`} {...props} readOnly={readOnly} className={this.styles.radioGroupHorizontal_group} />
      </div>
    );
  }
}

RadioGroupHorizontal.propTypes = {
  label: PropTypes.string,
  dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  theme: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default RadioGroupHorizontal;
