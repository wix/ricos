import React from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import Styles from '../../../statics/styles/custom-color-picker.scss';
import { HashtagIcon } from '../../Icons';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import 'react-colorful/dist/index.css';

const CustomColorPicker = ({ t, color, theme, onChange }) => {
  const styles = mergeStyles({ styles: Styles, theme });

  return (
    <div>
      <HexColorPicker color={color} onChange={onChange} />
      <div className={styles.customColorPicker_editable_input_container}>
        <div className={styles.customColorPicker_input_label}>
          {t('ButtonModal_Color_Input_Label')}
        </div>
        <div className={styles.customColorPicker_input_container}>
          <HashtagIcon className={styles.hashtagIcon} />
          <HexColorInput
            className={styles.hexColorInput}
            placeholder="000000"
            data-hook="colorInput"
            color={color}
            onChange={onChange}
          />
        </div>
        <div className={styles.customColorPicker_currentColor} style={{ backgroundColor: color }} />
      </div>
    </div>
  );
};

CustomColorPicker.propTypes = {
  t: PropTypes.func,
  color: PropTypes.string,
  isMobile: PropTypes.bool,
  theme: PropTypes.object,
  onChange: PropTypes.func,
};

export default CustomColorPicker;
