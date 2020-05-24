import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles, isHexColor } from 'wix-rich-content-common';
import HuePointer from './HuePointer.jsx';
import SaturationPointer from './SaturationPointer';
import styles from '../../../statics/styles/custom-color-picker.scss';

class CustomColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = {
      color: props.color,
      Saturation: undefined,
      Hue: undefined,
      EditableInput: undefined,
    };
  }

  componentDidMount() {
    const Saturation = React.lazy(() =>
      import('react-color/lib/components/common').then(({ Saturation }) => ({
        default: Saturation,
      }))
    );
    const Hue = React.lazy(() =>
      import('react-color/lib/components/common').then(({ Hue }) => ({
        default: Hue,
      }))
    );
    const EditableInput = React.lazy(() =>
      import('react-color/lib/components/common').then(({ EditableInput }) => ({
        default: EditableInput,
      }))
    );

    this.setState({ Saturation, Hue, EditableInput });
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
    const { Saturation, Hue, EditableInput } = this.state;
    return (
      <div className={styles.customColorPicker_container}>
        <div className={styles.customColorPicker_saturation}>
          {Saturation && (
            <Suspense fallback={<div>Loading...</div>}>
              <Saturation pointer={() => <SaturationPointer theme={theme} />} {...this.props} />
            </Suspense>
          )}
        </div>
        <div className={styles.customColorPicker_hue}>
          {Hue && (
            <Suspense fallback={<div>Loading...</div>}>
              <Hue {...this.props} pointer={() => <HuePointer theme={theme} />} />
            </Suspense>
          )}
        </div>
        <div className={styles.customColorPicker_editable_input_container}>
          <div className={styles.customColorPicker_input_label}>
            {t('ButtonModal_Color_Input_Label')}
          </div>
          <div className={styles.customColorPicker_input_container}>
            {EditableInput && (
              <Suspense fallback={<div>Loading...</div>}>
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
              </Suspense>
            )}
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

class HexColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Picker: false };
    this.onChangeConverted = this.onChangeConverted.bind(this);
  }

  componentDidMount() {
    const Picker = React.lazy(() =>
      import('react-color').then(({ CustomPicker: customPicker }) => ({
        default: customPicker(CustomColorPicker),
      }))
    );
    this.setState({ Picker });
  }

  onChangeConverted(color) {
    this.props.onChange(color.hex);
  }

  render() {
    const { Picker } = this.state;
    return (
      Picker && (
        <Suspense fallback={<div>Loading...</div>}>
          <Picker {...this.props} onChange={this.onChangeConverted} />
        </Suspense>
      )
    );
  }
}

HexColorPicker.propTypes = CustomColorPicker.propTypes;

export default HexColorPicker;
