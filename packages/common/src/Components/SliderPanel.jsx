import React from 'react';
import PropTypes from 'prop-types';
import SliderWithInput from './SliderWithInput';
import styles from '../../statics/styles/slider-panel.scss';

const SliderPanel = props => {
  const { theme, getValue, onChange, ...otherProps } = props;
  return (
    <div className={styles.sliderPanel} data-hook="sliderPanel">
      <SliderWithInput
        {...otherProps}
        theme={theme}
        value={getValue(props)}
        onChange={onChange(props)}
        sliderDataHook="sliderPanel_Slider"
        inputDataHook="sliderPanel_Input"
      />
    </div>
  );
};

SliderPanel.propTypes = {
  getValue: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

export default SliderPanel;
