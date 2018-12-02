import React from 'react';
import { CustomPicker } from 'react-color';
import HuePointer from '../components/hue-pointer';
import SaturationPointer from '../components/saturation-pointer';
import { Saturation, Hue, EditableInput } from 'react-color/lib/components/common';
class CustomColorPicker extends React.Component {
  render() {
    const styles = {
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
        paddingTop: '13px'
      },
    };

    return (
      <div>
        <div style={styles.saturation}>
          <Saturation style={{ saturation: styles.saturation }} pointer={() => <SaturationPointer />} {...this.props} />
        </div>
        <div style={styles.hue}>
          <Hue style={{ hue: styles.hue }} {...this.props} pointer={() => <HuePointer />} />
        </div>
        <div>
          <EditableInput
            style={{ input: styles.input }}
            value={'Hex number ' + this.props.color}
            {...this.props}
          />
        </div>
      </div>
    );
  }
}

export default CustomPicker(CustomColorPicker);
