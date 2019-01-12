import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import PickedIcon from './../icons/pickedIcon';
import CustomColorPicker from './custom-color-picker';
import styles from '../../statics/styles/color-picker.scss';
import EyeDropperIcon from './../icons/EyeDropperIcon';

class ColorPicker extends PureComponent {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    const { colors } = this.props.settings;
    this.presetColors = [
      colors.color_1,
      colors.color_5,
      colors.color_8,
      colors.color_7,
      colors.color_6,
      colors.color_10
    ];
    this.state = {
      color: this.props.color,
      isPickerClicked: this.props.flag,
      isCustomColorPicker: false,
      isDropperSelected: false
    };
  }

  componentDidMount = () => {
    if (this.state.color && this.presetColors.indexOf(this.state.color) === -1) {
      this.setState({ dropperBackgroundColor: this.state.color, isDropperSelected: true });
    }
  }

  componentWillReceiveProps = () => {
    if (this.state.isPickerClicked !== this.props.flag) {
      this.setState({ isPickerClicked: this.props.flag });
    }
    const { color } = this.props;
    const colorIndex = this.presetColors.indexOf(color);
    if (this.state.colorButtonIndex !== colorIndex) {
      this.setState({ colorButtonIndex: colorIndex });
    }
  }

  componentDidUpdate = () => {
    if (!isEqual(this.state.color, this.props.color)) {
      this.setState({ color: this.props.color });
    }
  }

  onPickerClicked = () => {
    this.props.onClick(this.props.index);
    this.setState({ isPickerClicked: !this.state.isPickerClicked });
    if (!this.state.isPickerClicked) {
      this.setState({ isCustomColorPicker: false });
    }
  }

  onColorButtonClicked = (color, index) => {
    this.setState({ colorButtonIndex: index, isDropperSelected: false, dropperBackgroundColor: '' });
    this.props.onChange(color);
  }

  onDropperClicked = () => {
    this.props.scrollColorPickerDown();
    this.setState({ isCustomColorPicker: !this.state.isCustomColorPicker });
  }

  onCustomColorPickerChanged = color => {
    this.setState({ rgb: color.rgb });
    this.props.onChange(color.hex);
    this.setState({ color: color.hex });
    if (this.presetColors.indexOf(color.hex) === -1) {
      this.setState({ dropperBackgroundColor: color.hex, isDropperSelected: true });
    } else {
      this.setState({ dropperBackgroundColor: '', isDropperSelected: false });
    }
  }

  getDarkBrightness = rgb => {
    if (rgb) {
      const { r, g, b } = rgb;
      const hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
      );
      if (hsp > 127.5) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  handleKeyPress = (e, color) => {
    if (e.charCode === 13) {
      this.props.onChange(color);
    }
  };


  render() {
    const { colorPickerRef } = this.props;
    let dropperColor = '';
    if (this.state.color && this.presetColors.indexOf(this.state.color) === -1) {
      if (this.getDarkBrightness(this.state.rgb)) {
        dropperColor = '#eef1f6';
      } else {
        dropperColor = '#000000';
      }
    }
    const colorsButtons = this.presetColors.map((color, index) => {
      return (
        <div
          role="button"
          tabIndex="0"
          onKeyPress={this.handleKeyPress.bind(this, color)}
          key={color + index}
          className={classNames(styles.non_dropper_palette)}
          style={{ background: color }}
          onClick={this.onColorButtonClicked.bind(this, color, index)}
        >
          {this.state.colorButtonIndex === index &&
            <PickedIcon className={styles.picked} width="12px" height="12px" />
          }
        </div>
      );
    });
    return (
      <div ref={colorPickerRef} className={styles.container}>
        {this.state.isPickerClicked &&
          <div className={styles.overlay} />
        }
        <div className={this.styles.color_picker}>
          <div className={this.styles.label}>
            {this.props.children}
          </div>
          <div className={this.styles.picker}>
            <button
              style={{ background: this.state.color }}
              className={this.styles.pickerButton}
              onClick={this.onPickerClicked}
            />
          </div>
        </div>
        {this.state.isPickerClicked &&
          <div className={styles.colorBoard}>
            <div className={styles.palettes}>
              {colorsButtons}
              <div
                role="button"
                tabIndex="0"
                onKeyPress={this.handleKeyPress.bind(this, this.state.color)}
                onClick={this.onDropperClicked}
                style={{ background: this.state.dropperBackgroundColor }}
                className={classNames(styles.dropper_palette)}
              >
                {
                  this.state.isDropperSelected &&
                  <PickedIcon className={styles.picked} width="12px" height="12px" />
                }
                <EyeDropperIcon style={{ color: dropperColor }} className={styles.dropper} />
              </div>
            </div>
            {this.state.isCustomColorPicker &&
              <CustomColorPicker color={this.state.color} onChange={this.onCustomColorPickerChanged.bind(this)} t={this.props.t} />
            }
          </div>
        }
      </div>
    );
  }
}

ColorPicker.propTypes = {
  theme: PropTypes.object.isRequired,
  style: PropTypes.object,
  children: PropTypes.string.isRequired,
  color: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  flag: PropTypes.bool,
  settings: PropTypes.object.isRequired,
  t: PropTypes.func,
  index: PropTypes.number,
  scrollColorPickerDown: PropTypes.func,
  colorPickerRef: PropTypes.func
};

export default ColorPicker;
