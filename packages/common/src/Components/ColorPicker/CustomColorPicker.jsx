import React from 'react';
import PropTypes from 'prop-types';
import { CustomPicker } from 'react-color';
import { Saturation, Hue, EditableInput } from 'react-color/lib/components/common';
import HuePointer from './HuePointer.jsx';
import SaturationPointer from './SaturationPointer';
import styles from '../../../statics/styles/custom-color-picker.scss';

const customPicker = CustomPicker;

class CustomColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.inlineStyles = {
      hue: {
        height: props.isMobile ? '24px' : '12px',
        position: 'relative',
        marginTop: props.isMobile ? '12px' : '6px',
      },
      saturation: {
        width: '100%',
        height: '112px',
        position: 'relative',
        touchAction: 'none',
      },
      input: {
        position: 'relative',
        width: '100%',
        paddingTop: '13px',
        fontSize: '14px',
        color: '#333333',
        border: 'none',
      },
    };
  }
  render() {
    const { t, theme } = this.props;
    return (
      <div className={styles.customColorPicker_container}>
        <div style={this.inlineStyles.saturation}>
          <Saturation
            style={{ saturation: this.inlineStyles.saturation }}
            pointer={() => <SaturationPointer theme={theme} />}
            {...this.props}
          />
        </div>
        <div style={this.inlineStyles.hue}>
          <Hue
            style={{ hue: this.inlineStyles.hue }}
            {...this.props}
            pointer={() => <HuePointer theme={theme} />}
          />
        </div>
        <div className={styles.customColorPicker_editable_input_container}>
          <div className={styles.customColorPicker_input_label}>
            {t('ButtonModal_Color_Input_Label')}
          </div>
          <div className={styles.customColorPicker_input_container}>
            <EditableInput
              style={{ input: this.inlineStyles.input }}
              value={this.props.color}
              {...this.props}
            />
          </div>
        </div>
      </div>
    );
  }
}

CustomColorPicker.propTypes = {
  t: PropTypes.func,
  color: PropTypes.string,
  isMobile: PropTypes.bool,
  theme: PropTypes.object,
};

export default customPicker(CustomColorPicker);
