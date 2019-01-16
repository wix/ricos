import React from 'react';
import PropTypes from 'prop-types';
import { CustomPicker } from 'react-color';
import { Saturation, Hue, EditableInput } from 'react-color/lib/components/common';
import { WixUtils } from 'wix-rich-content-common';
import HuePointer from '../components/hue-pointer';
import SaturationPointer from '../components/saturation-pointer';
import styles from '../../statics/styles/custom-color-picker.scss';

const customPicker = CustomPicker;

class CustomColorPicker extends React.Component {
  constructor(props) {
    super(props);
    const isMobile = WixUtils.isMobile();
    this.inlineStyles = {
      hue: {
        height: isMobile ? '24px' : '12px',
        position: 'relative',
        marginTop: isMobile ? '12px' : '6px',
      },
      saturation: {
        width: '100%',
        height: '112px',
        position: 'relative',
        touchAction: 'none'
      },
      input: {
        position: 'relative',
        width: '100%',
        paddingTop: '13px',
        fontSize: '14px',
        color: '#333333',
        border: 'none'
      },
    };
  }
  render() {
    const { t } = this.props;
    return (
      <div className={styles.container}>
        <div style={this.inlineStyles.saturation}>
          <Saturation style={{ saturation: this.inlineStyles.saturation }} pointer={() => <SaturationPointer />} {...this.props} />
        </div>
        <div style={this.inlineStyles.hue}>
          <Hue style={{ hue: this.inlineStyles.hue }} {...this.props} pointer={() => <HuePointer />} />
        </div>
        <div className={styles.editable_input_container}>
          <div className={styles.input_label}>
            {t('ButtonModal_Color_Input_Label')}
          </div>
          <div className={styles.input_container}>
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
  color: PropTypes.string
};

export default customPicker(CustomColorPicker);
