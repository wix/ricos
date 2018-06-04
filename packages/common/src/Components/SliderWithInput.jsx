import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { mergeStyles } from '../Utils/mergeStyles';
import Slider from './Slider';
import styles from '../Styles/slider-with-input.scss';

class SliderWithInput extends Component {
  styles = mergeStyles({ styles, theme: this.props.theme });
  id = `sld_${Math.floor(Math.random() * 9999)}`;

  handleInputChange = event => {
    const { max, min } = this.props;
    const value = event.target.valueAsNumber || 0;
    const normalizedValue = Math.min(Math.max(min, value), max);

    this.props.onChange(normalizedValue);
  };

  render() {
    const { readOnly, label, value, min, max, onChange, theme, sliderDataHook, inputDataHook } = this.props;
    let ariaProps = label ? { 'aria-labelledby': `${this.id}_lbl` } : {};
    ariaProps = Object.assign({}, ariaProps, {
      'aria-disabled': readOnly,
      'aria-valuemin': min,
      'aria-valuemax': max,
      'aria-valuenow': value
    });

    /* eslint-disable jsx-a11y/role-has-required-aria-props */
    return (
      <div className={readOnly ? this.styles.sliderWithInput_readOnly : null} >
        {label ? <span id={`${this.id}_lbl`} className={this.styles.sliderWithInput_label}>{label}</span> : null}
        <div className={this.styles.sliderWithInput_content}>
          <Slider
            theme={theme} value={value} dataHook={sliderDataHook} onChange={onChange} readOnly={readOnly}
            min={min} max={max} className={this.styles.sliderWithInput_slider} ariaProps={ariaProps}
          />
          <input
            tabIndex={readOnly ? -1 : 0} type="number" value={value} data-hook={inputDataHook} {...ariaProps}
            onChange={this.handleInputChange} className={this.styles.sliderWithInput_input}
            min={min} max={max} step="1" role="spinbutton"
          />
        </div>
      </div>
    );
    /* eslint-enable jsx-a11y/role-has-required-aria-props */
  }
}

SliderWithInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  readOnly: PropTypes.bool,
  theme: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  sliderDataHook: PropTypes.string,
  inputDataHook: PropTypes.string,
};

SliderWithInput.defaultProps = {
  min: 0,
  max: 100,
};

export default SliderWithInput;
