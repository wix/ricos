import React from 'react';
import PropTypes from 'prop-types';
import SliderWithInput from './SliderWithInput';
import styles from '../../statics/styles/slider-panel.scss';

const SliderPanel = props => {
  const {
    theme,
    getValue,
    onChange,
    mapStoreDataToPanelProps,
    getEditorBounds,
    ...otherProps
  } = props;

  const mappedProps = { ...otherProps, ...mapStoreDataToPanelProps(otherProps) };

  return (
    <div className={styles.sliderPanel} data-hook="sliderPanel">
      <SliderWithInput
        {...mappedProps}
        theme={theme}
        value={getValue(props)}
        onChange={onChange({ ...props, getEditorBounds })}
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
  mapStoreDataToPanelProps: PropTypes.func,
  getEditorBounds: PropTypes.func,
};

SliderPanel.defaultProps = {
  mapStoreDataToPanelProps: () => ({}),
};

export default SliderPanel;
