import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce, isNumber } from 'lodash';
import InfoIcon from './InfoIcon';
import { mergeStyles } from 'wix-rich-content-common';
import Slider from './Slider';
import styles from '../../statics/styles/slider-with-input.scss';
import generalStyles from 'wix-rich-content-editor-common/dist/statics/styles/general.scss';

class SliderWithInput extends Component {
  styles = mergeStyles({ styles, theme: this.props.theme });

  id = `sld_${Math.floor(Math.random() * 9999)}`;

  state = { inputValue: this.props.defaultValue };

  handleInputChange = event => {
    const inputValue = event.target.valueAsNumber || 0;
    this.setState({ inputValue });
  };

  submitInputValueDebounced = debounce(() => {
    const inputValue = this.normalizeInputValue(this.state.inputValue);
    this.props.onChange(inputValue);
    this.setState({ inputValue });
  }, 800);

  submitInputValue = () => {
    const inputValue = this.normalizeInputValue(this.state.inputValue);
    this.props.onChange(inputValue);
    this.setState({ inputValue });
  };

  handleSliderChange = inputValue => {
    this.setState({ inputValue });
  };

  getInputMin = () => (isNumber(this.props.inputMin) ? this.props.inputMin : this.props.min);

  getInputMax = () => (isNumber(this.props.inputMax) ? this.props.inputMax : this.props.max);

  normalizeInputValue = value => Math.min(Math.max(this.getInputMin(), value), this.getInputMax());

  render() {
    const { label, min, max, theme, sliderDataHook, inputDataHook, tooltipTextKey, t } = this.props;
    const { inputValue } = this.state;
    let ariaProps = label ? { 'aria-labelledby': `${this.id}_lbl` } : {};
    ariaProps = {
      ...ariaProps,
      'aria-valuemin': min,
      'aria-valuemax': max,
      'aria-valuenow': inputValue,
    };
    /* eslint-disable jsx-a11y/role-has-required-aria-props */
    return (
      <div>
        <div className={generalStyles.infoContainer}>
          {label ? (
            <span id={`${this.id}_lbl`} className={this.styles.sliderWithInput_label}>
              {label}
            </span>
          ) : null}
          {tooltipTextKey && <InfoIcon tooltipText={t(tooltipTextKey)} />}
        </div>
        <div className={this.styles.sliderWithInput_content}>
          <Slider
            theme={theme}
            value={inputValue}
            dataHook={sliderDataHook}
            onChange={this.handleSliderChange}
            onSubmit={this.submitInputValue}
            min={min}
            max={max}
            className={this.styles.sliderWithInput_slider}
            ariaProps={ariaProps}
          />
          <input
            tabIndex={0}
            type="number"
            value={inputValue}
            data-hook={inputDataHook}
            {...ariaProps}
            onChange={this.handleInputChange}
            onBlur={this.submitInputValue}
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
  defaultValue: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  inputMax: PropTypes.number,
  inputMin: PropTypes.number,
  theme: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  sliderDataHook: PropTypes.string,
  inputDataHook: PropTypes.string,
  tooltipTextKey: PropTypes.string,
  t: PropTypes.func,
};

SliderWithInput.defaultProps = {
  min: 0,
  max: 100,
};

export default SliderWithInput;
