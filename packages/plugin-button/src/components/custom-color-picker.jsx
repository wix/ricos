import React from 'react';
import PropTypes from 'prop-types';
import { CustomPicker } from 'react-color';
import { Saturation, Hue, EditableInput } from 'react-color/lib/components/common';
import { mergeStyles } from 'wix-rich-content-common';
import HuePointer from '../components/hue-pointer';
import SaturationPointer from '../components/saturation-pointer';
import styles from '../../statics/styles/custom-color-picker.scss';

const customPicker = CustomPicker;

class CustomColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    const { isMobile } = this.props;
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
    const { t } = this.props;
    return (
      <div className={this.styles.custom_color_picker_container}>
        <div style={this.inlineStyles.saturation}>
          <Saturation
            style={{ saturation: this.inlineStyles.saturation }}
            pointer={() => <SaturationPointer />}
            {...this.props}
          />
        </div>
        <div style={this.inlineStyles.hue}>
          <Hue
            style={{ hue: this.inlineStyles.hue }}
            {...this.props}
            pointer={() => <HuePointer />}
          />
        </div>
        <div className={this.styles.custom_color_picker_editable_input_container}>
          <div className={this.styles.custom_color_picker_input_label}>
            {t('ButtonModal_Color_Input_Label')}
          </div>
          <div className={this.styles.custom_color_picker_input_container}>
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
  theme: PropTypes.object.isRequired,
};

export default customPicker(CustomColorPicker);
