import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/slider.scss';

function Slider(props) {
  const mergedStyles = mergeStyles({ styles, theme: props.theme });
  const { min, max, onChange, dataHook, ariaProps, value, onSubmit } = props;

  const onKeyUp = event => {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowRight':
      case 'ArrowLeft':
      case 'Home':
      case 'End':
      case 'PageUp':
      case 'PageDown':
        onSubmit(event.target.valueAsNumber);
        break;
      default:
        return;
    }
  };

  return (
    <input
      {...ariaProps}
      tabIndex={0}
      type={'range'}
      className={classNames(mergedStyles.slider, mergedStyles.wrapperSlider)}
      data-hook={dataHook}
      onChange={e => onChange(e.target.valueAsNumber)}
      value={value}
      min={min}
      max={max}
      onMouseUp={e => onSubmit(e.target.valueAsNumber)}
      onKeyUp={onKeyUp}
    />
  );
}

Slider.propTypes = {
  value: PropTypes.number.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  theme: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  dataHook: PropTypes.string,
  ariaProps: PropTypes.object,
};

export default Slider;
