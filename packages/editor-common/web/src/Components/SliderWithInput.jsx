import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce, isNumber } from 'lodash';

import { mergeStyles } from 'wix-rich-content-common';
import Slider from './Slider';
import styles from '../../statics/styles/slider-with-input.scss';

class SliderWithInput extends Component {
  styles = mergeStyles({ styles, theme: this.props.theme });
  id = `sld_${Math.floor(Math.random() * 9999)}`;
  state = { inputValue: this.props.value };

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({ inputValue: this.normalizeInputValue(nextProps.value) });
    }
  }

  handleInputChange = event => {
    this.setState({ inputValue: event.target.valueAsNumber || 0 });
  };

  submitInputValueDebounced = debounce(() => {
    const inputValue = this.normalizeInputValue(this.state.inputValue);
    this.props.onChange(inputValue);
    this.setState({ inputValue });
  }, 800);

  submitInputValue = () => {
    this.submitInputValueDebounced();
    this.submitInputValueDebounced.flush();
  };

  getInputMin = () => (isNumber(this.props.inputMin) ? this.props.inputMin : this.props.min);
  getInputMax = () => (isNumber(this.props.inputMax) ? this.props.inputMax : this.props.max);

  normalizeInputValue = value => Math.min(Math.max(this.getInputMin(), value), this.getInputMax());

  render() {
    const { label, value, min, max, onChange, theme, sliderDataHook, inputDataHook } = this.props;
    let ariaProps = label ? { 'aria-labelledby': `${this.id}_lbl` } : {};
    ariaProps = Object.assign({}, ariaProps, {
      'aria-valuemin': min,
      'aria-valuemax': max,
      'aria-valuenow': value,
    });

    /* eslint-disable jsx-a11y/role-has-required-aria-props */
    return (
      <div>
        {label ? (
          <span id={`${this.id}_lbl`} className={this.styles.sliderWithInput_label}>
            {label}
          </span>
        ) : null}
        <div className={this.styles.sliderWithInput_content}>
          <Slider
            theme={theme}
            value={value}
            dataHook={sliderDataHook}
            onChange={onChange}
            min={min}
            max={max}
            className={this.styles.sliderWithInput_slider}
            ariaProps={ariaProps}
          />
          <input
            tabIndex={0}
            type="number"
            value={this.state.inputValue}
            data-hook={inputDataHook}
            {...ariaProps}
            onChange={this.handleInputChange}
            onBlur={this.submitInputValue}
            onMouseUp={this.submitInputValue}
            onKeyUp={this.submitInputValueDebounced}
            className={this.styles.sliderWithInput_input}
            min={this.getInputMin()}
            max={this.getInputMax()}
            step="1"
            role="spinbutton"
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
  inputMax: PropTypes.number,
  inputMin: PropTypes.number,
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
