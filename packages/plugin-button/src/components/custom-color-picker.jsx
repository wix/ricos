import React from 'react';
import { CustomPicker } from 'react-color';
import { Saturation, Hue, EditableInput } from 'react-color/lib/components/common';
import HuePointer from '../components/hue-pointer';
import SaturationPointer from '../components/saturation-pointer';
import styles from '../../statics/styles/custom-color-picker.scss';
class CustomColorPicker extends React.Component {
  render() {
    const inlineStyles = {
      hue: {
        height: '12px',
        position: 'relative',
        marginTop: '6px',
      },
      saturation: {
        width: '100%',
        height: '112px',
        position: 'relative',
      },
      input: {
        position: 'relative',
        width: '100%',
        border: 'none',
        paddingTop: '13px',
        fontSize: '14px',
      },
    };

    return (
      <div>
        <div style={inlineStyles.saturation}>
          <Saturation style={{ saturation: inlineStyles.saturation }} pointer={() => <SaturationPointer />} {...this.props} />
        </div>
        <div style={inlineStyles.hue}>
          <Hue style={{ hue: inlineStyles.hue }} {...this.props} pointer={() => <HuePointer />} />
        </div>
        <div className={styles.editable_input_label}>
          <EditableInput
            style={{ input: inlineStyles.input }}
            value={'Hex Number ' + this.props.color}
            {...this.props}
          />
        </div>
      </div>
    );
  }
}

export default CustomPicker(CustomColorPicker);
