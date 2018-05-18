import React from 'react';
import PropTypes from 'prop-types';
import SliderWithInput from './SliderWithInput';
import styles from '../Styles/slider-panel.scss';

const SliderPanel = props => {
  const { min, max, theme, getValue, onChange } = props;
  return (
    <div className={styles.sliderPanel}>
      <SliderWithInput
        min={min}
        max={max}
        theme={theme}
        value={getValue(props)}
        onChange={onChange(props)}
      />
    </div>
  );
};

SliderPanel.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  getValue: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

export default SliderPanel;
