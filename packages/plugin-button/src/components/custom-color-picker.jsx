import React from 'react';
import { CustomPicker } from 'react-color';
import { Saturation, Hue, EditableInput } from 'react-color/lib/components/common';
class CustomColorPicker extends React.Component {
  render() {
    const styles = {
      hue: {
        height: 10,
        position: 'relative',
        marginTop: 10,
      },
      saturation: {
        width: '100%',
        height: '171px',
        position: 'relative',
      },
      circle: {
        width: '100%',
        height: '171px',
      },
      input: {
        height: 34,
        paddingTop: '15px',
        position: 'relative',
        width: '100%',
        border: 'none',
      },
    };

    return (
      <div>
        <div style={styles.saturation}>
          <Saturation {...this.props} />
        </div>
        <div style={styles.hue}>
          <Hue {...this.props} />
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
