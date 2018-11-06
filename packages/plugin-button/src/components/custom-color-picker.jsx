import React from 'react';
import { CustomPicker } from 'react-color';
var { Saturation, Hue } = require('react-color/lib/components/common');
class MyColorPicker extends React.Component {
  render() {
    const styles = {
        hue: {
          height: 10,
          position: 'relative',
          marginBottom: 10,
        },
        saturation: {
          width:'100%', 
          height: '100px',
          position: 'relative'
          }
        };

        const color = {
              hex: '#333',
              rgb: {
                r: 51,
                g: 51,
                b: 51,
                a: 1,
              },
              hsl: {
                h: 0,
                s: 0,
                l: .20,
                a: 1,
              },
            }

    return (
    <div style={ styles.saturation}>
      <Saturation rgb={color.rgb} {...this.props}/>
    </div>
    );
  }
}

export default CustomPicker(MyColorPicker);