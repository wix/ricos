import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles, isHexColor } from 'wix-rich-content-common';
import styles from '../../../statics/styles/custom-color-picker.scss';
import { HashtagIcon } from '../../Icons';
import '../../../statics/styles/color-picker-react-colorful.scss';
import 'react-colorful/dist/index.css';

const Picker = React.lazy(() =>
  import('react-colorful').then(({ HexColorPicker }) => ({
    default: HexColorPicker,
  }))
);

const ColorInput = React.lazy(() =>
  import('react-colorful').then(({ HexColorInput }) => ({
    default: HexColorInput,
  }))
);

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
    if (isHexColor(color)) {
      this.props.onChange(color);
    }
    this.setState({ color });
  };

  render() {
    const { styles } = this;
    const { t } = this.props;
    return (
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Picker color={this.state.color} onChange={this.onInputChange} />
        </Suspense>
        <div className={styles.customColorPicker_editable_input_container}>
          <div className={styles.customColorPicker_input_label}>
            {t('ButtonModal_Color_Input_Label')}
          </div>
          <div className={styles.customColorPicker_input_container}>
            <HashtagIcon className="hashtagIcon" />
            <Suspense fallback={<div>Loading...</div>}>
              <ColorInput
                className="hexColorInput"
                placeholder="ffffff"
                data-hook="colorInput"
                color={this.state.color}
                onChange={this.onInputChange}
              />
            </Suspense>
          </div>
          <div
            style={{
              width: '20px',
              padding: '0',
              height: '20px',
              borderRadius: '15px',
              border: 'solid 1px #e0e0e3',
              backgroundColor: this.state.color,
            }}
          />
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
    this.onChangeConverted = this.onChangeConverted.bind(this);
  }

  onChangeConverted(color) {
    this.props.onChange(color);
  }

  render() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <CustomColorPicker {...this.props} onChange={this.onChangeConverted} />
      </Suspense>
    );
  }
}

HexColorPicker.propTypes = CustomColorPicker.propTypes;

export default HexColorPicker;
