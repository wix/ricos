import React from 'react';
import PropTypes from 'prop-types';
import { CustomPicker } from 'react-color';
import { mergeStyles } from '../../Utils/mergeStyles';
import { Saturation, Hue, EditableInput } from 'react-color/lib/components/common';
import HuePointer from './HuePointer.jsx';
import SaturationPointer from './SaturationPointer';
import styles from '../../../statics/styles/custom-color-picker.scss';
import { isHexColor } from './utils';

const customPicker = CustomPicker;

class CustomColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = {
      color: props.color,
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.color !== this.props.color) {
      this.setState({ color: newProps.color });
    }
  }

  onInputChange = color => {
    if (isHexColor(color.hex)) {
      this.props.onChange(color.hex);
    }
    this.setState({ color: color.hex });
  };
  render() {
    const { styles } = this;
    const { t, theme } = this.props;
    return (
      <div className={styles.customColorPicker_container}>
        <div className={styles.customColorPicker_saturation}>
          <Saturation pointer={() => <SaturationPointer theme={theme} />} {...this.props} />
        </div>
        <div className={styles.customColorPicker_hue}>
          <Hue {...this.props} pointer={() => <HuePointer theme={theme} />} />
        </div>
        <div className={styles.customColorPicker_editable_input_container}>
          <div className={styles.customColorPicker_input_label}>
            {t('ButtonModal_Color_Input_Label')}
          </div>
          <div className={styles.customColorPicker_input_container}>
            <EditableInput
              {...this.props}
              label={'hex'}
              style={{
                input: {
                  position: 'relative',
                  width: '100%',
                  paddingTop: 13,
                  fontSize: 14,
                  color: '#333333',
                  border: 'none',
                },
                label: {
                  display: 'none',
                },
              }}
              onChange={this.onInputChange}
              value={this.state.color}
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
  onChange: PropTypes.func,
};

const Picker = customPicker(CustomColorPicker);

class HexColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeConverted = this.onChangeConverted.bind(this);
  }

  onChangeConverted(color) {
    this.props.onChange(color.hex);
  }

  render() {
    return <Picker {...this.props} onChange={this.onChangeConverted} />;
  }
}

HexColorPicker.propTypes = CustomColorPicker.propTypes;

export default HexColorPicker;
